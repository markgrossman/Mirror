var socket = io.connect("http://localhost:3000");

$("body").click(function(event) {
    var value = utils.getElementPath(event.target);
    socket.emit('click', value);
    console.log(value);
});

$('input').change(function(event) {
    var value = utils.getElementPath(event.target);
    socket.emit('textBox', {
        textEntered: $(event.target).val(),
        pathEntered: value
    });
});

$(document).scroll(function(event) {
    console.log($(document).scrollTop());
    socket.emit('scroll', {
        top: $(document).scrollTop(),
        left: $(document).scrollLeft()
    });
});

var nodeClicked;
socket.on('click', function(xpath) {
    var node = utils.findElementByPath(xpath);
    if (nodeClicked !== node) {
        node.click();
    }
    nodeClicked = node;
});

socket.on('scroll', function(data) {
    $(document).scrollTop(data.top);
    $(document).scrollLeft(data.left);
});

var nodeTextEntered;
socket.on('textBox', function(data) {
    var node = utils.findElementByPath(data.pathEntered);
    console.log(node);
    if (data.pathEntered !== nodeTextEntered) {
        $(node).val(data.textEntered);
    }
    nodeTextEntered = data.pathEntered;
});

var utils = {
    getElementPath: function(node) {
        var path = [];

        if (node.getAttribute("id")) {
            return node.getAttribute("id");
        }

        while (node.parentNode) {
            path.push(Array.prototype.slice.call(node.parentNode.childNodes, 0).indexOf(node));
            node = node.parentNode;
        }
        return path.reverse();
    },

    findElementByPath: function(path) {

        if (typeof path === "string") {
            return document.getElementById(path);
        }

        var node = document;
        for (var i = 0, n = path.length; i < n; i++) {
            node = node.childNodes[path[i]];
            if (!node) return;
        }
        return node;
    }
}