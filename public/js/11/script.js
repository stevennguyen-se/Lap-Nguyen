var canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var padHeight = 5;
var padWidth = 80;
var padX = (canvas.width - padWidth) / 2;
var padXCenter = padX + padWidth / 2;
var padInitialSpeed = 5;

var padExtraSpeed = 0;
var padSpeedX = padInitialSpeed + padExtraSpeed;
var right = false;
var left = false;

var brickRow = 3;
var brickColumn = 10;
var brickHeight = 30;
var brickWidth = 40;
var brickPadding = 11;
var brickOffsetTop = 50;
var brickOffsetLeft = 50;
var bricks = [];

var score = 0;
var lives = 3;

var balls = [];
var initialBall = new Ball();
balls.push(initialBall);

function init() {
    var specialBrickRow = Math.floor(Math.random() * brickRow);
    var specialBrickColumn = Math.floor(Math.random() * brickColumn);
    for (var column = 0; column < brickColumn; column++) {
        bricks[column] = [];
        for (var row = 0; row < brickRow; row++) {
            var positionX = column * (brickWidth + brickPadding) + brickOffsetLeft;
            var positionY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
            if (row == specialBrickRow && column == specialBrickColumn) {
                bricks[column][row] = new Brick(positionX, positionY, brickWidth, brickHeight, "red", false, true);
            } else {
                bricks[column][row] = new Brick(positionX, positionY, brickWidth, brickHeight, "white", false, false);
            }
        }
    }
}

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        right = true;
    } else if (e.keyCode == 37) {
        left = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        right = false;
    } else if (e.keyCode == 37) {
        left = false;
    }
}

function handleInput() {
    if (right && padX < canvas.width - padWidth) {
        padX += padSpeedX;
    }
    else if (left && padX > 0) {
        padX -= padSpeedX;
    }
}

function checkCollision() {
    for (var column = 0; column < brickColumn; column++) {
        for (var row = 0; row < brickRow; row++) {
            for (var i = 0; i < balls.length; i++) {
                if (balls[i].x > bricks[column][row].x && balls[i].x < bricks[column][row].x + brickWidth
                    && balls[i].y > bricks[column][row].y && balls[i].y < bricks[column][row].y + brickHeight) {
                    if (bricks[column][row].isDestroyed == false) {
                        balls[i].dy = -balls[i].dy;
                        bricks[column][row].isDestroyed = true;
                        if (bricks[column][row].isSpecial) {
                            var tmpBall = new Ball();
                            tmpBall.x = bricks[column][row].x;
                            tmpBall.y = bricks[column][row].y;
                            balls.push(tmpBall);
                        }
                        score++;
                        if (score == brickRow * brickColumn) {
                            alert("CONGRATULATIONS! YOU WON");
                            document.location.reload();
                        }
                    }
                }
            }

        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(padX, canvas.height - padHeight - 10, padWidth, padHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawLives() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("LIVES: " + lives, brickOffsetLeft, 30);
}

function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("" + score, canvas.width / 2, 30);
}

function drawBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
}

function drawBricks() {
    for (var column = 0; column < brickColumn; column++) {
        for (var row = 0; row < brickRow; row++) {
            if (bricks[column][row].isDestroyed == false) bricks[column][row].draw();
        }
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBalls();
    drawPaddle();
    drawScore();
    drawLives();
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        right = true;
    } else if (e.keyCode == 37) {
        left = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        right = false;
    } else if (e.keyCode == 37) {
        left = false;
    }
}

function update() {
    //move the balls
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
    }
    handleInput();
    checkCollision();
    draw();
    window.requestAnimationFrame(update);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

init();
update();