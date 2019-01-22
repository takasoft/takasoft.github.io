---
layout: post
title: Arabic Number to Japanese/Chinese Number Converter
image: /public/assets/number-converter.png
hideTnPost: y
categories:
  - app
---

This program converts an Arabic number to a Japanese/Chinese number.

<!--more--> 
<span style="white-space: nowrap;">
<input type="number" id="myText" value="2342342" style="width:70%">
<button onclick="start()" class="btn btn-primary">Convert</button>
</span>
<script>
document.getElementById('myText').onkeypress = function(e){
    if (!e) e = window.event;
    if (e.keyCode == '13'){
      	start();
      	return false;
    }
}
</script>

<div class="divResults">
<ul class="ulResults" id="listResults">
    <li class="liResults">2342342 = 二百三十四万二千三百四十二</li>
</ul>
</div>

<br>
<a href="https://github.com/takao42/arabic-to-japanese-num-c" target="_blank">Source Code</a> 

<script src="{{ site.baseurl }}/public/js/numconverter.js"></script>
<link rel="stylesheet" type="text/css" href="{{ site.baseurl }}/public/css/numcstyle.css">
