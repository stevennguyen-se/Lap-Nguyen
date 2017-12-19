var canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext('2d');
var radius = canvas.width / 2;
var markColor = "green";

ctx.translate(radius, radius);

function drawNumbers() {
    var angle;
    var num;
    ctx.font = radius * 0.08 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    for (num = 1; num < 13; num++) {
        ctx.beginPath();
        angle = num * Math.PI / 6;
        ctx.rotate(angle);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-angle);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(angle);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-angle);
        ctx.closePath();
    }
}

function drawMarks(r) {
    var angle = 0;

    for (var i = 0; i < 60; i++) {
        angle = angle + (Math.PI / 30);
        x = 0 + r * Math.cos(angle);
        y = 0 + r * Math.sin(angle);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function drawSeconds(value) {
    var rate = 0.3;
    var angle = (Math.PI * 2 / 60);
    var x = radius * rate * Math.cos(value * angle - Math.PI / 2);
    var y = radius * rate * Math.sin(value * angle - Math.PI / 2);

    drawMarks(radius * rate);

    ctx.beginPath();
    ctx.fillStyle = markColor;
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawMinutes(value) {
    var rate = 0.6;
    var angle = (Math.PI * 2 / 60);
    var x = radius * rate * Math.cos(value * angle - Math.PI / 2);
    var y = radius * rate * Math.sin(value * angle - Math.PI / 2);

    drawMarks(radius * rate);
    ctx.beginPath();
    ctx.fillStyle = markColor;
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawHours(value) {
    var angle = (Math.PI * 2 / 12);
    var x = radius * 0.85 * Math.cos(value * angle - Math.PI / 2);
    var y = radius * 0.85 * Math.sin(value * angle - Math.PI / 2);

    ctx.beginPath();
    ctx.fillStyle = markColor;
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawDate(d, m, y) {
    ctx.beginPath();
    ctx.font =  "20px arial";
    ctx.fillText('[' + d + ']' + ' [' + m + '] ' + '[' + y + ']', 0, 0);
    ctx.closePath();
}

function drawClock() {
    ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
    var now = new Date();
    var hour = now.getHours() % 12;
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var d = now.getDate();
    var m = now.getMonth()+1;
    var y = now.getFullYear();
    drawSeconds(sec);
    drawMinutes(min);
    drawHours(hour)
    drawNumbers();
    drawDate(d, m, y);
}

drawClock();
setInterval(drawClock, 1000);