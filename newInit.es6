//http https socket 一起启动

let net = require('net'),
	http = require('http'),
	https = require('https'),
	fs = require('fs'),
	socket = require("socket.io"),
	request = require("request"),
	path = require('path');


//访问端口
let port = 10000,
	//http服务器端口
	httpPort = 3345,
	//https服务器端口
	httpsPort = 3346;




	//路由
let rout = require("./lib/fn/rout"),
	ip = require("./lib/fn/getIp"),
	//socket 路由
	socketRoute = {
		xjj:require("./project/xjj/server/socketRoute"),
		chatRoom:require('./project/chatRoom/server/socketRoute')
	},
	//ca根路径
	caPath = path.join(__dirname,'./lib/server/ca/'),
	//返回静态资源
	responseStaticResources = require("./lib/response/responseStaticResources"),
	//返回404
	pageNotFond = require("./lib/response/404"),
	//ajax返回
	ajaxResponse = require("./lib/response/ajaxResponse"),
	//https证书 参数
	httpsOptions = {
		pfx:fs.readFileSync(path.join(caPath,'server.pfx')),
		passphrase:'xufeng'
		// key: fs.readFileSync(path.join(caPath,'ca-key.pem')),
		// cert: fs.readFileSync(path.join(caPath,'ca-cert.pem'))
	},
	requests = {
		appSystem:request.defaults({jar: true}),
		adminSystem:request.defaults({jar: true})
	},
	catchData = {
		port:port
	};




let handleRequest = function(request,response){
	let {dirName,isApi,pathName,fullPath,method,fileName,fileType}= rout(request);

	//判断是否有socket.io的请求  忽略
	if(fullPath.indexOf("socket.io") > -1){
		return;
	}

	console.log("-----isApi:"+isApi+"----------");
	if(isApi){
		let url = __dirname+"/project/"+dirName+"/server/api/"+pathName;
		console.log("api:"+url);
		try{
			let fn = require(url);
			fn(request).then((rs)=>{
				if(rs.state == 1){
					ajaxResponse.success(rs.data,response);
				}else{
					ajaxResponse.error(rs.msg,response);
				}
			}).catch(rs=>{
				console.log(rs);
				ajaxResponse.error("服务器错误",response);
			});
		}catch(e){
			console.log(e);
			ajaxResponse.notFoundApi(response);
			console.log("api not found");
		}

	}else if(method=='options'){
		//请求类型是options
		console.log('-------------options request-------------');
		ajaxResponse.success({},response);

	}else{
		fullPath = __dirname + fullPath;
		console.log(fullPath);
		responseStaticResources(dirName,fullPath,fileType,response);
	}
};



//http 服务器
let server = http.createServer(function(req, res){
	handleRequest(req,res);
}).listen(httpPort);

//https服务器
var sserver = https.createServer(httpsOptions, function(req, res){
	handleRequest(req,res);
}).listen(httpsPort);




let socketFn = function(project,allSocket,socket){
	//allSocket 以socket的id 为key 的socket对象
	//socket    当前发信息的socket用户的对象

	// socket.on("test",function(data){
	// 	// console.log(allSocket);
	// 	for(var [key,val] of Object.entries(allSocket)){
	// 		console.log(key)
	// 	}
	// 	console.log("-----")
	// 	console.log(socket.id);
	// })


	//根据访问的1级子目录区分socket事件,但是全部的socket对象包含所有
	//全部的socket中需要通过 socket.handshake.headers.referer 访问地址判断
	//allSocket 是对象
	if(socketRoute[project]){
		switch(project){
			case 'xjj':
				socketRoute[project](allSocket,socket,requests,catchData);
				break;
			case 'chatRoom':
				socketRoute[project](allSocket,socket);
				break;
			default:
				console.log(project+' is not exist');
		}
	}
};
let io = socket.listen(server);
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
let ios = socket.listen(sserver);
ios.sockets.on('connection', function (socket) {
	//获取访问的子目录,只识别第一个子目录
	let sendUrl = socket.handshake.headers.referer;
	sendUrl = sendUrl.split('\/');
	sendUrl = sendUrl[3];

	socketFn(sendUrl,ios.sockets.sockets,socket);

	// 接收消息
	// socket.on('test', function (data) {
	// 	//发送者的socket的id
	// 	//console.log(socket.id);
	// 	console.log(data);
	// });
});


//代理
net.createServer(function(socket){
	socket.once('data', function(buf){
		// https数据流的第一位是十六进制“16”，转换成十进制就是22
		var address = buf[0] === 22 ? httpsPort : httpPort;
		//创建一个指向https或http服务器的链接
		var proxy = net.createConnection(address, function() {
			proxy.write(buf);
			//反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
			socket.pipe(proxy).pipe(socket);
		});


		proxy.on('error', function(err) {
			console.log(err);
		});
	});

	socket.on('error', function(err) {
		console.log(err);
	});
}).listen(port);



ip.map(rs=>{
	console.log("server start on "+rs+":"+port);
});
