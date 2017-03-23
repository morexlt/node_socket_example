var net = require('net');
var through = require('through2')

var server = net.createServer();

var users = [];

server.on('connection', function(sock){
	console.log('Nueva Conexion');
	console.log('socket remoto: ' + sock.remoteAddress + ' ' + sock.remotePort);
	console.log('socket local:' + sock.localAddress + ' ' + sock.localPort);
	//console.log("asd");
	sock.num = 0;
	sock.ip = sock.remoteAddress;
	users.push(sock);
	sock.setEncoding('utf8');
	sock.write("Bienvenido \n ");
	sock.write("Ingrese su nombre ");


	sock.on('data', function(data){
		//process.stdout.write('Datos recibidos: ' + data);
		//sock.write(data);
		if(sock.num == 0){
			sock.nombre = data;
			sock.num = 1;
			console.log(sock.nombre.substring(0,sock.nombre.length-2) + ' se conecto al chat con IP: ' + sock.localAddress);
			users.forEach(function(element){
				if(!(element.remoteAddress == sock.remoteAddress)){
					element.write(sock.nombre.substring(0,sock.nombre.length-2) + ' se conecto');
				}
					
			})

		}else{
			console.log(sock.nombre + ' dijo: ' + data);
			users.forEach(function(element){
				if(!(element.remoteAddress == sock.remoteAddress)){
					element.write(sock.nombre.substring(0,sock.nombre.length-2) + ' dijo: ' + data);
				}
					
			})
		}
	});

	//sock.pipe(upperCasing).pipe(sock);




	sock.on('end', function(data){
		//console.log('Fin del socket: ' + sock.remoteAddress + ' ' + sock.remotePort);
		users.forEach(function(element){
			if(!(element.remoteAddress == sock.remoteAddress)){
				element.write(sock.nombre + ' Se Desconecto');
			}
				
		})

	});

	sock.on('close', function(data){
		//console.log('Socket Cerrado: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	//var emit = sock.emit;
	//sock.emit = function(event){
	//	console.log('La conexion emitio el evento tipo %j',event);
	//	emit.apply(sock, arguments);
	//};
});

module.exports = server;