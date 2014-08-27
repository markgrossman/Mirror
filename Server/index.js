var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    socket.on('textBox', function(data) {
        socket.broadcast.emit('textBox', data);
    });

    socket.on('click', function(xpath) {
        socket.broadcast.emit('click', xpath);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});