


let api={
	getImageCode:require("./api/getImageCode"),
	login:require("./api/login"),
	changeZip:require("./api/changeZip"),
	appList:require("./api/appList"),
	appInfo:require("./api/appInfo"),
	appSystemList:require("./api/appSystemList"),
	appSystemInfo:require("./api/appSystemInfo"),
	createSvnZip:require("./api/createSvnZip"),
	saveFileInfo:require("./api/saveFileInfo"),
	getUpdateIconInfo:require("./api/getUpdateIconInfo"),
	sendIcon:require("./api/sendIcon"),
	saveAllMsg:require("./api/saveAllMsg"),
	login1:require("./api/login1"),
	auditAppImg:require("./api/auditAppImg"),
	auditAppZip:require("./api/auditAppZip"),
	testApp:require("./api/testApp"),
	publishApp:require("./api/publishApp")
};


module.exports = function(allSocket,socket,requests,catchData){
	console.log(socket.id+"已连接");

	//连接成功，通知客户端
	socket.send({
		type:"connect",
		data:{id:socket.id}
	});

	//收到的请求处理
	socket.on("message",function(message,data){
		if(api[message]){
			let id = data.id;

			api[message](data,requests[id],socket,catchData).then(rs=>{

			}).catch(rs=>{
				console.log(rs)
				socket.send({
					type:"err",
					data:rs
				})
			});
		}else{
			socket.send({
				type:"err",
				data:"接口不存在"
			})
		}
	});


};
