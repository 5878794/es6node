"use strict";

var ajax = require("./../../../../lib/fn/ajaxs"),
    cheerio = require("cheerio"),
    getRequestData = require("./../../../../lib/fn/getRequestData");
ajax = new ajax();

var handlerData = function handlerData(text) {
	var $ = cheerio.load(text);
	return $("#content").text();
};

module.exports = async function (request) {
	var data = await getRequestData(request),
	    url = data.postData.url;

	return new Promise(function (success, error) {
		ajax.send({ url: url }).then(function (rs) {
			if (rs.state == 1) {
				var _data = handlerData(rs.data);
				success({
					state: 1,
					data: { data: _data }
				});
			} else {
				success({
					state: 0,
					msg: "获取数据失败"
				});
			}
		}).catch(function (rs) {
			success({
				state: 0,
				msg: "服务器错误"
			});
		});
	});
};