//initial
var level = 3;
var colorArray = [];
var correctColor;

//get elements
var colorSquares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var correctMessge = document.getElementById("message");
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easy");
var hardButton = document.getElementById("hard");
var header = document.getElementById("stripe");

//initial game - level 3
easyButton.classList.add("selected");
newGame(level);

//Button listeners
resetButton.addEventListener("click", function () {
    newGame(level);
});

easyButton.addEventListener("click", function () {
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    easyButton.classList.add("selected");
    for (var i = 3; i < 6; i++) {
        colorSquares[i].style.display = "none";
    }
    level = 3;
    newGame(level);
});

hardButton.addEventListener("click", function () {
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    hardButton.classList.add("selected");
    for (var i = 3; i < 6; i++) {
        colorSquares[i].style.display = "block";
    }
    level = 6;
    newGame(level);
});

function changeColors(color) {
    for (var i = 0; i < level; i++) {
        colorSquares[i].style.backgroundColor = color;
    }
}

function randomColorInArray(level) {
    var tmp = Math.floor(Math.random() * level);
    return colorArray[tmp];
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var tmp = "rgb(" + r + ", " + g + ", " + b + ")";
    return tmp;
}

function generateColorArray(level) {
    var tmp = [];
    for (var i = 0; i < level; i++) {
        tmp[i] = randomColor();
    }
    return tmp;
}

function afterCorrect() {
    header.style.background = correctColor;
    changeColors(correctColor);
}

function newGame(_level) {
    correctMessge.textContent = "";
    header.style.background = "steelblue";
    colorArray = generateColorArray(_level);
    correctColor = randomColorInArray(_level);
    colorDisplay.textContent = correctColor;
    for (var i = 0; i < _level; i++) {
        //set initial colors to squares
        colorSquares[i].style.backgroundColor = colorArray[i];

        //set click listener to squares
        colorSquares[i].addEventListener("click", function () {
            //compare the clicked color and the correct color
            if (this.style.backgroundColor === correctColor) {
                afterCorrect();
                correctMessge.textContent = "Correct!";
            }
            else {
                this.style.backgroundColor = "#232323";
                correctMessge.textContent = "Try again!";
            }
        });
    }
}
