var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

 io.on('connection', function(socket){
    console.log('a user connected');
 });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
 

io.on('connection', function(socket){
  socket.on('chat name', function(msg){
    console.log('name: ' + msg);
  });
});
 

// In order to send an event to everyone, Socket.IO 
io.emit('some event', { for: 'everyone' });

// If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});

// In this case, for the sake of simplicity we’ll send the message to everyone, including the sender.

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});