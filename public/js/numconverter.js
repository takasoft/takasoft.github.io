function start() {
	console.log("start convertion");
	// get input as string
    var num = document.getElementById("myText").value;

    
    // add new results
    var list = document.getElementById('listResults');
    var entry = document.createElement('li');
    entry.className = "liResults";

    if(!isNumeric(num)){ 
    	//console.log("not number")
    	entry.appendChild(document.createTextNode("ERROR"));
    	list.insertBefore(entry, list.childNodes[0]);
    } else {
    	var convertedNum = arabicToJapanese(num);
    	if(convertedNum == "NUMBER TOO BIG"){
    		entry.appendChild(document.createTextNode("NUMBER TOO BIG"));
    		list.insertBefore(entry, list.childNodes[0]);
    	} else {
    		entry.appendChild(document.createTextNode(num + " = " + convertedNum));
    		list.insertBefore(entry, list.childNodes[0]);
    	}
    }
    
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function arabicToJapanese(num) {
	var convertedNum = "";
	// get number of digits
	var numDigits = 0;
	var idxDot = -1;
	if(!num.includes(".")){
		numDigits = num.length;
	} else {
		idxDot = num.indexOf(".");
		numDigits = idxDot;
		//console.log("contains dot: " + numDigits);
	}

	if(numDigits > 72){
		return "NUMBER TOO BIG"
	}

	// the number of digits that are left
	var theRest = numDigits%4;
	//console.log("the rest: " + theRest);

	var figureKanji = ["万","億","兆","京","垓","𥝱","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数"];

	// number of figures
	var numFigures = parseInt(numDigits/4)+1;
	if(theRest == 0){
		numFigures -= 1;
		theRest = 4;
	}
	//console.log("numfigures: " + numFigures);

	for(var currentFigure = 1; currentFigure < numFigures+1; currentFigure++) {
		//console.log("current figure: " + currentFigure);
		var figureNum = "";

		// convert 10^4 figures
		if(currentFigure != numFigures) {
			for(var j = 0; j < 4; j++) {
				var currentIdx = numDigits-4*currentFigure+j;
				//separated[currentFigure] = n
				//console.log(currentIdx);

				figureNum += num[currentIdx];
				//console.log("num: " + num[currentIdx]);
			}
		} else { // last figure
			for(var j = 0; j < theRest; j++) {
				figureNum += num[j];
				//console.log("num: " + num[j]);
			}
		}

		
		if(figureNum != "0000") {// ignore if the figure is 0000
			if(currentFigure == 1) {
				convertedNum = arabicToJapanese2(figureNum);
				//console.log(figureNum);
			} else {
				convertedNum = figureKanji[currentFigure-2] + convertedNum;
				convertedNum = arabicToJapanese2(figureNum) + convertedNum;
				//console.log(figureNum);
			}
		}
	}

	if(idxDot > 0){
		var numberKanji = ["〇","一","二","三","四","五","六","七","八","九"];
		convertedNum += ".";
		var numAfterDot = num.length-idxDot-1;
		//console.log("numAfterDot "+numAfterDot);
		for(var i = idxDot+1; i < num.length; i++){
			convertedNum += numberKanji[parseInt(num[i])];
		}
		
	}

	return convertedNum;
}

// 1 to 1000
function arabicToJapanese2(num) {
	var convertedNum = "";

	var figureKanji = ["十","百","千"];
	var numberKanji = ["一","二","三","四","五","六","七","八","九"];

	// get number of digits
	var numDigits = num.length;

	for(var j = numDigits-1; j >= 0; j--) {
		////console.log(j);
		var currentIdx = numDigits-j-1;
		//console.log(currentIdx);

		if(num[currentIdx] != "0"){
			//console.log("chosen"+currentIdx);
			if (currentIdx == numDigits-1){
				convertedNum += numberKanji[num[currentIdx]-1];
			} else {
				convertedNum += numberKanji[num[currentIdx]-1] + figureKanji[j-1];
			}
		}
	}

	return convertedNum
}
