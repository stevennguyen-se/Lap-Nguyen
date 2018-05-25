var deadline = new Date("Dec 25, 2017 00:00:00").getTime();

function setValue() {
    var now = new Date().getTime();
    var diff = deadline - now;
    var seconds = Math.floor((diff / 1000) % 60);
    var minutes = Math.floor((diff / 1000 / 60) % 60);
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("days").innerHTML = ('0' + days).slice(-2);
    document.getElementById("hours").innerHTML = ('0' + hours).slice(-2);
    document.getElementById("minutes").innerHTML = ('0' + minutes).slice(-2);
    document.getElementById("seconds").innerHTML = ('0' + seconds).slice(-2);
}

setValue();
setInterval(setValue, 1000);

