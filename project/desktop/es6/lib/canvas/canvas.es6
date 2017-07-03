let app = require("./app"),
	scene = require("./scene"),
	layer = require("./layer"),
	sprite = require("./spriteAnimate"),
	text = require("./textAnimate"),
	group = require("./spriteGroup"),
	//阻止窗口滚动
	preventScroll = ()=> {
		window.addEventListener(device.MOVE_EV, (e) => {
			e.preventDefault();
		}, false);
	};



module.exports = {
	app,
	scene,
	layer,
	sprite,
	text,
	group,
	preventScroll
};


