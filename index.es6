	//获取server
let server = require("./lib/server/httpServer"),
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
	if(isApi){
		let url = "./project/"+dirName+"/server/api/"+pathName;
		try{
			let fn = require(url);
			fn(request).then((rs)=>{
				if(rs.state == 1){
					ajaxResponse.success(rs.data,response);
				}else{
					ajaxResponse.error(rs.data,response);
				}
			}).catch(rs=>{
				console.log(rs);
				ajaxResponse.error("服务器错误",response);
			});
		}catch(e){
			ajaxResponse.notFoundApi(response);
			console.log("api not found");
		}

	}else{
		responseStaticResources(dirName,fullPath,fileType,response);
	}
};


server = server(8000,runFn);
console.log("server start on "+ip+":"+port);




