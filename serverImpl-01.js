var net = require('net');

var server = net.createServer();

server.on('connection', function(sock){
	console.log('Nueva Conexion');
	console.log('socket remoto: ' + sock.remoteAddress + ' ' + sock.remotePort);
	console.log('socket local:' + sock.localAddress + ' ' + sock.localPort);

	var emit = sock.emit;
	sock.emit = function(event){
		console.log('La conexion emitio el evento tipo %j',event);
		emit.apply(sock, arguments);
	};
});

module.exports = server;