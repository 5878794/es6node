/*
animate_css
animate_class
animate_js
get_param_from_url
touch_event
slide_event
banner_scroll
loading
show_info
*/
/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:49
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */
(function(){
	var psd_width = 750,
		win_width = window.outerWidth || window.innerWidth,
		viewport = document.querySelector('meta[name="viewport"]'),
		dpr = window.devicePixelRatio || 1,
		scale = 1 / dpr,
		rem;
	//viewport.setAttribute('content', 'width=' + dpr * win_width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

	$(viewport).remove();
	$("head").append('<meta name="viewport" content="width=640,user-scalable=no">');


	var style = document.createElement('style');
	//win_width = window.innerWidth;
	win_width = psd_width;
	rem = win_width/psd_width*100;

	style.innerHTML = "html{font-size:"+rem+"px!important;}";
	document.querySelector("head").appendChild(style);

	$(window).resize(function(){
		win_width = window.innerWidth;
		rem = win_width/psd_width*100;
		style.innerHTML = "html{font-size:"+rem+"px!important;}";
	});


})();

var PMZ_DEVICE = {};
/**
 *  获取地址栏所有参数
 */
PMZ_DEVICE.getAllParamFromUrl =  function(){
	var find_val = "";
	var paramJson = {};

	var search = window.location.search;
	search = search.substr(1);
	var searchs = search.split("&");

	for( var i= 0,l=searchs.length;i<l;i++){
		var this_val =  searchs[i],
			this_num = this_val.indexOf('='),
			this_key = this_val.substr(0,this_num),
			this_vals = this_val.substr(this_num+1,this_val.length-1);
		paramJson[this_key] = decodeURI(this_vals);
	}
	return paramJson;
};




var DEVICE = {};

DEVICE.locationHref = function (url,data) {
	var urlData="";
	var urlEed="";
	if(data){
		for(var item in data){
			urlData += item +"="+ data[item] +"&";//key所对应的value
		}
		urlEed =  urlData.substr(0,urlData.length-1);
	}
	window.location.href =url+'?'+ urlEed;
};
DEVICE.locationNoParam  =  function(url){
	window.location.href =url;
};

DEVICE.showBottomList =  function(res,type,type_lx,callback){
	var bg = $('<div></div>'); //背景
	var bg_content = $('<div></div>'); //内容div
	var AllData = $('<ul></ul>'); //内容ul
	var btn_cal = $('<div></div>');//取消按钮


	//设置样式
	bg.css({
		'position': 'fixed',
		'left': '0',
		'right': '0',
		'bottom': '0',
		'top': '0',
		'background-color': 'rgba(0,0,0,0.3)',
		'z-index': '100000'
	});
	bg_content.css({
		'position': 'absolute',
		'bottom': '0',
		'width': '100%'
	});
	AllData.css({
		'background-color': '#fff',
		'width': '90%',
		'margin': '0 auto',
		'border-radius': '0.2rem'
	});
	btn_cal.css({
		'background-color': '#fff',
		'padding': '0.2rem 0',
		'font-size': '0.30rem',
		'font-weight':'bold',
		'text-align': 'center',
		'color': '#0082ff',
		'margin': '0.25rem auto',
		'border-radius': '0.15rem',
		'width': '90%'

	}).text("取消").addClass('qx margin_bottom');

	if(res.length != 0 ){
		if(type_lx == 0){
			for(var i = 0 ; i < res.length ; i ++){
				AllData.prepend('<li class="diandian" attr_idcard="'+res[i].idcard+'"  attr_phone="'+res[i].phone+'"   attr_sex="'+res[i].sex+'">'+res[i].name+'</li>');
			}
		}else {
			for(var i = 0 ; i < res.length ; i ++){
				AllData.prepend('<li class="diandian" >'+res[i].card+'</li>');
			}
		}

	}


	if(type_lx == 0){
		AllData.append('<li class="diandian">添加就诊人</li>');
	}else {
		if(type == 0){
			AllData.append('<li class="diandian">无需就诊卡</li>');
		}
		AllData.append('<li class="diandian">添加就诊卡</li>');
	}


	AllData.find('li').css({
		'padding': '0.2rem 0',
		'border-bottom':"1px solid #ccc",
		'font-size': '0.30rem',
		'font-weight': 'bold',
		'text-align': 'center',
		'color': '#0082ff'
	});
	AllData.find('li:last-child').css({
		'border-bottom':"none"
	});


	bg.append(bg_content);
	bg_content.append(AllData);
	bg_content.append(btn_cal);

	$('body').append(bg);

	btn_cal.click(function(){
		bg.remove();
	});

	//li点击事件
	AllData.find('li').click(function(){

		callback($(this));
		bg.remove();
	})

};
DEVICE.showBottomList2 =  function(res,type,type_lx,callback){

	var bg = $('<div></div>'); //背景
	var bg_content = $('<div></div>'); //内容div
	var AllData = $('<ul></ul>'); //内容ul
	var btn_cal = $('<div></div>');//取消按钮


	//设置样式
	bg.css({
		'position': 'fixed',
		'left': '0',
		'right': '0',
		'bottom': '0',
		'top': '0',
		'background-color': 'rgba(0,0,0,0.3)',
		'z-index': '100000'
	});
	bg_content.css({
		'position': 'absolute',
		'bottom': '0',
		'width': '100%'
	});
	AllData.css({
		'background-color': '#fff',
		'width': '90%',
		'margin': '0 auto',
		'border-radius': '0.2rem'
	});
	btn_cal.css({
		'background-color': '#fff',
		'padding': '0.2rem 0',
		'font-size': '0.30rem',
		'font-weight':'bold',
		'text-align': 'center',
		'color': '#0082ff',
		'margin': '0.25rem auto',
		'border-radius': '0.15rem',
		'width': '90%'

	}).text("取消").addClass('qx margin_bottom');
	if(res.length != 0 ){
		if(type_lx == 0){
			for(var i = 0 ; i < res.length ; i ++){
				if(res[i].patientSex == "1"){
					res[i].patientSex = "男"
				}else {
					res[i].patientSex = "女"
				}
				res[i].patientName = decodeURI(res[i].patientName)
				AllData.prepend('<li class="diandian" attr_idcard="'+res[i].patientCardId+'" attr-patientId="'+res[i].patientId+'"  attr_phone="'+res[i].patientPhone+'"   attr_sex="'+res[i].patientSex+'">'+res[i].patientName+'</li>');
			}
		}else {
			for(var i = 0 ; i < res.length ; i ++){
				AllData.prepend('<li class="diandian" >'+res[i].mediCardId+'</li>');
			}
		}

	}


	if(type_lx == 0){
		AllData.append('<li class="diandian">添加就诊人</li>');
	}else {
		if(type == 0){
			AllData.append('<li class="diandian">无需就诊卡</li>');
		}
		AllData.append('<li class="diandian">添加就诊卡</li>');
	}


	AllData.find('li').css({
		'padding': '0.2rem 0',
		'border-bottom':"1px solid #ccc",
		'font-size': '0.30rem',
		'font-weight': 'bold',
		'text-align': 'center',
		'color': '#0082ff'
	});
	AllData.find('li:last-child').css({
		'border-bottom':"none"
	});


	bg.append(bg_content);
	bg_content.append(AllData);
	bg_content.append(btn_cal);

	$('body').append(bg);

	btn_cal.click(function(){
		bg.remove();
	});

	//li点击事件
	AllData.find('li').click(function(){
		callback($(this));
		bg.remove();
	})

};
DEVICE.showBottomList3 =  function(res,callback){
	var bg = $('<div></div>'); //背景
	var bg_content = $('<div></div>'); //内容div
	var AllData = $('<ul></ul>'); //内容ul
	var btn_cal = $('<div></div>');//取消按钮


	//设置样式
	bg.css({
		'position': 'fixed',
		'left': '0',
		'right': '0',
		'bottom': '0',
		'top': '0',
		'background-color': 'rgba(0,0,0,0.3)',
		'z-index': '100000'
	});
	bg_content.css({
		'position': 'absolute',
		'bottom': '0',
		'width': '100%'
	});
	AllData.css({
		'background-color': '#fff',
		'width': '90%',
		'margin': '0 auto',
		'border-radius': '0.2rem'
	});
	btn_cal.css({
		'background-color': '#fff',
		'padding': '0.2rem 0',
		'font-size': '0.30rem',
		'font-weight':'bold',
		'text-align': 'center',
		'color': '#0082ff',
		'margin': '0.25rem auto',
		'border-radius': '0.15rem',
		'width': '90%'

	}).text("性别").addClass('qx margin_bottom');

	if(res.length != 0 ){
		for(var i = 0 ; i < res.length ; i ++){
			AllData.prepend('<li class="diandian">'+res[i].val+'</li>');
		}
	}

	AllData.find('li').css({
		'padding': '0.2rem 0',
		'border-bottom':"1px solid #ccc",
		'font-size': '0.30rem',
		'font-weight': 'bold',
		'text-align': 'center',
		'color': '#0082ff'
	});
	AllData.find('li:last-child').css({
		'border-bottom':"none"
	});


	bg.append(bg_content);
	bg_content.append(AllData);
	bg_content.append(btn_cal);

	$('body').append(bg);

	btn_cal.click(function(){
		bg.remove();
	});

	//li点击事件
	AllData.find('li').click(function(){
		callback($(this));
		bg.remove();
	})

};



//*****************************************************
//获取浏览器或设备名称  以及版本号
//*****************************************************
//输出结果:
//---------------------------------------------------------
//DEVICE.isIpad             @param:bloom    是否是：ipad
//DEVICE.isIphone           @param:bloom    是否是：ipbone
//DEVICE.isAndroid          @param:bloom    是否是：android
//DEVICE.isIe               @param:bloom    是否是：ie
//DEVICE.isFirefox          @param:bloom    是否是：firefox
//DEVICE.isChrome           @param:bloom    是否是：chrome
//DEVICE.isOpera            @param:bloom    是否是：opera
//DEVICE.isSafari           @param:bloom    是否是：safari

