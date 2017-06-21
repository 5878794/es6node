

var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio");
ajax = new ajax();





var getMovie = function(body){
	var $ = cheerio.load(body);
	var text = $(".bodyer").find("script").eq(1).html();
	text = "["+text.split(/\[|\]/ig)[1]+"]";
	text = text.replace(/\s/ig,"");
	text = text.replace(/\/\//ig,"http://");
	text = text.replace(/\'/ig,"\"");
	text = eval("("+text+")");


	var _data = [];
	for(var key in text){
		_data.push({
			title:text[key].t,
			img:text[key].p,
			url:text[key].l
		})
	}

	return _data;
};

var getTV = function(body){
	var $ = cheerio.load(body);
	var text = $("body").find("script").eq(8).html();
	text = "["+text.split(/\[|\]/ig)[1]+"]";
	text = text.replace(/\s/ig,"");
	text = text.replace(/\/\//ig,"http://");
	text = text.replace(/\'/ig,"\"");
	text = eval("("+text+")");

	var _data = [];
	for(var key in text){
		_data.push({
			title:text[key].t,
			img:text[key].p,
			url:text[key].l
		})
	}

	return _data;
};

var complete = function(rs,success){
	let hasError = false,
		errorMsg = "";
	rs.map(data=>{
		if(data.state == 0){
			hasError = true;
			errorMsg = data.msg;
		}
	});

	if(hasError){
		success({
			state:0,
			msg:errorMsg
		})
	}else{
		let [movie,tv] = rs;
		movie = movie.data;
		tv = tv.data;


		success({
			state:1,
			data:{
				movie:getMovie(movie),
				tv:getTV(tv)
			}
		})
	}
};



module.exports = function(){
	return new Promise((success,error)=>{
		Promise.all([
			ajax.send({url:"http://tv.sohu.com/movie/",serverCode:"GBK"}),
			ajax.send({url:"http://tv.sohu.com/drama/",serverCode:"GBK"})
		]).then(rs=>{
			complete(rs,success)
		}).catch(rs=>{
			success({
				state:0,
				msg:rs
			})
		})
	});

};