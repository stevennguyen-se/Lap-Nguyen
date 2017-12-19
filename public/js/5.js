MAX_DEPTH = window.innerWidth;
;
NUMBER_OF_STARS = 200;
STAR_SIZE = 10;
SPEED = 0;
MAX_SPEED = 50;
var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var focus = canvas.width;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var stars = [];

function init() {
    for (var i = 0; i < NUMBER_OF_STARS; i++) {
        stars[i] = new Star();
    }
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < NUMBER_OF_STARS; i++) {
        stars[i].show();
        stars[i].move();
    }
}

function update() {
    draw();
    window.requestAnimationFrame(update);
}

function updateSpeed(value) {
    SPEED = mapRange(value, 0, canvas.width, 0, MAX_SPEED);
}

init();
update();