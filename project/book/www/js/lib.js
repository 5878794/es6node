/*
animate_css
animate_class
animate_js
stepAnimate
get_param_from_url
touch_event
touch_slide_event
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



var DEVICE = {};



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
//DEVICE.isPc				@param:bloom	是否是：pc
//DEVICE.isPhone			@param:bloom	是否是：移动设备，非pc

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


(function(){
	var p = navigator.platform;
	var win = p.indexOf("Win") == 0;
	var mac = p.indexOf("Mac") == 0;
	var x11 = (p == "X11") || (p.indexOf("Linux") == 0);

	DEVICE.isPc = (win || mac || x11);
	DEVICE.isPhone = !DEVICE.isPc;
	DEVICE.isMac = mac;
	DEVICE.isWin = win;
	DEVICE.isLinux = x11;

})();




DEVICE.mainfest = function(){
	// var body = $("<div></div>");
	// body.css3({
	// 	width:"100%",height:"100%",position:"fixed",left:0,top:0,
	// 	display: "box",
	// 	"align-items":"center",
	// 	"justify-content":"center",
	// 	"z-index":"999999",
	// 	background:"#000",color:"#eee"
	// });
	// $("body").append(body);

	var body = $("#loading"),
		text = body.find("span"),
		pro = $("#loading_pro");


	window.applicationCache.addEventListener('checking', function(e) {
		text.text("正在检查更新");
	}, false);
	window.applicationCache.addEventListener('noupdate', function(e) {
		body.remove();
		$("#page1").css3({display:"box"});
	}, false);
	window.applicationCache.addEventListener('downloading', function(e) {
		text.text("开始下载");
	}, false);
	window.applicationCache.addEventListener('progress', function(e) {
		var n = e.loaded/e.total;
		pro.css({width:n*100+"%"});
		text.text("正在下载");
	}, false);
	window.applicationCache.addEventListener('updateready', function(e) {
		if(window.applicationCache.status == window.applicationCache.UPDATEREADY) {
			// Browser downloaded a new app cache.
			// Swap it in and reload the page to get the new hotness.
			window.applicationCache.swapCache();
			window.location.reload();
		}
	}, false);
	window.applicationCache.addEventListener('cached', function(e) {
		body.remove();
		$("#page1").css3({display:"box"});
	}, false);
	window.applicationCache.addEventListener('obsolete', function(e) {
		body.remove();
		$("#page1").css3({display:"box"});
	}, false);
	window.applicationCache.addEventListener('error', function(e) {
		body.remove();
		$("#page1").css3({display:"box"});
	}, false);
};




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
			var position = dom.css("position");
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
$.isJson = function(obj){
	return (typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length)
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


//$.fn.cssAnimate(params)
//@param data     	{transform:"scale(2)"}
//@param time    	时间毫秒:2000
//@param type   	动画方式:linear
//@param is_3d  	是否3d模式渲染  true/false
//@param callback  	动画完成回调:fn
//@param willChange  硬件加速   	transform			变形
// 							   	scroll-position		滚动
// 								contents			内容变化
//								opacity				透明度
//								left, top			定位



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

	return function(data,time,callback,is_3d,type,willChange){
		var _this=$(this),
			_that = _this.get(0),
			_thatstyle = _that.style;

		type = type || "ease";
		data = JSON.parse(DEVICE.fixObjCss(JSON.stringify(data)));
		time = time || 1000;
		callback = $.getFunction(callback);
		is_3d = ($.isBoolean(is_3d))?  is_3d : false;
		willChange = willChange || "auto";

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
		_thatstyle.willChange = willChange;

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
//@param delay 		动画延迟多久播放  ms
//@param willChange  硬件加速   	transform			变形
// 							   	scroll-position		滚动
// 								contents			内容变化
//								opacity				透明度
//								left, top			定位

//停止循环的动画
//$.fn.removeClassAnimate();


$.fn.classAnimate = (function(){
	var fns = {},
		clearFn = function(obj,_id){
			obj.get(0).removeEventListener(DEVICE.ANIEND_EV,fns[_id],false);
			obj.removeClassAnimate();
			delete fns[_id];
		},
		addFn = function(id,obj,callback,last_css){
			var _id = "__temp_"+DEVICE.counter()+"__";
			obj.get(0).addEventListener(DEVICE.ANIEND_EV,fns[_id] = function(e){
				if(id == e.animationName){
					obj.css(last_css);
					callback.call(this);
					clearFn(obj,_id);
				}
			},false);
		};

	return function(obj,time,type,infinite,alternate,callback,delay,willChange){
		var id = "__keyframes_"+DEVICE.counter()+"__";
		time = parseInt(time) || 1000;
		type = type || "linear";
		infinite = $.getBloom(infinite);
		callback = $.getFunction(callback);
		alternate = $.getBloom(alternate);
		willChange = willChange || "auto";
		delay = delay || 0;

		time = time+"ms";
		delay = delay+"ms";
		infinite = (infinite)? "infinite" :"";
		alternate = (alternate)? "alternate" : "";
		var class_name = id+"class__";

		if(!$.isObject(obj)){
			throw("css3Animate 参数样式结构错误");
		}



		//生成style
		var last_style = "";
		var style = $("<style id='"+class_name+"'></style>");

		var css = " animation: " + id + " " + time + " " + type + " " + delay + " " + infinite + " " + alternate +";";
		//css += "will_change:all;";
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
				$(this).css({"will-change":willChange});
				$(this).addClass(class_name);

				//var _delay = parseInt(delay),
				//	_this = this;

				$(this).get(0).__animate_css3_class__ = class_name;

				//if(_delay != 0){
				//	setTimeout(function(){
				//		$(_this).css(last_css);
				//	},_delay)
				//}else{
				//	$(this).css(last_css);
				//}
			}
		});


		//if(!$.isFunction(callback)){return $(this);}
		if(infinite){return $(this);}


		$(this).each(function(){
			if($(this).css("display") == "none" || $(this).css("visibility") == "hidden"){

			}else{
				addFn(id,$(this),callback,last_css);
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
		$(this).css({"will-change":"auto"});
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
//由于未传dom进来，未使用willChange属性，需要在stepFn中自己添加
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
})();"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//元素内的第一层元素的逐步动画

//new DEVICE.stepAnimate({
//    dom:$("#test"),           @param:jqdom   要运动的元素的包裹层
//    style:{                   @param:json     运动的方式 classAnimate
//        "0%":"transform:translateX(100px);",
//        "100%":"transform:translateX(0);"
//    },
//    runTime:300,              @param：number   单个元素的运行时间  ms
//    stepTime:50,              @param：number   子元素开始动画的间隔时间
//    callback:function(){
//        console.log(this)
//    },
//    willChange:"transform",
//    delayTime:1000,
//    animateType:"linear",
//    infinite:false,
//    alternate:false
//})

//jq调用方式(不传dom参数，其他一样)
//$.fn.childrenStepAnimate(opt)

DEVICE.stepAnimate = function () {
    function stepAnimate(opt) {
        _classCallCheck(this, stepAnimate);

        this.dom = opt.dom;
        this.children = this.dom.children();
        this.style = opt.style || {};
        this.runTime = opt.runTime || 500;
        this.stepTime = opt.stepTime || 10;
        this.animateType = opt.animateType || "linear";
        this.infinite = opt.infinite || false;
        this.alternate = opt.alternate || false;
        this.callback = opt.callback || "";
        this.delayTime = opt.delayTime || 0;
        this.willChange = opt.willChange || "auto";

        this._init();
    }

    _createClass(stepAnimate, [{
        key: "_init",
        value: function _init() {
            this._run();
        }
    }, {
        key: "_run",
        value: function _run() {
            for (var i = 0, l = this.children.length; i < l; i++) {
                var this_dom = this.children[i],
                    delayTime = this.delayTime + i * this.stepTime,
                    callback = function callback() {},
                    _this = this;

                if (i == l - 1) {
                    callback = function () {
                        var dom = $(this).parent();
                        _this.callback.call(dom.get(0));
                    };
                }

                $(this_dom).classAnimate(this.style, this.runTime, this.animateType, this.infinite, this.alternate, callback, delayTime, this.willChange);
            }
        }
    }]);

    return stepAnimate;
}();

$.fn.childrenStepAnimate = function (opt) {
    opt.dom = $(this);
    new DEVICE.stepAnimate(opt);
};

//$(document).ready(function(){
//    new DEVICE.stepAnimate({
//        dom:$("#test"),
//        style:{
//            "0%":"transform:rotate(0);",
//            "100%":"transform:rotate(360deg);"
//        },
//        runTime:300,
//        stepTime:50,
//        callback:function(){
//            console.log(this)
//        },
//        willChange:"transform",
//        infinite:true,
//        alternate:true
//    })
//});





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

};

/*
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
					}else{
						if(type == "myclickdown"){
							$(obj).css({opacity:0.5});
						}
						if(type == "myclickup"){
							$(obj).css({opacity:1});
						}
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

/**
 * Created by beens on 15/12/23.
 */


