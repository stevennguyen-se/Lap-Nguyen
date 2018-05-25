var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var walker = new Walker();

function doSomething() {
    walker.move();
    walker.draw();
}

setInterval(doSomething, 10);


