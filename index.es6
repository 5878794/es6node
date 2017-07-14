	//获取server
let server = require("./lib/server/httpAndSocketServer"),
	path = require("path"),
	//获取ip
	ip = require("./lib/fn/getIp"),
	//设置端口
	port = "8000",
	//路由
	rout = require("./lib/fn/rout"),
	//读取静态文件
	responseStaticResources = require("./lib/response/responseStaticResources"),
	//找不到 404
	pageNotFond = require("./lib/response/404"),
	//ajax返回
	ajaxResponse = require("./lib/response/ajaxResponse");


let runFn = function(request,response){
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

	}else{
		fullPath = __dirname + fullPath;
		console.log(fullPath);
		responseStaticResources(dirName,fullPath,fileType,response);
	}
};


let socketFn = function(allSocket,socket){
	//allSocket 以socket的id 为key 的socket对象
	//socket    当前发信息的socket用户的对象

	socket.on("test",function(data){
		// console.log(allSocket);
		for(var [key,val] of Object.entries(allSocket)){
			console.log(key)
		}
		console.log("-----")
		console.log(socket.id);
	})
};



server = server(port,runFn,socketFn);
console.log("server start on "+ip+":"+port);









