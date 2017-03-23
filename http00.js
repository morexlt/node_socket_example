var http = require("http");

var server = http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('Hola mundo? que basico, no?');
	response.end();
});


server.listen(8080);
console.log('Servidor HTTP corriendo en el puerto: %j', server.address().port);