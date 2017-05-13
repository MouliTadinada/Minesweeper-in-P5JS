var cols, rows, cell_size = 60;
var total_mines = 10;
var grid;

function setup() {
	createCanvas(601, 601);
	cols = floor(width/cell_size);
	rows = floor(height/cell_size);
	grid = make2DArray(cols, rows);
	for(var i=0; i<cols; i++) {
		for(var j=0; j<rows; j++) {
			grid[i][j] = new cell(i, j);
		}
	}
	for(i=0; i<total_mines; i++) {
		var x = floor(random(cols));
		var y = floor(random(rows));
		if(grid[x][y].mine) {
			i--;
		}else {
			grid[x][y].mine = true;
		}
	}
	for(var i=0; i<cols; i++) {
		for(var j=0; j<rows; j++) {
			grid[i][j].setNeighbourCount(i, j);
		}
	}
 }

function mousePressed() {
	for(var i=0; i<cols; i++) {
		for(var j=0; j<rows; j++) {
			if(grid[i][j].contains(mouseX, mouseY)) {
				grid[i][j].reveal();
				return;
			}
		}
	}
}

function make2DArray(cols, rows) {
	var arr = new Array(cols);
	for(var i=0; i<arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function draw() {
	background(0);
	for(var i=0; i<cols; i++) {
		for(var j=0; j<rows; j++) {
			grid[i][j].show();
		}
	}
}