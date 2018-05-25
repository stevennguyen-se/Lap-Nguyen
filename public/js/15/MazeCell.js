function Cell(col, row, width, height) {
  this.col = col;
  this.row = row;
  this.x = col * width;
  this.y = row * height;
  this.width = width;
  this.height = height;
  this.isVisited = false;
  this.walls = [true, true, true, true];

  this.here = function () {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
    ctx.closePath();

  }

  this.getNeighbor = function () {
    var neighbors = [];
    var topNeighbor;
    var rightNeighbor;
    var bottomNeighbor;
    var leftNeighbor;

    if (this.row - 1 >= 0) {
      topNeighbor = matrix[this.col][this.row - 1];
    } else {
      topNeighbor = null;
    }

    if (this.col + 1 < cols) {
      rightNeighbor = matrix[this.col + 1][this.row];
    } else {
      rightNeighbor = null;
    }

    if (this.row + 1 < rows) {
      bottomNeighbor = matrix[this.col][this.row + 1];
    } else {
      bottomNeighbor = null;
    }

    if (this.col - 1 >= 0) {
      leftNeighbor = matrix[this.col - 1][this.row];
    } else {
      leftNeighbor = null;
    }

    if (topNeighbor && topNeighbor.isVisited == false) {
      neighbors.push(topNeighbor);
    }
    if (rightNeighbor && rightNeighbor.isVisited == false) {
      neighbors.push(rightNeighbor);
    }
    if (bottomNeighbor && bottomNeighbor.isVisited == false) {
      neighbors.push(bottomNeighbor);
    }
    if (leftNeighbor && leftNeighbor.isVisited == false) {
      neighbors.push(leftNeighbor);
    }
    if (neighbors.length > 0) {
      var randomIndex = Math.floor(Math.random() * neighbors.length);
      return neighbors[randomIndex];
    } else {
      return null;
    }
  }

  this.draw = function () {
    ctx.beginPath();
    if (this.isVisited) {
      ctx.fillStyle = "#222a33";
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();
    }
    ctx.closePath();

    ctx.strokeStyle = "red";
    ctx.lineWidth = "2";
    if (this.walls[0]) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.width, this.y);
      ctx.stroke();
    }
    if (this.walls[1]) {
      ctx.moveTo(this.x + this.width, this.y);
      ctx.lineTo(this.x + this.width, this.y + this.height);
      ctx.stroke();
    }
    if (this.walls[2]) {
      ctx.moveTo(this.x, this.y + this.height);
      ctx.lineTo(this.x + this.width, this.y + this.height);
      ctx.stroke();
    }
    if (this.walls[3]) {
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y + this.height);
      ctx.stroke();
    }
  }
}

