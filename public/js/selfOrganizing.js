// variables
var gameSize = 300;
var cellNum = 10;
var cellSize = gameSize/cellNum;
var cells = [];
var timeCheck = 0;
var startButton;
var stopButton;
var isGameStarted = false;

// create game
var game = new Phaser.Game(gameSize, gameSize+50, Phaser.AUTO, 'test-area', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.spritesheet('startButton', './public/assets/self-organizing-simulation/startButton.png', 180, 60);
    game.load.spritesheet('stopButton', './public/assets/self-organizing-simulation/stopButton.png', 180, 60);
}

function create() {
	// fix the position reset problem
	game.scale.compatibility.scrollTo = false;
	// change background color to white
	game.stage.backgroundColor = '#FFFFFF';
	//make buttons
	startButton = game.add.button(0, gameSize, 'startButton', startGame, this, 0, 1, 2);
	startButton.width = 90;
	startButton.height = 30;
	stopButton = game.add.button(90, gameSize, 'stopButton', stopGame, this, 0, 1, 2);
	stopButton.width = 90;
	stopButton.height = 30;

	// make cells with random color
	for(var x = 0; x < cellNum; x++){
	    cells[x] = [];    
	    for(var y = 0; y < cellNum; y++){ 
	        cells[x][y] = {column:x, row:y, color:getRandomRgb()};   
	    }    
	}
}

function update() {

	if (isGameStarted == true) {
		// make a random color
	    var randomColor = getRandomRgb();
	    //console.log(randomColor.r+", "+randomColor.g+", "+randomColor.b);
	    // find the cell with the nearest color
	    var nearestCell = cells[0][0];
	    var shortestDistance = 441.67; //sqrt(255^2+255^2+255^2)
	    for(var x = 0; x < cellNum; x++){   
		    for(var y = 0; y < cellNum; y++){ 
		    	var euclideanDistance = colorDistance(randomColor, cells[x][y].color);
		    	if (euclideanDistance <= shortestDistance) {
		    		shortestDistance = euclideanDistance;
		    		nearestCell = cells[x][y];
		    	}
		    }    
		}    

	    // test for 10 miliseconds delay
		if (game.time.now - timeCheck > 5) {
			//mix the color to the nearest cell and its neiboring cells 
	    	changeColor(nearestCell, randomColor);
		} else {
			//still waiting
		}
	} else {
		// wait
	}
	
	
    
}

function render () {
    // render cells
    for(var x = 0; x < cellNum; x++){   
	    for(var y = 0; y < cellNum; y++){ 
	    	var cell = new Phaser.Rectangle(cells[x][y].column*cellSize, cells[x][y].row*cellSize, cellSize, cellSize);
	        game.debug.geom(cell, rgbToHex(cells[x][y].color));  
	    }    
	}	

}

function startGame() {
	isGameStarted = true;
}

function stopGame() {
	isGameStarted = false;
}

function changeColor(nearestCell, randomColor) {
	for (var i = -1; i <= 1; i++) {   
	    for (var j = -1; j <= 1; j++) { 
	    	var targetCellX = nearestCell.row+i;   		
			var targetCellY = nearestCell.column+j;
	    	if (!(targetCellX < 0 || targetCellY < 0)) {
	    		if (!(targetCellX >= cellNum || targetCellY >= cellNum)) {
		    		var mixedNColor = mixColor(cells[targetCellX][targetCellY].color, randomColor);
					cells[targetCellX][targetCellY].color = mixedNColor;
	    		}		    		
	    	}
	    }    
	}
	timeCheck = game.time.now;
}

// returns random rgb color
function getRandomRgb() {
    var color = {r:Math.floor(Math.random() * 256),
    			 g:Math.floor(Math.random() * 256),
    			 b:Math.floor(Math.random() * 256)}
    return color;
}

// convers html color to rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

// convers rgb color to html color
function rgbToHex(color) {
    return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

// returns Euclidean distance of rgb color
function colorDistance(color1, color2) {
	var distance = Math.sqrt(Math.pow(color2.r-color1.r,2)+Math.pow(color2.g-color1.g,2)+Math.pow(color2.b-color1.b,2));
	return distance;
}

// mix some color2 to color1 (rgb)
function mixColor(rgbColor1, rgbColor2) {
	var cmykColor1 = rgb2cmyk(rgbColor1);
	var cmykColor2 = rgb2cmyk(rgbColor2);

	//console.log("1:"+"("+rgbColor1.r+","+rgbColor1.g+","+rgbColor1.b+"),("+cmykColor1.c+","+cmykColor1.m+","+cmykColor1.y+")");
	//console.log("2:"+"("+rgbColor2.r+","+rgbColor2.g+","+rgbColor2.b+"),("+cmykColor2.c+","+cmykColor2.m+","+cmykColor2.y+")");

	var mixedCmykColor = {c:(cmykColor1.c+(0.1*cmykColor2.c))/1.1,
						  m:(cmykColor1.m+(0.1*cmykColor2.m))/1.1,
						  y:(cmykColor1.y+(0.1*cmykColor2.y))/1.1,
						  k:(cmykColor1.k+(0.1*cmykColor2.k))/1.1};

	var mixedRgbColor = cmyk2rgb(mixedCmykColor);

	mixedRgbColor.r = Math.round(mixedRgbColor.r);
	mixedRgbColor.g = Math.round(mixedRgbColor.g);
	mixedRgbColor.b = Math.round(mixedRgbColor.b);

	//console.log("mixedRgbColor, mixedCmykColor:"+"("+mixedRgbColor.r+","+mixedRgbColor.g+","+mixedRgbColor.b+"),("+mixedCmykColor.c+","+mixedCmykColor.m+","+mixedCmykColor.y+")");

	return mixedRgbColor;
}

// convert rgb color to cmy color
function rgb2cmyk (rgbColor) {
	var r = rgbColor.r;
	var g = rgbColor.g;
	var b = rgbColor.b;

	var c, m, y, k;
	r = r / 255;
	g = g / 255;
	b = b / 255;
	max = Math.max(r, g, b);
	k = 1 - max;
	if (k == 1) {
		c = 0;
	    m = 0;
	    y = 0;
	} else {
	    c = (1 - r - k) / (1 - k);
	    m = (1 - g - k) / (1 - k);
	    y = (1 - b - k) / (1 - k);
	}

	return {c : c, m : m, y : y, k : k};
}

// conver cmy color to rgb color
function cmyk2rgb (cmykColor) {
	var c = cmykColor.c;
	var m = cmykColor.m;
	var y = cmykColor.y;
	var k = cmykColor.k;

	var r, g, b;
	r = 255 - ((Math.min(1, c * (1 - k) + k)) * 255);
	g = 255 - ((Math.min(1, m * (1 - k) + k)) * 255);
	b = 255 - ((Math.min(1, y * (1 - k) + k)) * 255);

	var rgbColor = {r:r, g:g, b:b};

	return rgbColor;
}

