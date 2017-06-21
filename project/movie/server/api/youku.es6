

var ajax = require("./../../../../lib/fn/ajaxs"),
	cheerio = require("cheerio");
ajax = new ajax();





var getMovie = function(body){
	var $ = cheerio.load(body);
	var text = $("#m_86981").html();
	text = "["+text.split(/\[|\]/ig)[1]+"]";
	text = JSON.parse(text);

	return text;
};

var getTV = function(body){
	var $ = cheerio.load(body);
	var text = $("#m_86804").html();

	var startStr = text.indexOf("["),
		endStr = text.lastIndexOf("]"),
		length = endStr - startStr + 1;
	text = text.substr(startStr,length);

	text = JSON.parse(text);
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
			ajax.send({url:"http://movie.youku.com/"}),
			ajax.send({url:"http://tv.youku.com/"})
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