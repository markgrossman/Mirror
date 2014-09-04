/*! mirror - v - 2014-09-04
* Copyright (c) 2014 ; Licensed  */
var socket = io.connect("http://localhost:3000");

function inputChange(eventName, event) {
    var nodePath = getElementPath(event.target);
    socket.emit(eventName, {
        textEntered: $(event.target).val(),
        pathEntered: nodePath
    });
}

$('body').click(function(event) {
    var nodePath = getElementPath(event.target);
    console.log(nodePath);
    socket.emit('click', nodePath);
});

$('input').change(function(event) {
    inputChange('textBox', event);
});

$(document).scroll(function() {
    socket.emit('scroll', {
        top: $(document).scrollTop(),
        left: $(document).scrollLeft()
    });
});

var nodeClicked;
socket.on('click', function(nodePath) {
    var node = findElementByPath(nodePath);
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
    var node = findElementByPath(data.pathEntered);
    if (data.pathEntered !== nodeTextEntered) {
        $(node).val(data.textEntered);
    }
    nodeTextEntered = data.pathEntered;
});
function getElementPath(node) {
    var path = [];

    if (node.getAttribute("id")) {
        return node.getAttribute("id");
    }

    while (node.parentNode) {
        path.push(Array.prototype.slice.call(node.parentNode.childNodes, 0).indexOf(node));
        node = node.parentNode;
    }
    return path.reverse();
}
function findElementByPath(path) {

    if (typeof path === "string") {
        return document.getElementById(path);
    }

    var node = document;
    for (var i = 0, n = path.length; i < n; i++) {
        node = node.childNodes[path[i]];
        if (!node) {
            return;
        }
    }
    return node;
}