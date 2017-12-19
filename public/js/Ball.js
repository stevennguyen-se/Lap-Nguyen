function Ball() {
    this.initialSpeed = 4;
    this.ballRadius = 10;
    this.fillStyle = "red";
    this.x = this.ballRadius;
    this.y = canvas.height / 2;
    this.dx = this.initialSpeed;
    this.dy = this.initialSpeed;

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.closePath();
    }

    this.reset = function () {
        this.x = this.ballRadius;
        this.y = canvas.height / 2;
        this.dx = this.initialSpeed;
        this.dy = this.initialSpeed;
    }

    this.move = function () {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -this.dy;
        } else if (this.y + this.dy >= canvas.height - this.ballRadius - padHeight) {
            if (this.x + this.ballRadius > padX && this.x + this.ballRadius < padX + padWidth) {
                if (padX + padWidth / 2 + 10 >= this.x >= padX + padWidth / 2 - 10) {
                } else if (this.dx >= 0 && right == true) {
                    if (this.x > padX + padWidth / 2 + 10) {
                        var extraX = mapRange(this.x, padX + padWidth / 2 + 10, padX + padWidth, 0, 5);
                        this.dx = this.initialSpeed + extraX;
                    } else {
                        this.dx = this.initialSpeed;
                    }
                } else if (this.dx >= 0 && left == true) {
                    if (this.x < padX + padWidth / 2 + 10) {
                        this.dx = - this.initialSpeed;
                    } else {
                        this.dx = this.initialSpeed;
                    }
                } else if (this.dx < 0 && right == true) {
                    if (this.x > padX + padWidth / 2 + 10) {
                        this.dx = this.initialSpeed;
                    } else {
                        this.dx = -this.initialSpeed;
                    }
                } else if (this.dx < 0 && left == true) {
                    if (this.x < padX + padWidth / 2 - 10) {
                        var extraX = mapRange(this.x, padX, padX + padWidth / 2 - 10, 0, 5);
                        this.dx = (this.initialSpeed * -1) - extraX;
                    }
                    else {
                        this.dx = -this.initialSpeed;
                    }
                }
                this.dy = -this.dy;
            }
            else {
                lives--;
                this.reset();
                if (lives == 0) {
                    alert("GAME OVER");
                    document.location.reload();
                }
            }
        }
    }
}