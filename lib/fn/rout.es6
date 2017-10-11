let url = require("url"),
	responseFileType = require("./../response/getResponseFileType");


module.exports = function(request,response){
	//请求地址换算到本地地址
	let src = url.parse(request.url),   //当前请求的地址，不含前缀
		pathName = decodeURI(src.pathname),
		dirName = pathName.match(/^\/[a-zA-Z0-9_-]*\//) || [],
		//最后一个字符是否是"/"
		lastHasG = (pathName.lastIndexOf("/") == pathName.length - 1),
		_url = "",
		fileName = "",
		fileType = "",
		fullPath = "";


	//自动补index.html
	if(lastHasG){
		pathName = pathName+"index.html"
	}

	//method 请求方式
	let method = request.method.toLocaleLowerCase();

	//判断是否是api请求
	let isApi = (pathName.indexOf("/api/") > -1 && method != 'options');

	//文件类型
	fileName = pathName.substr(pathName.lastIndexOf("/")+1);
	fileType = (fileName.lastIndexOf(".") > -1)?
		fileName.substr(fileName.lastIndexOf(".")+1):
		(lastHasG)? "html" : "";


	//项目名
	dirName = dirName[0] || "";
	if(dirName == "/api/" || dirName == ""){
		dirName = "root";
	}else{
		dirName = dirName.substr(1,dirName.length-2);
	}

	//请求路径
	if(isApi){
		_url = pathName.split("/api/")[1];
	}else{
		_url = pathName.split("/"+dirName+"/");
		if(_url.length > 1){
			_url = _url[1];
		}else{
			_url = _url[0].substr(1);
		}
	}


	fileType = responseFileType(fileType);


	//完整路径
	//process.cwd() 代码运行路径
	let _dir = (isApi)? "server" : "www";
	fullPath = "/project/"+dirName+"/"+_dir+"/"+_url;


	return {
		dirName,isApi,pathName:_url,fullPath,method,fileName,fileType
	}
};

