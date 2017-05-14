function cell(x, y) {
	this.x = x;
	this.y = y;
	this.w = cell_size;
	this.mine = false;
	this.revealed = false;
	this.neighbourCount = 0;
	this.flag = false;
}

cell.prototype.show = function () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		console.log("Mobile");
	}
	if (this.revealed) {
		fill(127);
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
		if (this.mine) {
			fill(255, 0, 0);
			ellipse(this.x * this.w + this.w * 0.5, this.y * this.w + this.w * 0.5, this.w * 0.5);
		} else {
			if (this.neighbourCount > 0) {
				fill(255);
				textSize(this.w);
				textAlign(CENTER, CENTER);
				text(this.neighbourCount, this.x * this.w + this.w * 0.5, this.y * this.w + this.w * 0.5);
			}
		}
	} else {
		fill(51);
		if (this.flag) {
			fill(127, 50, 120);
		}
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
	}
}

cell.prototype.contains = function (x, y) {
	return (x >= this.x * this.w && x <= this.x * this.w + this.w && y >= this.y * this.w && y <= this.y * this.w + this.w);
}

cell.prototype.revealAll = function () {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].revealed = true;
		}
	}
}

cell.prototype.revealNeighbours = function () {
	for (var i = this.x - 1; i <= this.x + 1; i++) {
		for (var j = this.y - 1; j <= this.y + 1; j++) {
			if (i > -1 && i < cols && j > -1 && j < rows) {
				if (!grid[i][j].mine && !grid[i][j].revealed) {
					grid[i][j].reveal();
				}
			}
		}
	}
}

cell.prototype.reveal = function () {
	this.revealed = true;
	if (this.neighbourCount == 0) {
		this.revealNeighbours();
	} else if (this.mine) {
		this.revealAll();
		noLoop();
	}
}

cell.prototype.setNeighbourCount = function () {
	if (this.mine) {
		this.neighbourCount = -1;
		return;
	}
	var totalMines = 0;
	for (var i = this.x - 1; i <= this.x + 1; i++) {
		for (var j = this.y - 1; j <= this.y + 1; j++) {
			if (i > -1 && i < cols && j > -1 && j < rows) {
				if (grid[i][j].mine) {
					totalMines++;
				}
			}
		}
	}
	this.neighbourCount = totalMines;
}

cell.prototype.mark = function () {
	this.flag = !this.flag;
}
