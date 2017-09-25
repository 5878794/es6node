let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;


let getSubmitList = function(request,appId,pageUrl,success,error,socket){
	pageUrl += "?id="+appId;
	request(
		{
			url: pageUrl,  //请求的URL
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
			var form = $("body").find("form").eq(1);

			let newData = "";
			form.find("input").each(function(){
				let name = $(this).attr("name"),
					val = $(this).val();

				newData += name+"="+val+"&";
			});
			newData = newData.substr(0,newData.length-1);
			let serverUrl = form.attr("action");

			if(newData.length == 0){
				error("未找到发行平台");
				return;
			}

			submit(request,newData,serverUrl,success,error,socket);

		}
	);
};


var submit = function(request,newData,serverUrl,success,error,socket){
	console.log(newData,serverUrl)
	request(
		{
			url: serverUrl,  //请求的URL
			method: 'post',  //POST方式请求
			encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
			form:newData,
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

			var $ = cheerio.load(body1);
			var form = $("body").find("form").eq(0);

			if(form.length == 0){
				error("错误，请手动处理");
			}else{
				socket.send({
					type:"publishApp",
					data:{}
				});
				success();
			}

		}
	);
};




module.exports = function(data,request,socket,catchData){
	let appId = data.appId,
		pageUrl = data.pageUrl;

	return new Promise((success,error)=>{
		getSubmitList(request,appId,pageUrl,success,error,socket);
	})
};