//DEVICE.ver                @param:number   浏览器版本或  ipad/iphone/android系统版本
//---------------------------------------------------------
(function () {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/ipad; cpu os ([\d_]+)/)) ? Sys.ipad = s[1].replace(/_/g, ".") :
		(s = ua.match(/iphone os ([\d_]+)/)) ? Sys.iphone = s[1].replace(/_/g, ".") :
			(s = ua.match(/android[ \/]([\d.]+)/)) ? Sys.android = s[1] :
				(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
					(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
						(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
							(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
								(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
									(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : Sys._ = 0;


	DEVICE.isIpad = (Sys.hasOwnProperty("ipad"));
	DEVICE.isIphone = (Sys.hasOwnProperty("iphone"));
	DEVICE.isAndroid = (Sys.hasOwnProperty("android"));
	DEVICE.isIe = (Sys.hasOwnProperty("ie"));
	DEVICE.isFirefox = (Sys.hasOwnProperty("firefox"));
	DEVICE.isChrome = (Sys.hasOwnProperty("chrome"));
	DEVICE.isOpera = (Sys.hasOwnProperty("opera"));
	DEVICE.isSafari = (Sys.hasOwnProperty("safari"));


	DEVICE.ver = 0;
	var ver;
	for (var key in Sys) {
		if (Sys.hasOwnProperty(key)) {
			ver = Sys[key];
		}
	}
	ver = ver.split(".");
	var _ver = [];
	for (var i = 0, l = ver.length; i < l; i++) {
		if (i >= 2) {
			break;
		}
		_ver.push(ver[i]);
	}
	_ver = _ver.join(".");
	DEVICE.ver = _ver;

	DEVICE.isPhone = (DEVICE.isAndroid || DEVICE.isIpad || DEVICE.isIphone);
})();




//*****************************************************
//处理浏览器css前缀问题 以及其它一些属性
//*****************************************************
//输出结果：
//属性：------------------------------------------------
//DEVICE.has3d              @param:bloom    是否支持3d
//DEVICE.hasTouch           @param:bloom    是否是触摸屏
//DEVICE.hasTransform       @param:bloom    是否支持变形
//DEVICE.language           @param:str      语言版本  zh-cn

//事件：------------------------------------------------
//DEVICE.RESIZE_EV          @param:str      窗口变化
//DEVICE.START_EV           @param:str      点击
//DEVICE.MOVE_EV            @param:str      移动
//DEVICE.END_EV             @param:str      释放
//DEVICE.CANCEL_EV          @param:str      点击结束
//DEVICE.TRNEND_EV          @param:str      变形结束 ｅｇ:webkitTransitionEnd

//函数：------------------------------------------------
//DEVICE.nextFrame          fn              执行动画函数　１秒６０帧
//DEVICE.cancelFrame        fn              停止动画
//DEVICE.counter            fn              计数器 返回页面全局唯一ｉｄ数字，从１开始。
//DEVICE.fixObjCss          fn              ｊｑ调用，免ｃｓｓ前缀（部分）
//DEVICE.fixCss             fn              免ｃｓｓ前缀（部分）
//-----------------------------------------------------
(function () {
	var dummyStyle = document.createElement("div").style,
		vendor = (function () {
			if (window.navigator.msPointerEnabled) {
				return "";
			}
			if ("MozTransform" in dummyStyle) {
				return "";
			}
			var vendors = 'webkitT,MozT,msT,OT,t'.split(','),
				t,
				i = 0,
				l = vendors.length;

			for (; i < l; i++) {
				t = vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return vendors[i].substr(0, vendors[i].length - 1);
				}
			}

			return false;
		})(),
		prefixStyle = function (style) {
			if (!vendor) return style;

			style = style.charAt(0).toUpperCase() + style.substr(1);
			return vendor + style;
		},
		has3d = prefixStyle('perspective') in dummyStyle,


		windowTouch = (window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0) ? true : false,
		webkitTouch = 'ontouchstart' in window,
		hasTouch = (webkitTouch || windowTouch),
		hasTransform = vendor !== false,

		_transform = prefixStyle('transform'),
		_transitionProperty = prefixStyle('transitionProperty'),
		_transitionDuration = prefixStyle('transitionDuration'),
		_transformOrigin = prefixStyle('transformOrigin'),
		_transitionTimingFunction = prefixStyle('transitionTimingFunction'),
		_transitionDelay = prefixStyle('transitionDelay'),

		FULLSCREEN_EV = (function(){
			if (vendor === false) return "fullscreenchange";

			var fullscreenchange = {
				'': 'fullscreenchange',
				'webkit': 'webkitfullscreenchange',
				'Moz': 'mozfullscreenchange',
				'O': 'ofullscreenchange',
				'ms': 'msfullscreenchange'
			};

			return fullscreenchange[vendor];
		})(),
		//鼠标锁定状态变化事件
		LOCKPOINTER_EV = (function(){
			if (vendor === false) return "pointerlockchange";

			var pointerlockchange = {
				'': 'pointerlockchange',
				'webkit': 'webkitpointerlockchange',
				'Moz': 'mozpointerlockchange',
				'O': 'opointerlockchange',		//无
				'ms': 'mspointerlockchange'		//无
			};

			return pointerlockchange[vendor];
		})(),

		RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
		START_EV = webkitTouch ? 'touchstart' : windowTouch ? 'MSPointerDown' : 'mousedown',
		MOVE_EV = webkitTouch ? 'touchmove' : windowTouch ? 'MSPointerMove' : 'mousemove',
		END_EV = webkitTouch ? 'touchend' : windowTouch ? 'MSPointerUp' : 'mouseup',
		CANCEL_EV = webkitTouch ? 'touchcancel' : windowTouch ? 'MSPointerUp' : 'mouseup',
		TRNEND_EV = (function () {
			if (vendor === false) return "transitionend";

			var transitionEnd = {
				'': 'transitionend',
				'webkit': 'webkitTransitionEnd',
				'Moz': 'transitionend',
				'O': 'otransitionend',
				'ms': 'MSTransitionEnd'
			};

			return transitionEnd[vendor];
		})(),
		ANIEND_EV = (function(){
			if (vendor === false) return "animationEnd";

			var transitionEnd = {
				'': 'animationEnd',
				'webkit': 'webkitAnimationEnd',
				'Moz': 'mozAnimationEnd',
				'O': 'oanimationend',
				'ms': 'MSAnimationEnd'
			};

			return transitionEnd[vendor];
		})(),
		nextFrame = (function () {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return setTimeout(callback, 1);
				};
		})(),
		cancelFrame = (function () {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.webkitCancelRequestAnimationFrame ||
				window.mozCancelRequestAnimationFrame ||
				window.oCancelRequestAnimationFrame ||
				window.msCancelRequestAnimationFrame ||
				clearTimeout;
		})(),
		checkDomHasPosition = function(dom){
			var position = dom.css("positon");
			return (
				position == "fixed" ||
				position == "absolute" ||
				position == "relative"
			)
		},
		counter = (function () {
			var a = 0;
			return function () {
				a += 1;
				return a;
			}
		})(),
		language = (navigator.browserLanguage || navigator.language).toLowerCase(),


		t_v = (function () {
			var _vendors = 'webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = _vendors.length;

			for (; i < l; i++) {
				t = _vendors[i] + 'ransform';
				if (t in dummyStyle) {
					return ("-" + _vendors[i].substr(0, _vendors[i].length - 1) + "-");
				}
			}
			return "";
		})(),
		getCssName = function (style) {
			return (style in dummyStyle) ? style :
				   (t_v + style in dummyStyle) ? t_v + style : style;
		},
	//判断盒子模型的版本 2009版 2011版  2013版
		boxVendors = "",
		boxType = (function () {
			if ("boxPack" in dummyStyle) {
				return 2009;
			}
			if (t_v + "box-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2009;
			}


			if ("flexPack" in dummyStyle) {
				return 2011;
			}
			if (t_v + "flex-pack" in dummyStyle) {
				boxVendors = t_v;
				return 2011;
			}


			if ("flexBasis" in dummyStyle) {
				return 2013;
			}
			if (t_v + "flex-basis" in dummyStyle) {
				boxVendors = t_v;
				return 2013;
			}
		})(),

	//（值）定义盒子模型 display:flex
		box = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flexbox" :
				(boxType == 2009) ? boxVendors + "box" : "flex",
	//与盒子内布局方向相同，  start  end 。。。
		align_items = (boxType == 2013) ? boxVendors + "align-items" :
			(boxType == 2011) ? boxVendors + "flex-pack" :
				(boxType == 2009) ? boxVendors + "box-pack" : "align-items",
	//与盒子内布局方向相反，  start  end 。。。
		justify_content = (boxType == 2013) ? boxVendors + "justify-content" :
			(boxType == 2011) ? boxVendors + "flex-align" :
				(boxType == 2009) ? boxVendors + "box-align" : "justify-content",

	//盒子子元素所占比例
		flex = (boxType == 2013) ? boxVendors + "flex" :
			(boxType == 2011) ? boxVendors + "flex" :
				(boxType == 2009) ? boxVendors + "box-flex" : "flex",

	//盒子方向
		flex_direction = (boxType == 2013) ? boxVendors + "flex-direction" :
			(boxType == 2011) ? boxVendors + "flex-direction" :
				(boxType == 2009) ? boxVendors + "box-orient" : "flex-direction",

	//（值）横向排列
		flex_direction_row = (boxType == 2013) ? "row" :
			(boxType == 2011) ? "row" :
				(boxType == 2009) ? "horizontal" : "row",

	//（值）纵向排列
		flex_direction_column = (boxType == 2013) ? "column" :
			(boxType == 2011) ? "column" :
				(boxType == 2009) ? "vertical" : "column",


		animation = getCssName("animation"),
		box_shadow = getCssName("box-shadow"),
		backgroundSize = getCssName("background-size"),
		transform = getCssName("transform"),
		transformOrigin = getCssName("transform-origin"),
		transformStyle = getCssName("transform-style"),
		perspective = getCssName("perspective"),
		perspectiveOrigin = getCssName("perspective-origin"),
		border_radius = getCssName("border-radius"),
		box_sizing = getCssName("box-sizing"),
		background_clip = getCssName("background-clip"),
		border_bottom_left_radius = getCssName("border-bottom-left-radius"),
		border_bottom_right_radius = getCssName("border-bottom-right-radius"),
		border_top_left_radius = getCssName("border-top-left-radius"),
		border_top_right_radius = getCssName("border-top-right-radius"),
		backface_visibility = getCssName("backface-visibility"),
		transition = getCssName("transition"),
		transition_property = getCssName("transition-property"),
		transition_duration = getCssName("transition-duration"),
		transition_timing_function = getCssName("transition-timing-function");


	var css = {
			"box": box,
			"justify-content": justify_content,
			"align-items": align_items,
			"background-size": backgroundSize,
			"background-clip": background_clip,
			"flex": flex,
			"flex-direction": flex_direction,
			"row": flex_direction_row,
			"column": flex_direction_column,
			"transform": transform,
			"transform-origin":transformOrigin,
			"transform-style":transformStyle,
			"perspective":perspective,
			"perspective-origin":perspectiveOrigin,
			"border-radius": border_radius,
			"border-bottom-left-radius": border_bottom_left_radius,
			"border-bottom-right-radius": border_bottom_right_radius,
			"border-top-left-radius": border_top_left_radius,
			"border-top-right-radius": border_top_right_radius,
			"box-sizing": box_sizing,
			"box-shadow": box_shadow,
			"backface-visibility": backface_visibility,
			"transition": transition,
			"transition-property": transition_property,
			"transition-duration": transition_duration,
			"transition-timing-function": transition_timing_function,
			"animation":animation
		},
		gz = (function () {
			var reg, a = [];
			for (var key in css) {
				if (css.hasOwnProperty(key)) {
					if (key == "box" || key == "transition" || key == "flex") {
						a.push("([^-]" + key + "[^-])");
					} else if (key == "row" || key == "column") {
						a.push(key);
					} else {
						a.push("([^-]" + key + ")");
					}
				}
			}
			reg = a.join("|");
			return new RegExp(reg, "ig");
		})(),
		css_prefix = function (data) {
			var text = JSON.stringify(data),
				newtext = cssfile_prefix(text);
			return JSON.parse(newtext);
		},
		cssfile_prefix = function (data) {
			return  data.replace(gz, function (a) {
				var str = a.substr(1, a.length - 2);
				if (str == "box" || str == "transition" || str == "flex") {
					var newstr = css[str];
					return a.substr(0, 1) + newstr + a.substr(a.length - 1);
				} else if (a == "row" || a == "column") {
					return css[a];
				} else {
					return a.substr(0, 1) + css[a.substr(1)];
				}
			});
		},
		fix_css = function (css) {
			css = css.replace(/;/ig, " ; ");
			return cssfile_prefix(" "+css);
		};

	dummyStyle = null;


	DEVICE.has3d = has3d;         //是否支持3d
	DEVICE.hasTouch = hasTouch;  //是否是触摸屏
	DEVICE.hasTransform = hasTransform;  //是否支持变形


	DEVICE._transform = transform;        //自动添加前缀
	DEVICE._transitionProperty = _transitionProperty;
	DEVICE._transitionDuration = _transitionDuration;
	DEVICE._transformOrigin = _transformOrigin;
	DEVICE._transitionTimingFunction = _transitionTimingFunction;
	DEVICE._transitionDelay = _transitionDelay;


	DEVICE.RESIZE_EV = RESIZE_EV;    //窗口变化
	DEVICE.START_EV = START_EV;  //点击
	DEVICE.MOVE_EV = MOVE_EV;   //移动
	DEVICE.END_EV = END_EV;     //释放
	DEVICE.CANCEL_EV = CANCEL_EV;      //结束
	DEVICE.TRNEND_EV = TRNEND_EV;       //变形结束 webkitTransitionEnd
	DEVICE.ANIEND_EV = ANIEND_EV;       //webkitAnimationEnd
	DEVICE.FULLSCREEN_EV = FULLSCREEN_EV;  //全屏事件监听
	DEVICE.LOCKPOINTER_EV = LOCKPOINTER_EV;	//锁定鼠标

	DEVICE.nextFrame = nextFrame;
	DEVICE.cancelFrame = cancelFrame;

	DEVICE.language = language;   //语言版本  zh-cn
	DEVICE.counter = counter;        //计数器  fn

	DEVICE.fixObjCss = css_prefix;
	DEVICE.fixCss = fix_css;


	DEVICE.css = css;
	DEVICE.boxType = boxType;
	DEVICE.boxVendors = boxVendors;

	DEVICE.checkDomHasPosition = checkDomHasPosition;

	DEVICE.trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};
	DEVICE.getBetweenNumber = function(val,min,max){
		val = (val>max)? max : val;
		val = (val<min)? min : val;
		return val;
	};

})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-5
 * Time: 上午11:48
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */





//判断是否是数字
$.isNumber = function(val){
	return typeof val === 'number';
};
//判断是否是字符串
$.isString = function(val){
	return typeof val === 'string';
};
//判断是否是布尔
$.isBoolean = function(val){
	return typeof val === 'boolean';
};
//判断是否是对象   jqmobi有
$.isObject = function(str){
	if(str === null || typeof str === 'undefined' || $.isArray(str))
	{
		return false;
	}
	return typeof str === 'object';
};
//判断是否是数组   jqmobi有
$.isArray = function (arr){
	return arr.constructor === Array;
};
//判断是函数    jqmobi有
$.isFunction = function(fn){
	return typeof fn === 'function'
};
//判断定义值没
$.isUndefined = function(val){
	return typeof val === 'undefined'
};
//判断是否是网址
$.isUrl = function(url){
	var strRegex = "[a-zA-z]+://[^s]*";
	var re=new RegExp(strRegex);
	return re.test(url);
};


$.getDom = function(obj){
	var returnobj;

	if(!obj){return returnobj;}

	if($.isString(obj)){
		returnobj = document.getElementById(obj);
	}else if($.isObject(obj)){
		if(obj.length == 1){
			returnobj = obj.get(0);
		}
		if(obj.nodeType == 1){
			returnobj = obj;
		}
	}

	return returnobj;
};
$.getArray = function(str){
	return ($.isArray(str))? str : [];
};
$.getFunction = function(fn){
	return ($.isFunction(fn))? fn : function(){};
};
$.getBloom = function(str){
	return ($.isBoolean(str))? str : false;
};
$.getObj = function(obj){
	return ($.isObject(obj))? obj : {};
};
$.getNumber = function(str){
	str = parseInt(str);
	str = str || 0;
	return str;
};


//设置css样式
$.fn.css3 = function(css){
	$(this).css(DEVICE.fixObjCss(css));
	return $(this);
};
//返回style的css变换
$.css3 = function(css){
	return DEVICE.fixCss(css);
};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:11
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css动画
$.fn.cssAnimate=(function(){

	var cssanimagefn = {},
		counter = (function(){
			var a = 0;
			return function(){
				a += 1;
				return a;
			}
		})(),
		device = DEVICE,
		clearfn = function(obj,keyname){
			obj.removeEventListener(device.TRNEND_EV,cssanimagefn[keyname],false);
			delete cssanimagefn[keyname];
			delete obj.__bens_cssfn_id__;
		};

	return function(data,time,callback,is_3d,type){
		var _this=$(this),
			_that = _this.get(0),
			_thatstyle = _that.style;

		type = type || "ease";
		data = JSON.parse(DEVICE.fixObjCss(JSON.stringify(data)));
		time = time || 1000;
		callback = $.getFunction(callback);
		is_3d = ($.isBoolean(is_3d))?  is_3d : false;

		if(_that.__bens_cssfn_id__){
			var temp_key = _that.__bens_cssfn_id__;
			clearfn(_that,temp_key);
		}

		var thiskey = counter();
		_that.__bens_cssfn_id__ = thiskey;


		cssanimagefn[thiskey]=function(e){
			var p_name = e.propertyName;
			if(e.target == _that && data.hasOwnProperty(p_name)){

				//_this.get(0).style["webkitTransition"]="all 0 ease";
				_thatstyle[device._transitionProperty] = "";
				_thatstyle[device._transitionDuration] = "";
				_thatstyle[device._transitionTimingFunction] = "";
				_thatstyle["webkitTransformStyle"]="";
				_thatstyle["webkitBackfaceVisibility"]="";
				_thatstyle.willChange = "auto";

				callback();
				clearfn(_that,thiskey);
			}
		};

		_thatstyle[device._transitionProperty] = "all";
		_thatstyle[device._transitionDuration] = time+"ms";
		_thatstyle[device._transitionTimingFunction] = type;
		_thatstyle.willChange = "all";

		_thatstyle["webkitTransformStyle"]="preserve-3d";   //webkit私有
		if(!is_3d){
			_thatstyle["webkitBackfaceVisibility"]="hidden";    //webkit私有
		}else{
			_thatstyle["webkitBackfaceVisibility"]="visible";    //webkit私有
		}


		setTimeout(function(){
			_that.addEventListener(device.TRNEND_EV,cssanimagefn[thiskey],false);
			_this.css(data);
		},1);

	}
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午10:12
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//css3 class动画
//$.fn.classAnimate(params)
//@param obj     {"0%":"transform:scale(1);background:#000;","100%":"transform:scale(2);background:#fff;"}
//@param time    时间毫秒:2000
//@param type    动画方式:linear
//@param infinite  动画是否循环: true/false
//@param alternate 动画是否反向:  true/false
//@param callback  动画完成回调:fn    循环时无效


//停止循环的动画
//$.fn.removeClassAnimate();


$.fn.classAnimate = (function(){
	var fns = {},
		clearFn = function(obj,_id){
			obj.get(0).removeEventListener(DEVICE.ANIEND_EV,fns[_id],false);
			obj.removeCss3Animate();
			delete fns[_id];
		},
		addFn = function(id,obj,callback){
			var _id = "__temp_"+DEVICE.counter()+"__";
			obj.get(0).addEventListener(DEVICE.ANIEND_EV,fns[_id] = function(e){
				if(id == e.animationName){
					callback.call(this);
					clearFn(obj,_id);
				}
			},false);
		};

	return function(obj,time,type,infinite,alternate,callback){
		var id = "__keyframes_"+DEVICE.counter()+"__";
		time = parseInt(time) || 1000;
		type = type || "linear";
		infinite = $.getBloom(infinite);
		//callback = $.getFunction(callback);
		alternate = $.getBloom(alternate);

		time = time+"ms";
		infinite = (infinite)? "infinite" :"";
		alternate = (alternate)? "alternate" : "";
		var class_name = id+"class__";

		if(!$.isObject(obj)){
			throw("css3Animate 参数样式结构错误");
		}



		//生成style
		var last_style = "";
		var style = $("<style id='"+class_name+"'></style>");

		var css = " animation: " + id + " " + time + " " + type + " " + infinite + " " + alternate +";";
		css = $.css3(css);
		css = "."+class_name+"{"+css+"} @keyframes "+id+"{";

		for(var key in obj){
			if(obj.hasOwnProperty(key)){
				var this_val = $.css3(obj[key]);
				css += key + " {" + this_val + "}";
				last_style = this_val;
			}
		}

		css +=  "}";


		style.text(css);
		$("head").append(style);



		//生成最终的css
		var last_css = {};
		last_style = last_style.split(";");
		for(var z=0,zl=last_style.length;z<zl;z++){
			var this_style = last_style[z].split(":");
			if(this_style.length == 2){
				var _key = $.trim(this_style[0]),
					_val = $.trim(this_style[1]);
				last_css[_key] = _val;
			}
		}




		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				$(this).addClass(class_name);
				$(this).css(last_css);
				$(this).get(0).__animate_css3_class__ = class_name;
			}
		});


		if(!$.isFunction(callback)){return $(this);}
		if(infinite){return $(this);}


		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				addFn(id,$(this),callback);
			}
		});

		return $(this);
	}
})();



$.fn.removeClassAnimate = function(){
	var temp = {};


	$(this).each(function(){
		var class_name = $(this).get(0).__animate_css3_class__;
		temp[class_name] = true;
		$(this).removeClass(class_name);
	});

	for(var key in temp){
		if(temp.hasOwnProperty(key)){
			var style = $("#"+key);
			if(style.length != 0){
				style.remove();
			}
		}
	}
};/**
 * Created by beens on 15/11/7.
 */







//h5动画函数
//var a = new DEVICE.jsAnimate({
//    start:0,                  //@param:number   初始位置
//    end:1,                    //@param:number   结束位置
//    time:800,                 //@param:number   动画执行时间  ms
//    type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
//    class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
//    stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
//        $("#aaa").css({opacity:val})
//    },
//    endFn:function(){         //@param:fn       动画结束执行
//
//    },
//    alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
//    infinite:false            //@param:boolean  动画是否循环执行，默认：false
//                                                设置该参数endFn将失效
//})

//a.play();
//a.stop();



