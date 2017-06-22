"use strict";

var ajax = require("./../../../../lib/fn/ajaxs"),
    cheerio = require("cheerio"),
    requestData = require("./../../../../lib/fn/getRequestData");
ajax = new ajax();

var handlerData = function handlerData(data, books, hasRead) {
	var back = {};

	data = data.map(function (backData) {
		return backData.data;
	});

	var _loop = function _loop() {
		var str = data[i],
		    id = books[i];

		var $ = cheerio.load(str),
		    lists = $("#list").find("dd"),
		    this_data = [],
		    lastUrl = hasRead[id],
		    isFind = false;

		if (!lastUrl) {
			isFind = true;
		}

		lists.each(function () {
			var this_name = $(this).text(),
			    this_url = $(this).find("a").attr("href");

			if (isFind) {
				this_data.push({
					name: this_name,
					url: this_url
				});
			}

			if (this_url == lastUrl) {
				isFind = true;
			}
		});

		back[id] = this_data;
	};

	for (var i = 0, l = data.length; i < l; i++) {
		_loop();
	}

	return back;
};

module.exports = async function (request) {
	var data = await requestData(request);
	var postData = data.postData,
	    books = postData.books,
	    hasRead = postData.hasRead;

	var fns = books.map(function (url) {
		return ajax.send({ url: url });
	});

	return Promise.all(fns).then(function (rs) {
		var hasError = void 0,
		    errorMsg = void 0;
		rs.map(function (rs) {
			if (rs.state == 0) {
				hasError = true;
				errorMsg = rs.msg;
			}
		});

		if (hasError) {
			return {
				state: 0,
				msg: "数据请求失败"
			};
		} else {
			return {
				state: 1,
				data: handlerData(rs, books, hasRead)
			};
		}
	}).catch(function (rs) {
		console.log(rs);
		return {
			state: 0,
			msg: "服务器错误"
		};
	});
};