"use strict";

var os = require("os");

var IPv4 = void 0;

var networkInterfaces = os.networkInterfaces();
if (networkInterfaces.en0) {
	//mac
	networkInterfaces = networkInterfaces.en0;
} else if (networkInterfaces.eth0) {
	//ubuntu
	networkInterfaces = networkInterfaces.eth0;
} else {
	networkInterfaces = [];
}

for (var i = 0; i < networkInterfaces.length; i++) {
	if (networkInterfaces[i].family == 'IPv4') {
		IPv4 = networkInterfaces[i].address;
	}
}

module.exports = IPv4;