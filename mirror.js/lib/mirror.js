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