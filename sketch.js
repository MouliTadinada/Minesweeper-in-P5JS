var cols, rows, cell_size;
var total_mines;
var grid;
var score = 0;
var gameOver = false;
var h1;
var difficulty = 0.11;
var flag = false;

function setup() {
	h1 = createElement("h1", "WELCOME");
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		if (windowWidth < windowHeight) {
			createCanvas(windowWidth, windowWidth);
		} else {
			createCanvas(windowHeight, windowHeight);
		}
		cell_size = floor(width / 15);
	} else {
		createCanvas(601, 601);
		cell_size = floor(width / 15);
	}
	cols = floor(width / cell_size);
	rows = floor(height / cell_size);

	total_mines = floor(rows * cols * difficulty);
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

function keyPressed() {
	if (keyCode == ENTER) {
		flag = true;
	}
}

function mousePressed() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].contains(mouseX, mouseY)) {
				if (!flag) {
					grid[i][j].reveal();
					if (grid[i][j].mine) {
						gameOver = true;
					}
					return;
				} else {
					if (!grid[i][j].revealed) {
						grid[i][j].mark();
						flag = false;
					}
				}
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
	return (total_mines + score == rows * cols);
}


function draw() {
	background(51);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
	if (!gameOver) {
		score = checkScore();
		if (score > 0) {
			h1.html("PRESS ENTER TO MARK/UNMARK A CELL");
		}
		if (gameWon()) {
			h1.html("GAME WON! REFRESH TO PLAY A NEW GAME !");
			noLoop();
		}
	} else {
		h1.html("GAME OVER!  SCORE: " + score + "!  REFRESH TO PLAY A NEW GAME !");
		noLoop();
	}
}
