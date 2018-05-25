var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cols;
var rows;
var cellWidth = 40;
var cellHeight = 40;
var totalBooms = 10;
var matrix;

function create2DArray(cols, rows) {
  var array = new Array(cols);
  for (var i = 0; i < array.length; i++) {
    array[i] = new Array(rows);
  }
  return array;
}

function initial(w, h, booms) {
  canvas.width = w;
  canvas.height = h;
  cols = Math.floor(canvas.width / cellWidth);
  rows = Math.floor(canvas.height / cellHeight);
  totalBooms = booms;
  matrix = create2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j] = new Cell(i, j, cellWidth, cellHeight);
    }
  }

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBooms; n++) {
    var index = Math.floor(Math.random() * options.length);
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    matrix[i][j].isBoom = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j].countBooms();
    }
  }

  draw();
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j].draw();
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      matrix[i][j].isRevealed = true;
    }
  }
}
function play(mouseX, mouseY) {
  var canvasRect = canvas.getBoundingClientRect();
  var canvasX = mouseX - canvasRect.left;
  var canvasY = mouseY - canvasRect.top;

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (matrix[i][j].contain(canvasX, canvasY) && matrix[i][j].isRevealed == false) {
        matrix[i][j].reveal();
        if (matrix[i][j].isBoom) {
          gameOver();
          draw();
          alert("Wrong choice! GAME OVER");
        } else {
          draw();
        }
      }
    }
  }
}

initial(400, 400, 20);