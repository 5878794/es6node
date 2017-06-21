

var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio");
ajax = new ajax();





var getMovie = function(body){
	var $ = cheerio.load(body);
	var text = [];
	var list = $("#new_vs_focus").find(".slider_nav").find("a");
	list.each(function(){
		text.push({
			title:$(this).text(),
			img:$(this).attr("data-bgimage"),
			url:$(this).attr("href")
		})
	});

	return text;
};

var getTV = function(body){
	var $ = cheerio.load(body);
	var text = [];
	var list = $("#new_vs_focus").find(".slider_nav").find("a");
	list.each(function(){
		text.push({
			title:$(this).text(),
			img:$(this).attr("data-bgimage"),
			url:$(this).attr("href")
		})
	});

	return text;
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
			ajax.send({url:"http://v.qq.com/movie/"}),
			ajax.send({url:"https://v.qq.com/tv/"})
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