function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * MAX_DEPTH;
    this.px = this.x;
    this.py = this.y;
    this.size = STAR_SIZE;

    this.move = function () {
        this.z = this.z - SPEED;
        if (this.z <= 0) {
            this.reset();
        }
    }

    this.reset = function () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * MAX_DEPTH;
        this.px = this.x;
        this.py = this.y;
    }

    this.show = function () {
        var x, y, s;
        x = (this.x - centerX) * (focus / this.z) + centerX;
        y = (this.y - centerY) * (focus / this.z) + centerY;
        s = this.size * (focus / this.z);
        ctx.beginPath();
        var shade = parseInt((1 - this.z / MAX_DEPTH) * 255);
        ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
        ctx.arc(x, y, s, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.px, this.py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(" + shade + "," + shade + "," + shade + ",10)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
}

