"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ajax = require("./../../../../lib/fn/ajaxs"),
    cheerio = require("cheerio");
ajax = new ajax();

var getMovie = function getMovie(body) {
	var $ = cheerio.load(body);
	var text = $("#m_86981").html();
	text = "[" + text.split(/\[|\]/ig)[1] + "]";
	text = JSON.parse(text);

	return text;
};

var getTV = function getTV(body) {
	var $ = cheerio.load(body);
	var text = $("#m_86804").html();

	var startStr = text.indexOf("["),
	    endStr = text.lastIndexOf("]"),
	    length = endStr - startStr + 1;
	text = text.substr(startStr, length);

	text = JSON.parse(text);
	return text;
};

var complete = function complete(rs, success) {
	var hasError = false,
	    errorMsg = "";

	rs.map(function (data) {
		if (data.state == 0) {
			hasError = true;
			errorMsg = data.msg;
		}
	});

	if (hasError) {
		success({
			state: 0,
			msg: errorMsg
		});
	} else {
		var _rs = _slicedToArray(rs, 2),
		    movie = _rs[0],
		    tv = _rs[1];

		movie = movie.data;
		tv = tv.data;

		success({
			state: 1,
			data: {
				movie: getMovie(movie),
				tv: getTV(tv)
			}
		});
	}
};

module.exports = function () {
	return new Promise(function (success, error) {
		Promise.all([ajax.send({ url: "http://movie.youku.com/" }), ajax.send({ url: "http://tv.youku.com/" })]).then(function (rs) {
			complete(rs, success);
		}).catch(function (rs) {
			success({
				state: 0,
				msg: rs
			});
		});
	});
};