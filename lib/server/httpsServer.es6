let https = require('https'),
	fs = require("fs"),
	server = new https.Server({
		pfx:fs.readFileSync('./lib/server/ca/server.pfx'),
		passphrase:'xufeng'
	});


module.exports = function(port,requestFn){
	server.listen(port);
	server.on('request', function(request, response) {
		requestFn(request,response);
	});
};
