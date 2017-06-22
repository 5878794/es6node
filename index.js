"use strict";

//获取server
var server = require("./lib/server/httpServer"),

//获取ip
ip = require("./lib/fn/getIp"),

//设置端口
port = "18080",

//路由
rout = require("./lib/fn/rout"),

//读取静态文件
responseStaticResources = require("./lib/response/responseStaticResources"),

//找不到 404
pageNotFond = require("./lib/response/404"),

//ajax返回
ajaxResponse = require("./lib/response/ajaxResponse");

var runFn = function runFn(request, response) {
	var _rout = rout(request),
	    dirName = _rout.dirName,
	    isApi = _rout.isApi,
	    pathName = _rout.pathName,
	    fullPath = _rout.fullPath,
	    method = _rout.method,
	    fileName = _rout.fileName,
	    fileType = _rout.fileType;

	console.log("-----isApi:" + isApi + "----------");
	if (isApi) {
		var url = "./project/" + dirName + "/server/api/" + pathName;
		console.log("api:" + url);
		try {
			var fn = require(url);
			fn(request).then(function (rs) {
				if (rs.state == 1) {
					ajaxResponse.success(rs.data, response);
				} else {
					ajaxResponse.error(rs.msg, response);
				}
			}).catch(function (rs) {
				console.log(rs);
				ajaxResponse.error("服务器错误", response);
			});
		} catch (e) {
			console.log(e);
			ajaxResponse.notFoundApi(response);
			console.log("api not found");
		}
	} else {
		responseStaticResources(dirName, fullPath, fileType, response);
	}
};

server = server(8000, runFn);
console.log("server start on " + ip + ":" + port);
