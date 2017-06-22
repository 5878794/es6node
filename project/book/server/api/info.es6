var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio"),
	getRequestData = require("./../../../../lib/fn/getRequestData");
ajax = new ajax();

var handlerData = function(text){
	var $ = cheerio.load(text);
	return  $("#content").text();
};


module.exports = async function(request){
	let data = await getRequestData(request),
		url = data.postData.url;

	return new Promise((success,error)=>{
		ajax.send({url:url}).then(rs=>{
			if(rs.state == 1){
				let data = handlerData(rs.data);
				success({
					state:1,
					data:{data:data}
				})
			}else{
				success({
					state:0,
					msg:"获取数据失败"
				})
			}
		}).catch(rs=>{
			success({
				state:0,
				msg:"服务器错误"
			})
		})
	})

};