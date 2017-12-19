function Tree(val) {
    this.root = null;

    this.search = function (value) {
        var result = this.root.search(value);
        return result;
    }

    this.initial = function () {
        this.root.initial();
    }

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.root.draw();
    }

    this.drawLabels = function () {
        for (var i = 0; i <= TREE_DEPTH; i++) {
            var y = 0;
            var x = 35;
            if (i == 0) {
                y = 30;
            } else {
                y = i * canvas.height / TREE_DEPTH - NODE_RADIUS * 1.5;
            }

            ctx.fillStyle = "rgba(1, 1, 1, 0.4)";
            ctx.font = "10px Arial";
            ctx.fillText("Level " + i, x, y);
        }
    }

    this.addValue = function (value) {
        var newNode = new Node(value);
        if (this.root == null) {
            newNode.depth = 0;
            newNode.index = 1;
            newNode.x = newNode.index * canvas.width / (Math.pow(2, newNode.depth) + 1);
            newNode.y = 30;

            this.root = newNode;
        } else {
            this.root.addNode(newNode);
        }
    }
}
