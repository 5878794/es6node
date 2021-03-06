module.exports = {
	success:function(json,response){
		let data =  {
			state:1,
			data:json
		};
		this.end(JSON.stringify(data),response);
	},
	error:function(text,response){
		let data = {
			state:0,
			msg:text
		};
		this.end(JSON.stringify(data),response);
	},
	notFoundApi:function(response){
		response.writeHead(404, {
			'Content-Type' : "text/html; charset=UTF-8",
			'Access-Control-Allow-Origin': '*'   //可跨域访问
		});
		response.write("404");
		response.end();
	},
	end:function(text,response){
		response.writeHead(200, {
			'Content-Type' : "application/json; charset=UTF-8",
			'Access-Control-Allow-Origin': '*'   //可跨域访问
		});
		response.write(text);
		response.end();
	}
};