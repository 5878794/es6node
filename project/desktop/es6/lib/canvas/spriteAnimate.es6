

let par = require("./canvasAnimate"),
	spriteResAnimate = require("./spriteResAnimate");


class spriteAnimate extends par(spriteResAnimate){
	constructor(opt){
		super(opt)
	}
}


module.exports = spriteAnimate;