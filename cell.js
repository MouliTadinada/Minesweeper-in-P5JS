function cell(x, y) {
	this.x = x;
	this.y = y;
	this.w = cell_size;
	this.mine = false;
	this.revealed = false;
	this.neighbourCount = 0;
}

cell.prototype.show = function () {
	if (this.revealed) {
		fill(127);
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
		if (this.mine) {
			fill(255, 0, 0);
			ellipse(this.x * this.w + this.w * 0.5, this.y * this.w + this.w * 0.5, this.w * 0.5);
		} else {
			fill(255);
			text(this.neighbourCount, this.x * this.w, this.y * this.w);
		}
	} else {
		fill(51);
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
	}
}

cell.prototype.contains = function (x, y) {
	return (x >= this.x * this.w && x <= this.x * this.w + this.w && y >= this.y * this.w && y <= this.y * this.w + this.w);
}

cell.prototype.reveal = function () {
	this.revealed = true;
}

cell.prototype.setNeighbourCount = function (i, j) {
	if (this.mine) {
		this.neighbourCount = -1;
		return;
	}
	var totalMines = 0;
	for (var x = i - 1; x <= i + 1; x++) {
		for (var y = j - 1; y <= j + 1; j++) {
			if (x > -1 && x < cols && y > -1 && y < rows) {
				if (grid[x][y].mine) {
					totalMines++;
				}
			}
		}
	}
	this.neighbourCount = totalMines;
}
