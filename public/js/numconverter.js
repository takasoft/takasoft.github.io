function arabicToJapanese(num) {
    const match = num.trim().match(/^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))$/);
    if (!match) {
        throw new TypeError("Enter a number using digits, an optional sign, and a decimal point. Do not use commas or scientific notation.");
    }

    const integer = (match[2] || "0").replace(/^0+(?=\d)/, "");
    const fraction = match[3] === undefined ? match[4] : match[3];
    if (integer.length > 72) {
        throw new RangeError("Enter no more than 72 integer digits, excluding leading zeros.");
    }

    const largeUnits = ["", "万", "億", "兆", "京", "垓", "𥝱", "穣", "溝", "澗", "正", "載", "極", "恒河沙", "阿僧祇", "那由他", "不可思議", "無量大数"];
    const groups = [];
    for (let end = integer.length, unit = 0; end > 0; end -= 4, unit++) {
        const group = arabicToJapanese2(integer.slice(Math.max(0, end - 4), end));
        if (group) {
            groups.unshift(group + largeUnits[unit]);
        }
    }

    let converted = groups.join("") || "〇";
    if (fraction) {
        const digits = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        converted += "." + Array.from(fraction, digit => digits[digit]).join("");
    }
    if (match[1] === "-" && /[1-9]/.test(integer + (fraction || ""))) {
        converted = "マイナス" + converted;
    }
    return converted;
}

function arabicToJapanese2(num) {
    const digits = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const units = ["", "十", "百", "千"];
    let converted = "";
    for (let i = 0; i < num.length; i++) {
        const digit = num[i];
        const place = num.length - i - 1;
        if (digit !== "0") {
            converted += (digit === "1" && place > 0 ? "" : digits[digit]) + units[place];
        }
    }
    return converted;
}

function start(event) {
    event.preventDefault();
    const input = document.getElementById("myText");
    const errorMessage = document.getElementById("converter-error");
    let converted;
    try {
        converted = arabicToJapanese(input.value);
    } catch (error) {
        if (!(error instanceof TypeError || error instanceof RangeError)) {
            throw error;
        }
        errorMessage.textContent = error.message;
        errorMessage.hidden = false;
        input.setAttribute("aria-invalid", "true");
        return;
    }

    errorMessage.textContent = "";
    errorMessage.hidden = true;
    input.removeAttribute("aria-invalid");
    const entry = document.createElement("li");
    entry.className = "liResults";
    entry.textContent = input.value.trim() + " = " + converted;
    document.getElementById("listResults").prepend(entry);
}

document.getElementById("number-converter").addEventListener("submit", start);
