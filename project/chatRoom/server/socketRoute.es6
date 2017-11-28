



module.exports = function(allSocket,socket){
	console.log(socket.id+"已连接");

	//连接成功，通知客户端
	socket.send({
		type:"connect",
		data:{id:socket.id}
	});

	//收到的请求处理
	socket.on("message",function(message,data){
		console.log(message,data)
	});


};