DEVICE.jsAnimate = (function(){
    var nextFrame = DEVICE.nextFrame,
        cancelFrame = DEVICE.cancelFrame;

    //缓动算法
    //t:当前时间
    //b:初始值
    //c:变化量
    //d:持续时间
    var tween = {
        //线性
        Linear: function(t,b,c,d){
            return c*t/d + b;
        },
        //2次方缓动
        Quad: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            }
        },
        //3次方缓动
        Cubic: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            }
        },
        //4次方缓动
        Quart: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            }
        },
        //5次方缓动
        Quint: {
            easeIn: function(t,b,c,d){
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            }
        },
        //正选曲线缓动
        Sine: {
            easeIn: function(t,b,c,d){
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t,b,c,d){
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            }
        },
        //指数曲线的缓动
        Expo: {
            easeIn: function(t,b,c,d){
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t,b,c,d){
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t,b,c,d){
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        //圆形曲线的缓动
        Circ: {
            easeIn: function(t,b,c,d){
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOut: function(t,b,c,d){
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOut: function(t,b,c,d){
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            }
        },
        //指数衰减的正弦曲线缓动
        Elastic: {
            easeIn: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
            },
            easeInOut: function(t,b,c,d,a,p){
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            }
        },
        //超过范围的三次方缓动
        Back: {
            easeIn: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            }
        },
        //指数衰减的反弹缓动
        Bounce: {
            easeIn: function(t,b,c,d){
                return c - tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            easeInOut: function(t,b,c,d){
                if (t < d/2) return tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
                else return tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        }
    };

    var animate = function(opt){
        this.runTime = opt.time;     //动画持续时间
        this.stepFn = opt.stepFn || function(){};   //每步执行的函数，参数：自动返回当前动画执行的百分比
        this.endFn = opt.endFn || function(){};     //动画执行完毕回调
        this.start = opt.start;
        this.end = opt.end;
        this.type = opt.type || "Linear";
        this.class = opt.class || "easeIn";
        this.alternate = ($.isBoolean(opt.alternate))? opt.alternate : false;
        this.infinite = ($.isBoolean(opt.infinite))? opt.infinite : false;


        this._checkParam();


        this.startTime = 0;         //动画开始时间
        this.endTime = 0;           //动画结束时间
        this.nowTime = 0;           //当前动画执行到的时间
        this._useedTime = 0;        //停止后在开始动画时的之前动画时间总和
        this._fn = null;            //nextFrame 临时赋值变量
        this.isRuning = false;      //动画是否在运行
        this.autoStop = false;      //动画是否由最小化窗口暂停

        this.addEvent();
    };

    animate.prototype = {
        //检查tween动画参数是否正确
        _checkParam:function(){
            if(this.type != "Linear"){
                if(tween[this.type] && tween[this.type][this.class]){

                }else{
                    this.type = "Cubic";
                    this.class = "easeIn";
                    console.log("参数不正确已使用Cubic easeIn");
                }
            }
        },
        //动画完成执行
        _complete:function(){
            //如果无限循环执行
            if(this.infinite){
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.play();
                }else{
                    this._useedTime = 0;
                    this.play();
                }
            }else{
                //是否反向执行
                if(this.alternate){
                    var a = this.start,
                        b = this.end;
                    this.end = a;
                    this.start = b;
                    this._useedTime = 0;
                    this.alternate = false;
                    this.play();
                }else{
                    this.endFn();
                }
            }
        },
        //浏览器最小化时停止动画，恢复时执行
        addEvent:function(){
            var _this =this;
            document.addEventListener('visibilitychange', function() {
                if(document.hidden){
                    //最小化
                    if(_this.isRuning){
                        _this.autoStop = true;
                        _this.stop();
                    }
                }else{
                    //恢复窗口
                    if(_this.autoStop){
                        _this.autoStop = false;
                        _this.play();
                    }
                }
            },false)
        },
        //执行
        _go:function(){
            var _this = this;

            var __step__ = function(){
                var now_time = new Date().getTime() + _this._useedTime,
                    use_time = now_time  - _this.startTime,
                    pre = use_time/_this.runTime;

                _this.nowTime = now_time;

                if(now_time>=_this.endTime){
                    _this.stepFn(_this.end);
                    _this.stop();
                    _this._complete();
                    return;
                }


                var _tween = (_this.type == "Linear")? tween.Linear : tween[_this.type][_this.class],
                    val = _tween(pre,_this.start,_this.end-_this.start,1);

                _this.stepFn(val);
                _this._fn = nextFrame(__step__);
            };

            __step__();
        },
        //开始动画
        play:function(){
            this.startTime = new Date().getTime();
            this.endTime = this.startTime + this.runTime;
            this.isRuning = true;
            this._go();
        },
        //暂停动画
        stop:function(){
            cancelFrame(this._fn);
            this._fn = null;
            this.isRuning = false;
            //重置运行时间
            this._useedTime = this.nowTime - this.startTime;
        },
        //从头开始动画
        restart:function(){
            this._useedTime = 0;
            this.play();
        }

    };

    return animate;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:16
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//获取地址栏参数
DEVICE.getParamFromUrl = function(param){
	var find_val = "";

	var search = window.location.search;
	search = search.substr(1);
	var searchs = search.split("&");

	for( var i= 0,l=searchs.length;i<l;i++){
		var this_val =  searchs[i],
			this_keys = this_val.split("="),
			this_key = this_keys[0];

		if(this_key == param){
			find_val = this_keys[1];
			break;
		}
	}
	return decodeURI(find_val);

};/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:39
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//事件 $$
(function(){
	var device = DEVICE,
		createMyTouchEven = function(obj){
			this.obj=obj;
			this.mytarget=null;

			if(this.obj==null){return;}

			this.clickLongTimeFn=null;
			this.clickTimeFn=null;
			this.points=[];

			this.isTouchOk=true;
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;


			this.clickDownEven=null;
			this.clickOkEven=null;
			this.clickUpEven=null;
			this.longClickEven=null;
			//this.slideUpEven=null;
			//this.slideDownEven=null;
			//this.slideRightEven=null;
			//this.slideLeftEven=null;

			this.touchSTime=null;
			this.touchJQ=400;
			//this.touchDelay=10;
			this.longClickDelay=100000;
			this.allowMove=10;
			this.hasTouch=device.hasTouch;

			this.eventBind();
		};

	createMyTouchEven.prototype = {
		eventBind:function(){
			var _this=this;
			this.obj.addEventListener(device.START_EV,this.touchStart=function(e){_this.touchStartHandler(e);},false);
			this.obj.addEventListener(device.MOVE_EV,this.touchMove=function(e){_this.touchMoveHandler(e);},false);
			this.obj.addEventListener(device.END_EV,this.touchEnd=function(){_this.touchEndHandler();},false);

			this.clickDownEven=document.createEvent('Event');
			this.clickDownEven.initEvent("myclickdown", true, true);

			this.clickOkEven=document.createEvent('Event');
			this.clickOkEven.initEvent("myclickok", true, true);

			this.clickUpEven=document.createEvent('Event');
			this.clickUpEven.initEvent("myclickup", true, true);

			this.longClickEven=document.createEvent('Event');
			this.longClickEven.initEvent("mylongclick", true, true);

			/*
			 this.slideUpEven=document.createEvent('Event');
			 this.slideUpEven.initEvent("myslideup", true, true);

			 this.slideDownEven=document.createEvent('Event');
			 this.slideDownEven.initEvent("myslidedown", true, true);

			 this.slideRightEven=document.createEvent('Event');
			 this.slideRightEven.initEvent("myslideright", true, true);

			 this.slideLeftEven=document.createEvent('Event');
			 this.slideLeftEven.initEvent("myslideleft", true, true);
			 */
		},
		f5:function(){
			this.points=[];
			this.isTouchStarted=false;
			this.isTouchMoved=false;
			this.isLongClicked=false;
			this.isTouchEnded=false;
		},
		isTouchOkFn:function(){
			//判断是否是有效点击
			var nowdatatime=new Date().getTime();

			//点击时间间隔控制
			if(this.touchSTime){
				/*
				 if(nowdatatime-this.touchSTime>this.touchJQ){
				 //有效
				 this.isTouchOk=true;
				 }else{
				 //无效
				 this.isTouchOk=false;
				 }
				 */
				this.isTouchOk = (nowdatatime-this.touchSTime>this.touchJQ);
				if(this.isTouchOk){
					this.touchSTime=nowdatatime;
				}
			}else{
				this.isTouchOk = true;
				this.touchSTime=nowdatatime;
			}

		},
		//长按事件监听
		clickLongListenerFn:function(){
			var _this=this;
			this.clickLongTimeFn=setTimeout(function(){
				_this.isLongClicked=true;
				_this.isTouchEnded=true;
				//长按。。。。。
				//触发事件
				_this.clickUpEven.mytarget=_this.mytarget;
				_this.longClickEven.mytarget=_this.mytarget;
				_this.obj.dispatchEvent(_this.clickUpEven);
				_this.obj.dispatchEvent(_this.longClickEven);
				//_this.clickUpHandler(e);
				//_this.clickLongHandler(e);
			},this.longClickDelay);
		},
		//点击时
		touchStartHandler:function(e){
			//e.preventDefault();

			this.isTouchOkFn(); //判断是否是有效点击
			if(!this.isTouchOk){return;}

			this.mytarget=e.target;
			this.mytarget.clickX = (e.touches)? e.touches[0].clientX : e.clientX;
			this.mytarget.clickY = (e.touches)? e.touches[0].clientY : e.clientY;

			this.f5();			//刷新参数
			this.savePoint(e);	//记录当前点

			//点击延时执行
			var _this=this;
			//this.clickTimeFn=setTimeout(function(){
				_this.touchStartHandlerGo();
			//},this.touchDelay);
		},
		//点击后延迟执行
		touchStartHandlerGo:function(){
			this.isTouchStarted=true;

			//注册长按事件
			this.clickLongListenerFn();

			//执行按下动作
			//
			this.clickDownEven.mytarget=this.mytarget;
			this.obj.dispatchEvent(this.clickDownEven);
			//this.clickDownHandler(e);
		},
		//移动时判断 未动 长滑
		touchMoveCondition:function(){
			var poinglength=this.points.length;
			//当前点
			var thispointx=this.points[poinglength-1].x;
			var thispointy=this.points[poinglength-1].y;
			//初始点击时的点
			var yuanpointx=this.points[0].x;
			var yuanpointy=this.points[0].y;



			if(!this.isTouchMoved){
				//规定的移动范围内算作未移动处理
				if(thispointx>=yuanpointx-this.allowMove && thispointx<=yuanpointx+this.allowMove && thispointy>=yuanpointy-this.allowMove && thispointy<=yuanpointy+this.allowMove){
					this.isTouchMoved=false;
				}else{
					this.isTouchMoved=true;
				}
			}
		},
		//移动时的处理
		touchMoveHandler:function(e){
//            e.preventDefault();
			if(!this.isTouchOk){return;}
			if(this.isTouchEnded){return;}
			if(this.isLongClicked){
				return;
			}



			//记录当前点
			this.savePoint(e);


			//判断移动超出
			this.touchMoveCondition();

			if(this.isTouchMoved){		//判断移动类型
				clearTimeout(this.clickTimeFn);
				clearTimeout(this.clickLongTimeFn);
				if(this.isTouchStarted){
					this.isTouchEnded=true;
					this.clickUpEven.mytarget=this.mytarget;
					this.obj.dispatchEvent(this.clickUpEven);
					//this.clickUpHandler(e);
				}

			}

		},
		//点击结束的处理
		touchEndHandler:function(){
			if(!this.isTouchOk){return;}
			clearTimeout(this.clickTimeFn);
			clearTimeout(this.clickLongTimeFn);
			//if(this.isTouchEnded){return;}   //move超出  没有进入滑动  结束
			if(this.isLongClicked){return;}  //长按了  结束


			this.isTouchEnded=true;


			if(this.isTouchStarted){
				var _this=this;
				if(!this.isTouchMoved){
					//延时执行
					setTimeout(function(){
						_this.clickUpEven.mytarget=_this.mytarget;
						_this.clickOkEven.mytarget=_this.mytarget;
						_this.obj.dispatchEvent(_this.clickUpEven);
						_this.obj.dispatchEvent(_this.clickOkEven);

					},200)
				}else{
					//判断是否触发移动   和   判断移动类型  this.touchSTime
					/*
					 var thistime = new Date().getTime();
					 if(thistime-this.touchSTime <= device.slideTriggerMaxTime ){
					 //执行滑动事件
					 _this.chooseSlideType();

					 }
					 */
				}
			}
		},
		//判断滑动类型
		chooseSlideType:function(){
			var thisstartpoint = this.points[0],
				pointlength = this.points.length,
				thisendpoint = this.points[pointlength-1],
				hlength = Math.abs(thisstartpoint.x - thisendpoint.x),
				vlength = Math.abs(thisstartpoint.y - thisendpoint.y),
				_this = this;

			if(hlength>vlength){
				//横向移动
				if(thisstartpoint.x > thisendpoint.x){
					//左滑
					_this.slideLeftEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideLeftEven);
				}else{
					//右滑
					_this.slideRightEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideRightEven);
				}
			}else{
				//纵向移动
				if(thisstartpoint.y > thisendpoint.y){
					//上滑
					_this.slideUpEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideUpEven);
				}else{
					//下滑
					_this.slideDownEven.mytarget=_this.mytarget;
					_this.obj.dispatchEvent(_this.slideDownEven);
				}
			}


		},
		savePoint:function(e){
			var touch;
			if(this.hasTouch){
				touch=e.touches[0];
			}else{
				touch=e;
			}
			this.points.push({x:touch.clientX,y:touch.clientY});
		}
	};

	var events = {
		addClickListener:function(){
			var _this=this;
			new createMyTouchEven(document);
			//clickok
			document.addEventListener("myclickok",function(e){
//                e.preventDefault();
				_this.dothis("myclickok",e);
			},false);
			//clickdown
			document.addEventListener("myclickdown",function(e){
//                e.preventDefault();
				_this.dothis("myclickdown",e);
			},false);
			//clickup
			document.addEventListener("myclickup",function(e){
//                e.preventDefault();
				_this.dothis("myclickup",e);
			},false);
			//longclick
			document.addEventListener("mylongclick",function(e){
//                e.preventDefault();
				_this.dothis("mylongclick",e);
			},false);

			/*
			 //slideup
			 document.addEventListener("myslideup",function(e){
			 e.preventDefault();
			 _this.dothis("myslideup",e);
			 },false);
			 //slidedown
			 document.addEventListener("myslidedown",function(e){
			 e.preventDefault();
			 _this.dothis("myslidedown",e);
			 },false);
			 //slideleft
			 document.addEventListener("myslideleft",function(e){
			 e.preventDefault();
			 _this.dothis("myslideleft",e);
			 },false);
			 //slideright
			 document.addEventListener("myslideright",function(e){
			 e.preventDefault();
			 _this.dothis("myslideright",e);
			 },false);
			 */

		},
		dothis:function(type,e){
			var _this=this,
				that=e.mytarget,
				isfind = false;

			var gonext = function(obj){
				var p_obj = obj.parentNode;
				handlerthis(p_obj);
			};

			var handlerthis = function(obj){
				if(!obj){ return;}
				if(obj.nodeName.toLowerCase() == "html"){ return;}

				var _eventid = obj.__bens_eventid__;

				if(_this.savefn[_eventid]){
					isfind = true;
					if(_this.savefn[_eventid][type]){
						_this.savefn[_eventid][type].call(obj,e);
					}
				}


				if(!isfind){
					gonext(obj);
				}

			};

			handlerthis(that);
		},
		savefn:{}
	};
	events.addClickListener();

	var eventBind = function(a){
		this.objs = null;               //传入的obj
		if(typeof(a) === "object"){
			if(a.length && a.length >0){
				this.objs = a;
			}else{
				this.objs = $(a);
			}
		}else{
			this.objs = $(a);
		}
		this.idArray = [];
		this.saveobj = events.savefn;
		this.init();
	};
	eventBind.prototype = {
		init:function(){
			if(this.objs.length == 0){console.log("有事件绑定失败");return;}

			var _this = this;

			//遍历对象 写入事件id
			this.objs.each(function(){
				var thisobj = this;

				if(thisobj.__bens_eventid__){
					_this.idArray.push(thisobj.__bens_eventid__);
				}else{
					var eventname = "e" + device.counter();
					thisobj.__bens_eventid__ = eventname;
					_this.idArray.push(eventname);
					_this.saveobj[eventname] = {};
				}

			});

		},
		savefn:function(fn,type){
			var data = this.idArray;

			for(var i= 0,l=data.length;i<l;i++){
				var id = data[i];
				this.saveobj[id][type] = fn;
			}
		},
		trigger:function(type){
			for(var i= 0,l=this.idArray.length;i<l;i++){
				var id = this.idArray[i];
				if( this.saveobj[id] && this.saveobj[id][type]){
					this.saveobj[id][type]();
				}
			}
			return this;
		},
		myclickok:function(callback){
			this.savefn(callback,"myclickok");
			return this;
		},
		myclickdown:function(callback){
			this.savefn(callback,"myclickdown");
			return this;
		},
		myclickup:function(callback){
			this.savefn(callback,"myclickup");
			return this;
		},
		mylongclick:function(callback){
			this.savefn(callback,"mylongclick");
			return this;
		},
		unbind:function(type){
			var data = this.idArray,
				delall = false,
				_this = this;

			if(type && typeof(type) == "boolean"){
				delall = true;
			}

			var clearAll = function(this_obj){
				var id = this_obj.__bens_eventid__;
				delete this_obj.__bens_eventid__;
				delete _this.saveobj[id];
			};


			this.objs.each(function(){
				var this_obj = this;
				if(delall){
					clearAll(this_obj);
				}else{
					delete _this.saveobj[id][type];

					//检查是否所有事件都为空
					var this_data = _this.saveobj[id],
						isnull = true;

					for(var key in this_data){
						if(this_data[key]){
							isnull = false;
							break;
						}
					}
					if(isnull){
						clearAll(this_obj);
					}
				}
			});


			return this;
		}
		/*
		 myslideup:function(callback){
		 if(callback){
		 this.events[this.name].myslideup=callback;
		 return this;
		 }
		 },
		 myslidedown:function(callback){
		 if(callback){
		 this.events[this.name].myslidedown=callback;
		 return this;
		 }
		 },
		 myslideright:function(callback){
		 if(callback){
		 this.events[this.name].myslideright=callback;
		 return this;
		 }
		 },
		 myslideleft:function(callback){
		 if(callback){
		 this.events[this.name].myslideleft=callback;
		 return this;
		 }
		 }
		 */

	};

	window.temp_event = events.savefn;
	window.$$ = function(a){
		return new eventBind(a);
	};


})();

/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:44
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */




/**
 *
 * 滑动事件  $$$
 * bens jq.mobi jq.extend device
 *
 * 返回对象
 * var a=require("slideevent");
 *
 *
 * 以下 obj为dom对象  jq或原生对象   注意：只能绑定单个对象，不能一次绑定多个对象
 * e为点击开始时的事件,滑动中为时时事件
 * 上下左右滑动触发时间为500毫秒内，从点击开始时计算，500参数可以调整
 * 函数可以连写。
 *
 *  obj = id/obj/jqobj  单个对象
 *
 * @fn a(obj).myslidedown(function(e){})            向下滑动
 * @fn a(obj).myslideup(fn)                         向上滑动
 * @fn a(obj).myslideleft(fn)                       向左滑动
 * @fn a(obj).myslideright(fn)                      向右滑动
 * @fn a(obj).mystart(fn)                           按下执行
 * @fn a(obj).mymoving(fn)                          滑动中触发，释放结束，不受500ms的限制
 * @fn a(obj).myend(fn)                             释放事件，如触发滑动则不会触发该事件
 * @fn a(obj).unbind(str)          str = myslidedown/myslideup/myslideleft/myslideright/mymoving/myend
 *                                       true:全部
 */
