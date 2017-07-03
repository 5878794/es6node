



//全屏显示某个元素 必须用户点击
//DEVICE.API.fullScreen(dom);
//@param  dom:jqobj     默认document.documentElement及整个页面

//退出全屏
//DEVICE.API.exitFullScreen();


//事件监听
//事件名:DEVICE.FULLSCREEN_EV

//获取当前全屏的元素,返回dom
//DEVICE.API.getFullScreenDom();


//css伪类
//html:-moz-full-screen{};
//html:-webkit-full-screen{};
//html:fullscreen{}




let fullScreen = function(dom){
	dom = dom || $(document.documentElement);
	dom = dom.get(0);

	if(dom.requestFullscreen){
		dom.requestFullscreen();
	}else if(dom.webkitRequestFullScreen){
		dom.webkitRequestFullScreen();
	}else if(dom.mozRequestFullScreen){
		dom.mozRequestFullScreen();
	}else if(dom.msRequestFullscreen){
		dom.msRequestFullscreen();
	}
};


let exitFullScreen = function(){
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	}else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}else if (document.msexitFullscreen) {
		document.msexitFullscreen();
	}
};


let getFullScreenDom = function(){
	document.fullscreenElement = document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullscreenElement ||
		document.mozFullScreenElement;

	return document.fullscreenElement;
};



module.exports = {
	show:fullScreen,
	exit:exitFullScreen,
	getDom:getFullScreenDom
};