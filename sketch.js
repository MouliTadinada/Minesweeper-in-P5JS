var cols, rows, cell_size;
var total_mines;
var grid;
var score = 0;
var gameOver = false;
var h1;

function setup() {
	h1 = createElement("h1","WELCOME");
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		if (windowWidth < windowHeight) {
			createCanvas(windowWidth, windowWidth);
		} else {
			createCanvas(windowHeight, windowHeight);
		}
		cell_size = floor(width / 10);
	} else {
		createCanvas(601, 601);
		cell_size = floor(width / 10);
	}
	cols = floor(width / cell_size);
	rows = floor(height / cell_size);

	total_mines = floor(rows * cols * 0.1);
	grid = make2DArray(cols, rows);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new cell(i, j);
		}
	}
	for (i = 0; i < total_mines; i++) {
		var x = floor(random(cols));
		var y = floor(random(rows));
		if (grid[x][y].mine) {
			i--;
		} else {
			grid[x][y].mine = true;
		}
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].setNeighbourCount();
		}
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();
				if (grid[i][j].mine) {
					gameOver = true;
				}
				return;
			}
		}
	}
}

function checkScore() {
	var revealedCells = 0;
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].revealed) {
				revealedCells++;
			}
		}
	}
	return revealedCells;
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function gameWon() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if(!this.revealed && !this.mine) {
				return false;
			}
		}
	}
	return true;
}


function draw() {
	background(0);
	if (!gameOver) {
		if(gameWon()) {
			h1.html("GAME WON");
		}else {
			score = checkScore();
		}
	} else {
		h1.html("GAME OVER!  SCORE: " + score);
	}
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}
