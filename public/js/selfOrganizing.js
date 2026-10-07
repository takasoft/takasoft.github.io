// variables
var gameSize = 300;
var cellNum = 10;
var cellSize = gameSize/cellNum;
var cells = [];
var timeCheck = 0;
var startButton = document.getElementById('simulation-start');
var stopButton = document.getElementById('simulation-stop');
var resetButton = document.getElementById('simulation-reset');
var simulationStatus = document.getElementById('simulation-status');
var isGameStarted = false;

// create game
var game = new Phaser.Game(gameSize, gameSize, Phaser.AUTO, 'test-area', { create: create, update: update, render: render });

function create() {
    game.scale.compatibility.scrollTo = false;
    game.stage.backgroundColor = '#FFFFFF';
    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    resetButton.addEventListener('click', resetGame);
    resetButton.disabled = false;
    resetGame();
}

function resetGame() {
    stopGame();
    cells = [];
    for (var x = 0; x < cellNum; x++) {
        cells[x] = [];
        for (var y = 0; y < cellNum; y++) {
            cells[x][y] = {column: x, row: y, color: getRandomRgb()};
        }
    }
    timeCheck = game.time.now;
    simulationStatus.textContent = 'Ready';
}

function update() {
    if (!isGameStarted || game.time.now - timeCheck <= 5) {
        return;
    }
    var randomColor = getRandomRgb();
    var nearestCell = cells[0][0];
    var shortestDistance = Infinity;
    for (var x = 0; x < cellNum; x++) {
        for (var y = 0; y < cellNum; y++) {
            var distance = colorDistance(randomColor, cells[x][y].color);
            if (distance <= shortestDistance) {
                shortestDistance = distance;
                nearestCell = cells[x][y];
            }
        }
    }
    changeColor(nearestCell, randomColor);
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
    startButton.disabled = true;
    stopButton.disabled = false;
    simulationStatus.textContent = 'Running';
}

function stopGame() {
    isGameStarted = false;
    startButton.disabled = false;
    stopButton.disabled = true;
    simulationStatus.textContent = 'Paused';
}

function changeColor(nearestCell, randomColor) {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var x = nearestCell.column + i;
            var y = nearestCell.row + j;
            if (x >= 0 && y >= 0 && x < cellNum && y < cellNum) {
                cells[x][y].color = mixColor(cells[x][y].color, randomColor);
            }
        }
    }
    timeCheck = game.time.now;
}

// returns random rgb color
function getRandomRgb() {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
    };
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
    return Math.hypot(
        color2.r - color1.r,
        color2.g - color1.g,
        color2.b - color1.b
    );
}

// mix some color2 to color1 (rgb)
function mixColor(rgbColor1, rgbColor2) {
    var oldColor = rgb2cmyk(rgbColor1);
    var sample = rgb2cmyk(rgbColor2);
    var mixed = {};
    for (var channel of ["c", "m", "y", "k"]) {
        mixed[channel] = (oldColor[channel] + 0.1 * sample[channel]) / 1.1;
    }
    var rgb = cmyk2rgb(mixed);
    return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)};
}

// convert rgb color to cmy color
function rgb2cmyk (rgbColor) {
    var r = rgbColor.r / 255;
    var g = rgbColor.g / 255;
    var b = rgbColor.b / 255;
    var max = Math.max(r, g, b);
    if (max === 0) {
        return {c: 0, m: 0, y: 0, k: 1};
    }
    return {c: 1 - r / max, m: 1 - g / max, y: 1 - b / max, k: 1 - max};
}

// conver cmy color to rgb color
function cmyk2rgb (cmykColor) {
    return {
        r: 255 * (1 - cmykColor.c) * (1 - cmykColor.k),
        g: 255 * (1 - cmykColor.m) * (1 - cmykColor.k),
        b: 255 * (1 - cmykColor.y) * (1 - cmykColor.k)
    };
}
