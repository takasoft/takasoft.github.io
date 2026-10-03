#!/usr/bin/env python3
"""Render a built blog post to a clean, content-only PDF.

The script converts the *already-generated* Jekyll HTML (from ``_site``) to PDF
using a headless Chromium via Playwright. A browser engine is used (rather than a
pure HTML->PDF library) for three reasons:

  1. KaTeX math renders with full font/CSS fidelity, identical to the live site.
  2. The same script works on posts whose diagrams (mermaid) render via client JS.
  3. Wide display equations can be measured in-page and auto-scaled so they never
     get clipped at the page edge (the site CSS uses ``overflow-x: auto`` on
     ``.katex-display``, which would otherwise cut equations off in print).

Header (the "TakaSoft" nav), the footer, and the "Read more like this" block are
stripped so the PDF contains just the post content.

Usage (run from the repo root):

    python scripts/blog_to_pdf.py why-should-we-invest-our-money
    python scripts/blog_to_pdf.py 2026-05-18-why-should-we-invest-our-money.md
    python scripts/blog_to_pdf.py --all
    python scripts/blog_to_pdf.py <slug> --no-build      # skip the jekyll build

PDFs are written to ``pdf/`` (gitignored) and are never committed.
"""

from __future__ import annotations

import argparse
import functools
import http.server
import socketserver
import subprocess
import sys
import threading
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = REPO_ROOT / "_site"
POSTS_DIR = REPO_ROOT / "_posts"
OUT_DIR = REPO_ROOT / "pdf"

# Print CSS injected before the PDF is generated. Undoes the on-screen
# overflow-clipping on display math and tightens the layout for paper.
PRINT_CSS = """
@page { size: Letter; margin: 18mm 16mm; }
html, body { background: #fff !important; }
/* The site centers content in a Bootstrap .container with a max-width that is
   narrower than the printable page; widen it so we use the full text column. */
.container { max-width: 100% !important; width: 100% !important;
             padding-left: 0 !important; padding-right: 0 !important; }
.post { max-width: 100% !important; }
/* Never clip display equations in print; we scale wide ones to fit instead. */
.katex-display { overflow: visible !important; }
/* Avoid awkward breaks. */
h1, h2, h3, h4 { break-after: avoid-page; }
pre, table, .katex-display, svg, figure, blockquote { break-inside: avoid; }
img, svg { max-width: 100% !important; height: auto; }
a { color: inherit; text-decoration: underline; }
"""

# JS run in the page: strip chrome, then shrink any equation wider than its
# column so nothing is cut off at the page edge.
CLEANUP_JS = r"""
() => {
  // Remove site chrome: nav header, footer, and the related-posts block.
  document.querySelectorAll('nav.navbar, footer, .related').forEach(el => el.remove());

  // Auto-fit wide display equations. KaTeX width scales with font-size, so
  // reducing font-size shrinks width and the line height reflows correctly
  // (unlike a CSS transform, which would leave overlapping whitespace).
  document.querySelectorAll('.katex-display').forEach(el => {
    const avail = el.clientWidth;
    const inner = el.querySelector('.katex') || el;
    const content = inner.scrollWidth;
    if (content > avail && avail > 0) {
      const cs = window.getComputedStyle(el);
      const fs = parseFloat(cs.fontSize) || 16;
      // 0.97 leaves a hair of breathing room against the right margin.
      el.style.fontSize = (fs * (avail / content) * 0.97) + 'px';
    }
  });
}
"""


