TREE_DEPTH = 0;
NODE_RADIUS = 20;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

var number = 5;
var tree = new Tree();
var range = 100;
var tmpString = " ";

// console.log("Input : " + tmpString + "TREE_DEPTH: " + TREE_DEPTH);

function addToTree() {
    var input = document.getElementById('tree-input');
    var value = parseInt(input.value);
    var output = document.getElementById('searchResult');
    if (!isNaN(value)) {
        output.innerHTML = "Added <b>" + value + "</b> Successfully";
        tree.addValue(value);
        tree.initial();
        tree.draw();
        tree.drawLabels();
    } else {
        output.innerHTML = "<b>Invalid number</b>";
        alert("Wrong input! Please enter a valid number.");
    }
}

function search() {
    var input = document.getElementById('tree-input');
    var output = document.getElementById('searchResult');
    var value = parseInt(input.value);
    if (!isNaN(value)) {
        var result = tree.search(value);
        if (result) {
            output.innerHTML = "<b>Found:</b> Value: " + value + " | Level: " + result.depth;
        } else {
            output.innerHTML = "Not Found <b>" + value + "</b>";
        }
    } else {
        output.innerHTML = "<b>Invalid number<b>";
        alert("Wrong input! Please enter a valid number.");
    }
}

function newTree() {
    // tree.addValue(8);
    // tree.addValue(3);
    // tree.addValue(10);
    // tree.addValue(1);
    // tree.addValue(6);
    // tree.addValue(14);
    // tree.addValue(4);
    // tree.addValue(7);
    // tree.addValue(13);
    document.location.reload();
}

for (var i = 0; i < number; i++) {
    tree.addValue(Math.floor(Math.random() * range));
}
tree.initial();
tree.draw();
tree.drawLabels();