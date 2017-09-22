let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;

module.exports = function(data,request,socket,catchData){
	let data1 = data.data,
		serverUrl = data.serverUrl;


	return new Promise((success,error)=>{
		request(
			{
				url: serverUrl,  //请求的URL
				method: 'post',  //POST方式请求
				encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
				// json:true,
				form:data1,
				headers: {  //请求头的设置
					"content-type": "application/json",
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

				if(body1.status == 'ok'){
					socket.send({
						type:"saveFileInfo",
						data:{
							versionId:body1.versionId
						}
					});
				}else{
					error(body1.msg);
				}
			}
		);
	})
};