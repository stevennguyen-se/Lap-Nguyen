function Cell(col, row, width, height) {
  this.col = col;
  this.row = row;
  this.x = col * width;
  this.y = row * height;
  this.width = width;
  this.height = height;
  this.isBoom = false;
  this.isRevealed = false;
  this.neighborBoom = 0;

  this.draw = function () {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.strokeStyle = "green";
    ctx.lineWidth = "1";
    ctx.stroke();
    ctx.closePath();

    if (this.isRevealed) {
      if (this.isBoom) {
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
      } else {
        if (this.neighborBoom > 0) {
          ctx.beginPath();
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.font = "18px Arial";
          ctx.fillStyle = "#0bdd35";
          ctx.fillText(this.neighborBoom, this.x + this.width / 2, this.y + this.height / 2);
          ctx.closePath();
        } else {
          ctx.beginPath();
          ctx.rect(this.x, this.y, this.width - 1, this.height - 1);
          ctx.fillStyle = "#42934a";
          ctx.fill();
        }
      }
    }
  }

  this.contain = function (x, y) {
    return (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height);
  }

  this.floodFill = function () {
    for (var x = -1; x < 2; x++) {
      var newi = this.col + x;
      if (newi < 0 || newi >= cols) continue;
      for (var y = -1; y < 2; y++) {
        var newj = this.row + y;
        if (newj < 0 || newj >= rows) continue;
        var neighbor = matrix[newi][newj];
        if (!neighbor.isRevealed) {
          neighbor.reveal();
        }
      }
    }
  }

  this.reveal = function () {
    this.isRevealed = true;
    if (this.neighborBoom == 0 && this.isBoom == false) {
      this.floodFill();
    }
  }

  this.countBooms = function () {
    if (this.isBoom) {
      this.countBooms = -1;
      return;
    }

    var total = 0;
    for (var x = -1; x < 2; x++) {
      var newi = this.col + x;
      if (newi < 0 || newi >= cols) continue;
      for (var y = -1; y < 2; y++) {
        var newj = this.row + y;
        if (newj < 0 || newj >= rows) continue;
        var neighbor = matrix[newi][newj];
        if (neighbor.isBoom) total++;
      }
    }
    this.neighborBoom = total;
  }
}

