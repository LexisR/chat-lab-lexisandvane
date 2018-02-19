
/*Esto se traduce en lo siguiente:

Express inicializa la aplicación para que sea un controlador de función que puede suministrar a un servidor HTTP (como se ve en la línea 2).
Definimos un controlador de ruta / que se llama cuando llegamos a nuestro sitio web.
Hacemos que el servidor http escuche en el puerto 3000.

*/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('Un usuario conectado ');
  socket.on('disconnect', function() {
    console.log('Usuario desconectado');
  });

  io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });

});

io.emit('some event', {
  for: 'everyone'
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});