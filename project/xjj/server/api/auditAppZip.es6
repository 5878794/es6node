let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;


let getFormUrl = function(request,appId,serverUrl,success,error,socket){
	serverUrl += "?id="+appId;
	request(
		{
			url: serverUrl,  //请求的URL
			method: 'get',  //POST方式请求
			encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
			headers: {  //请求头的设置
				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
			}
		},
		function (err, res, body) {  //接收回调
			if(err){
				error(err);
				return;
			}

			var gbk_to_utf8 = new Iconv('UTF-8', 'UTF-8');
			var buffer = gbk_to_utf8.convert(body);
			var body1 = buffer.toString();

			var $ = cheerio.load(body1);
			var form = $("body").find("form").eq(0);
			var url = form.attr("action");

			if(url == "#"){
				//跳过
				error("错误，请手动在后台提交");
			}else{
				submitAuditInfo(request,url,success,error,socket);
			}
		}
	);
};


var submitAuditInfo = function(request,url,success,error,socket){
	request(
		{
			url: url,  //请求的URL
			method: 'post',  //POST方式请求
			encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
			form:{
				checkDesc:"",
				checkState:2
			},
			headers: {  //请求头的设置
				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
			}
		},
		function (err, res, body) {  //接收回调
			if(err){
				error(err);
				return;
			}

			var gbk_to_utf8 = new Iconv('UTF-8', 'UTF-8');
			var buffer = gbk_to_utf8.convert(body);
			var body1 = buffer.toString();

			var $ = cheerio.load(body1);
			var form = $("body").find("form").eq(0);
			var url = form.attr("action");

			if(url == "#"){
				//success
				socket.send({
					type:"auditAppZip",
					data:{}
				});
				success();
			}else{
				error("错误，请手动在后台提交");
			}

		}
	);
};




module.exports = function(data,request,socket,catchData){
	let appId = data.appId,
		serverUrl = data.serverUrl;

	return new Promise((success,error)=>{
		getFormUrl(request,appId,serverUrl,success,error,socket);
	})
};