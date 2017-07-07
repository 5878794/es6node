var excel      = require('phpexcel-stream')
	, fs         = require('fs')
	, csvParser  = require('csv-parser')
	, JSONStream = require('jsonstream')

fs.createReadStream(__dirname+'/aa.xls')
	.pipe( excel() )
	.pipe( csvParser() )
	.pipe( JSONStream.stringify() )
	.pipe( process.stdout )