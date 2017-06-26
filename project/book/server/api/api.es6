
var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio"),
	requestData = require("./../../../../lib/fn/getRequestData");
ajax = new ajax();


var handlerData = function(data,books,hasRead){
	let back = {};

	data = data.map(backData =>{
		return backData.data;
	});

	for(var i=0,l=data.length;i<l;i++){
		let str = data[i],
			id = books[i];

		let $ = cheerio.load(str),
			lists = $("#list").find("dd"),
			this_data = [],
			lastUrl = hasRead[id],
			isFind = false;

		if(!lastUrl){isFind = true;}


		lists.each(function(){
			let this_name = $(this).text(),
				this_url = $(this).find("a").attr("href");

			if(isFind){
				this_data.push({
					name:this_name,
					url:this_url
				});
			}


			if(this_url == lastUrl){isFind = true;}
		});


		back[id] = this_data;
	}

	return back;

};


module.exports = async function(request){
	let data = await requestData(request);
	let postData = data.postData,
		books = postData.books,
		hasRead = postData.hasRead;

	let fns = books.map((url)=>{
		return ajax.send({url:url});
	});

	return new Promise((success,error)=>{
		Promise.all(fns).then(rs=>{
			let hasError,errorMsg;
			rs.map(rs=>{
				if(rs.state == 0){
					hasError = true;
					errorMsg = rs.msg;
				}
			});

			if(hasError){
				error({
					state:0,
					msg:"数据请求失败"
				})
			}else{
				success({
					state:1,
					data:handlerData(rs,books,hasRead)
				})
			}
		}).catch(rs=>{
			console.log(rs);
			error({
				state:0,
				msg:"服务器错误"
			});
		})
	});
};