def find_post_html(target: str) -> Path:
    """Resolve a slug / filename / path to its built HTML file under _site."""
    # Strip a trailing .md and any date prefix to get the slug.
    name = target
    if name.endswith(".md"):
        name = name[:-3]
    # Jekyll permalink is /blog/:title where :title is the slug minus the date.
    parts = name.split("-")
    if len(parts) >= 4 and parts[0].isdigit() and len(parts[0]) == 4:
        slug = "-".join(parts[3:])
    else:
        slug = name

    candidate = SITE_DIR / "blog" / slug / "index.html"
    if candidate.exists():
        return candidate
    candidate = SITE_DIR / "blog" / f"{slug}.html"
    if candidate.exists():
        return candidate
    raise FileNotFoundError(
        f"Could not find built HTML for '{target}'. Looked for "
        f"_site/blog/{slug}/index.html and _site/blog/{slug}.html. "
        f"Did the site build, and is the slug correct?"
    )


def all_post_slugs() -> list[str]:
    slugs = []
    for md in sorted(POSTS_DIR.glob("*.md")):
        parts = md.stem.split("-")
        slugs.append("-".join(parts[3:]) if len(parts) >= 4 else md.stem)
    return slugs


def url_path_for(html_file: Path) -> str:
    """Map a built HTML file to its served URL path."""
    rel = html_file.relative_to(SITE_DIR).as_posix()
    if rel.endswith("/index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel


def build_site() -> None:
    print("Building site (bundle exec jekyll build)...", flush=True)
    subprocess.run(
        ["bundle", "exec", "jekyll", "build"],
        cwd=REPO_ROOT,
        check=True,
        shell=(sys.platform == "win32"),
    )


class _QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # silence per-request logging
        pass


def start_server() -> tuple[socketserver.TCPServer, int]:
    handler = functools.partial(_QuietHandler, directory=str(SITE_DIR))
    # Port 0 lets the OS pick a free port atomically.
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def render_pdf(page, base_url: str, html_file: Path, out_dir: Path) -> Path:
    url = base_url + url_path_for(html_file)
    page.goto(url, wait_until="networkidle")
    # Let any client-rendered diagrams (mermaid) settle.
    page.wait_for_timeout(400)
    page.evaluate(CLEANUP_JS)
    page.add_style_tag(content=PRINT_CSS)
    page.emulate_media(media="print")
    page.wait_for_timeout(150)

    slug = html_file.parent.name if html_file.name == "index.html" else html_file.stem
    out_path = out_dir / f"{slug}.pdf"
    page.pdf(
        path=str(out_path),
        format="Letter",
        print_background=True,
        margin={"top": "18mm", "bottom": "18mm", "left": "16mm", "right": "16mm"},
    )
    return out_path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", nargs="?", help="post slug, filename, or path")
    parser.add_argument("--all", action="store_true", help="render every post")
    parser.add_argument("--no-build", action="store_true", help="skip jekyll build")
    args = parser.parse_args()

    if not args.all and not args.target:
        parser.error("provide a post slug/filename, or use --all")

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "Playwright is not installed. Install it with:\n"
            "  python -m pip install playwright\n"
            "  python -m playwright install chromium",
            file=sys.stderr,
        )
        return 1

    if not args.no_build:
        build_site()
    elif not SITE_DIR.exists():
        print("_site does not exist; run without --no-build first.", file=sys.stderr)
        return 1

    targets = all_post_slugs() if args.all else [args.target]
    OUT_DIR.mkdir(exist_ok=True)

    httpd, port = start_server()
    base_url = f"http://127.0.0.1:{port}"
    written = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch()
            page = browser.new_page()
            for t in targets:
                try:
                    html_file = find_post_html(t)
                except FileNotFoundError as e:
                    print(f"  skip: {e}", file=sys.stderr)
                    continue
                out = render_pdf(page, base_url, html_file, OUT_DIR)
                size_kb = out.stat().st_size / 1024
                print(f"  wrote {out.relative_to(REPO_ROOT)} ({size_kb:.0f} KB)")
                written.append(out)
            browser.close()
    finally:
        httpd.shutdown()

    if not written:
        print("No PDFs written.", file=sys.stderr)
        return 1
    print(f"Done. {len(written)} PDF(s) in {OUT_DIR.relative_to(REPO_ROOT)}/.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
