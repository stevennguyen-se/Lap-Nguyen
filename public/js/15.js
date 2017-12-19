var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cols;
var rows;
var cellWidth = 20;
var cellHeight = 20;
var matrix;
var stack = [];
var current;
var next;
var speed;

var slider = document.getElementById("myRange");
speed = 60;
var output = document.getElementById("speedValue");
slider.oninput = function () {
  output.innerHTML = this.value;
  speed = this.value;
}

function create2DArray(cols, rows) {
  var array = new Array(cols);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function initial(w, h) {
  canvas.width = w;
  canvas.height = h;
  cols = Math.floor(canvas.width / cellWidth);
  rows = Math.floor(canvas.height / cellHeight);
  matrix = create2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j] = new Cell(i, j, cellWidth, cellHeight);
    }
  }
  current = matrix[0][0];
}

function drawCells() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j].draw();
    }
  }
}

function removeCommonWall(a, b) {
  var x = a.col - b.col;
  var y = a.row - b.row;

  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function update() {
  drawCells();
  current.isVisited = true;
  current.here();

  next = current.getNeighbor();
  if (next) {
    next.isVisited = true;
    stack.push(current);
    removeCommonWall(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
  window.setTimeout(update, speed);
}

initial(400, 400);
update();