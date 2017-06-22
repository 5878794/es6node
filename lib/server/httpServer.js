'use strict';

var http = require('http');

var server = new http.Server();

module.exports = function (port, requestFn) {
	server.listen(port);
	server.on('request', function (request, response) {
		requestFn(request, response);
	});
};