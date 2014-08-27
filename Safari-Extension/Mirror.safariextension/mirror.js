var socket = io.connect("http://localhost:3000");

$("body").click(function(event) {
    var value = getXPath(event);
    socket.emit('click', value);
    console.log(value);
});

$('input').change(function(event) {
    var value = getXPath(event);
    socket.emit('textBox', {
        textEntered: $(event.target).val(),
        pathEntered: value
    });
});

var ClickXpath = ''
socket.on('click', function(xpath) {
    var node = document.evaluate(xpath, document, null, 9, null).singleNodeValue;

    if (xpath !== ClickXpath) {
        node.click();
    }
    ClickXpath = xpath;
});

var TextBoxXpath = ''

socket.on('textBox', function(data) {
    var node = document.evaluate(data.pathEntered, document, null, 9, null).singleNodeValue;

    if (data.pathEntered !== TextBoxXpath) {
        node.val(thing.data.textEntered);
    }
    TextBoxXpath = data.pathEntered;
});

function getXPath(event) {
    var element = event.target;
    var xpath = '';
    for (; element && element.nodeType == 1; element = element.parentNode) {
        var id = $(element.parentNode).children(element.tagName).index(element) + 1;
        id > 1 ? (id = '[' + id + ']') : (id = '');
        xpath = '/' + element.tagName.toLowerCase() + id + xpath;
    }
    return xpath;
}