let http = require('http'),
	socket = require("socket.io");

let server = new http.Server(),
	io = socket.listen(server);


module.exports = function(port,requestFn,socketFn){
	server.listen(port);
	server.on('request', function(request, response) {
		requestFn(request,response);
	});

	io.sockets.on('connection', function (socket) {
		socketFn(io.sockets.sockets,socket);

		// 接收消息
		// socket.on('test', function (data) {
		// 	//发送者的socket的id
		// 	//console.log(socket.id);
		// 	console.log(data);
		// });
	});
};