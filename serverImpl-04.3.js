var net = require('net');
var through = require('through2')

var server = net.createServer();

server.on('connection', function(sock){
	console.log('Nueva Conexion');
	console.log('socket remoto: ' + sock.remoteAddress + ' ' + sock.remotePort);
	console.log('socket local:' + sock.localAddress + ' ' + sock.localPort);

	sock.setEncoding('utf8');

	var upperCasing = through.obj(function(str,enc,cb){
		this.push(str.toUpperCase());
		cb();
	})

	sock.pipe(upperCasing).pipe(sock);

	sock.on('end', function(data){
		console.log('Fin del socket: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	sock.on('close', function(data){
		console.log('Socket Cerrado: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	//var emit = sock.emit;
	//sock.emit = function(event){
	//	console.log('La conexion emitio el evento tipo %j',event);
	//	emit.apply(sock, arguments);
	//};
});

module.exports = server;