(function(){
	var device = DEVICE;

	var createMySlideEven=function(datas){
		var obj = datas.obj;

		this.events = datas.saveAddress;


		if(!$.isObject(obj)){console.log("滑动参数错误");return;}
		if(obj.length > 0){
			obj = obj.get(0);
		}

		this.obj=obj;

		this.slideEventJG = 500;    //释放后300秒触发一次
		this.eventobj = null;
		this.startTime=null;
		this.allowTrigerTime = 500;   //500秒内释放有效
		this.moveStartTime = 0;
		this.movefnTrigerTime = 10;     //移动事件回调10毫秒触发一次
		this.points=[];

		//this.leftSlideEven=null;
		//this.rightSlideEven=null;
		//this.upSlideEven=null;
		//this.downSlideEven=null;

		this.touchStart=null;
		this.touchMove=null;
		this.touchEnd=null;

		this.minLength=10;
		this.hasTouch=device.hasTouch;
		this.state=false;

		this.eventBind();
	};
	createMySlideEven.prototype={
		eventBind:function(){
			var _this=this;
			this.obj.addEventListener(device.START_EV,this.touchStart=function(e){_this.touchStartHandler(e);},false);
			this.obj.addEventListener(device.MOVE_EV,this.touchMove=function(e){_this.touchMoveHandler(e);},false);
			this.obj.addEventListener(device.END_EV,this.touchEnd=function(e){_this.touchEndHandler(e);},false);

			//this.leftSlideEven=document.createEvent('Event');
			//this.leftSlideEven.initEvent("myslideleft", true, true);

			//this.rightSlideEven=document.createEvent('Event');
			//this.rightSlideEven.initEvent("myslideright", true, true);

			//this.upSlideEven=document.createEvent('Event');
			//this.upSlideEven.initEvent("myslideup", true, true);

			//this.downSlideEven=document.createEvent('Event');
			//this.downSlideEven.initEvent("myslidedown", true, true);
		},
		removeEven:function(){
			this.obj.removeEventListener(device.START_EV,this.touchStart,false);
			this.obj.removeEventListener(device.MOVE_EV,this.touchMove,false);
			this.obj.removeEventListener(device.END_EV,this.touchEnd,false);
		},
		f5:function(){
			this.points=[];
		},
		touchStartHandler:function(e){
			var starttime = new Date().getTime(),
				savetime = this.startTime || 0;
			if(starttime - savetime < this.slideEventJG){
				this.startTime = starttime;
				this.state=false;
				return;
			}
			this.f5();			//刷新参数
			this.savePoint(e);	//记录当前点
			this.state=true;
			this.startTime = new Date().getTime();
			this.eventobj = e;
			if(typeof(this.events.start) === "function"){
				this.events.start.call(this.obj,e);
			}
		},
		touchMoveHandler:function(e){
			e.preventDefault();
			if(!this.state){return;}
			this.savePoint(e);

			var nowtime = new Date().getTime();
			if(typeof(this.events.move) === "function" && nowtime - this.moveStartTime > this.movefnTrigerTime){
				this.moveStartTime = nowtime;
				this.events.move.call(this.obj,e);
			}
		},
		touchEndHandler:function(e){
			var thistime = new Date().getTime();

			if(!this.state){ this.state=false; return;}
			this.state=false;
			if(this.points.length<2){ return;}


			if(!(this.startTime && thistime - this.startTime <= this.allowTrigerTime) ){

				this.triggerEndFn(e);
				return;
			}


			var lastpoint=this.points[this.points.length-1];
			var lastpointx=lastpoint.x;
			var lastpointy=lastpoint.y;

//            var startpoint=this.points[this.points.length-2];
			var startpoint=this.points[0];
			var startpointx=startpoint.x;
			var startpointy=startpoint.y;


			var pointsx=Math.abs(startpointx-lastpointx);
			var pointsy=Math.abs(startpointy-lastpointy);

			//未超过最小滑动距离
			if(pointsx<this.minLength && pointsy<this.minLength){this.triggerEndFn(e);return;}

			this.startTime = thistime;
			//判断方向
			if(pointsx>=pointsy){
				//横向滑动
				if(startpointx>lastpointx){
					//左滑
					//this.obj.dispatchEvent(this.leftSlideEven);
					if(typeof(this.events.left) === "function"){
						this.events.left.call(this.obj,this.eventobj);
					}
				}else{
					//右滑
					//this.obj.dispatchEvent(this.rightSlideEven);
					if(typeof(this.events.right) === "function"){
						this.events.right.call(this.obj,this.eventobj);
					}
				}
			}else{
				//纵向滑动
				if(startpointy>lastpointy){
					//上滑
					//this.obj.dispatchEvent(this.upSlideEven);
					if(typeof(this.events.up) === "function"){
						this.events.up.call(this.obj,this.eventobj);
					}
				}else{
					//下滑
					//this.obj.dispatchEvent(this.downSlideEven);
					if(typeof(this.events.down) === "function"){
						this.events.down.call(this.obj,this.eventobj);
					}
				}
			}
		},
		triggerEndFn:function(e){
			if(typeof(this.events.end) === "function"){
				this.events.end.call(this.obj,e);
			}
		},
		savePoint:function(e){
			var touch;
			if(this.hasTouch){
				touch=e.touches[0];
			}else{
				touch=e;
			}
			this.points.push({x:touch.screenX,y:touch.screenY});
		}
	};

	var savefn = {},
		saveobj = {};

	var eventbind = function(obj){
		obj = $.getDom(obj);

		if(!$.isObject(obj)){console.log("slide bind error");return;}

		var id;
		if(obj.__bens_slide_event_id__){
			//帮定过事件
			id = obj.__bens_slide_event_id__;
		}else{
			//没有注册监听事件
			id = device.counter();
			obj.__bens_slide_event_id__ = id;
			savefn[id] = {
				up:null,
				left:null,
				down:null,
				right:null,
				end:null,
				start:null,
				move:null
			};
			saveobj[id] = new createMySlideEven({
				obj:obj,
				saveAddress:savefn[id]
			});
		}

		this.obj = obj;
		this.id = id;
		this.saveFn = savefn[id];
	};
	eventbind.prototype = {
		myslidedown:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.down = fn;
			}
			return this;
		},
		myslideup:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.up = fn;
			}
			return this;
		},
		myslideleft:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.left = fn;
			}
			return this;
		},
		myslideright:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.right = fn;
			}
			return this;
		},
		myend:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.end = fn;
			}
			return this;
		},
		mystart:function(){
			if(typeof(fn) === "function"){
				this.saveFn.start = fn;
			}
			return this;
		},
		mymoving:function(fn){
			if(typeof(fn) === "function"){
				this.saveFn.move = fn;
			}
			return this;
		},
		unbind:function(type){
			if(type && $.isBoolean(type)){
				this._removeObj();
				return;
			}


			var new_type = null;
			switch (type){
				case "mymoving":
					new_type = "move";
					break;
				case "myend":
					new_type = "end";
					break;
				case "mystart":
					new_type = "start";
					break;
				default :
					new_type = type.replace("myslide","");
					break;
			}

			type = new_type;


			if(this.saveFn[type]){
				delete this.saveFn[type];
			}

			this._checkHasFn();
			return this;
		},
		//检查是否还有事件绑定
		_checkHasFn:function(){
			var isfind = false;
			for(var key in this.saveFn){
				if(this.saveFn[key]){
					isfined = true;
					break;
				}
			}
			if(!isfind){
				this._removeObj();
			}
		},
		//解除事件绑定
		_removeObj:function(){
			var id = this.id;
			delete savefn[id];
			saveobj[id].removeEven();
			delete saveobj[id];
			delete this.obj.__bens_slide_event_id__;
		}
	};



	window.$$$ =  function(obj){
		return new eventbind(obj);
	};
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-14
 * Time: 上午10:41
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */


//banner横向滚动动画,依赖$$点击事件



//new DEVICE.bannerAnimate({
//	win: body,                      @param:jqobj    外层窗口
//	body: $("#story_mains"),        @param:jqobj    滑动层
//	time: 2000,                     @param:number   滑动间隔时间
//	animateTime: win_width,         @param:number   滑动动画时间
//	showPoint:false,                @param:number   是否显示下面的小点
//	leftBtn:$("#story_right_btn"),  @param:jqobj    左滑动按钮
//	rightBtn:$("#story_left_btn"),  @param:jqobj    右滑动按钮
//  changeStartFn:function(page){}, @param:fn       滑动开始时执行函数，传递当前要滑动到的页面number
//  changeEndFn:function(page){}    @param:fn       滑动结束时执行函数，传递当前要滑动到的页面number
//});