//touch滑动事件封装（简单版）
// var a = new DEVICE.touchSlideEvent({
//    dom:$("#div"),          //@param:jqobj   要监听的dom
//    startFn:function(){},   //@param:fn      手指按下时执行
//    moveFn:function(opt){   //@param:fn      手指滑动时执行
//        //opt.start.x   初始点 x，y
//        //opt.start.y
//        //opt.end.x     当前点 x ，y
//        //opt.end.y
//        //opt.move.x    当前点到初始点的距离  x ，y
//        //opt.move.y
//    },
//    endFn:function(opt,isSlide){    //@param：fn  手指释放的时候执行
//        //opt同上
//        //isSlide   布尔，是否触发快速滑动
//    },
//    slideLeftFn:function(){},     //@param:fn   快速左滑促发
//    slideRightFn:function(){},    //@param:fn   快速右滑促发
//    slideUpFn:function(){},       //@param:fn   快速上滑促发
//    slideDownFn:function(){},     //@param:fn   快速下滑促发
//    slideMaxTime:500,       //@param：number  触发快速滑动的最大时间 默认：500 ms
//    useDirection:"x"        //@param:str    "x","y","xy"
//                            //使用哪个方向的滑动   默认：x
// });

//销毁
//a.destroy();



DEVICE.touchSlideEvent = (function(){
    var touch = function(opt){
        opt = opt || {};
        this.dom = opt.dom || $("body");

        this.startFn = opt.startFn || function(){};
        this.moveFn = opt.moveFn || function(){};
        this.endFn = opt.endFn || function(){};
        this.slideLeftFn = opt.slideLeftFn || function(){};
        this.slideRightFn = opt.slideRightFn || function(){};
        this.slideUpFn = opt.slideUpFn || function(){};
        this.slideDownFn = opt.slideDownFn || function(){};

        this.slideMaxTime = opt.slideMaxTime || 500;
        this.useDirection = opt.useDirection || "x";   // x,y,xy


        this.touchStartFn = null;
        this.touchMoveFn = null;
        this.touchEndFn = null;
        this.points = [];
        this.isTouched = false;
        this.touchTime = 0;

        this.init();
    };
    touch.prototype = {
        init:function(){
            this.addEvent();
        },
        addEvent:function(){
            var obj = this.dom.get(0),
                _this = this;

            obj.addEventListener(DEVICE.START_EV,this.touchStartFn = function(e){
                _this.start(e);
            },false);
            document.addEventListener(DEVICE.MOVE_EV,this.touchMoveFn = function(e){
                _this.move(e);
            },false);
            document.addEventListener(DEVICE.END_EV,this.touchEndFn = function(e){
                _this.end(e)
            },false);
        },
        start:function(e){
            this.isTouched = true;
            this.clearPoint();
            this.savePoint(e);
            this.touchTime = new Date().getTime();
            this.startFn();
        },
        move:function(e){
            if(!this.isTouched){return;}
            //e.preventDefault();
            //e.stopPropagation();

            this.savePoint(e);

            if(this.points.length<2){return;}

            var points = this.getStartAndEndPoint(),
                move_x = Math.abs(points.move.x),
                move_y = Math.abs(points.move.y);

            if(this.useDirection == "x"){
                if(move_x > move_y){
                    e.preventDefault();
                    this.moveFn(points);
                }
            }else if(this.useDirection == "y"){
                if(move_y > move_x){
                    e.preventDefault();
                    this.moveFn(points);
                }
            }else{
                e.preventDefault();
                this.moveFn(points);
            }
        },
        end:function(){
            if(!this.isTouched){return;}
            this.isTouched = false;
            var time = new Date().getTime(),
                points = this.getStartAndEndPoint(),
                notSlide = (time - this.touchTime > this.slideMaxTime);
            this.endFn(points,!notSlide);

            //超时不触发滑动
            if(notSlide){return;}

            var m_x = points.move.x,
                m_y = points.move.y,
                is_x_long = (Math.abs(m_x) >= Math.abs(m_y));

            //右滑
            if(m_x>0 && is_x_long){
                if(this.useDirection != "y"){
                    this.slideRightFn();
                }
            }
            //左滑
            if(m_x<0 && is_x_long){
                if(this.useDirection != "y") {
                    this.slideLeftFn();
                }
            }
            //上滑
            if(m_y<0 && !is_x_long){
                if(this.useDirection != "x") {
                    this.slideUpFn();
                }
            }
            //下滑
            if(m_y>0 && !is_x_long){
                if(this.useDirection != "x") {
                    this.slideDownFn();
                }
            }


        },
        savePoint:function(e){
            var touch = (e.touches)? e.touches[0] : e;
            this.points.push({x:touch.clientX,y:touch.clientY});
        },
        clearPoint:function(){
            this.points = [];
        },
        getStartAndEndPoint:function(){
            var sPoint = this.points[0],
                len = this.points.length,
                ePoint = this.points[len-1],
                moveX = ePoint.x - sPoint.x,
                moveY = ePoint.y - sPoint.y;

            return {
                start:sPoint,
                end:ePoint,
                move:{
                    x:moveX,
                    y:moveY
                }
            }
        },
        destroy:function(){
            this.dom.get(0).removeEventListener(DEVICE.START_EV,this.touchStartFn,false);
            document.removeEventListener(DEVICE.MOVE_EV,this.touchMoveFn,false);
            document.removeEventListener(DEVICE.END_EV,this.touchEndFn,false);
        }
    };
    return touch;
})();


