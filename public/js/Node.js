function Node(val) {
    this.value = val;
    this.parent = null;
    this.left = null;
    this.right = null;
    this.depth = 0;
    this.index = 0;
    this.x = 0;
    this.y = 0;
    this.radius = NODE_RADIUS;

    this.search = function (value) {
        if (this.value == value) {
            return this;
        } else if (this.value < value && this.right != null) {
            return this.right.search(value);
        } else if (this.value > value && this.left != null) {
            return this.left.search(value);
        }
        return null;
    }

    this.initial = function () {
        if (this.left != null) {
            this.left.initial();
        }
        if (this.parent != null) {
            this.x = this.index * canvas.width / (Math.pow(2, this.depth) + 1);
            this.y = this.depth * canvas.height / TREE_DEPTH - this.radius * 1.5;
        }

        // if (this.parent) {
        //     console.log(this.value + "  depth: " + this.depth + "  index: " + this.index + " x: " + this.x + " y: " + this.y + "  parent value: " + this.parent.value);
        // }

        if (this.right != null) {
            this.right.initial();
        }
    }

    this.draw = function () {
        if (this.left != null) {
            this.left.draw();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#4CAF50';
        ctx.stroke();
        ctx.closePath();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(this.value, this.x, this.y);

        if (this.left) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.radius);
            ctx.lineTo(this.left.x, this.left.y - this.left.radius);
            ctx.stroke();
            ctx.closePath();
        }

        if (this.right) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.radius);
            ctx.lineTo(this.right.x, this.right.y - this.right.radius);
            ctx.stroke();
        }

        if (this.right != null) {
            this.right.draw();
        }
    }

    this.addNode = function (node) {
        if (node.value < this.value) {
            if (this.left == null) {
                this.left = node;
                this.left.parent = this;
                this.left.depth = this.depth + 1;
                this.left.index = this.left.parent.index * 2 - 1;
                if (this.left.depth > TREE_DEPTH) {
                    TREE_DEPTH = this.left.depth;
                }
            } else {
                this.left.addNode(node);
            }
        } else if (node.value > this.value) {
            if (this.right == null) {
                this.right = node;
                this.right.parent = this;
                this.right.depth = this.depth + 1;
                this.right.index = this.right.parent.index * 2;
                if (this.right.depth > TREE_DEPTH) {
                    TREE_DEPTH = this.right.depth;
                }
            } else {
                this.right.addNode(node);
            }
        }
    }
}