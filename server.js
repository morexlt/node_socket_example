var server = require('./serverImpl-04.06');

server.listen(6000, function(){
	console.log('aServidor TCP escuchando en el puerto %j', server.address().port);
})