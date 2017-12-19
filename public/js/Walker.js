function Walker() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.hue = 0;

    this.move = function () {
        var random = Math.floor(Math.random() * 4);
        var step = 4;
        switch (random) {
            case 0:
                console.log("here");
                this.x = this.x + step;
                break;
            case 1:
                this.x = this.x - step;
                break;
            case 2:
                this.y = this.y + step;
                break;
            case 3:
                this.y = this.y - step;
                break;
        }
    }

    this.draw = function () {
        ctx.fillStyle = "hsl(" + this.hue + ", 100%, 70%)";
        this.hue = this.hue + 0.5;
        this.hue %= 360;

        var randomSize = Math.floor(Math.random() * 3 + 1);
        ctx.fillRect(this.x, this.y, randomSize, randomSize);
    }
}
