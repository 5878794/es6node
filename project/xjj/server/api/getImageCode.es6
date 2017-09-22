

//getImageCode
//获取验证码图片，并建立连接的缓存

let fs = require("fs"),
	path = require("path"),
	exec = require("./../../../../lib/fn/exec");


var delAllImg = function(pageUrl,imgUrl,request,success,error){
	let imgPath = path.join(__dirname,"../../www/image1/");
	let cmd2 = "rm -r "+imgPath+"*";

	exec(cmd2).catch(rs=>{});
};



//建立连接获取cookie
var getCookie = function(pageUrl,imgUrl,request,success,error){
	request(
		{
			url: pageUrl,
			method: 'GET',
			encoding: null,
			headers: {  //请求头的设置
				'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
			}
		},
		function (err, res, body) {  //接收回调
			if(err){
				error(err);
				return;
			}
			getImage(imgUrl,request,success,error);
		}
	);
};

//获取验证码图片
var getImage = function(imgUrl,request,success,error){
	request(
		{
			url: imgUrl+"?"+new Date().getTime(),  //请求的URL
			method: 'GET',  //POST方式请求
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

			let imgName = "image1/yzm_"+new Date().getTime()+".webp",
				yzm_save_src = path.join(__dirname,"../../www/"+imgName);
			fs.writeFile(yzm_save_src,body,function(err){
				if(err){console.log(err);return;}


				success(imgName);

			});
			// console.log(body.toString())
		}
	);
};



module.exports = function(data,request,socket){
	let pageUrl = data.pageUrl,
		imgUrl = data.imgUrl;

	return new Promise((success,error)=>{
		delAllImg();
		getCookie(pageUrl,imgUrl,request,function(url){
			socket.send({
				type:"imgCode",
				data:{
					url:url
				}
			});
			success();
		},error,socket);
	})
};




