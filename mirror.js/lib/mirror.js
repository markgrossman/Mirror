var socket = io.connect("http://localhost:3000");

$("body").click(function(event) {
    var value = utils.getElementPath(event.target);
    socket.emit('click', value);
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