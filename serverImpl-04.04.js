var net = require('net');
var through = require('through2')

var server = net.createServer();

var users = [];

server.on('connection', function(sock){
	console.log('Nueva Conexion');
	console.log('socket remoto: ' + sock.remoteAddress + ' ' + sock.remotePort);
	console.log('socket local:' + sock.localAddress + ' ' + sock.localPort);
	//console.log("asd");
	sock.ip = sock.remoteAddress;
	users.push(sock);
	sock.setEncoding('utf8');


	sock.on('data', function(data){
		//process.stdout.write('Datos recibidos: ' + data);
		//sock.write(data);

		users.forEach(function(element){
			//console.log(element.remoteAddress);
			//console.log(sock.remoteAddress);
			
			if(!(element.remoteAddress == sock.remoteAddress)){
				element.write(element.ip + ' dijo: ' + data);
			}
				
		})
	});

	//sock.pipe(upperCasing).pipe(sock);




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