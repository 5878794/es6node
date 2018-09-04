var ajax = require("./book/server/ajax_get"),
	cheerio = require("cheerio"),
	request = require("request"),
	url = require("url"),
	crypto = require("crypto"),
	_response = "";



var getTokenStamp = "",     //获取到accessToken到时间戳
	tokenCanUseStamp = 0,   //accessToken的有效期   毫秒
	accessToken = "",       //accessToken的值
	getJsApiTicketStamp = "",   //获取到JsApiTicket的时间戳
	JsApiTicketCanUseStamp = 0,  //JsApiTicket的有效期   毫秒
	JsApiTicket = "",           //JsApiTicket的值
	requestUrl = "";            //请求的url

var getTicketUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket",
	getTokenUrl = "https://api.weixin.qq.com/cgi-bin/token",
	wxSecret = "cbe24320198f42445ab24d44705a0f18",
	wxAppId = "wx4d6d674573237067";


//接口请求失败
var hasError = function(msg){
	var data = {
		state:0,
		msg:msg
	};

	_response.writeHead(200, {
		'Content-Type' : "application/json; charset=UTF-8",
		'Access-Control-Allow-Origin': '*'   //可跨域访问
	});
	_response.write(JSON.stringify(data));
	_response.end();
};

//请求成功
var success = function(obj){
	var data = {
		state:1,
		data:obj
	};

	_response.writeHead(200, {
		'Content-Type' : "application/json; charset=UTF-8",
		'Access-Control-Allow-Origin': '*'   //可跨域访问
	});
	_response.write(JSON.stringify(data));
	_response.end();
};


//md5
var md5 = function(str){
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};

//sha1
var sha1 = function(str){
	var md5sum = crypto.createHash('sha1');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};

//获取accessToken
var getAccessToken = function(){
	var nowStamp = new Date().getTime();
	if(!getTokenStamp || nowStamp - getTokenStamp > tokenCanUseStamp - 100000){
		var url = getTokenUrl+"?grant_type=client_credential&appid="+ wxAppId+"&secret="+wxSecret;

		request(
			url,
			function(err,rs,body){
				if(err){
					hasError("token 失败");
				}else{
					body = JSON.parse(body);
					if(body.errmsg){
						hasError(JSON.stringify(body));
					}else{
						getTokenStamp = new Date().getTime();
						tokenCanUseStamp = body.expires_in*1000;
						accessToken = body.access_token;
						getJsApiTicket();
					}
				}
			}
		)
	}else{
		console.log("get token from cache!");
		console.log(accessToken);
		getJsApiTicket();
	}
};


//获取jsApiTicket
var getJsApiTicket = function(){
	var nowStamp = new Date().getTime();
	if(!getJsApiTicketStamp || nowStamp - getJsApiTicketStamp > JsApiTicketCanUseStamp - 100000){
		var url = getTicketUrl+"?access_token="+accessToken+"&type=jsapi";

		request(
			url,
			function(err,rs,body){
				if(err){
					hasError(err);
				}else{
					body = JSON.parse(body);
					if(body.errcode == 0){
						getJsApiTicketStamp = new Date().getTime();
						JsApiTicketCanUseStamp = body.expires_in*1000;
						JsApiTicket = body.ticket;

						createSignature();
					}else{
						hasError(JSON.stringify(body));
					}

				}
			}
		)
	}else{
		console.log("get JsApiTicket from cache!");
		console.log(JsApiTicket);
		createSignature();
	}
};


//生成签名
var createSignature = function(){
	var nowStamp = new Date().getTime().toString(),
		noncestr = md5(nowStamp);

	nowStamp = parseInt(nowStamp/1000);

	// console.log("JsApiTicket="+JsApiTicket)
	// console.log("noncestr="+noncestr)
	// console.log("nowStamp="+nowStamp)
	// console.log("url="+requestUrl)

	var str = "jsapi_ticket="+JsApiTicket+"&"+
		      "noncestr="+noncestr+"&"+
			  "timestamp="+nowStamp+"&"+
			  "url="+requestUrl;

	// console.log(str);
	var newStr = sha1(str);

	success({
		appId:wxAppId,
		timestamp:nowStamp,
		nonceStr:noncestr,
		signature:newStr
	});


	// console.log(newStr)

};





module.exports = function(request,response){
	var getData = url.parse(request.url, true).query,
		pageUrl = getData.url;
	_response = response;

	if(!url){
		hasError("参数错误");
		return;
	}else{
		requestUrl = pageUrl;
	}

	// var a = sha1("jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VPC24Xuii_PtPmPDXOlwD2A6484dxCzCm1S2fuO5IUxB8AViWPFzRGPEnr3FUgM3LQ&noncestr=371f7218e240976434354fe670dc49f6&timestamp=1496817324&url=https://127.0.0.1:8100/index.html");
	// console.log(a);

	// var a = md5("abcdefg");
	// console.log(a)

	getAccessToken();
};