/*
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
			text.style.cssText = "height:"+30*this.scale+"px;line-height:"+30*this.scale+"px;color:#ccc;font-size:"+12*this.scale+"px;text-align:center;";


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
})();



/*
 * Filename :
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 15-8-6
 * Time: 上午11:31
 * Email:5878794@qq.com
 * =====================================
 * Desc:
 */



//本地缓存
//DEVICE.localData.setItem(key,val);
//DEVICE.localData.getItem(key);
//DEVICE.localData.removeItem(key);
DEVICE.localData = {
	userData: null,
	name: location.hostname,
	init: function () {
		if (!this.userData) {
			try {
				this.userData = document.createElement('INPUT');
				this.userData.type = "hidden";
				this.userData.style.display = "none";
				this.userData.addBehavior("#default#userData");
				document.body.appendChild(this.userData);
				var expires = new Date();
				expires.setDate(expires.getDate() + 365);
				this.userData.expires = expires.toUTCString();
			} catch (e) {
				return false;
			}
		}
		return true;

	},
	setItem: function (key, value) {
		if (window.localStorage) {
			window.localStorage[key] = value;
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.setAttribute(key, value);
				this.userData.save(this.name);
			}
		}

	},
	getItem: function (key) {
		if (window.localStorage) {
			return window.localStorage[key];
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				return this.userData.getAttribute(key)
			}
		}

	},
	removeItem: function (key) {
		if (window.localStorage) {
			window.localStorage.removeItem(key);
		} else {
			if (this.init()) {
				this.userData.load(this.name);
				this.userData.removeAttribute(key);
				this.userData.save(this.name);
			}
		}
	}
};


