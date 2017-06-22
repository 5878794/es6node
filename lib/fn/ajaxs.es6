
let ajax = require("request"),
	iconv = require("iconv").Iconv;


class _ajax{
	constructor(opt={}){
		this.useCookie = opt.useCookie || false;
		this.request = null;

		this._setCookie();
	}
	_setCookie(){
		if(this.useCookie){
			this.request = ajax.defaults({jar: true});
		}else{
			this.request = ajax.defaults({jar: false});
		}
	}
	_getHeaders(opt){
		let headers = {
			'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7'
		};

		for(let [key,val] of Object.entries(opt)){
			headers[key] = val;
		}

		return headers;
	}
	_getUrl(type,data,url){
		if(type != "get"){
			return url;
		}

		let hasW = (url.indexOf("?") > -1)? "&" : "?",
			urlParam = "";

		for(let [key,val] of Object.entries(data)){
			urlParam += "&"+key+"="+val;
		}

		urlParam = urlParam.substr(1);

		return url + hasW + urlParam;
	}
	send(opt){
		let {
			url="/",
			data={},
			headers={},
			type = "get",
			serverCode = "",
			timeout=30000
		} = opt;

		let _this = this;

		headers = this._getHeaders(headers);
		url = this._getUrl(type,data,url);

		return new Promise((success,error)=>{
			_this.request({
					url:url,
					method:type,
					form:(type=="get")? "" : data,
					encoding:null,
					headers:headers
				},
				function(err,res,body){
					if(err){
						success({
							state:0,
							msg:err
						});
					}else{
						if(serverCode){
							let Iconv = new iconv(serverCode, 'UTF-8');
							var buffer = Iconv.convert(body);
							body = buffer.toString();
						}else{
							body = body.toString();
						}

						success({
							state:1,
							data:body
						});
					}
				})
		})
	}

}




module.exports = _ajax;