DEVICE.bannerAnimate = (function () {
	var device = DEVICE;
	var scrollBanner = function (data) {
		this.win = data.win;            //包裹层
		this.body = data.body;          //移动层
		this.imgLength = this.body.find("a").length;
		this.time = data.time || 5000;      //动画间隔时间
		this.animateTime = data.animateTime || 1000;    //动画时间
		this.showPoint = $.isBoolean(data.showPoint)? data.showPoint : true;
		this.leftBtn = data.rightBtn;
		this.rightBtn = data.leftBtn;
		this.autoAnimate = $.isBoolean(data.autoAnimate)? data.autoAnimate : true;
		this.pointBg = "rgba(0,171,236,0.2)";
		this.pointSelectBg = "rgba(0,171,236,0.6)";
		this.changeStartFn = data.changeStartFn || function(){};
		this.changeEndFn = data.changeEndFn || function(){};

		this.winWidth = parseInt(this.win.width());
		this.winHeight = parseInt(this.win.height());

		this.page = 0;
		this.maxPage = this.imgLength - 1;

		this.intervalFn = null;
		this.points = [];
		this.pointBody = null;

		this.touchStartTime = 0;
		this.touchPoints = [];
		this.leftPx = 0;
		this.init();
	};
	scrollBanner.prototype = {
		init: function () {
			this.styleSet();
			this.addPoint();
			this.setDiv();
			this.addEvent();


		},
		//设置样式
		styleSet: function () {
			this.win.css({
				position: "relative",
				overflow: "hidden"
			});

			this.body.css({
				position: "absolute",
				left: 0,
				top: 0
			});

			this.body.find("a").css({
				display: "block",
				width: this.winWidth + "px",
				height: this.winHeight + "px",
				//border: "1pt solid #fff",
				overflow: "hidden",
				"position": "relative"
			});

			this.body.find("a").css({
				float: "left",
				display: "block"
			});
		},
		//添加指示的点点
		addPoint: function () {
			var _this = this;

			var div = $("<div></div>"),
				width = _this.imgLength * 20,
				display = (this.showPoint)? "block" : "none";
			div.css({
				width: width + "px",
				height: "10px",
				position: "absolute",
				bottom: "10px",
				right:"20px",
				//left: "50%",
				//"margin-left": -width / 2 + "px",
				display:display,
				"z-index":9999
			});


			var span = $("<div></div>");
			span.css({
				width: "8px",
				height: "8px",
				margin: "0 5px",
				background: this.pointBg,
				"border-radius": "5px",
				float: "left"
				//border:"1pt solid transparent"
			}).addClass("border_box");

			for (var i = 0, l = this.imgLength; i < l; i++) {
				var this_item = span.clone().attr({ n: i });
				if (i == 0) {
					this_item.css({ background: this.pointSelectBg,"border-color":"#fff" })
				}
				div.append(this_item);
			}
			this.points = div.find("div");
			this.pointBody = div;

			this.win.append(div)
		},
		//设置窗口参数等
		setDiv: function () {

			this.body.stop(true, true);

			this.winWidth = parseInt(this.win.width());
			this.winHeight = parseInt(this.win.height());

			var width = this.winWidth * this.imgLength;

			this.body.css({
				width: width + "px",
				height: "100%"
			});
			this.body.find("a").css({
				width: this.winWidth + "px",
				height: "100%"
			})





		},
		//添加事件
		addEvent: function () {
			var _this = this;
			window.addEventListener("resize",_this.resizeFn = function(){
				_this.setDiv();
			},false);

			var temp_fn = function () {
				if(!_this.autoAnimate){
					return;
				}

				if (_this.imgLength <= 1) {
					return;
				}
				_this.intervalFn = setInterval(function () {
					_this.page++;
					_this.animate();
				}, _this.time);

				_this.animate();

			};


			if (!device.hasTouch) {
				this.win.hover(function () {
					_this.body.stop(true);
					clearInterval(_this.intervalFn);
					_this.intervalFn = null;
				}, function () {
					if (!_this.intervalFn) {
						temp_fn();
					}
				});


				this.points.mouseover(function () {
					_this.page = $(this).attr("n");
					_this.animate();
				});


				temp_fn();
			} else {
				var win_obj = this.win.get(0);
				win_obj.addEventListener(device.START_EV, _this.startEventFn = function (e) {
					_this.body.stop(true);
					clearInterval(_this.intervalFn);
					_this.leftPx = parseInt(_this.body.css("left"));
					_this.intervalFn = null;
					_this.startEvent(e);
				}, false);
				win_obj.addEventListener(device.MOVE_EV, _this.moveEventFn = function (e) {
					_this.savePoint(e);

					var lastpoint = _this.touchPoints[_this.touchPoints.length - 1];
					var lastpointx = lastpoint.x;
					var lastpointy = lastpoint.y;

					var startpoint = _this.touchPoints[0];
					var startpointx = startpoint.x;
					var startpointy = startpoint.y;

					var pointsx = lastpointx - startpointx;
					var pointsy = lastpointy - startpointy;

					if (Math.abs(pointsx) > Math.abs(pointsy)) {
						e.preventDefault();
						_this.moveEvent(e, pointsx);
					}

				}, false);
				win_obj.addEventListener(device.END_EV, _this.endEventFn = function (e) {
					_this.endEvent(e);
					if (!_this.intervalFn) {
						temp_fn();
					}
				}, false);
				temp_fn();
			}


			if(this.leftBtn){
				$$(this.leftBtn).myclickok(function(){
					_this.page++;
					_this.animate();
				});
			}

			if(this.rightBtn){
				$$(this.rightBtn).myclickok(function(){
					_this.page--;
					_this.animate();
				});
			}



		},
		//动画
		animate: function () {
			this.page = (this.page > this.maxPage) ? 0 : this.page;
			this.page = (this.page < 0)? this.maxPage : this.page;

			this.points.css({ background: this.pointBg,"border-color":"#fff" });
			this.points.eq(this.page).css({ background: this.pointSelectBg,"border-color":"#fff"  });

			this.body.get(0).style[device._transitionDuration] = "";

			this.changeStartFn(this.page);
			var _this = this;
			this.body.cssAnimate({
				left: -this.page * this.winWidth + "px"
			}, this.animateTime,function(){
				_this.changeEndFn(_this.page);
			});

		},
		startEvent: function (e) {
			this.touchPoints = [];
			this.touchStartTime = new Date().getTime();
			this.savePoint(e);
		},
		moveEvent: function (e, pointsx) {
			if (this.touchStartTime == 0) {
				return;
			}

			var t_left = this.leftPx + pointsx;
			this.body.css({
				left: t_left + "px"
			});
		},
		endEvent: function () {
			if (this.touchStartTime == 0) {
				this.scrollBack();
				return;
			}
			if (this.touchPoints.length < 2) {
				this.scrollBack();
				return;
			}

			var end_time = new Date().getTime(),
				use_time = end_time - this.touchStartTime,
				_this = this;

			this.touchStartTime = 0;


			var lastpoint = this.touchPoints[this.touchPoints.length - 1];
			var lastpointx = lastpoint.x;
			var lastpointy = lastpoint.y;

			var startpoint = this.touchPoints[0];
			var startpointx = startpoint.x;
			var startpointy = startpoint.y;

			var pointsx = Math.abs(startpointx - lastpointx);
			var pointsy = Math.abs(startpointy - lastpointy);
			if (use_time < 500 && pointsx > 30 && pointsx > pointsy) {
				if (startpointx > lastpointx) {
					_this.page++;
					_this.page = (_this.page > _this.maxPage) ? _this.maxPage : _this.page;
					_this.animate();
				} else {
					_this.page--;
					_this.page = (_this.page >= 0) ? _this.page : 0;
					_this.animate();
				}
			} else {
				//back roll
				_this.scrollBack();
			}


		},
		savePoint: function (e) {
			var touch;
			if (device.hasTouch) {
				touch = e.touches[0];
			} else {
				touch = e;
			}
			this.touchPoints.push({ x: touch.pageX, y: touch.pageY });
		},
		scrollBack: function () {
			this.animate();
		},
		destroy:function(){





			if(this.intervalFn){
				clearInterval(this.intervalFn);
			}


			window.removeEventListener("resize",this.resizeFn,false);
			if (!device.hasTouch){
				this.win.unbind("hover");
				this.points.unbind("mouseover");
			}else{
				this.win.get(0).removeEventListener(device.START_EV,this.startEventFn,false);
				this.win.get(0).removeEventListener(device.MOVE_EV,this.moveEventFn,false);
				this.win.get(0).removeEventListener(device.END_EV,this.endEventFn,false);
			}

			if(this.leftBtn){
				$$(this.leftBtn).unbind(true);
			}

			if(this.rightBtn){
				$$(this.rightBtn).unbind(true);
			}

			this.body.get(0).style[device._transitionDuration] = "";
			this.body.css({left:0});



			this.pointBody.remove();
		}


	};
	return scrollBanner;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-9-7
 * Time: 上午4:26
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */




//loading动画   具体参数见函数
//var a = new DEVICE.loading();
//a.show("loading");
//a.hide();
//a.destroy();




DEVICE.loading  = (function(){
	var __loading = function(datas){
		this.obj = (datas.obj.length == 1)? datas.obj.get(0) : datas.obj;    //要放入的对象
		this.spokes = ($.isNumber(datas.number))? datas.number : 7;     //花瓣的次数
		this.width = ($.isNumber(datas.width))? datas.width : 30;       //loading所占的宽度
		this.height = ($.isNumber(datas.height))? datas.height : 30;    //loading所占的高度
		this.lineWidth = ($.isNumber(datas.lineWidth))? datas.lineWidth : 5;  //loading线条的宽度
		this.lineHeight = ($.isNumber(datas.lineHeight))? datas.lineHeight : 2; //loading线条的长度
		this.rgb = datas.rgb || "0,0,0";
		this.spd = datas.fps || 100;


		this.canvas = null;
		this.ctx = null;
		this.intervalFn = null;

		this.init();
	};
	__loading.prototype = {
		init:function(){
			this.createCanvas();
		},
		//创建画板
		createCanvas:function(){
			var _this = this;
			this.canvas = document.createElement("canvas");

			this.canvas.width = this.width;
			this.canvas.height = this.height;
			if (!this.canvas.getContext){console.log("not suppot canvas");return;}
			this.ctx = this.canvas.getContext('2d');
			this.ctx.translate(_this.width/2,_this.width/2);	// Center the origin
			this.ctx.lineWidth = this.lineWidth;
			this.ctx.lineCap = "round";

			this.appendCanvas();
		},
		//添加画板
		appendCanvas:function(){
			this.obj.appendChild(this.canvas);
		},
		//画画
		draw:function(){
			var ctx = this.ctx,
				spokes = this.spokes,
				_this = this;

			ctx.clearRect(-_this.width/2,-_this.height/2,_this.width,_this.height);		// Clear the image
			ctx.rotate(Math.PI*2/spokes);	// Rotate the origin
			for (var i=0; i<spokes; i++) {
				ctx.rotate(Math.PI*2/spokes);	// Rotate the origin
				ctx.strokeStyle = "rgba("+this.rgb+","+ i/spokes +")";	// Set transparency
				ctx.beginPath();
				ctx.moveTo(0,_this.width/3 - _this.lineHeight);
				ctx.lineTo(0,_this.width/3);
				ctx.stroke();
			}
		},
		//开始转
		run:function(){
			var _this = this;
			this.intervalFn = setInterval(function(){
				_this.draw();
			},this.spd);
		},
		//停止
		stop:function(){
			var _this = this;
			clearInterval(this.intervalFn);
			this.ctx.clearRect(-_this.width/2,-_this.height/2,_this.width,_this.height);
		},
		//销毁
		destroy:function(){
			this.stop();
			$(this.canvas).remove();
		}
	};

	var device = DEVICE;

	var a = function(obj,scale){
		obj = obj || $("body");
		this.win = $.getDom(obj);

		if(!this.win){console.log("loading param error");return;}

		//this.win 转原生对象

		this.text = null;       //显示文字的对象
		this.canvas = null;     //动画canvas对象
		this.div = null;        //主窗口

		this.downfn = null;     //阻止事件冒泡和默认事件
		this.movefn = null;
		this.endfn = null;
		this.scale = scale*3 || 1;

		this._init();
	};
	a.prototype = {
		_init:function(){
			this.win.style.position = "relative";
			this._createObj();
			this._addEven();
		},
		//创建对象
		_createObj:function(){
			var win = document.createElement("div"),
				main = document.createElement("div"),
				_canvas =document.createElement("div"),
				text = document.createElement("div");

			$(win).css(device.fixObjCss({
				position:"fixed",
				"z-index":"99999",
				left:0,
				top:0,
				width:"100%",
				height:"100%",
				display:"none",
				"justify-content":"center",
				"align-items":"center"
			}));
			$(main).css(device.fixObjCss({
				padding:20 * this.scale + "px",
				background:"rgba(0,0,0,0.8)",
				"border-radius":5 * this.scale + "pt",
				display:"box",
				"flex-direction":"column",
				"justify-content":"center"

			}));


			_canvas.style.cssText = "width:"+60*this.scale+"px;height:"+60*this.scale+"px;";
			text.style.cssText = "height:"+60*this.scale+"px;line-height:"+60*this.scale+"px;color:#ccc;font-size:"+22*this.scale+"px;text-align:center;";


			var canvas = new __loading({
				obj:_canvas,
				width:60 * this.scale,
				height:60 * this.scale,
				rgb:"230,230,230",
				lineWidth:5 * this.scale,
				lineHeight:3 * this.scale,
				number:9,
				fps:100
			});


			$(main).append(_canvas).append(text);
			$(win).append(main);

			$(this.win).append(win);

			this.text = text;
			this.canvas = canvas;
			this.div = win;
		},
		//阻止事件冒泡
		_addEven:function(){
			var _box = this.div,
				_this = this;
			_box.addEventListener(device.START_EV,_this.downfn = function(e){e.stopPropagation();e.preventDefault();},false);
			_box.addEventListener(device.MOVE_EV,_this.movefn = function(e){e.stopPropagation();e.preventDefault();},false);
			_box.addEventListener(device.END_EV,_this.endfn = function(e){e.stopPropagation();e.preventDefault();},false);
		},
		//显示
		show:function(text){
			$(this.text).text(text);
			$(this.div).css(device.fixObjCss({
				display:"box"
			}));
			this.canvas.run();
		},
		changeText:function(text){
			$(this.text).text(text);
		},
		//隐藏
		hide:function(){
			this.div.style.display = "none";
			this.canvas.stop();
		},
		//销毁
		destroy:function(){
			this.canvas.destroy();
			this.canvas = null;
			var _this = this;
			this.div.removeEventListener(device.START_EV,_this.downfn,false);
			this.div.removeEventListener(device.MOVE_EV,_this.movefn,false);
			this.div.removeEventListener(device.END_EV,_this.endfn,false);
			$(this.div).remove();
		}
	};


	return a;
})();/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-9-7
 * Time: 上午4:30
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */




DEVICE.info = (function(){
	var device = DEVICE;
	var info={
		box:null,
		img:null,
		text:null,
		isExist:false,
		isRun:false,
		fn:null,
		scale:1,
		errimg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVdJREFUeNq0V1tsVFUUXee+pnc6MI8+qC3QViiNJlVERVHUH0pi5ENifaQGgx8m/miM8UMMfmiMmpiY+IFRA0ow9scaEh8hxoQPUDAa5FFjKG3BCh2h05l2ptNO587ce9z70g5M53V/3MlJ7uxz9lpn77P3PmeE1J9GJZE0ppDFeZnCbzKBizJtTMPqcYBOmoosLksowKUQjKGP7RELHkU4FYgTsHBaTuOkjKtjcrbfgrPThNobgS/QKHyoh+qum4ONKZml9dl0BvZRA8rgOrFi4M38Obsqsa09VaRwyM8LMo1fZAynML1TgXivC4Hue0UEXWIFGkDQECU2vNERsvudInMBs8Ok2/OJPXq4InH+JmLyCufkDJFOmZcxf2gdAn0PiEZ0E2Hdooe1ZIEiMCxncUJOYQzpwTXwP/eqfTpTQpzTnizs+iyRUmjbksh9f4cIbbxfNLgeFklrGKK7DWJdy/U8GLsKOTwBRKeLlsXJjV9lnB05E4S+42X7j4mb5xXHJQXtMo0hpEzay5EtonHjI6IZYSJdml8aMmBCvLgdyr4X3MHfrFu+jm0Zg7EY83PtPnMZsUSMAnQeKYb9qksEejaJMIVWcaOwfNjjk1B23EOWwh38zbpyaxmDsRiTsUs8/lvO83d/I3w77xQhUPa6pVRuxLNzgKHdQKBv1lVaz1iMydhfaw/2F4gnydsZWIYPylsdVCR0HmV3X/DYDWSxsK6aDWMyNnP8oD3sJo1y1VmAkNgVkNr6VtqfI2WNUZrJrKtlx9jMQVy7F0PtcDh2R4RB+xJVd740Sog92DB2A3H4oe5iG01ARKhGtzRQIBwPdepU0Hmxpa6HedhbTqrbIpomxGYdispJUM6bct5V8riWMIcpVDUHZ7NGpJ1+N4ulB1OUXSU9ErMwF9VQp6ZJETQWaxaeQl3GY+mdmLmoNQc1jQ5dXUwqL5IvW07eiZmLORUVSlIRSknLqzQSoBPKZG94a+XdvuzVnrlcTkrzS1IjYuGtLOghgGMfHiwQH/vgAN/FnmyZg7mYU4ybj0cgxCQ0RZXphZqhiiKDU/RAOEP9jmUjQrib+jE3iJqvjkAdnZVDJyObxXjTMxQ667gS9G+1own8n6K2RuAk53/umP3mIU3yLiC/hE/fKg0qKzqzaqKtboR+2xro1GC5V+ZGJpA7fwX5aLy6t3yx+HQqZn3AxXFmM1BC9QedvP260hLuzP8Tq2xN16BYYSL02hPw925yVenDJ5B442DNnFZbwhRheUmEAgdcqFwiBakKi663vSLoB2hUSxBrYqpAylL/2GZkL/5bvbcTJmNLXd3bfmG/df2SkA5yMUqUleYATXyrda6CNMtfjZwXY7lkSdcazc1UJGUsF5OwO4b3DxSCxyHKT6eRj6cg/L5nRTgwZGxYTWdhlL3Yr2VSOP7RoQLx0fc/c2u73FrGYCzGZOyiM/8T2wvn5+tqg96+qk2przuSi8Z7rOErsGfSRR5OUDmdplIaQtLtQj10zd9FJdWCuuIzDQVgdK+G3tow5MwtPNr+47tFjz0xtETMP3QNRlcrjFtvCWiNwS/ysZk+ayQKa/waZDbn7R8CZa6+thm+DW3QmkKD+ank8+3fvZ0uWXcOvSWZa7SvIkPabXtzH2neyceS3dZoFLnLMdipOZQ8Q8hGXVkPfU0TDCozrSk4Sto9bZ++Mlhxg2eXE98cKgKh8KsE1C80tU/m7F7q06ZDf1aWIsAeKvS8VUxfRujqT9J2BvOTMwNrB/ZU/wtzBtuqzJIn4cD1CLiehExhGreTfj3NBhdXJalAR2XG+qtt30sZr13sPwEGAJ9VE3aPBYcqAAAAAElFTkSuQmCC",
		okimg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABBtJREFUeNqslk+ME1Ucx79v5s1Ot9tu9x+VIqgBVDTRcOHIQQ7EhLh6ABOPnA3cPJgYj8YbnDDcPZgQTTyQbJSbNz2QCBxwyWq6LgLWdlraTufPe8/fzL5pXodZtrvhJd9MOzPvfeb33u8fm+lit8GMKzP+Z0MZgnEtHHwXUCKrQMxYXBZI7QTmU4C4lqOv2X3oxQUpzkkUWF4IzGC2AXG1ZrR4DpgAQlKgFWoJrYlt5jvAMtAsqbwgrdpqn589HNtnXfBDZeW8oaCkz+IHQ0TNLS5ufV+N13ym+vS+rxXodSegzHAay4CVSHOk6icdfPh6bF1a5q805uyD4KxkeIuCUCP040doiebmfUddubGANXqUgAekESnSUGkCWQ5WKUksXnyMLxqcX1hx3obFOEbSQ0CKpJ9OcqwyStYCXJJQIVrhPTyU8tvrB/E1Pe5psK+hqTPZ9ucT1rnastrFTXxZt3FhceY4gbroRk0MRCuFCRWnSn77wiN16IstlO06WNR+97iHuds1/Gac49hzE6BpXXJm1Y+aOH9E4NLC7CGEcoAhgRILdhoygathCnX5PCy/f7I2xPr6PP4yvDaFWsb5pY5SjVBr9HDZoo2NaKGB7KRXYXxukZJ3+rKNWAkkc1/18JkrUNG7NvZsy4i55KZ7+k+ccxjqjlWhreoiljFZgKmUvOuLHhy7Alrj5TMbOKdDyclYeaBT7eG05W4vEMlwalimSAbp1SJEzcOZXOwybgDTYOdDnMRy8rWCtkdh70OB0VxFq9k+3splJ8bz6UwFWBFSW4f9jUjpnQlxIJ9/n8mlYYw4jim+HfFsXZhyCHKciCKPJHZK3uNEGwq0gxHqzNUnvJ9Npa2hNUBrPclVkBSYwdKsP1LYGPVR5xT+trNPCynyAsoxQ4b7Og6lGYfKKDFhZx4/DT36QV8Yi2R79qZkTkDJbEBreBX8oitHnAdmZSZYfwdr/adoDdp0g16Vcg9hkTgbzRn8R0l0gK17p3BTA6N8ppH6ZuAtodVawrXeQ5rY3l5gKqgB6/0DtJbxjV9GV5epzEJkyXuiZ3l0DA+W7uCI6uHNJHDYzLZjKzZZxjONYS2g2wTaNr67vYrr9OiprhZZQVYmcGK0j+LXyl28JP7FCcpYYGYLRRSlrRJ01gEVot4WwShVezZu/H4eX0k7tW5owOTzCvCsLlOVEz/g4+rf+LRUxkppkfIUpWPubk+IabNCgvmdNAyedF/D1T9W8aO27LkFuKjFKGUtxmwbi4d/xgelx3jPHuGoJdBID55jS7jY8Bu4tfk+bgbVsVVZixHlGqoJYFETlTVOZiNla5neHRlNVAbKd2+FXZsyGh9leG+ov5prmNmXmm1ilA/03drEfCdt9p2WAXuhjXARWLyoVv9/AQYAzRaQFve6TfoAAAAASUVORK5CYII=",
		show:function(text,isok){
			if(this.isRun){
				this.list.push({text:text,isok:isok});
				return;
			}
			this.isRun=true;

			//            if(!this.box){
			this.createObj();
//            }


			var that=this;

			that.text.text(text);
			if(isok){
//                that.img.myCss({
//                    background:"url("+that.okimg+")",
//                    "background-size":"100% 100%"
//                });
				that.img.get(0).style.background = "url("+that.okimg+") no-repeat";
				that.img.css(device.fixObjCss({
					"background-size":22*this.scale+"px "+22*this.scale+"px"
				}));
			}else{
//                that.img.myCss({
//                    background:"url("+that.errimg+")",
//                    "background-size":"100% 100%"
//                });
				that.img.get(0).style.background = "url("+that.errimg+") no-repeat";
				that.img.css(device.fixObjCss({
					"background-size":22*this.scale+"px "+22*this.scale+"px"
				}));
			}

			var temp_height = parseInt(that.box.height());
			that.box.css(device.fixObjCss({display:"box","margin-top":-temp_height/2+"px",opacity:1}));


//            var cssobj = {opacity:0.9};
//            cssobj[device.transform] = device.css_s+"0,-60pt"+device.css_e;
//            cssobj = {
//                opacity:1
//            };


//            that.box.cssAnimate(cssobj,300,function(){
			that.fn=setTimeout(function(){
				that.hide();
				if(that.list.length!=0){
					setTimeout(function(){

						var data=that.list.shift();
						that.show(data.text,data.isok);
					},1000);
				}
			},2000);
//            })

		},
		createObj:function(){
			var box = document.createElement("div"),
				info = document.createElement("div"),
				img = document.createElement("div"),
				text = document.createElement("div"),
				$box = $(box),
				$info = $(info),
				$img = $(img),
				$text = $(text);

			$box.css(device.fixObjCss({
//                height:"30pt",
				width:"100%",
				"z-index":"100000",
				"position":"fixed",
				left:"0",
				top:"50%",
				"margin-top":"-15pt",
				display:"none",
				opacity:"0",
				"justify-content":"center",
				"align-items":"center"

			}));

			$info.css(device.fixObjCss({
//                height:"30pt",
				"border-radius":5*this.scale+"pt",
				background:"#333",
				color:"#eee",
				"padding":"0 "+7*this.scale+"pt",
				"max-width":320*this.scale+"px",
				"box-sizing":"border-box",
				"box-align":"center",
				display:"box",
				"flex-direction":"row",
				"box-shadow":"0 0 "+2*this.scale+"pt "+2*this.scale+"pt #aaa",
				"align-items":"center"
			}));

			img.style.cssText += "width:"+16*this.scale+"pt;height:"+16*this.scale+"pt;padding:0 "+7*this.scale+"px;";
			$text.css(device.fixObjCss({
				"padding":10*this.scale+"px "+7*this.scale+"px "+10*this.scale+"px 0",
//                height:"30pt",
				"flex":"1",
				"line-height":20*this.scale+"pt",
				"font-size":12*this.scale+"pt"
//                "text-overflow":"ellipsis",
//                "white-space":"nowrap",
//                overflow:"hidden"
			}));

			$info.append($img);
			$info.append($text);
			$box.append($info);
			$("html").append($box);

			this.box = $box;
			this.text = $text;
			this.img = $img;
		},
		hide:function(){
			if(this.box){
//                var cssobj = {
//                    display:"none",
//                    opacity:0
//                };
//                cssobj[device.transform] = "";
//                var _this = this;
//                setTimeout(function(){
//                    _this.box.css(cssobj);
//                },0);
				this.box.remove();
				this.box = null;
				this.text = null;
				this.img = null;
				this.isRun=false;
			}
		},
		list:[]
	};

	return info;
})();



//点击小图显示全屏图
//var a = new DEVICE.showBigPicture({
//	type:"pc",       //@param:str  写死pc,不写默认为手机使用滑动切换
//	imgs:[
//		"http://file.ynet.com/2/1509/11/10370925-500.jpg",
//		"http://file.ynet.com/2/1509/11/10370926-500.jpg"
//	]
//});

//a.showImg(0);   //0为初始显示第几张，需要自己算是点的第几张图片




DEVICE.showBigPicture = (function(){
	var showPicture = function(data){
		this.imgs = data.imgs || [];
		this.isPc = (data.type == "pc");
		this.arrowImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG+SURBVFiFvdbNi05hGMfxy3grRihjYZKEksZKsrAhWWGhlCzEhthYYM0fYCn/gJSUrbzEbmYhxcLCWI0USjE1UzN5eeZjMTaernPmOed53L+6F/fr99t9d7pOICrabjzGJK5iWc3a1q1u8oV/cxfLBy0wFNUZ7eqfjYiHEbG6Zk/z1Nidl+cZ1pZ4gsC1CokJbCghELiATiLxBptLCARO42ciMYmtJQQCxzCfSHzAzhICgUOYSSS+YG8JgcB+fEskvuNACYHAGD4nErM4XEIgsANTicQ8TpQQCIziXSLxC2dKCARG8DqR6OBiCYHAeownEnClhEBgDZ4kArNYV7Wvrho2zVxE3EvGhyNie5tq2LRdlteMiRJPcDMBw0ts+p8CQ7hTAX+qh/+GfuCr8KACfh8rezmnLXwYzyvgt//eTE9ntYGP4FUF/EbT85rCt+F9Au7gUpvbbLJ4DJ8S+A+cagNvInAQ0wl8BkfawnsVOI65BP4V+/qB9yJwzmJp7c4UdvULX0rgJBYS+FtsGQR8KYHsUxvHxkHBqa+GH7v6jyLiaERMNy2TdVlRM3c9IhYiYk8sltlbEfF7kPCIiD92sihgXGAdaAAAAABJRU5ErkJggg==";
		this.closeImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEPSURBVFiF7ZexjQIxEEW/4bQJFEALJJccHdADVVAB0bZBQBmIJg4CaICYEpDQI2CCPZ+Fh9PuWUj7JQe2v2feanfG2gCopAZFs/cAPcA7AVSSZpKCwxvMW7kiA7kxAS48dLL5M+/JvJeMV4ALYMlPfQOjhG9ke00t2wCY8ltbYNjwDG0t1rQNAAF1Ivi6sb9O7Nee2F4AAZtEkpWNWBtv3FcAPoBdIlmsnXlbBxAwBg5Pkh/M4475KoB4lNY5kfyMo+ziUbwTvtUrKP4RFi3DOpHk3xpRp63YUwXzaL6XtJB0a6zdbG2fOfunKuj0Og7g+i+oJH3aE+YOBElfko6SrrnAXoDOVLwT9gA9QHGAOyELxcimF9NPAAAAAElFTkSuQmCC";

		this.main = null;
		this.leftBtn = null;
		this.rightBtn = null;
		this.closeBtn = null;
		this.loadDom = null;
		this.imgDiv = null;

		this.nowShowDom = null;
		this.nowShowNumber = -1;
		this.canClick = true;

		this.init();
	};

	showPicture.prototype = {
		init:function(){
			this.createMain();
			this.createButton();
			this.createLoading();
			this.createImgDiv();

			if(this.isPc){
				this.eventBind();
			}else{
				this.eventBindPhone();
			}



			$("body").append(this.main);
		},
		createMain:function(){
			var div = $("<div></div>");
			div.css({
				width:"100%",
				height:"100%",
				position:"fixed",
				left:0,
				top:0,
				"z-index":"9999999",
				background:"rgba(0,0,0,0.0)",
				display:"none"
			});
			this.main = div;
		},
		createButton:function(){
			var leftBtn = null,
				rightBtn = $("<div></div>"),
				closeBtn = $("<div></div>");

			rightBtn.css3({
				position:"absolute",
				right:"10px",
				top:"50%",
				"margin-top":"-16px",
				width:"32px",height:"32px",
				background:"url('"+this.arrowImg+"') no-repeat center center",
				"background-size":"100% 100%",
				cursor:"pointer",
				transition:"all 0.2s linear",
				"z-index":10
			});
			leftBtn = rightBtn.clone().css3({
				left:"10px",right:"",
				transform:"rotate(180deg)"
			});
			closeBtn.css({
				position:"absolute",
				right:"10px",
				top:"10px",
				width:"32px",height:"32px",
				background:"url('"+this.closeImg+"') no-repeat center center",
				"background-size":"100% 100%",
				cursor:"pointer",
				transition:"all 0.2s linear",
				"z-index":10
			});


			if(this.isPc){
				this.leftBtn = leftBtn;
				this.rightBtn = rightBtn;
				this.main.append(rightBtn);
				this.main.append(leftBtn);
			}

			this.closeBtn = closeBtn;
			this.main.append(closeBtn);
		},
		createLoading:function(){
			var div = $("<div></div>");
			div.css3({
				width:"20px",height:"20px",
				"border-radius":"32px",
				border:"2px solid #fff",
				"border-top":"none",
				"border-left":"none",
				position:"absolute",
				left:"50%",
				top:"50%",
				"margin-top":"-16px",
				"margin-left":"-16px"
			});

			div.cssAnimate({
				"0%":"transform:rotate(0deg)",
				"100%":"transform:rotate(360deg)"
			},800,"ease-in",true,false);


			this.loadDom = div;
		},
		createImgDiv:function(){
			var div = $("<div class='___img_main___'></div>");
			if(this.isPc){
				div.css({
					width:"95%",height:"95%",
					position:"absolute",
					left:"2.5%",
					top:"2.5%"
				});
			}else{
				div.css({
					width:"100%",
					height:"100%",
					position:"absolute",
					left:0,top:0
				});
			}

			div.append(this.loadDom);
			this.imgDiv = div;
		},
		showImg:function(n){
			this.canClick = false;

			var show_left = (n>this.nowShowNumber)? "100%" : "-100%",
				hide_left = (n<this.nowShowNumber)? "100%" : "-100%",
				div = this.imgDiv.clone().css({left:show_left}),
				img = new Image(),
				_this = this;
			this.main.append(div);

			n = (n<0)? _this.imgs.length-1 : n;
			n = (n>= _this.imgs.length)? 0 : n;
			var src = this.imgs[n];


			//动画移除img
			this.hideImg(hide_left);

			img.onload = function(){
				//设置图片大小，位置
				_this.setImgSize(this,div);
				//清除loading
				div.find("div").remove();
				//添加图片
				div.append(this);
			};
			img.src = src;


			//第一次点开
			if(!this.nowShowDom){
				this.main.css({display:"block"});
				this.main.cssAnimate({
					"background-color":"rgba(0,0,0,0.5)"
				},500,function(){

				});
				div.css({left:0});
				if(_this.nowShowDom){
					_this.nowShowDom.remove();
				}
				_this.nowShowDom = div;
				_this.nowShowNumber = n;
				_this.canClick = true;
			}else{
				div.cssAnimate({
					left:0
				},500,function(){
					if(_this.nowShowDom){
						_this.nowShowDom.remove();
					}
					_this.nowShowDom = div;
					_this.nowShowNumber = n;
					_this.canClick = true;
				});
			}



		},
		hideImg:function(hide_left){
			if(!this.nowShowDom){return;}

			this.nowShowDom.cssAnimate({
				left:hide_left
			},500)
		},
		setImgSize:function(img,div){
			var win_width = parseInt(div.width()),
				win_height = parseInt(div.height()),
				img_width = img.width,
				img_height = img.height,
				new_size = DEVICE.getNewImageSize(img_width,img_height,win_width,win_height);

			$(img).css({
				width:new_size.width+"px",
				height:new_size.height+"px",
				position:"absolute",left:"50%",top:"50%",
				"margin-left":-new_size.width/2+"px",
				"margin-top":-new_size.height/2+"px"
			})
		},
		eventBind:function(){
			var _this = this;
			this.leftBtn.click(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber - 1;
				_this.showImg(n);
			});
			this.rightBtn.click(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber + 1;
				_this.showImg(n);
			});
			this.closeBtn.click(function(){
				_this.destroy();
			});
		},
		eventBindPhone:function(){
			var _this = this;

			$$$(this.main).myslideleft(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber + 1;
				_this.showImg(n);
			});
			$$$(this.main).myslideright(function(){
				if(!_this.canClick){return;}
				var n = _this.nowShowNumber - 1;
				_this.showImg(n);

			});

			this.closeBtn.click(function(){
				_this.destroy();
			});
		},
		destroy:function(){
			if(this.isPc){
				this.leftBtn.unbind("click");
				this.rightBtn.unbind("click");
			}else{
				$$$(this.main).unbind(true);
			}
			this.closeBtn.unbind("click");
			this.main.remove();
		}
	};

	return showPicture;
})();





