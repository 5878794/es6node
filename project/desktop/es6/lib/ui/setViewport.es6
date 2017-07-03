
//viewport设置，高精度效果图用。 可能动画性能降低？
//设置了viewport宽度后，最好用rem单位布局。


//使用时meta需要设置
//<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1">
//psd_width 需要设置psd的实际输出宽度
//psd中的元素布局按实际大小除以100，然后使用rem为单位


//改变viewport大小

let setFn = function(psdWidth){
	var psd_width = psdWidth,
		win_width = window.innerWidth,
		viewport = document.querySelector('meta[name="viewport"]'),
		// dpr = window.devicePixelRatio || 1,
		// scale = 1 / dpr,
		rem;

	//设置meta
	if(viewport){
		viewport.setAttribute('content', 'width= device-width,initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');
	}else{
		$("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1">');
	}


	//设置页面字体,可使用rem
	var style = document.createElement('style');
	win_width = window.innerWidth;
	rem = win_width/psd_width*100;

	style.innerHTML = "html{font-size:"+rem+"px!important;}";
	document.querySelector("head").appendChild(style);

	//有些浏览器viewport宽度获取不准确
	//因此初始不停刷新页面字体
	let temp_interval = setInterval(function () {
		win_width = window.innerWidth;
		let _rem = win_width/psd_width*100;
		if(rem != _rem){
			rem = _rem;
			$("html").css({
				"font-size":rem+"px"
			});
		}
	},500);
	//10秒后取消自动刷新
	setTimeout(function(){
		clearInterval(temp_interval);
	},10000);


	//页面大小变化刷新
	$(window).resize(function(){
		win_width = window.innerWidth;
		rem = win_width/psd_width*100;
		style.innerHTML = "html{font-size:"+rem+"px!important;}";
	});
};


module.exports = setFn;

