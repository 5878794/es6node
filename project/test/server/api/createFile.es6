
var Canvas = require("canvas"),
	Image = Canvas.Image,
	path = require("path"),
	fs = require('fs');


module.exports = function(request){
	return new Promise((success,error)=>{
		var canvas = new Canvas(200,200),
			ctx = canvas.getContext("2d");

		ctx.font = '30px Impact';
		ctx.fillText("Awesome!", 50, 100);

		var outSrc = path.join(__dirname,'../../www/text.png'),
			out = fs.createWriteStream(outSrc),
			stream = canvas.pngStream();

		stream.on('data', function(chunk){
			out.write(chunk);
		});

		stream.on('end', function(){
			success({
				state:1,
				data:"text.png"
			})
		});

	});
};