//获取适合容器的图片大小
DEVICE.getNewImageSize = function(imgwidth,imgheight,objwidth,objheight){
	var newimgwidth,newimgheight;

	if(!imgwidth || !imgheight){
		return {
			width:objwidth,
			height:objheight
		}
	}


	if(imgwidth>0 && imgheight>0){
		if(imgwidth/imgheight>=objwidth/objheight){
			if(imgwidth>objwidth){
				newimgwidth = objwidth;
				newimgheight = imgheight*objwidth/imgwidth;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}else{
			if(imgheight>objheight){
				newimgheight = objheight;
				newimgwidth = imgwidth*objheight/imgheight;
			}else{
				newimgwidth = imgwidth;
				newimgheight = imgheight;
			}
		}
	}else{
		newimgwidth = objwidth;
		newimgheight = objheight;
	}


	return {
		width:newimgwidth,
		height:newimgheight
	}
};



/**
 * Created with JetBrains WebStorm.
 * User: bens
 * Date: 13-4-23
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 *
 *
 *
 *
 * andorid 4+
 *  new DEVICE.editPicture({
 *      id:str/obj,                 //要显示的地方   id，dom，jqdom
 *      src:str,                    //图片地址
 *      success:function(src),      //清除对象，返回图片的base64,类型为  png
 *      cancel:function             //清除对象
 *  })
 *
 * android 2.X  要使用的话，需要引擎模拟实现
 *  HTMLCanvasElement.prototype.toDataURL 的方法
 *
 *
 *
 */


(function(){
	var device = DEVICE,
		cancel = "data:image/png;base64,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",
		yes = "data:image/png;base64,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",
		roteleft = "data:image/png;base64,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",
		roteright = "data:image/png;base64,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",
		_cancel = "data:image/png;base64,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",
		_yes = "data:image/png;base64,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",
		_roteleft = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAvCAYAAABaIGwrAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAA8CSURBVHjavFvJb1xFtz+npu42nuIkTto2kBmiL0QReg94CGUBPDEsgoQQbMICJP4Q2CBWCDaAxIZpAQIEEoRIIIQUCT30xBMvhEwk8EHiGD4ndto93VvDqbdw1aX6utuxCY+Sru7Y5apf/c5cRu89DGqIKACgBgAYH8EqbcOGDX3fj42NFc9HRkb6ftNsNouBNBqNFYNaXFz0cP3NJ+eu994mc10+lwFBRJ6AgAAwBAByNTBqtRqWr6vVas95rS3LMp+eu91uzwDL938SFAMAnXDtAaAdweoBBBFrAMAAoAoAuwBgql6vj42NjalBvXPOMUU43qfXnHOM78vfOOc8AEAch3POx2fpN+n766VJo9HQc3NzDQC4CABnAcCGIxcJGNUAxmYA+LdHH3301j179txUqVQqq4hUPGN6DQDAGCuAis9SUHqWzHvwy614RkQ9D+I3KXjX0/I8z0+cOPHzJ598shUA/gcArgIAovc+DrgKAJsA4D+eeeaZf9+6devkeoEog4CIKTADRSdONIBQgENEPn3fD7jrbb/88svFN998838B4GsAuBIBqQQ9cd9TTz1199TU1Nb1gMEYQ8YYpiCkTEmB6deIyKdgpNfp+3j9V7EktosXL1564403/gsAvhDJ820PPfTQP7Zs2bLVObcmMCIQYYARBCy/j/f9WBIm7eNlmHBxnx7hHf7VoNTr9al77713z5dffnlGJJq3PjMzs6UfGGUgvPfAGEPvPRIRcs4xTp4xhkGJ9jwri1AqIoEB5JzziOgBIDLCh3fF37fWUjQGZR1zPW379u11AJhOGTI2NDQ0UgZkkIh477HEChYnzjlnARgWwUmsUQFqFA8i8s45hojeL3dK1loPABSY4oOl8YjIEhEqrOT1KtxqtToMAMMpIAIAeAQkZXcAoEdEIgiRHWHyTAjBGGMohGCc8wKclCll3eGcI865d85FlmBgBzrnPBERYyzoU0/xj6e6pcya9QIT/C+RigxYa/uygogi1REA4mqnzGCMMRZAYEKIniMFI/ZjrcXgxVYajUabiBznnJxzZIyhwJICmGX8iBCRpYo36pREr+CfEaVIhB5AyuxgjK0QkbASmMgIE0JwIQSTUnIhBFNKcc45k1KyyBAhBAsrz6y1fGhoaOjgwYM7Z2dnF7/99tt/KqUsEVlrLTHGnLWWEJEQkRKvGWlZoXjvvbfWUpxwiTHrZksZEIgMSdmRMiPqighKZAbnnAsheAqGlDIeqRhxAGDOOVGv1yduv/32GSklu3DhQlsIUZNS5t575JwT55xrrR0iugQU571HIQRaa8k5R4jIAMDHyRAReO9T7xfXCkpfQJxzK9gRGZOCE0WEc15MXikllFK8UqnEey6l5EG3cETkiFi99dZbp6ampkYS/SQry81779EY44wxFJjFGGMOEV1YDBeZEhaGnHOeMZaKTGqN1gzKqgxB7PFgC4ZEdgAA42HEARSRgCKUUlwpxUVoACCGh4dH9u3bt7VarYpSLCRqtZpSSjkiAiEE55w7rTWLLAwhhQ2Tc9HcExEuqxMqlG3irzDnHAXmXBOUgTokABJ9jeI6KLZoWRgiYhg8CyIjKpVKcUgphRBCIqK6+eabN994441j/QYipWRDQ0NSSumICI0xjv3RMNEHEMQmtSiREcQYKwCI+gMRWdQzkSlrBaTnIWMMwmpFhwqFEClDMDIkKNTIEqGUkkopKYRQUsrq3r1766OjowOjZaUUDg0NSc65c84hIlpEZEE/FMo8/m3nHAaLBJElzjkgIs8YA+cchQWEYLIxcQAHWp5VAYk+R7znnGPKkMTMRh0igs6QQgjFGKts3rx5fNeuXZvSUH8QQ2q1mmCMKedc9Gdsyc3HOCGlVGRscQghwDnngtWD4NClUXL0eQaKzmpKFVNlGsAolFXqkiYMYZxzwTmXSqnazp07t0xNTQ2v0SHCIFoYHEPLGBOccyOEYImuKKxICkYKChG5svOX6JUYKvQVnVWtTEQ1sqTkiBXueQCCM8YEAKiRkZGx/fv314eHh+VaPcTJyUk1OTk5URoHNRqNfH5+vjU7O3vVGJNxzrEfO+I9Y8wHUYsWkhJmrPhNGZAoTgMBQcQCjPBxDyiBJTysqtq5c2d93759m/+K6JNzziYmJmoTExO1W265ZfPs7Gzzhx9++M0Y02KMoZQSgt4AIgJrrWeMec45hBgoWsXIiLLorNAlfQEhosIPCajHZzGIwsQPYEQkGGNDBw8e3Dk9PT0M/09tenp6ZHp6euTUqVOXT5w4MWetbQshvHPOc859YKoPB7PWevyjpQknGGRxBgISQSjLbFRs0f12zonp6elNDz/88G6lFIO/oe3du3dTvV4fOXbs2C9zc3MLAQxvrS0AQcQeUIL5xcTB9P3Epi8gnU4HOOfAGENjDAghwFoLaUqAcx7den7PPffc/HeBEdv4+HjlgQce2PXxxx//ODs7eyXkURgRkTEGnXOotS4OYwxqrb0xBpxzEMy2d871BaRnMu12G9rtNrRaLd/pdKDT6UC324VutwvtdhuyLEsPfPXVV38+fvx4G/7mppRihw4d2r1x48aJLMuEMYZZa5kxBvM8R601aK0xz3PsdDqQZRlmWQadTgfa7faKczxWANIvG56cfQycgmvs8jzPP/jgg9+PHDnS1Fr7vxOUSqXCHn/88d1KqSFEFDG1IIRIUw1FCSTmdvuVS9J2TbpHALz3YK2NmSsCAMMY61YqlfbJkycvf/TRR4sLCwvuT5QD/NLSEi0tLVGz2aRms0mNRoMWFxdpDaDwRx55ZFee5wIAWBKpp1F7kbaM6c3V+hSrARF1UWRGTOUF99hxznMhBEop4cqVK3DkyBF79913b9ixY8ea/ZDLly+7ubk5HUJ8yPOc8jz3WZb5LMt8t9uFyclJNTMzI7dv3y4rlUrPhHbv3j26Y8eOjWfPnp0L7n2a7owXa2avWE1cot2O1TRjjJdSemMMGWOctdZ472P+FI0x/uuvv/ZXrlwZOXDgQE1Kec0yJmPMK6WMc85aa533nkKwRtFyXLhwAc+cOcOtteKuu+4avfPOO6tpH/fdd9/M8ePH5yMK11O7Yf2YkXYWgYmiY6311loyxpDWmqy11hijvfcdAGgBQPP8+fNXP//886VGo3FN2hMR5XmeW2u7zrkuEXWIqBv6azPG2kKIlpRyyVrb+Oyzz35/7bXXFtIa77Zt224YHx8fttby6OaXAYk65FpFM9ZPiZaz2IkOocAOr7WmPM+p2+06rbXVWhvnXOa9bxNRa2lpaeno0aNXzp07p1cDxBhDnU5HZ1mW53me5Xmea60zY0xmrc2cc13vfQcR21LKplJq6aeffpp/6aWX/tXpdIoBHzhwYFOWZaxkTn25KrhuhpTZEpnhnPNRqVprSWtNWmuX57nrdruu2+2aPM9NWO2Oc67lnGt98803C8eOHWsbY/qORmtNrVbLtNtt0263TafT6TmyLDN5nmtjTO6c6yJiS0rZnJ2dvfzCCy/MdbtdAgC47bbbNmitudYa4hj7MeW6dUh0WqKSNcZQSBzFApVLNXkAzymlLOfcEpE5d+6cuXTpUn7//fePbdy4kZesDDWbTcM51wBgjTEUJ5QwkuJ9yOppzrn99ddf3XPPPUfPP//8zPT0dDXLMqaUKvIfUfyTUkUP+1cDZMX2A845BqvSY75iIIWIVN7mELPecRJKKccYM0RkFhYWzDvvvJMdPHhw4sCBA9UUkKWlJSOl1ERkg54ia62P4MTSRMJQj4hWSunOnz9Pb7/9tjh8+PBW5xwEf4iSms+6FKzox4w4yYgu5xwDQyiIGQ1ilXPOK6WoUqk4rbXjnFvGmPHeG621/vTTT/XZs2fHDx06NFatVlFrTY1GwyilzHJa10YQCmCi2EaAAmjWe++EEP6999779Y477rjBGGMBwCNi/E2PlYzXawHE99Mf0Ymx1vqQ/o/lxQKUJKQuBq2UYlprrpQizrmVUloAMESUE1H+3Xff6e+//37p6aefnrTWumazqaWUOgCS6qwCnKjUU4sXs8ucc/3666+fISId6jk+/V1ZBaxbh0SWJKB4ay30AyVW76OeUUrxaJKllExKyRhjLiSmjXNOO+fybrerXnzxxatbtmzBdrudM8b0cgrGrVjRuNLJEa2GC2VOc+rUqQwRzbKU/9FH2tda6jOrKtUyKMYYH+u8If3fk96z1qIxxiulGOeclFIsjS9CPzqAwq217MKFCw4RDSLaWGeJXnEEOa50UvRO4ysK+d7lWmeo7KVApL7UtZw2keztcAAQq2HlIlUhPslAy/6Vt9ZiVIpCCBYKTul2iWiNbAjDYyjuAssoyVesmFC6fWJA1tynFib9Po1tSqFJ0QUA2MgQLqVsGmNaSqnRQUxJMvA+MckxTccCUI5zjlJKHwGI5Yx0g178/bJu7J182VyWWLHCbKYb8pJtFj3OWPw7qziIbSllqwCkXq//1mq1fp+YmBgdlAZIRch73yNCRFSwIZpGIUSxC7FkoouAK7UE5cmXASn7EWmHURRSJiUVSd+v/JBet1qt+Ztuumm+AOTll1+++Nhjj52q1WrjtVpt81r0Spm+YWJx8j4Ungqnrey3pGxIJ5QUq33JQfSlBfKDQo+ShVmx9bO093X+0qVLp7/66quLMXmsAOCGw4cPb/3iiy/+c3JycqdSavwa9RRIJxlD7n4JmdJmvL6+yyAAypMctE92EAj9gEqfd7vd+ZMnT/734cOHj7/11lu/pRt3NwKAeOKJJ6Y//PDDXdu2bfvH6OjoTWUlOwiU8nbMdKCl7Zl9xbFf8JVu6l1vPD+or9QKLCws/Dg/P3/6ySef/PGVV175FwDY8tburQAg3n///ZFnn3125vTp0xuGh4fHq9XqkBBCrncncxp2XytTVd7R3M+S9JtYud8yA8rNWmva7Xa71Wpd3b9//8K77777865du3IAsIj4G/b50XBky8LCgjx69OjQ2bNnq4uLiyIGdasBU97FPCh/mQaDq026vLv5z+ZgoxHYsGGD3bNnT/bggw+2JyYm4pbuS4hoAPps/k/nGIAZD14pJmeA/v8MMIgFuN7xr+MbvMbv0/+AoOR8FQCuBP+jWLz/GwAQZ7xSM/ahzgAAAABJRU5ErkJggg==",
		_roteright = "data:image/png;base64,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";


	var editPicture=function(data){
		this.id=data.id;
		this.src=data.src;

		this.success=$.getFunction(data.success);
		this.cancel=$.getFunction(data.cancel);

		this.imgOutWidth=data.width || 80;
		this.imgOutHeight=data.height || 80;

		this.div = $.getDom(this.id);

		if(!this.id || !this.src){return;}


		//=================================================================

		this.canvas=null;
		this.context = null;
		this.img= null;

		this.cutbox = null;         //剪切框


		this.yes = null;            //按钮
		this.no = null;
		this.roteleft = null;
		this.roteright = null;

//        this.div1 = null;           //下遮早
//        this.div2 = null;

		//================================================================
		this.cvWidth = null;      //画布宽
		this.cvHeight = null;     //画布高

		this.imgPosition = {
			x:null,             //位置
			y:null,
			width:null,         //大小
			height:null
		};

		this.rotates=0;


		this.touchstart=null;
		this.touchmove=null;
		this.touchend=null;


		this.touchstarts = {};      //点击开始时
		this.types = null;          //移动的方式  放大或移动
		this.cutboscenter = {};     //剪切框中心点



		this.init();


	};

	editPicture.prototype={
		init:function(){
			this.setDivCss();
			this.createCanvas();
			this.loadImg();
			this.createCutBox();
			this.createButton();
			this.addEventBind();
			this.editButtonEventBind();
		},
		//设置包裹层css
		setDivCss:function(){
			var temp = $(this.div).css("position");

			if(temp == "relative" || temp == "absolute" || temp == "fixed"){
				$(this.div).css({overflow:"hidden"});
			}else{
				$(this.div).css({overflow:"hidden",position:"relative"});
			}

			var div = $(this.div);
			this.cvWidth = parseInt(div.width());
			this.cvHeight = parseInt(div.height());
		},
		//创建canvas
		createCanvas:function(){
			this.canvas = document.createElement("canvas");
			$(this.canvas).attr({
				width:this.cvWidth,
				height:this.cvHeight
			});
			$(this.canvas).css({
				position:"relative"
			});
			$(this.div).append(this.canvas);

			this.context = this.canvas.getContext("2d");
			this.context.fillStyle = "#000";
			this.context.fillRect(0,0,this.cvWidth,this.cvHeight);
		},
		//加载图片
		loadImg:function(){
			var _this = this;

			this.img = new Image();
			this.img.onload = function(){
				//获取图片大小
				var imgwidth=parseInt(_this.img.width);
				var imgheight=parseInt(_this.img.height);

				//缩放图片大小适应画布
				var tempdata=_this.imgAutoRoom(imgwidth,imgheight);

				//图片居中
				var tempdata1=_this.imgAutoCenter(tempdata);

				//显示图片
				_this.context.drawImage(_this.img,0,0,imgwidth,imgheight,tempdata1.left,tempdata1.top,tempdata.width,tempdata.height);
				//保存数据
				_this.imgPosition.x=tempdata1.left;
				_this.imgPosition.y=tempdata1.top;
				_this.imgPosition.width=tempdata.width;
				_this.imgPosition.height=tempdata.height;
			};
			this.img.src = this.src;

		},
		//计算图片要显示的实际尺寸
		imgAutoRoom:function(imgwidth,imgheight,rotate){
			var canvasheight,canvaswidth;
			if(rotate){
				canvasheight=this.cvWidth;
				canvaswidth=this.cvHeight;
			}else{
				canvaswidth=this.cvWidth;
				canvasheight=this.cvHeight;
			}

			if(imgwidth>0 && imgheight>0){
				if(imgwidth/imgheight>=canvaswidth/canvasheight){
					if(imgwidth>canvaswidth){
						return {width:canvaswidth,height:(imgheight*canvaswidth)/imgwidth};
					}else{
						return {width:imgwidth,height:imgheight};
					}
				}
				else{
					if(imgheight>canvasheight){
						return {width:(imgwidth*canvasheight)/imgheight,height:canvasheight};
					}else{
						return {width:imgwidth,height:imgheight};
					}
				}
			}else{
				return {width:0,height:0};
			}
		},
		//图片位置
		imgAutoCenter:function(imgdata,rotate){
			var canvasheight,canvaswidth;
			if(rotate){
				canvasheight=this.cvWidth;
				canvaswidth=this.cvHeight;
			}else{
				canvaswidth=this.cvWidth;
				canvasheight=this.cvHeight;
			}

			var imgwidth=imgdata.width,
				imgheight=imgdata.height;

			var top,left;

			if(imgwidth>0 && imgheight>0){
				if(canvaswidth>imgwidth){
					left=(canvaswidth-imgwidth)/2;
				}else{
					left=0;
				}
				if(canvasheight>imgheight){
					top=(canvasheight-imgheight)/2;
				}else{
					top=0;
				}
				return {top:top,left:left};
			}else{
				return {top:0,left:0};
			}
		},
		//创建剪切框
		createCutBox:function(){
			var div = document.createElement("div"),
				top = (this.cvHeight-this.imgOutHeight)/ 2,
				left = (this.cvWidth-this.imgOutWidth)/ 2,
				width =  this.imgOutWidth,
				height = this.imgOutHeight,
				border = (this.cvHeight>this.cvWidth)? this.cvHeight : this.cvWidth ;

			div.style.cssText = "z-index:100;background:none;border:2px solid #f90;width:"+width+"px;height:"+height+"px;";
			div.style.cssText += "-webkit-transform:translate3d("+left+"px,"+top+"px,0);position:absolute;top:0;left:0;";

			this.cutbox = div;

			this.createZZ();


			$(this.div).append(this.cutbox);

		},
		createZZ:function(){
//            var div1 = document.createElement("div"),
//                div2 = document.createElement("div"),
//                div3 = document.createElement("div"),
//                div4 = document.createElement("div"),
//                borderwidth = (this.cvHeight>this.cvWidth)? this.cvHeight : this.cvWidth ;
//
//            div1.style.cssText = "background:rgba(0,0,0,0.5);position:absolute;width:100%;height:"+borderwidth+"px;top:"+ -borderwidth+"px;left:0;";
//            div2.style.cssText = "background:rgba(0,0,0,0.5);position:absolute;width:"+borderwidth+"px;height:"+borderwidth*3+"px;top:"+ -borderwidth+"px;left:"+ -borderwidth+"px;";
//            div3.style.cssText = "background:rgba(0,0,0,0.5);position:absolute;width:"+borderwidth+"px;height:"+borderwidth*3+"px;top:"+ -borderwidth+"px;right:"+ -borderwidth+"px;";
//            div4.style.cssText = "background:rgba(0,0,0,0.5);position:absolute;width:100%;height:"+borderwidth+"px;bottom:"+-borderwidth+"px;left:0;";
//
//            $(this.cutbox).append(div1).append(div2).append(div3).append(div4);
//            this.div1 = div1;
//            this.div2 = div4;

			var div = document.createElement("div"),
				borderwidth = (this.cvHeight>this.cvWidth)? this.cvHeight : this.cvWidth ;
			div.style.cssText = "width:100%;height:100%;border:"+borderwidth+"px solid rgba(0,0,0,0.5);position:absolute;left:"+ -borderwidth+"px;top:"+ -borderwidth+"px";
			$(this.cutbox).append(div);
		},
		//添加按钮
		createButton:function(){
			var div1 = document.createElement("div"),
				div2 = document.createElement("div"),
				div3 = document.createElement("div"),
				div4 = document.createElement("div"),

				allcss = "z-index:500;width:34pt;height:24pt;"+device.css["background-size"]+":34pt 24pt;position:absolute;";

			div1.style.cssText = allcss + "top:5pt;left:10pt;background:url('"+cancel+"');";
			div2.style.cssText = allcss + "top:5pt;right:10pt;background:url('"+yes+"');";
			div3.style.cssText = allcss + "bottom:5pt;left:10pt;background:url('"+roteright+"');";
			div4.style.cssText = allcss + "bottom:5pt;right:10pt;background:url('"+roteleft+"');";

			$(div1).css3({"background-size":"34pt 24pt"});
			$(div2).css3({"background-size":"34pt 24pt"});
			$(div3).css3({"background-size":"34pt 24pt"});
			$(div4).css3({"background-size":"34pt 24pt"});

			div1.__bens_temp_obj_id_a = "button";
			div2.__bens_temp_obj_id_a = "button";
			div3.__bens_temp_obj_id_a = "button";
			div4.__bens_temp_obj_id_a = "button";

			$(this.div).append(div1).append(div2).append(div3).append(div4);


			var div1_1 = document.createElement("div"),
				div2_1 = document.createElement("div"),
				div3_1 = document.createElement("div"),
				div4_1 = document.createElement("div");

			div1_1.style.cssText = "display:none; background:url('"+_cancel+"')";
			div2_1.style.cssText = "display:none; background:url('"+_yes+"')";
			div3_1.style.cssText = "display:none; background:url('"+_roteright+"')";
			div4_1.style.cssText = "display:none; background:url('"+_roteleft+"')";

			$(this.div).append(div1_1).append(div2_1).append(div3_1).append(div4_1);


			this.yes = div2;
			this.no = div1;
			this.roteleft = div4;
			this.roteright = div3;

		},
		//事件添加
		addEventBind:function(){
			var _this=this;
			//cutbox even
			this.div.addEventListener(device.START_EV,_this.touchstart=function(e){_this.touchStartHandler(e)},false);
			window.addEventListener(device.MOVE_EV,_this.touchmove=function(e){_this.touchMoveHandler(e)},false);
			window.addEventListener(device.END_EV,_this.touchend=function(e){_this.touchEndHandler(e)},false);
		},
		touchStartHandler:function(e){
			e.preventDefault();
			if(e.target.__bens_temp_obj_id_a == "button" ){
				return;
			}

			var x,y;
			if(e.touches){
				x=e.touches[0].pageX;
				y=e.touches[0].pageY;
			}else{
				x=e.pageX;
				y=e.pageY;
			}


			var cutbox=$(this.cutbox),
				getcss = this.cutbox.style.webkitTransform,
				getleft = parseInt(getcss.split("(")[1]),
				gettop = parseInt(getcss.split(",")[1]);


			this.touchstarts.x=x;
			this.touchstarts.y=y;
			this.touchstarts.width=parseInt(cutbox.css("width"));
			this.touchstarts.height=parseInt(cutbox.css("height"));
			this.touchstarts.left=getleft;
			this.touchstarts.top=gettop;

			var minx=this.touchstarts.left;
			var maxx=this.touchstarts.left+this.touchstarts.width;
			var miny=this.touchstarts.top;
			var maxy=this.touchstarts.top+this.touchstarts.height;

			if( x>minx && x<maxx &&  y>miny && y<maxy ){
				this.types="move";
			}else{
				this.types="scale";
				cutbox.find("img").css({display:"block"});
			}

		},
		touchMoveHandler:function(e){
			e.preventDefault();

			var x,y;
			if(e.touches){
				x=e.touches[0].pageX;
				y=e.touches[0].pageY;
			}else{
				x=e.pageX;
				y=e.pageY;
			}

			//是移动
			if(this.types=="move"){

				var temp_x=x-this.touchstarts.x+this.touchstarts.left;
				var temp_y=y-this.touchstarts.y+this.touchstarts.top;

				//不超出图片显示的范围
				var imgminx=this.imgPosition.x;
				var imgmaxx=this.imgPosition.x+this.imgPosition.width;
				var imgminy=this.imgPosition.y;
				var imgmaxy=this.imgPosition.y+this.imgPosition.height;


				temp_x=(temp_x<imgminx)? imgminx : temp_x;
				temp_x=(temp_x>imgmaxx-this.touchstarts.width-4)? imgmaxx-this.touchstarts.width-4 : temp_x;
				temp_y=(temp_y<imgminy)? imgminy : temp_y;
				temp_y=(temp_y>imgmaxy-this.touchstarts.height-4)? imgmaxy-this.touchstarts.height-4: temp_y;

				/*
				 $(this.cutbox).css({
				 top:temp_y+"px",
				 left:temp_x+"px"
				 });
				 */
				$(this.cutbox).css({
					"-webkit-transform":"translate3d("+temp_x+"px,"+temp_y+"px,0)"
				});


			}

			//是缩放
			if(this.types=="scale"){

				if( !this.cutboscenter.x){
					this.cutboscenter.x= this.touchstarts.left+ this.touchstarts.width/2;
					this.cutboscenter.y= this.touchstarts.top+ this.touchstarts.height/2;
					this.cutboscenter.oldlength=(this.touchstarts.x-this.cutboscenter.x)*(this.touchstarts.x-this.cutboscenter.x)+(this.touchstarts.y-this.cutboscenter.y)*(this.touchstarts.y-this.cutboscenter.y);
				}


				var nowlength= (x-this.cutboscenter.x)*(x-this.cutboscenter.x)+(y-this.cutboscenter.y)*(y-this.cutboscenter.y);


				//var length=( Math.abs(x-this.touchstarts.x) > Math.abs(y-this.touchstarts.y)  )? Math.abs(x-this.touchstarts.x): Math.abs(y-this.touchstarts.y);

				var temp_top,temp_left,temp_width,
					length = Math.sqrt(Math.abs(nowlength-this.cutboscenter.oldlength))/2;

				if(nowlength>this.cutboscenter.oldlength){
					//放大

					temp_width = length + this.touchstarts.width;

					//控制最大宽度
					var temp_maxlength=(this.imgPosition.width>this.imgPosition.height)? this.imgPosition.height : this.imgPosition.width;
					temp_width=( temp_width> temp_maxlength-4 )? temp_maxlength-4 : temp_width;

					temp_top = this.touchstarts.top - parseInt((temp_width - this.touchstarts.width)/2);
					temp_left= this.touchstarts.left - parseInt((temp_width - this.touchstarts.height)/2);

					//限制顶点位置
					temp_top= (temp_top<this.imgPosition.y)? this.imgPosition.y : temp_top;
					temp_top= (temp_top>this.imgPosition.y+this.imgPosition.height-temp_width-4)? this.imgPosition.y+this.imgPosition.height-temp_width-4 : temp_top;
					temp_left=(temp_left<this.imgPosition.x)? this.imgPosition.x : temp_left;
					temp_left=(temp_left>this.imgPosition.x+this.imgPosition.width-temp_width-4)? this.imgPosition.x+this.imgPosition.width-temp_width-4 : temp_left;

				}else{
					//缩小
					temp_width = this.touchstarts.width-length;
					//控制最小宽度
					temp_width=(temp_width<this.imgOutWidth/2)? this.imgOutWidth/2 :temp_width;
					//计算顶点
					temp_top = this.touchstarts.top + parseInt((this.touchstarts.width - temp_width)/2);
					temp_left= this.touchstarts.left + parseInt((this.touchstarts.height - temp_width)/2);


				}

				/*
				 $(this.cutbox).css({
				 width:temp_width+"px",
				 height:temp_width+"px",
				 top:temp_top+"px",
				 left:temp_left+"px"
				 });
				 */
				$(this.cutbox).css({
					"-webkit-transform":"translate3d("+temp_left+"px,"+temp_top+"px,0)",
					width:temp_width+"px",
					height:temp_width+"px"
				});
//                $(this.div1).css({height:temp_width+"px"});
//                $(this.div2).css({height:temp_width+"px"});


			}

		},
		touchEndHandler:function(e){
			e.preventDefault();
			this.types=null;
			$(this.cutbox).find("img").css({display:"none"});
			this.cutboscenter={};
			this.touchstarts={};
		},
		//按钮事件
		editButtonEventBind:function(){
			var _this=this;
			//确定
			$$(this.yes)
				.myclickdown(function(){
					$(this).css3({
						background:"url('"+_yes+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickup(function(){
					$(this).css({
						background:"url('"+yes+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickok(function(){
					_this.saveAsImg();
				});


			//取消
			$$(this.no)
				.myclickdown(function(){
					$(this).css({
						background:"url('"+_cancel+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickup(function(){
					$(this).css({
						background:"url('"+cancel+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickok(function(){
					_this.cancel();
					setTimeout(function(){
						_this.destroy();
					});
				});


			//旋转左
			$$(this.roteleft)
				.myclickdown(function(){
					$(this).css({
						background:"url('"+_roteright+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickup(function(){
					$(this).css({
						background:"url('"+roteleft+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickok(function(){
					_this.imageRotate("right");
				});


			//旋转右
			$$(this.roteright)
				.myclickdown(function(){
					$(this).css({
						background:"url('"+_roteleft+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickup(function(){
					$(this).css({
						background:"url('"+roteright+"')",
						"background-size":"34pt 24pt"
					});
				})
				.myclickok(function(){
					_this.imageRotate("left");
				});

		},
		//图片旋转
		imageRotate:function(orientation){
			if(orientation=="right"){
				this.rotates++;
			}else{
				this.rotates--;
			}


//            this.context.clearRect(0,0,this.cvWidth,this.cvHeight);
			this.context.fillStyle = "#000";
			this.context.fillRect(0,0,this.cvWidth,this.cvHeight);



			this.context.save();
			this.context.translate(this.cvWidth/2,this.cvHeight/2);

			this.context.rotate(Math.PI*this.rotates/2);

			var imgwidth=parseInt(this.img.width);
			var imgheight=parseInt(this.img.height);

			var tempdata,tempdata1;
			if(parseInt(this.rotates/2)==this.rotates/2){
				tempdata=this.imgAutoRoom(imgwidth,imgheight);
				tempdata1=this.imgAutoCenter(tempdata);

				this.context.translate(-this.cvWidth/2,-this.cvHeight/2);
			}else{
				tempdata=this.imgAutoRoom(imgwidth,imgheight,true);
				tempdata1=this.imgAutoCenter(tempdata,true);

				this.context.translate(-this.cvHeight/2,-this.cvWidth/2);
			}


			this.context.drawImage(this.img,0,0,imgwidth,imgheight,tempdata1.left,tempdata1.top,tempdata.width,tempdata.height);

			var rotatesed = (parseInt(this.rotates/2)==this.rotates/2);
			this.imgPosition.x = (rotatesed)? tempdata1.left : tempdata1.top;
			this.imgPosition.y = (rotatesed)? tempdata1.top : tempdata1.left;
			this.imgPosition.width = (rotatesed)? tempdata.width : tempdata.height;
			this.imgPosition.height = (rotatesed)? tempdata.height : tempdata.width;



			this.context.restore();

			/*
			 $(this.cutbox).css({
			 top:(this.cvHeight-this.imgOutHeight)/2+"px",
			 left:(this.cvWidth-this.imgOutWidth)/2+"px",
			 width:this.imgOutWidth+"px",
			 height:this.imgOutHeight+"px"
			 });
			 */
			$(this.cutbox).css({
				"-webkit-transform":"translate3d("+(this.cvWidth-this.imgOutWidth)/2+"px,"+(this.cvHeight-this.imgOutHeight)/2+"px,0)",
				width:this.imgOutWidth+"px",
				height:this.imgOutHeight+"px"
			});
//            $(this.div1).css({height:this.imgOutHeight+"px"});
//            $(this.div2).css({height:this.imgOutHeight+"px"});



		},
		//保存img
		saveAsImg:function(){

			var _this=this;

			//获取当前的图片地址
			var temp_img=this.canvas.toDataURL("image/png");

			var images = new Image();



			//获取当前图片需要的部分参数
			var cutbox = $(this.cutbox),
				getcss = this.cutbox.style.webkitTransform,
				left = parseInt(getcss.split("(")[1]),
				top = parseInt(getcss.split(",")[1]);


			var width=parseInt(cutbox.css("width"));
			var height=parseInt(cutbox.css("height"));

			var cvwidth=this.imgOutWidth;
			var cvheight=this.imgOutHeight;

			//生成临时的canvas
			$(this.div).append("<canvas id='bens_temp_outimg_canvas' width='"+cvwidth+"' height='"+cvheight+"'></canvas>");
			var temp_canvas=$("#bens_temp_outimg_canvas");

			var temp_context= temp_canvas.get(0).getContext("2d");

			images.onload=function(){
				temp_context.drawImage(images,left,top,width,height,0,0,cvwidth,cvheight);
				//console.log(temp_img);
				//console.log(top+" "+left+" "+width+" "+height)


				var outimgsrc=temp_canvas.get(0).toDataURL("image/png");


				if(typeof(_this.success)=="function"){
					//console.log(outimgsrc)
					_this.success(outimgsrc);
					setTimeout(function(){
						_this.destroy();
					});
				}


			};
			images.src=temp_img;

		},
		//销毁
		destroy:function(){
			var _this=this;
			this.div.removeEventListener("touchstart",_this.touchstart,false);
			window.removeEventListener("touchmove",_this.touchmove,false);
			window.removeEventListener("touchend",_this.touchend,false);
			$$(this.yes).unbind(true);
			$$(this.no).unbind(true);
			$$(this.roteleft).unbind(true);
			$$(this.roteright).unbind(true);

			this.touchstart=null;
			this.touchmove=null;
			this.touchend=null;

//            this.div1 = null;
//            this.div2 = null;

			this.canvas=null;
			this.context = null;
			this.img= null;
			this.rotates = 0;

			this.cutbox = null;         //剪切框


			this.yes = null;            //按钮
			this.no = null;
			this.roteleft = null;
			this.roteright = null;

			$(this.div).html("");
		}
	};


	DEVICE.editPicture = editPicture;
})();




/**
 * Created by bens on 16-2-23.
 */


//可编辑div插入html片段,html片段只能有一层不能有节点（比如插入一个图片）
//只支持新的浏览器  只测试了webkit

//初始化
//var a = new DEVICE.divEditArea({
//	id:"test"
//});


//在当前焦点处插入html片段
//a.insertHtml("<div style='color:red;'>123</div>");


//模拟点击键盘的删除，焦点处向前删除一个
//a.del();






(function(){

	//补丁
	if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment){
		Range.prototype.createContextualFragment = function(html){
			var frag = document.createDocumentFragment(),
				div = document.createElement("div");
			frag.appendChild(div);
			div.outerHTML = html;
			return frag;
		}
	}

	var divEditArea = function(opt){
		this.id = opt.id;

		this.dom = document.getElementById(this.id);

		this.sel = null;
		this.range = null;
		this.sel_length = null;

		this.init();
	};
	divEditArea.prototype = {
		init:function(){
			this.addEvent();
		},
		addEvent:function(){
			var _this = this;

			document.addEventListener("selectionchange",function(e){
				var id = e.target.activeElement.id;
				if(id == _this.id){
					_this.saveRange();
				}
			},false)
		},
		saveRange:function(){
			this.sel = window.getSelection();
			//选区中的第一个range
			this.range =  this.sel.getRangeAt(0);
		},
		showRange:function(){
			this.dom.focus();
			this.sel.removeAllRanges();
			this.sel.addRange(this.range);
		},
		//替换选取中的html
		insertHtml:function(html){
			this.dom.focus();
			//创建片段
			var hasR = this.range.createContextualFragment(html);
			var hasR_lastChild = hasR.lastChild;

			while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
				var e = hasR_lastChild;
				hasR_lastChild = hasR_lastChild.previousSibling;
				hasR.removeChild(e)
			}

			//删除原来选中的部分
			this.range.deleteContents();
			//插入新的
			this.range.insertNode(hasR);


			if (hasR_lastChild) {
				this.range.setStartAfter(hasR_lastChild);
				this.range.setEndAfter(hasR_lastChild);

			}

			//在次选中被替换部分
			this.sel.removeAllRanges();
			this.sel.addRange(this.range);
		},
		del:function(){
			var start_obj = this.range.startContainer,
				end_obj = this.range.endContainer,
				start_offset = this.range.startOffset,
				end_offset = this.range.endOffset;

			if(start_obj == end_obj && start_offset == end_offset){
				//不是选区
				if(start_obj != this.dom){
					//是子元素
					if(start_offset == 0){
						//光标已到头
						if(start_obj.length == 0){
							//删除该节点
							start_obj.parentNode.removeChild(start_obj);
							this.del();
						}else{
							//移动焦点到节点外
							var all_node = this.dom.childNodes,
								z = 0;
							for(var i= 0,l=all_node.length;i<l;i++){
								if(all_node[i] == start_obj){
									z = i;
									break;
								}
							}
							this.range.setStart(this.dom,z);
							this.range.setEnd(this.dom,z);
							this.del();
						}
					}else{
						//非空元素
						this.range.setStart(start_obj,start_offset-1);
						this.range.setEnd(start_obj,start_offset);
						this.range.deleteContents();
					}
				}else{
					//不是子元素
					if(start_offset == 0){

					}else{
						var this_node = this.dom.childNodes[start_offset-1],
							node_type = this_node.nodeType;

						if(node_type !=3){
							this.range.setStart(start_obj,start_offset-1);
							this.range.setEnd(start_obj,start_offset);
							this.range.deleteContents();
						}else{
							//移动焦点到文本对象中的最后一位
							var n = this_node.length;
							this.range.setStart(this_node,n);
							this.range.setEnd(this_node,n);
							this.del();
						}
					}
				}
			}else{
				//是选区。直接删除
				this.range.deleteContents();
			}

			this.showRange();
		}
	};

	DEVICE.divEditArea = divEditArea;
})();




DEVICE.audio = (function(){
	window.AudioContext = window.AudioContext ||
		window.webkitAudioContext ||
		window.mozAudioContext ||
		window.msAudioContext;

	var audioTag = !!(document.createElement("audio").canPlayType),
		audio;


	//audio api
	if(!!window.AudioContext){
		//支持
		audio = function(data){
			this.src = data.src;                      //文件地址
			this.ready = data.ready || function(){};  //预加载完使用
			this.error = data.error || function(){};  //出错回调
			this.fileName = this.src.substr(this.src.lastIndexOf("/")+1);

			this.ac = new AudioContext();
			this.buffer = null;                       //buffer缓存
			this.source = null;                       //声音源

			this.playedTime = 0;
			this.startPlayTime = 0;


			this.cache();
		};

		audio.prototype = {
			cache:function(){
				var request = new XMLHttpRequest(),
					_this = this;

				request.open('GET', this.src, true);
				request.responseType = 'arraybuffer';

				//下载声音文件]
				request.onreadystatechange = function(){
					if(request.readyState == 4){
						if(request.status >= 200 && request.status < 300){
							_this.bufferData(request.response);
						}else{
							_this.error(_this.fileName);
						}
					}
				};

				request.send();
			},
			bufferData:function(rs){
				var _this = this;
				//解码
				this.ac.decodeAudioData(rs, function(buffer) {
					_this.buffer = buffer;
					_this.ready.call(_this);
				}, function(){
					_this.error(_this.fileName);
				});
			},
			play:function(data){
				data = data || {};

				//是否循环播放
				var loop = data.loop || false,
				//延迟多久开始播放（秒）
					delay = data.delay || 0,
				//开始播放时间（秒）
					start = data.start || this.playedTime,
				//播放多久（秒）
					continued = data.continued || this.buffer.duration - this.playedTime;
				//记录开始播放时间
				this.startPlayTime = this.ac.currentTime;
				// 创建一个声音源
				this.source = this.ac.createBufferSource();
				// 告诉该源播放何物
				this.source.buffer = this.buffer;

				//将该源与硬件相连
				this.source.connect(this.ac.destination);

				//现在播放该实例
				this.source.start(delay,start,continued);
				//循环
				this.source.loop = loop;

			},
			stop:function(){
				this.playedTime += this.ac.currentTime - this.startPlayTime;

				this.source.stop();
			}
		};

	}


	//audio tag
	if(!window.AudioContext && audioTag){
		//支持audio标签
		audio = function(data){
			this.src = data.src;                      //文件地址
			this.ready = data.ready || function(){};  //预加载完使用
			this.error = data.error || function(){};  //出错回调
			this.fileName = this.src.substr(this.src.lastIndexOf("/")+1);

			//audio标签
			this.tag = null;


			this.delayTimeOut = null;
			this.playTimeOut = null;

			this.canPlayFn = null;
			this.loadErrorFn = null;


			this.createTag();
			this.cache();
		};

		audio.prototype = {
			createTag:function(){
				var tag = document.createElement("audio");
				tag.src = this.src;

//                    var tag = new Audio(this.src);
				tag.preload = "auto";
//                    tag.controls = true;
				tag.style.cssText = "display:none;";

				this.tag = tag;
				$("body").append(tag);
				//document.body.appendChild(tag);
			},
			cache:function(){
				var _this = this;
				_this.tag.addEventListener("canplaythrough",_this.canPlayFn = function(){
					_this.tag.removeEventListener("canplaythrough",_this.canPlayFn,false);
					_this.ready.call(_this);
				},false);

				_this.tag.addEventListener("error", _this.loadErrorFn = function(){
					_this.tag.removeEventListener("error",_this.loadErrorFn,false);
					_this.error(_this.fileName);
				},false);
			},
			play:function(data){
				clearTimeout(this.delayTimeOut);
				clearTimeout(this.playTimeOut);
				this.stop();
				data = data || {};

				var loop = data.loop || false,
				//延迟多久开始播放（秒）
					delay = (parseInt(data.delay))? parseInt(data.delay) : 0,
				//开始播放时间（秒）
					start = (parseInt(data.start) || parseInt(data.start) == 0 )? parseInt(data.start) : this.tag.currentTime,
				//播放多久（秒）
					continued = parseInt(data.continued) + delay,
					_this = this;

				this.tag.loop = loop;
				this.tag.currentTime = start;
				if(delay != 0){
					this.delayTimeOut = setTimeout(function(){
						_this.tag.play();
					},delay*1000);
				}else{
					_this.tag.play();
				}

				if(continued){
					this.playTimeOut = setTimeout(function(){
						_this.tag.pause();
					},continued*1000)
				}
			},
			stop:function(){
				clearTimeout(this.delayTimeOut);
				clearTimeout(this.playTimeOut);
				this.tag.pause();
			}
		};

	}



	return audio;
})();
DEVICE.stamp2date = function (b) {
	b = b || new Date().getTime();
	var a = new Date(parseInt(b));
	var year = a.getFullYear();
	var month = parseInt(a.getMonth()) + 1;
	month = (month < 10) ? "0" + month : month;
	var date = a.getDate();
	date = (date < 10) ? "0" + date : date;
	return year + "-" + month + "-" + date;
};
DEVICE.time2stamp = function(a){
	if(!a){
		return new Date().getTime();
	}


	var new_str = a.replace(/:/g,'-');
	new_str = new_str.replace(/ /g,'-');
	new_str = new_str.replace(/\//ig,'-');
	var arr = new_str.split("-");
	if(arr.length != 6){
		for(var i= 0,l=6-arr.length;i<l;i++){
			arr.push(0);
		}
	}

	return new Date(Date.UTC(arr[0],arr[1]-1,arr[2],arr[3]-8,arr[4],arr[5])).getTime();
};
DEVICE.info.show = function(text){
	var DOM =' <div class="qd_model" style="overflow:hidden;z-index: 100000;position: fixed;left: 0;top: 0">'+
	    '<div class="qd_model_content" style="padding-bottom: 10px">'+
	    '<p style="font-size: 18px;font-weight: bold;padding-top: 20px;text-align: center">温馨提示</p>'+
	'<p class="qd_model_text" style="text-align: center;color: #999999;margin-top: 22px;font-size: 16px;padding-left: 10px;padding-right: 10px;word-break: break-all;">'+text+'</p>'+
	'<div id="qd_model_btn" style="width: 160px;height: 50px;background-color: #00abeb;margin: 0 auto;margin-top: 30px;'+
	'border-radius: 5px;text-align: center;line-height: 50px;color: #fff;font-size: 14px">好的</div>'+
	'</div>'+
	'</div>';

	$("body").append(DOM);
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	$('.qd_model').css({width:windowWidth,height:windowHeight,backgroundColor:"rgba(0,0,0,0.8)"});
	$('.qd_model_content').css({width:"250px",height:"auto",backgroundColor:"#fff",borderRadius: '10px'
		,marginLeft:(windowWidth-250)/2+"px",marginTop:(windowHeight-180)/2+"px"});
	var divHeight = $('.qd_model_content').height();
	$('.qd_model_content').css({marginTop:(windowHeight-divHeight)/2+"px"});
	$('.qd_model').bind("touchmove",function(event){
        event.preventDefault();
        event.stopPropagation();
    })

};

DEVICE.info.show_url = function(text,url){
	var styleAPPdown = "" +
			"display:block;" +
			"width:100px;" +
			"height:50px;" +
			"background-color:#00abeb;" +
			"text-align:center;" +
			"line-height:50px;" +
			"color:#fff;" +
			"border-radius:5px;" +
			"    position: absolute;"+
			"left: 21px;"+
			"bottom: 010px;"+
			"border-radius: 5px;";
	var DOM =' <div class="qd_model" style="overflow:hidden;z-index: 100000;position: fixed;left: 0;top: 0">'+
		'<div class="qd_model_content" style="padding-bottom: 10px;position: relative">'+
		'<p style="font-size: 18px;font-weight: bold;padding-top: 20px;text-align: center">温馨提示</p>'+
		'<p class="qd_model_text" style="text-align: center;color: #999999;margin-top: 22px;font-size: 16px;padding-left: 35px;padding-right: 35px;word-break: break-all;">'+text+'</p>'+
		'<a style="'+styleAPPdown+'" href="'+url+'">立即下载</a>'+
		'<div id="qd_model_btn" style="width: 100px;height: 50px;background-color: #00abeb;margin: 0 auto;margin-top: 30px;margin-left: 131px;'+
		'border-radius: 5px;text-align: center;line-height: 50px;color: #fff;font-size: 14px">好的</div>'+
		'</div>'+
		'</div>';

	$("body").append(DOM);
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	$('.qd_model').css({width:windowWidth,height:windowHeight,backgroundColor:"rgba(0,0,0,0.8)"});
	$('.qd_model_content').css({width:"250px",height:"auto",backgroundColor:"#fff",borderRadius: '10px'
		,marginLeft:(windowWidth-250)/2+"px",marginTop:(windowHeight-180)/2+"px"});
	var divHeight = $('.qd_model_content').height();
	$('.qd_model_content').css({marginTop:(windowHeight-divHeight)/2+"px"});
	$('.qd_model').bind("touchmove",function(event){
		event.preventDefault();
		event.stopPropagation();
	});
	

};

//utf8

function Utf8Encode(string) {
	var utftext = "";
	for (var n = 0; n<string.length; n++) {
		var c = string.charCodeAt(n);
		if (c<128) {
			utftext += String.fromCharCode(c);
		} else if ((c>127) && (c<2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}

function pcKg(string){
	 return string.replace(/\ /ig,"")
}






//按钮发送短信后倒计时功能
// var sms = new DEVICE.btnSendSmsInterval({
//    //按钮id
//    btnId:"send_sms",
//    //电话号码输入框id
//    phoneInputId:"phone",
//    //按钮可以点击的class名
//    canClickClass:"regest_send_yes",
//    //按钮不能点击的class
//    canNotClickClass:"regest_send_no",
//    //电话号码验证失败执行
//    error:function(text){
//
//    },
//    //清除失败时的样式，未更改样式可以不传
//    clearError:function(){
//
//    },
//    //电话号码验证成功执行ajax函数
//    ajaxFn:function(){
//        //ajax。。。
//
//        //ajax成功后执行，开始倒计时
//        sms.startInterval();
//
//    },
//    //倒计时时间
//    intervalTime:60,
//    //倒计时按钮显示的文字，{x}为变量。
//    intervalText:"{x}秒后重试"
// });






DEVICE.btnSendSmsInterval = function(opt){
	this.dom = opt.dom;
	this.phoen = opt.phone;
	this.canClickClass = opt.canClickClass || {};
	this.canNotClickClass = opt.canNotClickClass || {};
	this.error = opt.error || function(){};
	this.clearError = opt.clearError || function(){};
	this.ajaxFn = opt.ajaxFn || function(){};
	this.intervalTime = opt.intervalTime || 60;
	this.intervalText = opt.intervalText || "{x}秒后重试";


	this._interval = null;
	this.startText = this.dom.text();

	this.init();
};

DEVICE.btnSendSmsInterval.prototype = {
	init:function(){
		this.bindEvent();

	},
	bindEvent:function(){
		var _this = this;

		//按钮事件绑定

		$$(this.dom).myclickok(function(){
			_this.clearError();

			//检查phoneNumber输入值
			if(_this.checkPhoneNumber()){
				//发送ajax

				_this.ajaxFn();

			}else{
				//显示错误
				_this.error("请输入11位手机号码！");
			}
		}).myclickdown(function(){
			$(this).css({opacity:0.5})
		}).myclickup(function(){
			$(this).css({opacity:1})
		});
	},
	checkPhoneNumber:function(){
		var val = this.phoen.val(),
			reg = new RegExp(/^1\d{10}$/);

		return reg.test(val);
	},
	startInterval:function(){
		var _this = this;

		//删除事件绑定
		$$(_this.dom).unbind(true);

		//设置样式
		this.dom.css(this.canNotClickClass);

		//计时器开始
		var _time = 0;
		this._interval = setInterval(function(){
			_time++;
			if(_time >= _this.intervalTime){
				//重置class 文字
				_this.dom.css(_this.canClickClass)
					.text(_this.startText);
				//事件绑定
				_this.bindEvent();

				//清除定时器
				clearInterval(_this._interval);
			}else{
				var __time = _this.intervalTime - _time,
					_text = _this.intervalText.replace("{x}",__time);
				_this.dom.text(_text);
			}
		},1000)

	}
};