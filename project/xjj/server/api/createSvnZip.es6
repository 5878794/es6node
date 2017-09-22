


let path = require("path");
let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;

module.exports = function(data,request,socket,catchData){
	let serverUrl = "http://127.0.0.1:"+catchData.port+"/app_download/api/download";
	serverUrl = serverUrl + "?id="+data.appId;


	return new Promise((success,error)=>{
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
				body1 = JSON.parse(body1);

				var downloadUrl = body1.data;
				var downloadName = downloadUrl.split("\/");
				downloadName = downloadName[downloadName.length-1];

				socket.send({
					type:"createSvnZip",
					data:downloadName
				});


			}
		);
	})
};