var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
var userName;
 socket.on('connected', function(name){
   io.emit('connected', name);
   console.log(name + ' is connected');
   userName = name;
 });

  socket.on('chat message', function(msg){
    io.emit('chat message', userName, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