// 朗读文字
// iphone必须在点击事件后播放  >=ios7
//  android chrome>=55 才行


DEVICE.speak = function(text,lang,name){
	if(!window.speechSynthesis){console.log("not support speak!");return;}

	var synth = window.speechSynthesis,
		voices = synth.getVoices();
	synth.cancel();
	lang = lang || "zh-cn";
	name = name || "google";


	var utterThis = new SpeechSynthesisUtterance(text);
	var opticon = [],
		selectOpticon = "";

	for(var i=0,l=voices.length;i<l;i++){
		var this_lang = voices[i].lang;

		if(this_lang.toLowerCase() == lang){
			opticon.push(voices[i]);
		}
	}

	if(opticon.length == 1){
		selectOpticon = opticon[i];
	}else if(opticon.length == 0){
		selectOpticon = voices[i];
	}else{
		for(var z=0,zl=opticon.length;z<zl;z++){
			var this_name = opticon[z].name;
			if(this_name.toLowerCase().indexOf(name)>-1){
				selectOpticon = opticon[z];
				break;
			}
		}
		if(!selectOpticon){
			selectOpticon = opticon[0];
		}
	}


	utterThis.voice = selectOpticon;
	synth.speak(utterThis);
};



/*
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
				if(this.saveFn.hasOwnProperty(key)){
					if(this.saveFn[key]){
						isfined = true;
						break;
					}
				}
			}
			if(!isfind){
				this._removeObj();
			}
		},
		//解除事件绑定
		_removeObj:function(){
			var id = this.id;

			if(!savefn[id]){return;}

			delete savefn[id];
			saveobj[id].removeEven();
			delete saveobj[id];
			delete this.obj.__bens_slide_event_id__;
		}
	};



	window.$$$ =  function(obj){
		return new eventbind(obj);
	};
})();