var keys = document.querySelectorAll('#calculator span');
var willRefesh = false;
for (var i = 0; i < keys.length; i++) {
    keys[i].onclick = function (even) {
        var screen = document.getElementById("display");
        var btnValue = this.innerHTML;
        if (btnValue == 'C') {
            screen.innerHTML = "&nbsp";
        } else if (btnValue == '=') {
            var value = eval(screen.innerHTML);
            if (isFinite(value) == false) {
                screen.innerHTML = "[error]";
            } else {
                screen.innerHTML = value;
            }
            willRefesh = true;
        } else {
            if (screen.innerHTML == "&nbsp;" || screen.innerHTML == "[error]" || willRefesh == true) {
                screen.innerHTML = btnValue;
                willRefesh = false;
            }
            else {
                screen.innerHTML += btnValue;
            }
        }
    }
} 