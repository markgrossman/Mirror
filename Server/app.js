var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/ping', function(req, res){
  res.send('<h1>Pong!</h1>');
});

io.on('connection', function(socket) {
    socket.on('textBox', function(data) {
        socket.broadcast.emit('textBox', data);
    });

    socket.on('click', function(path) {
        socket.broadcast.emit('click', path);
    });

    socket.on('scroll', function(data) {
    socket.broadcast.emit('scroll', data);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});