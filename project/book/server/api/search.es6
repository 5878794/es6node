
var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio"),
	getRequestData = require("./../../../../lib/fn/getRequestData");
ajax = new ajax();



var handlerData = function(text,url){
	var $ = cheerio.load(text),
		data = {};

	var name = $("#info").find("h1").text(),
		worker = $("#info").find("p").eq(0).text(),
		info = $("#intro").text(),
		list = $("#list").find("dd").find("a"),
		dir = [];


	name = name.replace(/\s/ig,"");
	worker = worker.replace(/\s/ig,"");
	info = info.replace(/\s/ig,"");

	list.each(function(){
		var _name = $(this).text(),
			_url = $(this).attr("href");

		dir.push({
			name:_name,
			url:_url
		})
	});



	data.name = name;
	data.worker = worker;
	data.info = info;
	data.dir = dir;
	data.url = url;

	return data;
};



module.exports = async function(request){
	let data = await getRequestData(request),
		val = data.postData.val,
		url = "http://www.biquge.tw/"+val+"/";


	return new Promise((success,error)=>{
		ajax.send({url:url}).then(rs=>{
			if(rs.state == 1){
				let data = handlerData(rs.data,url);
				success({
					state:1,
					data:data
				})
			}else{
				success({
					state:0,
					msg:"获取失败"
				})
			}
		}).catch(rs=>{
			success({
				state:0,
				msg:"服务器错误"
			})
		});
	})

};