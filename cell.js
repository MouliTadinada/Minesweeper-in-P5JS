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
	stroke(0);
	strokeWeight(3);
	if (this.revealed) {
		fill(220);
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
		if (this.mine) {
			fill(0);
			ellipse(this.x * this.w + this.w * 0.5, this.y * this.w + this.w * 0.5, this.w * 0.5);
		} else {
			if (this.neighbourCount > 0) {
				if (this.neighbourCount == 1) {
					fill(0, 0, 255);
				} else if (this.neighbourCount == 2) {
					fill(0, 255, 0);
				} else {
					fill(255, 0, 0);
				}
				strokeWeight(1);
				textSize(this.w);
				textAlign(CENTER, CENTER);
				text(this.neighbourCount, this.x * this.w + this.w * 0.5, this.y * this.w + this.w * 0.5);
			}
		}
	} else {
		fill(169);
		rect(this.x * this.w, this.y * this.w, this.w, this.w);
		if (this.flag) {
			fill(200, 0, 0);
			rect(this.x * this.w + this.w * 0.25, this.y * this.w, this.w * 0.5, this.w);
		}
	}
}

cell.prototype.contains = function (x, y) {
	return (x >= this.x * this.w && x <= this.x * this.w + this.w && y >= this.y * this.w && y <= this.y * this.w + this.w);
}

cell.prototype.revealBombs = function (flag) {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			if (grid[i][j].mine) {
				this.flag = flag;
				grid[i][j].revealed = true;
			}
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
		this.revealBombs(false);
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
