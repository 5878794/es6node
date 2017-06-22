"use strict";

module.exports = function (request, response) {
	return new Promise(function (success, error) {
		success({
			data: 1,
			state: 1
		});
	});
};