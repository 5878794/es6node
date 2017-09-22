let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv,
	fs = require("fs"),
	path = require("path");


// fs.createReadStream(__dirname + '/unicycle.jpg')

module.exports = function(data,request,socket,catchData){
	let serverUrl = data.serverUrl;
	let	zipName = data.zipName;
	let zipPath = path.join(__dirname,"../../../app_download/www/zip/"+zipName);

	return new Promise((success,error)=>{
		request(
			{
				url: serverUrl,  //请求的URL
				method: 'post',  //POST方式请求
				encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
				formData:{
					uploadUser:catchData.userId,
					h5File:fs.createReadStream(zipPath)
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
				body1 = JSON.parse(body1);

				var state = body1.status;

				if(state == "success"){
					body1.zipName = zipName;
					socket.send({
						type:"fileUpload",
						data:body1
					});
				}else{
					error(body1.return_msg);
				}



				// console.log(body.toString())
			}
		);
	})
};