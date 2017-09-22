let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;

module.exports = function(data,request,socket,catchData){
	let code = data.code,
		loginUrl = data.loginUrl,
		username = data.username,
		password = data.password;

	return new Promise((success,error)=>{
		request(
			{
				url: loginUrl,  //请求的URL
				method: 'post',  //POST方式请求
				encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
				form:{
					'appSpAccount.accountName':username,
					'appSpAccount.password':password,
					code:code
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
				var hasError = $("body").find(".index_error").find("span");
				if(hasError.length != 0){
					error(hasError.text());
				}else{
					let phone = $("body").find(".main_left_phone");
					let userId = $("body").find("#accountId").val();
					catchData.userId = userId;

					if(phone.length == 1){
						socket.send({
							type:"login",
							data:{}
						});
					}else{
						error("异常");
					}
				}


				// console.log(body.toString())
			}
		);
	})
};