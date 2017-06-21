
let url = require("url");


module.exports = function(request){
	return new Promise((success,error)=>{
		var postData = "",
			getData = url.parse(request.url, true).query;

		//获取提交的报文
		request.on('data', function (data) {
			postData += data;
		});
		request.on('end', function () {
			if(postData){
				postData = JSON.parse(postData);
			}else{
				postData={};
			}

			success({getData,postData});
		});
	});
};