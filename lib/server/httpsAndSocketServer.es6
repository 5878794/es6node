let https = require('https'),
	fs = require("fs"),
	socket = require("socket.io"),
	server = new https.Server({
		pfx:fs.readFileSync('./lib/server/ca/server.pfx'),
		passphrase:'xufeng'
	}),
	io = socket.listen(server);

module.exports = function(port,requestFn,socketFn){
	server.listen(port);
	server.on('request', function(request, response) {
		requestFn(request,response);
	});

	io.sockets.on('connection', function (socket) {
		//获取访问的子目录,只识别第一个子目录
		let sendUrl = socket.handshake.headers.referer;
		sendUrl = sendUrl.split('\/');
		sendUrl = sendUrl[3];

		socketFn(sendUrl,io.sockets.sockets,socket);

		// 接收消息
		// socket.on('test', function (data) {
		// 	//发送者的socket的id
		// 	//console.log(socket.id);
		// 	console.log(data);
		// });
	});
};