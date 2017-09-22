
let cheerio = require("cheerio"),
	Iconv = require("iconv").Iconv;


let handlerData = function(data){
	let newData = [],
		$ = cheerio.load(data),
		body = $(".page_data_row");

	body.each(function(){
		let name = $(this).find(".item_new").eq(1).html(),
			id = $(this).find(".item_new").eq(6).find("a").eq(0).attr("href");
		id = id.split("(")[1].split(")")[0] || "";

		newData.push({
			name:name,
			id:id
		});
	});

	return newData;
};


module.exports = function(data,request,socket,catchData){
	let serverUrl = data.apiUrl,
		userId = catchData.userId;

	return new Promise((success,error)=>{
		request(
			{
				url: serverUrl,  //请求的URL
				method: 'post',  //POST方式请求
				encoding: null,  //由于Node默认是UTF-8，而图书馆用的GB2312，所以不进行转码
				form:{
					'appType.id':-1,
					appName:"",
					providerId:userId
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

				var data = handlerData(body1);



				socket.send({
					type:"appSystemList",
					data:data
				});
			}
		);
	})
};

