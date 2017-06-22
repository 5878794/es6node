"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
animate_css
animate_class
animate_js
stepAnimate
pingying
touch_event
slide_event
speak_text
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
  (s = ua.match(/ipad; cpu os ([\d_]+)/)) ? Sys.ipad = s[1].replace(/_/g, ".") : (s = ua.match(/iphone os ([\d_]+)/)) ? Sys.iphone = s[1].replace(/_/g, ".") : (s = ua.match(/android[ \/]([\d.]+)/)) ? Sys.android = s[1] : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : Sys._ = 0;

  DEVICE.isIpad = Sys.hasOwnProperty("ipad");
  DEVICE.isIphone = Sys.hasOwnProperty("iphone");
  DEVICE.isAndroid = Sys.hasOwnProperty("android");
  DEVICE.isIe = Sys.hasOwnProperty("ie");
  DEVICE.isFirefox = Sys.hasOwnProperty("firefox");
  DEVICE.isChrome = Sys.hasOwnProperty("chrome");
  DEVICE.isOpera = Sys.hasOwnProperty("opera");
  DEVICE.isSafari = Sys.hasOwnProperty("safari");

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

  DEVICE.isPhone = DEVICE.isAndroid || DEVICE.isIpad || DEVICE.isIphone;
})();

(function () {
  var p = navigator.platform;
  var win = p.indexOf("Win") == 0;
  var mac = p.indexOf("Mac") == 0;
  var x11 = p == "X11" || p.indexOf("Linux") == 0;

  DEVICE.isPc = win || mac || x11;
  DEVICE.isPhone = !DEVICE.isPc;
  DEVICE.isMac = mac;
  DEVICE.isWin = win;
  DEVICE.isLinux = x11;
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
      vendor = function () {
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
  }(),
      prefixStyle = function prefixStyle(style) {
    if (!vendor) return style;

    style = style.charAt(0).toUpperCase() + style.substr(1);
    return vendor + style;
  },
      has3d = prefixStyle('perspective') in dummyStyle,
      windowTouch = window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0 ? true : false,
      webkitTouch = 'ontouchstart' in window,
      hasTouch = webkitTouch || windowTouch,
      hasTransform = vendor !== false,
      _transform = prefixStyle('transform'),
      _transitionProperty = prefixStyle('transitionProperty'),
      _transitionDuration = prefixStyle('transitionDuration'),
      _transformOrigin = prefixStyle('transformOrigin'),
      _transitionTimingFunction = prefixStyle('transitionTimingFunction'),
      _transitionDelay = prefixStyle('transitionDelay'),
      FULLSCREEN_EV = function () {
    if (vendor === false) return "fullscreenchange";

    var fullscreenchange = {
      '': 'fullscreenchange',
      'webkit': 'webkitfullscreenchange',
      'Moz': 'mozfullscreenchange',
      'O': 'ofullscreenchange',
      'ms': 'msfullscreenchange'
    };

    return fullscreenchange[vendor];
  }(),

  //鼠标锁定状态变化事件
  LOCKPOINTER_EV = function () {
    if (vendor === false) return "pointerlockchange";

    var pointerlockchange = {
      '': 'pointerlockchange',
      'webkit': 'webkitpointerlockchange',
      'Moz': 'mozpointerlockchange',
      'O': 'opointerlockchange', //无
      'ms': 'mspointerlockchange' //无
    };

    return pointerlockchange[vendor];
  }(),
      RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
      START_EV = webkitTouch ? 'touchstart' : windowTouch ? 'MSPointerDown' : 'mousedown',
      MOVE_EV = webkitTouch ? 'touchmove' : windowTouch ? 'MSPointerMove' : 'mousemove',
      END_EV = webkitTouch ? 'touchend' : windowTouch ? 'MSPointerUp' : 'mouseup',
      CANCEL_EV = webkitTouch ? 'touchcancel' : windowTouch ? 'MSPointerUp' : 'mouseup',
      TRNEND_EV = function () {
    if (vendor === false) return "transitionend";

    var transitionEnd = {
      '': 'transitionend',
      'webkit': 'webkitTransitionEnd',
      'Moz': 'transitionend',
      'O': 'otransitionend',
      'ms': 'MSTransitionEnd'
    };

    return transitionEnd[vendor];
  }(),
      ANIEND_EV = function () {
    if (vendor === false) return "animationEnd";

    var transitionEnd = {
      '': 'animationEnd',
      'webkit': 'webkitAnimationEnd',
      'Moz': 'mozAnimationEnd',
      'O': 'oanimationend',
      'ms': 'MSAnimationEnd'
    };

    return transitionEnd[vendor];
  }(),
      nextFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return setTimeout(callback, 1);
    };
  }(),
      cancelFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
  }(),
      checkDomHasPosition = function checkDomHasPosition(dom) {
    var position = dom.css("position");
    return position == "fixed" || position == "absolute" || position == "relative";
  },
      counter = function () {
    var a = 0;
    return function () {
      a += 1;
      return a;
    };
  }(),
      language = (navigator.browserLanguage || navigator.language).toLowerCase(),
      t_v = function () {
    var _vendors = 'webkitT,MozT,msT,OT'.split(','),
        t,
        i = 0,
        l = _vendors.length;

    for (; i < l; i++) {
      t = _vendors[i] + 'ransform';
      if (t in dummyStyle) {
        return "-" + _vendors[i].substr(0, _vendors[i].length - 1) + "-";
      }
    }
    return "";
  }(),
      getCssName = function getCssName(style) {
    return style in dummyStyle ? style : t_v + style in dummyStyle ? t_v + style : style;
  },

  //判断盒子模型的版本 2009版 2011版  2013版
  boxVendors = "",
      boxType = function () {
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
  }(),


  //（值）定义盒子模型 display:flex
  box = boxType == 2013 ? boxVendors + "flex" : boxType == 2011 ? boxVendors + "flexbox" : boxType == 2009 ? boxVendors + "box" : "flex",

  //与盒子内布局方向相同，  start  end 。。。
  align_items = boxType == 2013 ? boxVendors + "align-items" : boxType == 2011 ? boxVendors + "flex-pack" : boxType == 2009 ? boxVendors + "box-pack" : "align-items",

  //与盒子内布局方向相反，  start  end 。。。
  justify_content = boxType == 2013 ? boxVendors + "justify-content" : boxType == 2011 ? boxVendors + "flex-align" : boxType == 2009 ? boxVendors + "box-align" : "justify-content",


  //盒子子元素所占比例
  flex = boxType == 2013 ? boxVendors + "flex" : boxType == 2011 ? boxVendors + "flex" : boxType == 2009 ? boxVendors + "box-flex" : "flex",


  //盒子方向
  flex_direction = boxType == 2013 ? boxVendors + "flex-direction" : boxType == 2011 ? boxVendors + "flex-direction" : boxType == 2009 ? boxVendors + "box-orient" : "flex-direction",


  //（值）横向排列
  flex_direction_row = boxType == 2013 ? "row" : boxType == 2011 ? "row" : boxType == 2009 ? "horizontal" : "row",


  //（值）纵向排列
  flex_direction_column = boxType == 2013 ? "column" : boxType == 2011 ? "column" : boxType == 2009 ? "vertical" : "column",
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
    "transform-origin": transformOrigin,
    "transform-style": transformStyle,
    "perspective": perspective,
    "perspective-origin": perspectiveOrigin,
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
    "animation": animation
  },
      gz = function () {
    var reg,
        a = [];
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
  }(),
      css_prefix = function css_prefix(data) {
    var text = JSON.stringify(data),
        newtext = cssfile_prefix(text);
    return JSON.parse(newtext);
  },
      cssfile_prefix = function cssfile_prefix(data) {
    return data.replace(gz, function (a) {
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
      fix_css = function fix_css(css) {
    css = css.replace(/;/ig, " ; ");
    return cssfile_prefix(" " + css);
  };

  dummyStyle = null;

  DEVICE.has3d = has3d; //是否支持3d
  DEVICE.hasTouch = hasTouch; //是否是触摸屏
  DEVICE.hasTransform = hasTransform; //是否支持变形


  DEVICE._transform = transform; //自动添加前缀
  DEVICE._transitionProperty = _transitionProperty;
  DEVICE._transitionDuration = _transitionDuration;
  DEVICE._transformOrigin = _transformOrigin;
  DEVICE._transitionTimingFunction = _transitionTimingFunction;
  DEVICE._transitionDelay = _transitionDelay;

  DEVICE.RESIZE_EV = RESIZE_EV; //窗口变化
  DEVICE.START_EV = START_EV; //点击
  DEVICE.MOVE_EV = MOVE_EV; //移动
  DEVICE.END_EV = END_EV; //释放
  DEVICE.CANCEL_EV = CANCEL_EV; //结束
  DEVICE.TRNEND_EV = TRNEND_EV; //变形结束 webkitTransitionEnd
  DEVICE.ANIEND_EV = ANIEND_EV; //webkitAnimationEnd
  DEVICE.FULLSCREEN_EV = FULLSCREEN_EV; //全屏事件监听
  DEVICE.LOCKPOINTER_EV = LOCKPOINTER_EV; //锁定鼠标

  DEVICE.nextFrame = nextFrame;
  DEVICE.cancelFrame = cancelFrame;

  DEVICE.language = language; //语言版本  zh-cn
  DEVICE.counter = counter; //计数器  fn

  DEVICE.fixObjCss = css_prefix;
  DEVICE.fixCss = fix_css;

  DEVICE.css = css;
  DEVICE.boxType = boxType;
  DEVICE.boxVendors = boxVendors;

  DEVICE.checkDomHasPosition = checkDomHasPosition;

  DEVICE.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  };
  DEVICE.getBetweenNumber = function (val, min, max) {
    val = val > max ? max : val;
    val = val < min ? min : val;
    return val;
  };
})(); /*
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
$.isNumber = function (val) {
  return typeof val === 'number';
};
//判断是否是字符串
$.isString = function (val) {
  return typeof val === 'string';
};
//判断是否是布尔
$.isBoolean = function (val) {
  return typeof val === 'boolean';
};
//判断是否是对象   jqmobi有
$.isObject = function (str) {
  if (str === null || typeof str === 'undefined' || $.isArray(str)) {
    return false;
  }
  return (typeof str === "undefined" ? "undefined" : _typeof(str)) === 'object';
};
//判断是否是数组   jqmobi有
$.isArray = function (arr) {
  return arr.constructor === Array;
};
//判断是函数    jqmobi有
$.isFunction = function (fn) {
  return typeof fn === 'function';
};
//判断定义值没
$.isUndefined = function (val) {
  return typeof val === 'undefined';
};
//判断是否是网址
$.isUrl = function (url) {
  var strRegex = "[a-zA-z]+://[^s]*";
  var re = new RegExp(strRegex);
  return re.test(url);
};
$.isJson = function (obj) {
  return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
};

$.getDom = function (obj) {
  var returnobj;

  if (!obj) {
    return returnobj;
  }

  if ($.isString(obj)) {
    returnobj = document.getElementById(obj);
  } else if ($.isObject(obj)) {
    if (obj.length == 1) {
      returnobj = obj.get(0);
    }
    if (obj.nodeType == 1) {
      returnobj = obj;
    }
  }

  return returnobj;
};
$.getArray = function (str) {
  return $.isArray(str) ? str : [];
};
$.getFunction = function (fn) {
  return $.isFunction(fn) ? fn : function () {};
};
$.getBloom = function (str) {
  return $.isBoolean(str) ? str : false;
};
$.getObj = function (obj) {
  return $.isObject(obj) ? obj : {};
};
$.getNumber = function (str) {
  str = parseInt(str);
  str = str || 0;
  return str;
};

//设置css样式
$.fn.css3 = function (css) {
  $(this).css(DEVICE.fixObjCss(css));
  return $(this);
};
//返回style的css变换
$.css3 = function (css) {
  return DEVICE.fixCss(css);
}; /*
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
$.fn.cssAnimate = function () {

  var cssanimagefn = {},
      counter = function () {
    var a = 0;
    return function () {
      a += 1;
      return a;
    };
  }(),
      device = DEVICE,
      clearfn = function clearfn(obj, keyname) {
    obj.removeEventListener(device.TRNEND_EV, cssanimagefn[keyname], false);
    delete cssanimagefn[keyname];
    delete obj.__bens_cssfn_id__;
  };

  return function (data, time, callback, is_3d, type, willChange) {
    var _this = $(this),
        _that = _this.get(0),
        _thatstyle = _that.style;

    type = type || "ease";
    data = JSON.parse(DEVICE.fixObjCss(JSON.stringify(data)));
    time = time || 1000;
    callback = $.getFunction(callback);
    is_3d = $.isBoolean(is_3d) ? is_3d : false;
    willChange = willChange || "auto";

    if (_that.__bens_cssfn_id__) {
      var temp_key = _that.__bens_cssfn_id__;
      clearfn(_that, temp_key);
    }

    var thiskey = counter();
    _that.__bens_cssfn_id__ = thiskey;

    cssanimagefn[thiskey] = function (e) {
      var p_name = e.propertyName;
      if (e.target == _that && data.hasOwnProperty(p_name)) {

        //_this.get(0).style["webkitTransition"]="all 0 ease";
        _thatstyle[device._transitionProperty] = "";
        _thatstyle[device._transitionDuration] = "";
        _thatstyle[device._transitionTimingFunction] = "";
        _thatstyle["webkitTransformStyle"] = "";
        _thatstyle["webkitBackfaceVisibility"] = "";
        _thatstyle.willChange = "auto";

        callback();
        clearfn(_that, thiskey);
      }
    };

    _thatstyle[device._transitionProperty] = "all";
    _thatstyle[device._transitionDuration] = time + "ms";
    _thatstyle[device._transitionTimingFunction] = type;
    _thatstyle.willChange = willChange;

    _thatstyle["webkitTransformStyle"] = "preserve-3d"; //webkit私有
    if (!is_3d) {
      _thatstyle["webkitBackfaceVisibility"] = "hidden"; //webkit私有
    } else {
      _thatstyle["webkitBackfaceVisibility"] = "visible"; //webkit私有
    }

    setTimeout(function () {
      _that.addEventListener(device.TRNEND_EV, cssanimagefn[thiskey], false);
      _this.css(data);
    }, 1);
  };
}(); /*
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


$.fn.classAnimate = function () {
  var fns = {},
      clearFn = function clearFn(obj, _id) {
    obj.get(0).removeEventListener(DEVICE.ANIEND_EV, fns[_id], false);
    obj.removeClassAnimate();
    delete fns[_id];
  },
      addFn = function addFn(id, obj, callback, last_css) {
    var _id = "__temp_" + DEVICE.counter() + "__";
    obj.get(0).addEventListener(DEVICE.ANIEND_EV, fns[_id] = function (e) {
      if (id == e.animationName) {
        obj.css(last_css);
        callback.call(this);
        clearFn(obj, _id);
      }
    }, false);
  };

  return function (obj, time, type, infinite, alternate, callback, delay, willChange) {
    var id = "__keyframes_" + DEVICE.counter() + "__";
    time = parseInt(time) || 1000;
    type = type || "linear";
    infinite = $.getBloom(infinite);
    callback = $.getFunction(callback);
    alternate = $.getBloom(alternate);
    willChange = willChange || "auto";
    delay = delay || 0;

    time = time + "ms";
    delay = delay + "ms";
    infinite = infinite ? "infinite" : "";
    alternate = alternate ? "alternate" : "";
    var class_name = id + "class__";

    if (!$.isObject(obj)) {
      throw "css3Animate 参数样式结构错误";
    }

    //生成style
    var last_style = "";
    var style = $("<style id='" + class_name + "'></style>");

    var css = " animation: " + id + " " + time + " " + type + " " + delay + " " + infinite + " " + alternate + ";";
    //css += "will_change:all;";
    css = $.css3(css);
    css = "." + class_name + "{" + css + "} @keyframes " + id + "{";

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var this_val = $.css3(obj[key]);
        css += key + " {" + this_val + "}";
        last_style = this_val;
      }
    }

    css += "}";

    style.text(css);
    $("head").append(style);

    //生成最终的css
    var last_css = {};
    last_style = last_style.split(";");
    for (var z = 0, zl = last_style.length; z < zl; z++) {
      var this_style = last_style[z].split(":");
      if (this_style.length == 2) {
        var _key = $.trim(this_style[0]),
            _val = $.trim(this_style[1]);
        last_css[_key] = _val;
      }
    }

    $(this).each(function () {
      if ($(this).css("display") == "none" || $(this).css("visibility") == "hidden") {} else {
        $(this).css({ "will-change": willChange });
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
    if (infinite) {
      return $(this);
    }

    $(this).each(function () {
      if ($(this).css("display") == "none" || $(this).css("visibility") == "hidden") {} else {
        addFn(id, $(this), callback, last_css);
      }
    });

    return $(this);
  };
}();

$.fn.removeClassAnimate = function () {
  var temp = {};

  $(this).each(function () {
    var class_name = $(this).get(0).__animate_css3_class__;
    temp[class_name] = true;
    $(this).removeClass(class_name);
    $(this).css({ "will-change": "auto" });
  });

  for (var key in temp) {
    if (temp.hasOwnProperty(key)) {
      var style = $("#" + key);
      if (style.length != 0) {
        style.remove();
      }
    }
  }
}; /**
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


DEVICE.jsAnimate = function () {
  var nextFrame = DEVICE.nextFrame,
      cancelFrame = DEVICE.cancelFrame;

  //缓动算法
  //t:当前时间
  //b:初始值
  //c:变化量
  //d:持续时间
  var tween = {
    //线性
    Linear: function Linear(t, b, c, d) {
      return c * t / d + b;
    },
    //2次方缓动
    Quad: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
      }
    },
    //3次方缓动
    Cubic: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      }
    },
    //4次方缓动
    Quart: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      }
    },
    //5次方缓动
    Quint: {
      easeIn: function easeIn(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      }
    },
    //正选曲线缓动
    Sine: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      }
    },
    //指数曲线的缓动
    Expo: {
      easeIn: function easeIn(t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    },
    //圆形曲线的缓动
    Circ: {
      easeIn: function easeIn(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      }
    },
    //指数衰减的正弦曲线缓动
    Elastic: {
      easeIn: function easeIn(t, b, c, d, a, p) {
        if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOut: function easeOut(t, b, c, d, a, p) {
        if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOut: function easeInOut(t, b, c, d, a, p) {
        if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      }
    },
    //超过范围的三次方缓动
    Back: {
      easeIn: function easeIn(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOut: function easeOut(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOut: function easeInOut(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      }
    },
    //指数衰减的反弹缓动
    Bounce: {
      easeIn: function easeIn(t, b, c, d) {
        return c - tween.Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function easeOut(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
      },
      easeInOut: function easeInOut(t, b, c, d) {
        if (t < d / 2) return tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;else return tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    }
  };

  var animate = function animate(opt) {
    this.runTime = opt.time; //动画持续时间
    this.stepFn = opt.stepFn || function () {}; //每步执行的函数，参数：自动返回当前动画执行的百分比
    this.endFn = opt.endFn || function () {}; //动画执行完毕回调
    this.start = opt.start;
    this.end = opt.end;
    this.type = opt.type || "Linear";
    this.class = opt.class || "easeIn";
    this.alternate = $.isBoolean(opt.alternate) ? opt.alternate : false;
    this.infinite = $.isBoolean(opt.infinite) ? opt.infinite : false;

    this._checkParam();

    this.startTime = 0; //动画开始时间
    this.endTime = 0; //动画结束时间
    this.nowTime = 0; //当前动画执行到的时间
    this._useedTime = 0; //停止后在开始动画时的之前动画时间总和
    this._fn = null; //nextFrame 临时赋值变量
    this.isRuning = false; //动画是否在运行
    this.autoStop = false; //动画是否由最小化窗口暂停

    this.addEvent();
  };

  animate.prototype = {
    //检查tween动画参数是否正确
    _checkParam: function _checkParam() {
      if (this.type != "Linear") {
        if (tween[this.type] && tween[this.type][this.class]) {} else {
          this.type = "Cubic";
          this.class = "easeIn";
          console.log("参数不正确已使用Cubic easeIn");
        }
      }
    },
    //动画完成执行
    _complete: function _complete() {
      //如果无限循环执行
      if (this.infinite) {
        //是否反向执行
        if (this.alternate) {
          var a = this.start,
              b = this.end;
          this.end = a;
          this.start = b;
          this._useedTime = 0;
          this.play();
        } else {
          this._useedTime = 0;
          this.play();
        }
      } else {
        //是否反向执行
        if (this.alternate) {
          var a = this.start,
              b = this.end;
          this.end = a;
          this.start = b;
          this._useedTime = 0;
          this.alternate = false;
          this.play();
        } else {
          this.endFn();
        }
      }
    },
    //浏览器最小化时停止动画，恢复时执行
    addEvent: function addEvent() {
      var _this = this;
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          //最小化
          if (_this.isRuning) {
            _this.autoStop = true;
            _this.stop();
          }
        } else {
          //恢复窗口
          if (_this.autoStop) {
            _this.autoStop = false;
            _this.play();
          }
        }
      }, false);
    },
    //执行
    _go: function _go() {
      var _this = this;

      var __step__ = function __step__() {
        var now_time = new Date().getTime() + _this._useedTime,
            use_time = now_time - _this.startTime,
            pre = use_time / _this.runTime;

        _this.nowTime = now_time;

        if (now_time >= _this.endTime) {
          _this.stepFn(_this.end);
          _this.stop();
          _this._complete();
          return;
        }

        var _tween = _this.type == "Linear" ? tween.Linear : tween[_this.type][_this.class],
            val = _tween(pre, _this.start, _this.end - _this.start, 1);

        _this.stepFn(val);
        _this._fn = nextFrame(__step__);
      };

      __step__();
    },
    //开始动画
    play: function play() {
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + this.runTime;
      this.isRuning = true;
      this._go();
    },
    //暂停动画
    stop: function stop() {
      cancelFrame(this._fn);
      this._fn = null;
      this.isRuning = false;
      //重置运行时间
      this._useedTime = this.nowTime - this.startTime;
    },
    //从头开始动画
    restart: function restart() {
      this._useedTime = 0;
      this.play();
    }

  };

  return animate;
}();"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
          callback = function callback() {
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

//# sourceMappingURL=stepAnimate-compiled.js.map//拼音库
/*
 //获取简拼 每个汉字的首字母  英文不变
 var a=DEVICE.pingying.getJP(str);
 //获取完整的拼音  英文不变
 var a=DEVICE.pingying.getQP(str);
 */

DEVICE.pingying = function () {
  var Pinyin = {};
  Pinyin.codeTable = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "-": "",
    "—": "",
    "\"": "",
    "#": "",
    "%": "",
    "(": "",
    ")": "",
    "*": "",
    ",": "",
    "、": "",
    ".": "",
    "/": "",
    "：": "",
    "；": "",
    "\\": "",
    "`": "",
    "“": "",
    "”": "",
    "+": "",
    "ⅰ": "",
    "ⅱ": "",
    "Ⅲ": "",
    "Ⅳ": "",
    "Ⅴ": "",
    "Ⅵ": "",
    "Ⅶ": "",
    "Ⅷ": "",
    "Ⅸ": "",
    "Ⅹ": "",
    "Ⅺ": "",
    "Ⅻ": "",
    "A": "a",
    "B": "b",
    "C": "c",
    "D": "d",
    "E": "e",
    "F": "f",
    "G": "g",
    "H": "h",
    "I": "i",
    "J": "j",
    "K": "k",
    "L": "l",
    "M": "m",
    "N": "n",
    "O": "o",
    "P": "p",
    "Q": "q",
    "R": "r",
    "S": "s",
    "T": "t",
    "U": "u",
    "V": "v",
    "W": "w",
    "X": "x",
    "Y": "y",
    "Z": "z",
    "吖": "ya",
    "阿": "a",
    "啊": "a",
    "锕": "a",
    "嗄": "xia",
    "哎": "ai",
    "哀": "ai",
    "唉": "ai",
    "埃": "ai",
    "挨": "ai",
    "锿": "ai",
    "捱": "ai",
    "皑": "ai",
    "癌": "ai",
    "嗳": "ai",
    "矮": "ai",
    "蔼": "ai",
    "霭": "ai",
    "艾": "ai",
    "爱": "ai",
    "砹": "ai",
    "隘": "ai",
    "嗌": "ai",
    "嫒": "ai",
    "碍": "ai",
    "暧": "ai",
    "瑷": "ai",
    "安": "an",
    "桉": "an",
    "氨": "an",
    "庵": "an",
    "谙": "an",
    "鹌": "an",
    "鞍": "an",
    "俺": "an",
    "埯": "an",
    "铵": "an",
    "揞": "an",
    "犴": "an",
    "岸": "an",
    "按": "an",
    "案": "an",
    "胺": "an",
    "暗": "an",
    "黯": "an",
    "肮": "ang",
    "昂": "ang",
    "盎": "ang",
    "凹": "ao",
    "坳": "ao",
    "敖": "ao",
    "嗷": "ao",
    "廒": "ao",
    "獒": "jie",
    "遨": "ao",
    "熬": "ao",
    "翱": "ao",
    "聱": "ao",
    "螯": "ao",
    "鳌": "ao",
    "鏖": "ao",
    "拗": "ao",
    "袄": "ao",
    "媪": "ao",
    "岙": "ao",
    "傲": "ao",
    "奥": "ao",
    "骜": "ao",
    "澳": "ao",
    "懊": "ao",
    "鏊": "ao",
    "八": "ba",
    "巴": "ba",
    "叭": "ba",
    "扒": "ba",
    "吧": "ba",
    "岜": "ba",
    "芭": "ba",
    "疤": "ba",
    "捌": "ba",
    "笆": "ba",
    "粑": "ba",
    "拔": "ba",
    "茇": "ba",
    "菝": "ba",
    "跋": "ba",
    "魃": "ba",
    "把": "ba",
    "钯": "ba",
    "靶": "ba",
    "坝": "ba",
    "爸": "ba",
    "罢": "ba",
    "鲅": "ba",
    "霸": "ba",
    "灞": "ba",
    "掰": "bai",
    "白": "bai",
    "百": "bai",
    "佰": "bai",
    "柏": "bai",
    "捭": "ba",
    "摆": "bai",
    "呗": "bei",
    "败": "bai",
    "拜": "bai",
    "稗": "bai",
    "扳": "ban",
    "班": "ban",
    "般": "ban",
    "颁": "ban",
    "斑": "ban",
    "搬": "ban",
    "瘢": "ban",
    "癍": "ban",
    "阪": "ban",
    "坂": "ban",
    "板": "ban",
    "版": "ban",
    "钣": "ban",
    "舨": "ban",
    "办": "ban",
    "半": "ban",
    "伴": "ban",
    "扮": "ban",
    "拌": "ban",
    "绊": "ban",
    "瓣": "ban",
    "邦": "bang",
    "帮": "bang",
    "梆": "bang",
    "浜": "bin",
    "绑": "bang",
    "榜": "bang",
    "膀": "bang",
    "蚌": "bang",
    "傍": "bang",
    "棒": "bang",
    "谤": "bang",
    "蒡": "bang",
    "磅": "bang",
    "镑": "bang",
    "包": "bao",
    "孢": "bao",
    "苞": "bao",
    "胞": "bao",
    "煲": "bao",
    "龅": "bao",
    "褒": "bao",
    "雹": "bao",
    "宝": "bao",
    "饱": "bao",
    "保": "bao",
    "鸨": "bao",
    "堡": "bao",
    "葆": "bao",
    "褓": "bao",
    "报": "bao",
    "抱": "bao",
    "豹": "bao",
    "趵": "bao",
    "鲍": "bao",
    "暴": "bao",
    "爆": "bao",
    "陂": "bei",
    "卑": "bei",
    "杯": "bei",
    "悲": "bei",
    "碑": "bei",
    "鹎": "bei",
    "北": "bei",
    "贝": "bei",
    "狈": "bei",
    "邶": "bei",
    "备": "bei",
    "背": "bei",
    "钡": "bei",
    "倍": "bei",
    "悖": "bei",
    "被": "bei",
    "惫": "bei",
    "焙": "bei",
    "辈": "bei",
    "碚": "bei",
    "蓓": "bei",
    "褙": "bei",
    "鞴": "bai",
    "鐾": "bei",
    "奔": "ben",
    "贲": "bi",
    "锛": "ben",
    "本": "ben",
    "苯": "ben",
    "畚": "ben",
    "坌": "ben",
    "笨": "ben",
    "崩": "beng",
    "绷": "beng",
    "嘣": "beng",
    "甭": "beng",
    "泵": "beng",
    "迸": "beng",
    "甏": "beng",
    "蹦": "beng",
    "逼": "bi",
    "荸": "bi",
    "鼻": "bi",
    "匕": "bi",
    "比": "bi",
    "吡": "bi",
    "妣": "bi",
    "彼": "bi",
    "秕": "bi",
    "俾": "bi",
    "笔": "bi",
    "舭": "bi",
    "鄙": "bi",
    "币": "bi",
    "必": "bi",
    "毕": "bi",
    "闭": "bi",
    "庇": "bi",
    "畀": "bi",
    "哔": "bi",
    "毖": "bi",
    "荜": "bi",
    "陛": "bi",
    "毙": "bi",
    "狴": "bi",
    "铋": "bi",
    "婢": "bi",
    "庳": "bi",
    "敝": "bi",
    "萆": "ba",
    "弼": "bi",
    "愎": "bi",
    "筚": "bi",
    "滗": "bi",
    "痹": "bi",
    "蓖": "bi",
    "裨": "bi",
    "跸": "bi",
    "辟": "bi",
    "弊": "bi",
    "碧": "bi",
    "箅": "bi",
    "蔽": "bi",
    "壁": "bi",
    "嬖": "bi",
    "篦": "bi",
    "薜": "bai",
    "避": "bi",
    "濞": "bi",
    "臂": "bi",
    "髀": "bi",
    "璧": "bi",
    "襞": "bi",
    "边": "bian",
    "砭": "bian",
    "笾": "bian",
    "编": "bian",
    "煸": "bian",
    "蝙": "bian",
    "鳊": "bian",
    "鞭": "bian",
    "贬": "bian",
    "扁": "bian",
    "窆": "bian",
    "匾": "bian",
    "碥": "bian",
    "褊": "pian",
    "卞": "bian",
    "弁": "bian",
    "忭": "bian",
    "汴": "bian",
    "苄": "bian",
    "拚": "pin",
    "便": "bian",
    "变": "bian",
    "缏": "bian",
    "遍": "bian",
    "辨": "bian",
    "辩": "bian",
    "辫": "bian",
    "杓": "zhuo",
    "彪": "biao",
    "标": "biao",
    "飑": "biao",
    "髟": "bia",
    "骠": "biao",
    "膘": "biao",
    "瘭": "biao",
    "镖": "biao",
    "飙": "biao",
    "飚": "biao",
    "镳": "biao",
    "表": "biao",
    "婊": "biao",
    "裱": "biao",
    "鳔": "biao",
    "憋": "bie",
    "鳖": "bie",
    "别": "bie",
    "蹩": "bie",
    "瘪": "bie",
    "宾": "bin",
    "彬": "bin",
    "傧": "bin",
    "斌": "bin",
    "滨": "bin",
    "缤": "bin",
    "槟": "bing",
    "镔": "bin",
    "濒": "bin",
    "豳": "ban",
    "摈": "bin",
    "殡": "bin",
    "膑": "bin",
    "髌": "bin",
    "鬓": "bin",
    "冰": "bing",
    "兵": "bing",
    "丙": "bing",
    "邴": "bing",
    "秉": "bing",
    "柄": "bing",
    "炳": "bing",
    "饼": "bing",
    "禀": "bing",
    "并": "bing",
    "病": "bing",
    "摒": "bing",
    "拨": "bo",
    "波": "bo",
    "玻": "bo",
    "剥": "bo",
    "钵": "bo",
    "饽": "bo",
    "啵": "bo",
    "脖": "bo",
    "菠": "bo",
    "播": "bo",
    "伯": "bo",
    "孛": "bei",
    "驳": "bo",
    "帛": "bo",
    "泊": "bo",
    "勃": "bo",
    "亳": "bo",
    "钹": "bo",
    "铂": "bo",
    "舶": "bo",
    "博": "bo",
    "渤": "bo",
    "鹁": "bo",
    "搏": "bo",
    "箔": "bo",
    "膊": "bo",
    "踣": "pou",
    "薄": "bo",
    "礴": "bo",
    "跛": "bo",
    "簸": "bo",
    "擘": "bo",
    "檗": "bo",
    "逋": "bu",
    "钸": "xi",
    "晡": "bu",
    "醭": "bu",
    "卜": "bu",
    "卟": "bu",
    "补": "bu",
    "哺": "bu",
    "捕": "bu",
    "不": "bu",
    "布": "bu",
    "步": "bu",
    "怖": "bu",
    "钚": "bu",
    "部": "bu",
    "埠": "bu",
    "瓿": "bu",
    "簿": "bu",
    "嚓": "ca",
    "擦": "ca",
    "礤": "ca",
    "猜": "cai",
    "才": "cai",
    "材": "cai",
    "财": "cai",
    "裁": "cai",
    "采": "cai",
    "彩": "cai",
    "睬": "cai",
    "踩": "cai",
    "菜": "cai",
    "蔡": "cai",
    "参": "can",
    "骖": "can",
    "傪": "",
    "餐": "can",
    "残": "can",
    "蚕": "can",
    "惭": "can",
    "惨": "can",
    "黪": "can",
    "灿": "can",
    "粲": "can",
    "璨": "can",
    "仓": "cang",
    "伧": "cang",
    "沧": "cang",
    "苍": "cang",
    "舱": "cang",
    "藏": "cang",
    "操": "cao",
    "糙": "cao",
    "曹": "cao",
    "嘈": "cao",
    "漕": "cao",
    "槽": "cao",
    "艚": "cao",
    "螬": "cao",
    "草": "cao",
    "册": "ce",
    "侧": "ce",
    "厕": "ce",
    "恻": "ce",
    "测": "ce",
    "策": "ce",
    "岑": "cen",
    "涔": "cen",
    "噌": "ceng",
    "层": "ceng",
    "蹭": "ceng",
    "叉": "cha",
    "杈": "cha",
    "插": "cha",
    "馇": "cha",
    "锸": "cha",
    "查": "cha",
    "茬": "cha",
    "茶": "cha",
    "搽": "cha",
    "猹": "cha",
    "槎": "cha",
    "察": "cha",
    "碴": "cha",
    "檫": "cha",
    "衩": "cha",
    "镲": "cha",
    "汊": "cha",
    "岔": "cha",
    "诧": "cha",
    "姹": "cha",
    "差": "cha",
    "拆": "chai",
    "钗": "cha",
    "侪": "chai",
    "柴": "chai",
    "豺": "chai",
    "虿": "chai",
    "瘥": "chai",
    "觇": "chan",
    "掺": "chan",
    "搀": "chan",
    "婵": "chan",
    "谗": "chan",
    "孱": "chan",
    "禅": "chan",
    "馋": "chan",
    "缠": "chan",
    "蝉": "chan",
    "廛": "chan",
    "潺": "chan",
    "镡": "chan",
    "蟾": "chan",
    "躔": "chan",
    "产": "chan",
    "谄": "chan",
    "铲": "chan",
    "阐": "chan",
    "蒇": "chan",
    "冁": "chan",
    "忏": "chan",
    "颤": "chan",
    "羼": "chan",
    "伥": "chang",
    "昌": "chang",
    "娼": "chang",
    "猖": "chang",
    "菖": "chang",
    "阊": "chang",
    "鲳": "chang",
    "长": "chang",
    "肠": "chang",
    "苌": "chang",
    "尝": "chang",
    "偿": "chang",
    "常": "chang",
    "徜": "chang",
    "嫦": "chang",
    "厂": "chang",
    "场": "chang",
    "昶": "chang",
    "惝": "chang",
    "敞": "chang",
    "氅": "chang",
    "怅": "chang",
    "畅": "chang",
    "倡": "chang",
    "鬯": "chang",
    "唱": "chang",
    "抄": "chao",
    "怊": "chao",
    "钞": "chao",
    "焯": "zhuo",
    "超": "chao",
    "晁": "chao",
    "巢": "chao",
    "朝": "chao",
    "嘲": "chao",
    "潮": "chao",
    "吵": "chao",
    "炒": "chao",
    "耖": "chao",
    "车": "che",
    "砗": "che",
    "扯": "che",
    "彻": "che",
    "坼": "che",
    "掣": "che",
    "撤": "che",
    "澈": "che",
    "抻": "chen",
    "郴": "chen",
    "琛": "chen",
    "嗔": "chen",
    "尘": "chen",
    "臣": "chen",
    "忱": "chen",
    "沉": "chen",
    "辰": "chen",
    "陈": "chen",
    "宸": "chen",
    "晨": "chen",
    "谌": "chen",
    "碜": "chen",
    "闯": "chuang",
    "衬": "chen",
    "称": "chen",
    "龀": "chen",
    "趁": "chen",
    "榇": "chen",
    "谶": "chan",
    "柽": "cheng",
    "蛏": "cheng",
    "铛": "dang",
    "撑": "cheng",
    "瞠": "cheng",
    "丞": "sheng",
    "成": "cheng",
    "呈": "cheng",
    "承": "cheng",
    "枨": "cheng",
    "诚": "cheng",
    "城": "cheng",
    "乘": "cheng",
    "埕": "cheng",
    "铖": "cheng",
    "惩": "cheng",
    "程": "cheng",
    "裎": "cheng",
    "塍": "cheng",
    "酲": "cheng",
    "澄": "cheng",
    "橙": "cheng",
    "逞": "cheng",
    "骋": "cheng",
    "秤": "cheng",
    "吃": "chi",
    "哧": "chi",
    "蚩": "chi",
    "鸱": "chi",
    "眵": "chi",
    "笞": "chi",
    "嗤": "chi",
    "媸": "chi",
    "痴": "chi",
    "螭": "chi",
    "魑": "chi",
    "弛": "chi",
    "池": "chi",
    "驰": "chi",
    "迟": "chi",
    "茌": "chi",
    "持": "chi",
    "匙": "chi",
    "墀": "chi",
    "踟": "chi",
    "篪": "chi",
    "尺": "chi",
    "侈": "chi",
    "齿": "chi",
    "耻": "chi",
    "豉": "chi",
    "褫": "chi",
    "彳": "chi",
    "叱": "chi",
    "斥": "chi",
    "赤": "chi",
    "饬": "chi",
    "炽": "chi",
    "翅": "chi",
    "敕": "chi",
    "啻": "chi",
    "傺": "chi",
    "瘛": "chi",
    "充": "chong",
    "冲": "chong",
    "忡": "chong",
    "茺": "chong",
    "舂": "zhong",
    "憧": "chong",
    "艟": "chong",
    "虫": "chong",
    "崇": "chong",
    "宠": "chong",
    "铳": "chong",
    "抽": "chou",
    "瘳": "chou",
    "仇": "chou",
    "俦": "chou",
    "帱": "chou",
    "惆": "chou",
    "绸": "chou",
    "畴": "chou",
    "愁": "chou",
    "稠": "chou",
    "筹": "chou",
    "酬": "chou",
    "踌": "chou",
    "雠": "chou",
    "丑": "chou",
    "瞅": "chou",
    "臭": "chu",
    "出": "chu",
    "初": "chu",
    "樗": "chu",
    "刍": "chu",
    "除": "chu",
    "厨": "chu",
    "滁": "chu",
    "锄": "chu",
    "蜍": "chu",
    "雏": "chu",
    "橱": "chu",
    "躇": "chu",
    "蹰": "chu",
    "杵": "chu",
    "础": "chu",
    "储": "chu",
    "楮": "chu",
    "楚": "chu",
    "褚": "zhe",
    "亍": "chu",
    "处": "chu",
    "怵": "xu",
    "绌": "chu",
    "搐": "chu",
    "触": "chu",
    "憷": "chu",
    "黜": "chu",
    "矗": "chu",
    "搋": "chi",
    "揣": "chuan",
    "啜": "zhuo",
    "嘬": "chuai",
    "踹": "chuai",
    "川": "chuan",
    "氚": "chuan",
    "穿": "chuan",
    "传": "chuan",
    "舡": "chuan",
    "船": "chuan",
    "遄": "chuan",
    "椽": "chuan",
    "舛": "chuan",
    "喘": "chuan",
    "串": "chuan",
    "钏": "chuan",
    "囱": "cong",
    "疮": "chuang",
    "窗": "chuang",
    "床": "chuang",
    "创": "chuang",
    "怆": "chuang",
    "吹": "chui",
    "炊": "chui",
    "垂": "chui",
    "陲": "chui",
    "捶": "chui",
    "棰": "chui",
    "槌": "chui",
    "锤": "chui",
    "春": "chun",
    "椿": "chun",
    "蝽": "chun",
    "纯": "chun",
    "唇": "chun",
    "莼": "chun",
    "淳": "chun",
    "鹑": "chun",
    "醇": "chun",
    "蠢": "chun",
    "踔": "chuo",
    "戳": "chuo",
    "绰": "chuo",
    "辍": "chuo",
    "龊": "chuo",
    "呲": "ci",
    "疵": "ci",
    "词": "ci",
    "祠": "si",
    "茈": "chai",
    "茨": "ci",
    "瓷": "ci",
    "慈": "ci",
    "辞": "ci",
    "磁": "ci",
    "雌": "ci",
    "鹚": "ci",
    "糍": "ci",
    "此": "ci",
    "次": "ci",
    "刺": "ci",
    "赐": "ci",
    "从": "cong",
    "匆": "cong",
    "苁": "cong",
    "枞": "cong",
    "葱": "cong",
    "骢": "cong",
    "璁": "cong",
    "聪": "cong",
    "丛": "cong",
    "淙": "cong",
    "琮": "cong",
    "凑": "cu",
    "楱": "cou",
    "腠": "cou",
    "辏": "cou",
    "粗": "cu",
    "徂": "zu",
    "殂": "cu",
    "促": "chun",
    "猝": "cu",
    "酢": "zuo",
    "蔟": "chuo",
    "醋": "cu",
    "簇": "cu",
    "蹙": "cu",
    "蹴": "zu",
    "汆": "cuan",
    "撺": "cuan",
    "镩": "chuan",
    "蹿": "cuan",
    "窜": "cuan",
    "篡": "cuan",
    "爨": "cuan",
    "崔": "cui",
    "催": "cui",
    "摧": "cui",
    "榱": "cui",
    "璀": "cui",
    "脆": "cui",
    "啐": "zu",
    "悴": "cui",
    "淬": "cui",
    "萃": "cui",
    "毳": "qiao",
    "瘁": "cui",
    "粹": "cui",
    "翠": "cui",
    "村": "cun",
    "皴": "cun",
    "存": "cun",
    "忖": "cun",
    "寸": "cun",
    "搓": "cuo",
    "磋": "cun",
    "撮": "cuo",
    "蹉": "cuo",
    "嵯": "ci",
    "痤": "cuo",
    "矬": "cuo",
    "鹾": "cuo",
    "脞": "cuo",
    "厝": "cuo",
    "挫": "cuo",
    "措": "cuo",
    "锉": "cuo",
    "错": "cuo",
    "哒": "da",
    "耷": "da",
    "搭": "da",
    "嗒": "da",
    "褡": "da",
    "达": "da",
    "妲": "da",
    "怛": "da",
    "沓": "ta",
    "笪": "da",
    "答": "da",
    "瘩": "da",
    "靼": "da",
    "鞑": "da",
    "打": "da",
    "大": "da",
    "呆": "dai",
    "呔": "dai",
    "歹": "dai",
    "傣": "dai",
    "代": "dai",
    "岱": "dai",
    "甙": "dai",
    "绐": "dai",
    "迨": "dai",
    "带": "dai",
    "待": "dai",
    "怠": "dai",
    "殆": "dai",
    "玳": "dai",
    "贷": "dai",
    "埭": "dai",
    "袋": "dai",
    "逮": "dai",
    "戴": "dai",
    "黛": "dai",
    "丹": "dan",
    "单": "dan",
    "担": "dan",
    "眈": "dan",
    "耽": "dan",
    "郸": "dan",
    "聃": "dan",
    "殚": "dan",
    "瘅": "dan",
    "箪": "dan",
    "儋": "dan",
    "胆": "dan",
    "疸": "da",
    "掸": "dan",
    "旦": "dan",
    "但": "dan",
    "诞": "dan",
    "啖": "dan",
    "弹": "dan",
    "惮": "dan",
    "淡": "dan",
    "萏": "dan",
    "蛋": "dan",
    "氮": "dan",
    "澹": "dan",
    "当": "dang",
    "裆": "dang",
    "挡": "dang",
    "党": "dang",
    "谠": "dang",
    "凼": "dang",
    "宕": "dang",
    "砀": "dang",
    "荡": "dang",
    "档": "dang",
    "菪": "dang",
    "刀": "dao",
    "叨": "dao",
    "忉": "dao",
    "氘": "dao",
    "导": "dao",
    "岛": "dao",
    "倒": "dao",
    "捣": "dao",
    "祷": "dao",
    "蹈": "dao",
    "到": "dao",
    "悼": "dao",
    "焘": "dao",
    "盗": "dao",
    "道": "dao",
    "稻": "dao",
    "纛": "dao",
    "得": "de",
    "锝": "de",
    "德": "de",
    "的": "de",
    "灯": "deng",
    "登": "deng",
    "噔": "deng",
    "簦": "deng",
    "蹬": "deng",
    "等": "deng",
    "戥": "deng",
    "邓": "deng",
    "凳": "deng",
    "嶝": "deng",
    "瞪": "deng",
    "磴": "deng",
    "镫": "deng",
    "低": "di",
    "羝": "di",
    "堤": "di",
    "嘀": "di",
    "滴": "di",
    "镝": "di",
    "狄": "di",
    "籴": "di",
    "迪": "di",
    "敌": "di",
    "涤": "di",
    "荻": "di",
    "笛": "di",
    "觌": "di",
    "滌": "",
    "嫡": "di",
    "氐": "di",
    "诋": "di",
    "邸": "di",
    "坻": "di",
    "底": "di",
    "抵": "di",
    "柢": "di",
    "砥": "di",
    "骶": "di",
    "地": "di",
    "弟": "di",
    "帝": "di",
    "娣": "di",
    "递": "di",
    "第": "di",
    "谛": "di",
    "棣": "di",
    "睇": "di",
    "缔": "di",
    "蒂": "di",
    "碲": "di",
    "嗲": "dia",
    "掂": "dian",
    "滇": "dian",
    "颠": "dian",
    "巅": "dian",
    "癫": "dian",
    "典": "dian",
    "点": "dian",
    "碘": "dian",
    "踮": "dian",
    "电": "dian",
    "佃": "dian",
    "甸": "dian",
    "阽": "dian",
    "坫": "dian",
    "店": "dian",
    "垫": "dian",
    "玷": "dian",
    "钿": "tian",
    "惦": "dian",
    "淀": "dian",
    "奠": "dian",
    "殿": "dian",
    "靛": "dian",
    "癜": "dian",
    "簟": "dian",
    "刁": "diao",
    "叼": "diao",
    "凋": "diao",
    "貂": "diao",
    "碉": "diao",
    "雕": "diao",
    "鲷": "zhou",
    "吊": "diao",
    "钓": "diao",
    "调": "diao",
    "掉": "diao",
    "铞": "diao",
    "爹": "die",
    "跌": "die",
    "迭": "die",
    "垤": "die",
    "瓞": "die",
    "谍": "die",
    "喋": "die",
    "堞": "die",
    "揲": "die",
    "耋": "die",
    "叠": "die",
    "牒": "die",
    "碟": "die",
    "蝶": "die",
    "蹀": "die",
    "鲽": "die",
    "丁": "ding",
    "仃": "ding",
    "叮": "ding",
    "玎": "ding",
    "疔": "ding",
    "盯": "ding",
    "钉": "ding",
    "耵": "ding",
    "酊": "ding",
    "顶": "ding",
    "鼎": "ding",
    "订": "ding",
    "定": "ding",
    "啶": "ding",
    "腚": "ding",
    "碇": "ding",
    "锭": "ding",
    "丢": "ding",
    "铥": "diu",
    "东": "dong",
    "冬": "dong",
    "咚": "dong",
    "岽": "dong",
    "氡": "dong",
    "鸫": "dong",
    "董": "dong",
    "懂": "dong",
    "动": "dong",
    "冻": "dong",
    "侗": "dong",
    "垌": "dong",
    "峒": "dong",
    "恫": "dong",
    "栋": "dong",
    "洞": "dong",
    "胨": "dong",
    "胴": "dong",
    "硐": "dong",
    "都": "du",
    "兜": "dou",
    "蔸": "dou",
    "篼": "dou",
    "斗": "dou",
    "抖": "dou",
    "钭": "dou",
    "陡": "dou",
    "蚪": "dou",
    "豆": "dou",
    "逗": "dou",
    "痘": "dou",
    "窦": "dou",
    "嘟": "du",
    "督": "du",
    "毒": "du",
    "读": "du",
    "渎": "du",
    "椟": "du",
    "牍": "du",
    "犊": "du",
    "黩": "du",
    "髑": "du",
    "独": "du",
    "笃": "du",
    "堵": "du",
    "赌": "du",
    "睹": "du",
    "芏": "du",
    "妒": "du",
    "杜": "du",
    "肚": "du",
    "度": "du",
    "渡": "du",
    "镀": "du",
    "蠹": "du",
    "端": "duan",
    "短": "duan",
    "段": "duan",
    "断": "duan",
    "缎": "duan",
    "椴": "duan",
    "煅": "duan",
    "锻": "duan",
    "簖": "duan",
    "堆": "dui",
    "队": "dui",
    "对": "dui",
    "兑": "dui",
    "怼": "dui",
    "碓": "dui",
    "憝": "dui",
    "镦": "dun",
    "吨": "dun",
    "敦": "dun",
    "墩": "dun",
    "礅": "dun",
    "蹲": "dun",
    "盹": "dun",
    "趸": "dun",
    "囤": "dun",
    "沌": "chun",
    "炖": "dun",
    "盾": "dun",
    "砘": "dun",
    "钝": "dun",
    "顿": "dun",
    "遁": "dun",
    "多": "duo",
    "咄": "duo",
    "哆": "duo",
    "裰": "duo",
    "夺": "duo",
    "铎": "duo",
    "掇": "duo",
    "踱": "duo",
    "朵": "duo",
    "哚": "duo",
    "垛": "duo",
    "缍": "duo",
    "躲": "duo",
    "剁": "duo",
    "沲": "chi",
    "堕": "duo",
    "舵": "duo",
    "惰": "duo",
    "跺": "duo",
    "屙": "e",
    "讹": "e",
    "俄": "e",
    "娥": "e",
    "峨": "e",
    "莪": "e",
    "锇": "e",
    "鹅": "e",
    "蛾": "e",
    "额": "e",
    "婀": "e",
    "厄": "e",
    "呃": "e",
    "扼": "e",
    "苊": "e",
    "轭": "e",
    "垩": "e",
    "恶": "e",
    "饿": "e",
    "谔": "e",
    "鄂": "e",
    "阏": "yan",
    "愕": "e",
    "萼": "e",
    "遏": "e",
    "腭": "e",
    "锷": "e",
    "鹗": "e",
    "颚": "e",
    "噩": "e",
    "鳄": "e",
    "恩": "en",
    "蒽": "en",
    "摁": "en",
    "儿": "er",
    "而": "er",
    "鸸": "er",
    "鲕": "er",
    "尔": "er",
    "耳": "er",
    "迩": "er",
    "洱": "er",
    "饵": "er",
    "珥": "er",
    "铒": "er",
    "二": "er",
    "佴": "ji",
    "贰": "er",
    "发": "fa",
    "乏": "fa",
    "伐": "fa",
    "垡": "fa",
    "罚": "fa",
    "阀": "fa",
    "筏": "fa",
    "法": "fa",
    "砝": "fa",
    "珐": "fa",
    "帆": "fan",
    "番": "fan",
    "幡": "fan",
    "翻": "fan",
    "藩": "fan",
    "凡": "fan",
    "矾": "fan",
    "钒": "fan",
    "烦": "fan",
    "樊": "fan",
    "蕃": "bo",
    "燔": "fan",
    "繁": "fan",
    "蹯": "fan",
    "蘩": "fan",
    "反": "fan",
    "返": "fan",
    "犯": "fan",
    "泛": "fan",
    "饭": "fan",
    "范": "fan",
    "贩": "fan",
    "畈": "fan",
    "梵": "fan",
    "方": "fang",
    "邡": "fang",
    "坊": "fang",
    "芳": "fang",
    "枋": "bing",
    "钫": "fang",
    "防": "fang",
    "妨": "fang",
    "房": "fang",
    "肪": "fang",
    "鲂": "fang",
    "仿": "fang",
    "访": "fang",
    "彷": "fang",
    "纺": "fang",
    "舫": "fang",
    "放": "fang",
    "飞": "fei",
    "妃": "fei",
    "非": "fei",
    "啡": "fei",
    "绯": "fei",
    "菲": "fei",
    "扉": "fei",
    "蜚": "fei",
    "霏": "fei",
    "鲱": "fei",
    "肥": "fei",
    "淝": "fei",
    "腓": "fei",
    "匪": "fei",
    "诽": "fei",
    "悱": "fei",
    "斐": "fei",
    "榧": "fei",
    "翡": "fei",
    "篚": "fei",
    "吠": "fei",
    "废": "fei",
    "沸": "fei",
    "狒": "fei",
    "肺": "fei",
    "费": "fei",
    "痱": "fei",
    "镄": "fei",
    "分": "fen",
    "吩": "fen",
    "纷": "fen",
    "芬": "fen",
    "氛": "fen",
    "玢": "bin",
    "酚": "fen",
    "坟": "fen",
    "汾": "fen",
    "棼": "fen",
    "焚": "fen",
    "鼢": "fen",
    "粉": "fen",
    "份": "fen",
    "奋": "fen",
    "忿": "fen",
    "偾": "fen",
    "愤": "fen",
    "粪": "fen",
    "鲼": "fen",
    "瀵": "fen",
    "丰": "feng",
    "风": "feng",
    "沣": "feng",
    "枫": "feng",
    "封": "feng",
    "疯": "feng",
    "砜": "feng",
    "峰": "feng",
    "烽": "feng",
    "葑": "feng",
    "锋": "feng",
    "蜂": "feng",
    "酆": "feng",
    "冯": "feng",
    "逢": "feng",
    "缝": "feng",
    "讽": "feng",
    "唪": "beng",
    "凤": "feng",
    "奉": "feng",
    "俸": "feng",
    "佛": "fu",
    "缶": "fou",
    "否": "fu",
    "夫": "fu",
    "呋": "fu",
    "肤": "fu",
    "趺": "fu",
    "麸": "fu",
    "稃": "fu",
    "跗": "fu",
    "孵": "fu",
    "敷": "fu",
    "弗": "fu",
    "伏": "fu",
    "凫": "fu",
    "孚": "fu",
    "扶": "fu",
    "芙": "fu",
    "芾": "fei",
    "怫": "bei",
    "拂": "fu",
    "服": "fu",
    "绂": "fu",
    "绋": "fei",
    "苻": "fu",
    "俘": "fu",
    "氟": "fu",
    "祓": "fei",
    "罘": "fu",
    "茯": "fu",
    "郛": "fu",
    "浮": "fu",
    "砩": "fei",
    "莩": "fu",
    "蚨": "fu",
    "匐": "fu",
    "桴": "fu",
    "涪": "fu",
    "符": "fu",
    "艴": "fu",
    "菔": "fu",
    "袱": "fu",
    "幅": "fu",
    "福": "fu",
    "蜉": "fu",
    "辐": "fu",
    "幞": "fu",
    "蝠": "fu",
    "黻": "fu",
    "呒": "mu",
    "抚": "fu",
    "甫": "fu",
    "府": "fu",
    "拊": "bu",
    "斧": "fu",
    "俯": "fu",
    "釜": "fu",
    "脯": "fu",
    "辅": "fu",
    "腑": "fu",
    "滏": "fu",
    "腐": "fu",
    "黼": "fu",
    "父": "fu",
    "讣": "fu",
    "付": "fu",
    "妇": "fu",
    "负": "fu",
    "附": "fu",
    "咐": "fu",
    "阜": "fu",
    "驸": "fu",
    "复": "fu",
    "赴": "fu",
    "副": "fu",
    "傅": "fu",
    "富": "fu",
    "赋": "fu",
    "缚": "fu",
    "腹": "fu",
    "鲋": "chou",
    "赙": "fu",
    "蝮": "fu",
    "鳆": "fu",
    "覆": "fu",
    "馥": "fu",
    "旮": "ga",
    "伽": "jia",
    "钆": "ga",
    "尜": "ga",
    "嘎": "ga",
    "噶": "ga",
    "尕": "ga",
    "尬": "ga",
    "该": "gai",
    "陔": "gai",
    "垓": "gai",
    "赅": "gai",
    "改": "gai",
    "丐": "gai",
    "钙": "gai",
    "盖": "gai",
    "溉": "gai",
    "戤": "gai",
    "概": "gai",
    "干": "gan",
    "甘": "gan",
    "杆": "gan",
    "肝": "gan",
    "坩": "gan",
    "泔": "gan",
    "苷": "gan",
    "柑": "gan",
    "竿": "gan",
    "疳": "gan",
    "酐": "gan",
    "尴": "gan",
    "秆": "gan",
    "赶": "gan",
    "敢": "gan",
    "感": "gan",
    "澉": "gan",
    "橄": "gan",
    "擀": "gan",
    "旰": "gan",
    "矸": "gan",
    "绀": "gan",
    "淦": "gan",
    "赣": "gan",
    "冈": "gang",
    "刚": "gang",
    "岗": "gang",
    "纲": "gang",
    "肛": "gang",
    "缸": "gang",
    "钢": "gang",
    "罡": "gang",
    "港": "gang",
    "杠": "gong",
    "筻": "gang",
    "戆": "gang",
    "皋": "gao",
    "羔": "gao",
    "高": "gao",
    "槔": "gao",
    "睾": "gao",
    "膏": "gao",
    "篙": "gao",
    "糕": "gao",
    "杲": "gao",
    "搞": "gao",
    "缟": "gao",
    "槁": "gao",
    "稿": "gao",
    "镐": "gao",
    "藁": "gao",
    "告": "gao",
    "诰": "gao",
    "郜": "gao",
    "锆": "gao",
    "戈": "ge",
    "圪": "yi",
    "纥": "ge",
    "疙": "ge",
    "哥": "ge",
    "胳": "ge",
    "袼": "ge",
    "鸽": "ge",
    "割": "ge",
    "搁": "ge",
    "歌": "ge",
    "阁": "ge",
    "革": "ge",
    "格": "ge",
    "鬲": "ge",
    "葛": "ge",
    "蛤": "ga",
    "隔": "ge",
    "嗝": "ge",
    "塥": "ge",
    "搿": "ge",
    "膈": "ge",
    "镉": "ge",
    "骼": "ge",
    "哿": "ge",
    "舸": "ge",
    "个": "ge",
    "各": "ge",
    "虼": "ge",
    "硌": "ge",
    "铬": "ge",
    "给": "gei",
    "根": "gen",
    "跟": "gen",
    "哏": "gen",
    "亘": "gen",
    "艮": "gen",
    "茛": "gen",
    "更": "geng",
    "庚": "geng",
    "耕": "geng",
    "赓": "geng",
    "羹": "geng",
    "哽": "geng",
    "埂": "geng",
    "绠": "bing",
    "耿": "geng",
    "梗": "geng",
    "鲠": "geng",
    "工": "gong",
    "弓": "gong",
    "公": "gong",
    "功": "gong",
    "攻": "gong",
    "供": "gong",
    "肱": "gong",
    "宫": "gong",
    "恭": "gong",
    "蚣": "gong",
    "躬": "gong",
    "龚": "gong",
    "觥": "gong",
    "巩": "gong",
    "汞": "gong",
    "拱": "gong",
    "珙": "gong",
    "共": "gong",
    "贡": "gong",
    "勾": "gou",
    "佝": "gou",
    "沟": "gou",
    "钩": "gou",
    "缑": "gou",
    "篝": "gou",
    "鞲": "gou",
    "岣": "gou",
    "狗": "gou",
    "苟": "gou",
    "枸": "ju",
    "笱": "gou",
    "构": "gou",
    "诟": "gou",
    "购": "gou",
    "垢": "gou",
    "够": "gou",
    "媾": "gou",
    "彀": "gou",
    "遘": "gou",
    "觏": "gou",
    "估": "gu",
    "咕": "gu",
    "姑": "gu",
    "孤": "gu",
    "沽": "gu",
    "轱": "gu",
    "鸪": "gu",
    "菇": "gu",
    "菰": "gu",
    "蛄": "gu",
    "觚": "gu",
    "辜": "gu",
    "酤": "gu",
    "毂": "gu",
    "箍": "gu",
    "鹘": "gu",
    "古": "gu",
    "汩": "gu",
    "诂": "gu",
    "谷": "gu",
    "股": "gu",
    "牯": "gu",
    "骨": "gu",
    "罟": "gu",
    "钴": "gu",
    "蛊": "gu",
    "鹄": "gu",
    "鼓": "gu",
    "嘏": "gu",
    "臌": "gu",
    "瞽": "gu",
    "固": "gu",
    "故": "gu",
    "顾": "gu",
    "崮": "gu",
    "梏": "gu",
    "牿": "gu",
    "雇": "gu",
    "痼": "gu",
    "锢": "gu",
    "鲴": "gu",
    "瓜": "gua",
    "刮": "gua",
    "胍": "gu",
    "鸹": "gua",
    "呱": "gua",
    "剐": "gua",
    "寡": "gua",
    "卦": "gua",
    "诖": "gua",
    "挂": "gua",
    "褂": "gua",
    "乖": "guai",
    "拐": "guai",
    "怪": "guai",
    "关": "guan",
    "观": "guan",
    "官": "guan",
    "冠": "guan",
    "倌": "guan",
    "棺": "guan",
    "鳏": "guan",
    "馆": "guan",
    "管": "guan",
    "贯": "guan",
    "惯": "guan",
    "掼": "guan",
    "涫": "guan",
    "盥": "guan",
    "灌": "guan",
    "鹳": "guan",
    "罐": "guan",
    "光": "guang",
    "咣": "gong",
    "桄": "guang",
    "胱": "guang",
    "广": "guang",
    "犷": "guang",
    "逛": "guang",
    "归": "gui",
    "圭": "gui",
    "妫": "gui",
    "龟": "gui",
    "规": "gui",
    "皈": "gui",
    "闺": "gui",
    "硅": "gui",
    "瑰": "gui",
    "鲑": "gui",
    "宄": "gui",
    "轨": "gui",
    "庋": "gui",
    "匦": "gui",
    "诡": "gui",
    "癸": "gui",
    "鬼": "gui",
    "晷": "gui",
    "簋": "gui",
    "刽": "gui",
    "刿": "gui",
    "柜": "gui",
    "炅": "gui",
    "贵": "gui",
    "桂": "gui",
    "跪": "gui",
    "鳜": "gui",
    "衮": "gun",
    "绲": "gun",
    "辊": "gun",
    "滚": "gun",
    "磙": "gun",
    "鲧": "gun",
    "棍": "gun",
    "呙": "guo",
    "埚": "guo",
    "郭": "guo",
    "崞": "guo",
    "聒": "guo",
    "锅": "guo",
    "蝈": "guo",
    "国": "guo",
    "帼": "guo",
    "掴": "guo",
    "虢": "guo",
    "馘": "guo",
    "果": "guo",
    "猓": "guo",
    "椁": "guo",
    "蜾": "guo",
    "裹": "guo",
    "过": "guo",
    "铪": "ge",
    "哈": "ha",
    "嗨": "hai",
    "孩": "hai",
    "骸": "hai",
    "海": "hai",
    "胲": "gai",
    "醢": "hai",
    "亥": "hai",
    "骇": "hai",
    "害": "hai",
    "氦": "hai",
    "顸": "an",
    "蚶": "han",
    "酣": "han",
    "憨": "han",
    "鼾": "han",
    "邗": "han",
    "含": "han",
    "邯": "han",
    "函": "han",
    "晗": "han",
    "涵": "han",
    "焓": "han",
    "寒": "han",
    "韩": "han",
    "罕": "han",
    "喊": "han",
    "汉": "han",
    "汗": "han",
    "旱": "han",
    "悍": "han",
    "捍": "han",
    "焊": "han",
    "菡": "han",
    "颔": "han",
    "撖": "han",
    "憾": "han",
    "撼": "han",
    "翰": "han",
    "瀚": "han",
    "夯": "hen",
    "杭": "hang",
    "绗": "hang",
    "航": "hang",
    "颃": "gang",
    "沆": "hang",
    "蒿": "gao",
    "嚆": "hao",
    "薅": "hao",
    "蚝": "hao",
    "毫": "hao",
    "嗥": "hao",
    "豪": "hao",
    "嚎": "hao",
    "壕": "hao",
    "濠": "hao",
    "好": "hao",
    "郝": "hao",
    "号": "hao",
    "昊": "hao",
    "浩": "hao",
    "耗": "hao",
    "皓": "hao",
    "颢": "hao",
    "灏": "hao",
    "诃": "he",
    "呵": "he",
    "喝": "he",
    "嗬": "he",
    "禾": "he",
    "合": "he",
    "何": "he",
    "劾": "he",
    "和": "he",
    "河": "he",
    "曷": "e",
    "阂": "he",
    "核": "he",
    "盍": "he",
    "荷": "he",
    "涸": "he",
    "盒": "he",
    "菏": "he",
    "蚵": "he",
    "颌": "ge",
    "貉": "he",
    "阖": "he",
    "翮": "he",
    "贺": "he",
    "褐": "he",
    "赫": "he",
    "鹤": "he",
    "壑": "he",
    "黑": "hei",
    "嘿": "hei",
    "痕": "hen",
    "很": "hen",
    "狠": "hen",
    "恨": "hen",
    "亨": "heng",
    "哼": "heng",
    "恒": "heng",
    "桁": "hang",
    "珩": "hang",
    "横": "heng",
    "衡": "heng",
    "蘅": "heng",
    "轰": "hong",
    "哄": "hong",
    "訇": "heng",
    "烘": "hong",
    "薨": "hong",
    "弘": "hong",
    "红": "hong",
    "宏": "hong",
    "闳": "hong",
    "泓": "hong",
    "洪": "hong",
    "荭": "hong",
    "虹": "hong",
    "鸿": "hong",
    "蕻": "gong",
    "黉": "hong",
    "讧": "hong",
    "侯": "hou",
    "喉": "hou",
    "猴": "hou",
    "瘊": "hou",
    "篌": "hou",
    "糇": "hou",
    "骺": "hou",
    "吼": "hou",
    "后": "hou",
    "厚": "hou",
    "後": "hou",
    "逅": "hou",
    "候": "hou",
    "堠": "hou",
    "鲎": "hou",
    "乎": "hu",
    "呼": "hu",
    "忽": "hu",
    "烀": "hu",
    "轷": "hu",
    "唿": "hu",
    "惚": "hu",
    "滹": "hu",
    "囫": "hu",
    "弧": "hu",
    "狐": "hu",
    "胡": "hu",
    "壶": "hu",
    "斛": "hu",
    "湖": "hu",
    "猢": "hu",
    "葫": "hu",
    "煳": "hu",
    "瑚": "hu",
    "鹕": "hu",
    "槲": "hu",
    "糊": "hu",
    "蝴": "hu",
    "醐": "hu",
    "觳": "hu",
    "虎": "hu",
    "浒": "hu",
    "唬": "hu",
    "琥": "hu",
    "互": "hu",
    "户": "hu",
    "冱": "hu",
    "护": "hu",
    "沪": "hu",
    "岵": "hu",
    "怙": "hu",
    "戽": "hu",
    "祜": "hu",
    "笏": "hu",
    "扈": "hu",
    "瓠": "gu",
    "鹱": "hu",
    "花": "hua",
    "华": "hua",
    "哗": "hua",
    "骅": "hua",
    "铧": "hua",
    "滑": "hua",
    "猾": "hua",
    "化": "hua",
    "划": "hua",
    "画": "hua",
    "话": "hua",
    "桦": "hua",
    "怀": "huai",
    "徊": "huai",
    "淮": "huai",
    "槐": "huai",
    "踝": "huai",
    "坏": "huai",
    "欢": "huan",
    "獾": "quan",
    "还": "huai",
    "环": "huan",
    "郇": "huan",
    "洹": "huan",
    "桓": "huan",
    "萑": "zhui",
    "锾": "huan",
    "寰": "huan",
    "缳": "huan",
    "鬟": "huan",
    "缓": "huan",
    "幻": "huan",
    "奂": "huan",
    "宦": "huan",
    "唤": "huan",
    "换": "huan",
    "浣": "huan",
    "涣": "huan",
    "患": "huan",
    "焕": "huan",
    "逭": "huan",
    "痪": "huan",
    "豢": "huan",
    "漶": "huan",
    "鲩": "huan",
    "擐": "huan",
    "肓": "huang",
    "荒": "huang",
    "慌": "huang",
    "皇": "huang",
    "凰": "huang",
    "隍": "huang",
    "黄": "huang",
    "徨": "huang",
    "惶": "huang",
    "湟": "huang",
    "遑": "huang",
    "煌": "huang",
    "潢": "huang",
    "璜": "huang",
    "篁": "huang",
    "蝗": "huang",
    "癀": "huang",
    "磺": "huang",
    "簧": "huang",
    "蟥": "huang",
    "鳇": "huang",
    "恍": "huang",
    "晃": "huang",
    "谎": "huang",
    "幌": "huang",
    "灰": "hui",
    "诙": "hui",
    "咴": "hai",
    "恢": "hui",
    "挥": "hui",
    "虺": "hui",
    "晖": "hui",
    "珲": "hui",
    "辉": "hui",
    "麾": "hui",
    "徽": "hui",
    "隳": "hui",
    "回": "hui",
    "洄": "hui",
    "茴": "hui",
    "蛔": "hui",
    "悔": "hui",
    "卉": "hui",
    "汇": "hui",
    "会": "hui",
    "讳": "hui",
    "哕": "hui",
    "浍": "hua",
    "绘": "hui",
    "荟": "hui",
    "诲": "hui",
    "恚": "hui",
    "桧": "gui",
    "烩": "hui",
    "贿": "hui",
    "彗": "hui",
    "晦": "hui",
    "秽": "hui",
    "喙": "hui",
    "惠": "hui",
    "缋": "hui",
    "毁": "hui",
    "慧": "hui",
    "蕙": "hui",
    "蟪": "hui",
    "昏": "hun",
    "荤": "hun",
    "婚": "hun",
    "阍": "hun",
    "浑": "hun",
    "馄": "hun",
    "魂": "hun",
    "诨": "hun",
    "混": "hun",
    "溷": "hun",
    "耠": "huo",
    "锪": "huo",
    "劐": "hua",
    "豁": "huo",
    "攉": "huo",
    "活": "huo",
    "火": "huo",
    "伙": "huo",
    "钬": "huo",
    "夥": "huo",
    "或": "huo",
    "货": "huo",
    "获": "huo",
    "祸": "huo",
    "惑": "huo",
    "霍": "huo",
    "镬": "huo",
    "嚯": "huo",
    "藿": "he",
    "蠖": "huo",
    "丌": "ji",
    "讥": "ji",
    "击": "ji",
    "叽": "ji",
    "饥": "ji",
    "乩": "ji",
    "圾": "ji",
    "机": "ji",
    "玑": "ji",
    "肌": "ji",
    "芨": "ji",
    "矶": "ji",
    "鸡": "ji",
    "咭": "ji",
    "迹": "ji",
    "剞": "ji",
    "唧": "ji",
    "姬": "ji",
    "屐": "ji",
    "积": "ji",
    "笄": "ji",
    "基": "ji",
    "绩": "ji",
    "嵇": "ji",
    "犄": "ji",
    "缉": "ji",
    "赍": "ji",
    "畸": "ji",
    "跻": "ji",
    "箕": "ji",
    "畿": "ji",
    "稽": "ji",
    "齑": "ji",
    "墼": "ji",
    "激": "ji",
    "羁": "ji",
    "及": "ji",
    "吉": "ji",
    "岌": "ji",
    "汲": "ji",
    "级": "ji",
    "即": "ji",
    "极": "ji",
    "亟": "qi",
    "佶": "ji",
    "急": "ji",
    "笈": "ji",
    "疾": "ji",
    "戢": "ji",
    "棘": "ji",
    "殛": "ji",
    "集": "ji",
    "嫉": "ji",
    "楫": "ji",
    "蒺": "ji",
    "辑": "ji",
    "瘠": "ji",
    "蕺": "ji",
    "籍": "ji",
    "几": "ji",
    "己": "ji",
    "虮": "ji",
    "挤": "ji",
    "脊": "ji",
    "掎": "ji",
    "戟": "ji",
    "嵴": "ji",
    "麂": "ji",
    "计": "ji",
    "记": "ji",
    "伎": "ji",
    "纪": "ji",
    "妓": "ji",
    "忌": "ji",
    "技": "ji",
    "芰": "ji",
    "际": "ji",
    "剂": "ji",
    "季": "ji",
    "哜": "ji",
    "既": "ji",
    "洎": "ji",
    "济": "ji",
    "继": "ji",
    "觊": "ji",
    "偈": "jie",
    "寂": "ji",
    "寄": "ji",
    "悸": "ji",
    "祭": "ji",
    "蓟": "ji",
    "暨": "ji",
    "跽": "ji",
    "霁": "ji",
    "鲚": "ji",
    "稷": "ji",
    "鲫": "ji",
    "冀": "ji",
    "髻": "ji",
    "骥": "ji",
    "加": "jia",
    "夹": "jia",
    "佳": "jia",
    "迦": "jia",
    "枷": "jia",
    "浃": "jia",
    "珈": "jia",
    "家": "jia",
    "痂": "jia",
    "笳": "jia",
    "袈": "jia",
    "袷": "jie",
    "葭": "xia",
    "跏": "jia",
    "嘉": "jia",
    "镓": "jia",
    "岬": "jia",
    "郏": "jia",
    "荚": "jia",
    "恝": "jia",
    "戛": "jia",
    "铗": "jia",
    "蛱": "jia",
    "颊": "jia",
    "甲": "jia",
    "胛": "jia",
    "贾": "jia",
    "钾": "jia",
    "瘕": "xia",
    "价": "jia",
    "驾": "jia",
    "架": "jia",
    "假": "jia",
    "嫁": "jia",
    "稼": "jia",
    "戋": "jian",
    "奸": "jian",
    "尖": "jian",
    "坚": "jian",
    "歼": "jian",
    "间": "jian",
    "肩": "jian",
    "艰": "jian",
    "兼": "jian",
    "监": "jian",
    "笺": "jian",
    "菅": "jian",
    "湔": "jian",
    "犍": "jian",
    "缄": "jian",
    "搛": "jian",
    "煎": "jian",
    "缣": "jian",
    "蒹": "jian",
    "鲣": "jian",
    "鹣": "jian",
    "鞯": "jian",
    "囝": "jian",
    "拣": "jian",
    "枧": "jian",
    "俭": "jian",
    "柬": "jian",
    "茧": "jian",
    "捡": "jian",
    "笕": "jian",
    "减": "jian",
    "剪": "jian",
    "检": "jian",
    "趼": "jian",
    "睑": "jian",
    "硷": "jian",
    "裥": "jian",
    "锏": "jian",
    "简": "jian",
    "谫": "jian",
    "戬": "jian",
    "碱": "jian",
    "翦": "jian",
    "謇": "jian",
    "蹇": "jian",
    "见": "jian",
    "件": "jian",
    "建": "jian",
    "饯": "jian",
    "剑": "jian",
    "牮": "jian",
    "荐": "jian",
    "贱": "jian",
    "健": "jian",
    "涧": "jian",
    "舰": "jian",
    "渐": "jian",
    "谏": "jian",
    "楗": "jian",
    "毽": "jian",
    "溅": "jian",
    "腱": "jian",
    "践": "jian",
    "鉴": "jian",
    "键": "jian",
    "僭": "jian",
    "槛": "jian",
    "箭": "jian",
    "踺": "jian",
    "江": "jiang",
    "姜": "jiang",
    "将": "jiang",
    "茳": "jiang",
    "浆": "jiang",
    "豇": "jiang",
    "僵": "jiang",
    "缰": "jiang",
    "礓": "jiang",
    "疆": "jiang",
    "讲": "jiang",
    "奖": "jiang",
    "桨": "jiang",
    "蒋": "jiang",
    "耩": "jiang",
    "匠": "jiang",
    "降": "jiang",
    "洚": "jiang",
    "绛": "jiang",
    "酱": "jiang",
    "犟": "jiang",
    "糨": "jiang",
    "艽": "qiu",
    "交": "jiao",
    "郊": "jiao",
    "姣": "jiao",
    "娇": "jiao",
    "浇": "jiao",
    "茭": "jiao",
    "骄": "jiao",
    "胶": "jiao",
    "椒": "jiao",
    "焦": "jiao",
    "蛟": "jiao",
    "跤": "jiao",
    "僬": "jiao",
    "鲛": "jiao",
    "蕉": "jiao",
    "礁": "jiao",
    "鹪": "jiao",
    "角": "jiao",
    "佼": "jiao",
    "侥": "jiao",
    "挢": "jiao",
    "狡": "jiao",
    "绞": "jiao",
    "饺": "jiao",
    "皎": "jiao",
    "矫": "jiao",
    "脚": "jiao",
    "铰": "jiao",
    "搅": "jiao",
    "湫": "qiu",
    "剿": "jiao",
    "敫": "jiao",
    "徼": "jiao",
    "缴": "jiao",
    "叫": "jiao",
    "峤": "jiao",
    "轿": "jiao",
    "较": "jiao",
    "教": "jiao",
    "窖": "jie",
    "酵": "jiao",
    "噍": "jiao",
    "醮": "jiao",
    "阶": "jie",
    "疖": "jie",
    "皆": "jie",
    "接": "jie",
    "秸": "jie",
    "喈": "jie",
    "嗟": "jie",
    "揭": "jie",
    "街": "jie",
    "孑": "jie",
    "节": "jie",
    "讦": "jie",
    "劫": "jie",
    "杰": "jie",
    "诘": "jie",
    "拮": "jia",
    "洁": "jie",
    "结": "jie",
    "桀": "jie",
    "婕": "jie",
    "捷": "jie",
    "颉": "jie",
    "睫": "jie",
    "截": "jie",
    "碣": "jie",
    "竭": "jie",
    "鲒": "jie",
    "羯": "jie",
    "她": "ta",
    "姐": "jie",
    "解": "jie",
    "介": "jie",
    "戒": "jie",
    "芥": "jie",
    "届": "jie",
    "界": "jie",
    "疥": "jie",
    "诫": "jie",
    "借": "jie",
    "蚧": "jie",
    "骱": "jie",
    "藉": "jie",
    "巾": "jin",
    "今": "jin",
    "斤": "jin",
    "金": "jin",
    "津": "jin",
    "矜": "jin",
    "衿": "jin",
    "筋": "jin",
    "襟": "jin",
    "仅": "jin",
    "卺": "jin",
    "紧": "jin",
    "堇": "jin",
    "谨": "jin",
    "锦": "jin",
    "廑": "jin",
    "馑": "jin",
    "槿": "jin",
    "瑾": "jin",
    "尽": "jin",
    "劲": "jing",
    "妗": "jin",
    "近": "jin",
    "进": "jin",
    "荩": "jin",
    "晋": "jin",
    "浸": "jin",
    "烬": "jin",
    "赆": "jin",
    "缙": "jin",
    "禁": "jin",
    "靳": "jin",
    "觐": "jin",
    "噤": "jin",
    "京": "jing",
    "泾": "jing",
    "经": "jing",
    "茎": "jing",
    "荆": "jing",
    "惊": "jing",
    "旌": "jing",
    "菁": "jing",
    "晶": "jing",
    "腈": "jing",
    "睛": "jing",
    "粳": "jing",
    "兢": "jing",
    "精": "jing",
    "鲸": "jing",
    "井": "jing",
    "阱": "jing",
    "刭": "jing",
    "肼": "jing",
    "颈": "jing",
    "景": "jing",
    "儆": "jing",
    "憬": "jing",
    "警": "jing",
    "净": "jing",
    "弪": "jing",
    "径": "jing",
    "迳": "jing",
    "胫": "jing",
    "痉": "jing",
    "竞": "jing",
    "婧": "jing",
    "竟": "jing",
    "敬": "jing",
    "靓": "liang",
    "靖": "jing",
    "境": "jing",
    "獍": "jing",
    "静": "jing",
    "镜": "jing",
    "扃": "jiong",
    "迥": "jiong",
    "炯": "jiong",
    "窘": "jiong",
    "纠": "jiu",
    "究": "jiu",
    "鸠": "qiu",
    "赳": "jiu",
    "阄": "jiu",
    "啾": "jiu",
    "揪": "jiu",
    "鬏": "jiu",
    "九": "jiu",
    "久": "jiu",
    "灸": "jiu",
    "玖": "jiu",
    "韭": "jiu",
    "酒": "jiu",
    "旧": "jiu",
    "臼": "jiu",
    "咎": "jiu",
    "疚": "jiu",
    "柩": "jiu",
    "桕": "jiu",
    "厩": "jiu",
    "救": "jiu",
    "就": "jiu",
    "舅": "jiu",
    "僦": "jiu",
    "鹫": "jiu",
    "居": "ji",
    "拘": "ju",
    "狙": "ju",
    "苴": "ju",
    "驹": "ju",
    "疽": "ju",
    "掬": "ju",
    "椐": "ju",
    "琚": "ju",
    "趄": "ju",
    "锔": "ju",
    "裾": "ju",
    "雎": "ju",
    "鞠": "ju",
    "鞫": "ju",
    "局": "ju",
    "桔": "jie",
    "菊": "ju",
    "橘": "ju",
    "咀": "ju",
    "沮": "ju",
    "举": "ju",
    "矩": "ju",
    "莒": "ju",
    "榉": "ju",
    "榘": "ju",
    "龃": "ju",
    "踽": "ju",
    "句": "ju",
    "巨": "ju",
    "讵": "ju",
    "拒": "ju",
    "苣": "ju",
    "具": "ju",
    "炬": "ju",
    "钜": "ju",
    "俱": "ju",
    "倨": "ju",
    "剧": "ju",
    "惧": "ju",
    "据": "ju",
    "距": "ju",
    "犋": "ju",
    "飓": "ju",
    "锯": "ju",
    "窭": "ju",
    "聚": "ju",
    "踞": "ju",
    "遽": "ju",
    "瞿": "qu",
    "醵": "ju",
    "娟": "juan",
    "捐": "juan",
    "涓": "juan",
    "鹃": "juan",
    "镌": "juan",
    "蠲": "juan",
    "卷": "juan",
    "锩": "juan",
    "倦": "juan",
    "桊": "juan",
    "狷": "juan",
    "绢": "juan",
    "隽": "juan",
    "眷": "juan",
    "鄄": "juan",
    "噘": "jue",
    "撅": "jue",
    "孓": "jue",
    "决": "jue",
    "诀": "jue",
    "抉": "jue",
    "珏": "jue",
    "绝": "jue",
    "觉": "jue",
    "倔": "jue",
    "崛": "jue",
    "掘": "jue",
    "桷": "jue",
    "觖": "jue",
    "厥": "jue",
    "劂": "jue",
    "谲": "jue",
    "獗": "jue",
    "蕨": "jue",
    "噱": "xue",
    "橛": "jue",
    "爵": "jue",
    "镢": "jue",
    "蹶": "jue",
    "嚼": "jiao",
    "矍": "jue",
    "爝": "jue",
    "攫": "jue",
    "军": "jun",
    "君": "jun",
    "均": "jun",
    "钧": "jun",
    "皲": "jun",
    "菌": "jun",
    "筠": "jun",
    "麇": "jun",
    "俊": "jun",
    "郡": "jun",
    "峻": "jun",
    "捃": "jun",
    "浚": "jun",
    "骏": "jun",
    "竣": "jun",
    "咔": "ka",
    "咖": "ka",
    "喀": "ka",
    "卡": "ka",
    "佧": "ka",
    "胩": "ka",
    "开": "kai",
    "揩": "kai",
    "锎": "kai",
    "凯": "kai",
    "剀": "kai",
    "垲": "kai",
    "恺": "kai",
    "铠": "kai",
    "慨": "kai",
    "蒈": "kai",
    "楷": "kai",
    "锴": "jie",
    "忾": "kai",
    "刊": "kan",
    "勘": "kan",
    "龛": "kan",
    "堪": "kan",
    "戡": "kan",
    "坎": "kan",
    "侃": "kan",
    "砍": "kan",
    "莰": "kan",
    "看": "kan",
    "阚": "han",
    "瞰": "kan",
    "康": "kang",
    "慷": "kang",
    "糠": "kang",
    "扛": "kang",
    "亢": "kang",
    "伉": "kang",
    "抗": "kang",
    "闶": "kang",
    "炕": "kang",
    "钪": "kang",
    "尻": "kao",
    "考": "kao",
    "拷": "kao",
    "栲": "kao",
    "烤": "kao",
    "铐": "kao",
    "犒": "kao",
    "靠": "kao",
    "坷": "ke",
    "苛": "ke",
    "柯": "ke",
    "珂": "ke",
    "科": "ke",
    "轲": "ke",
    "疴": "ke",
    "钶": "ke",
    "棵": "ke",
    "颏": "hai",
    "稞": "hua",
    "窠": "ke",
    "颗": "ke",
    "瞌": "ke",
    "磕": "ke",
    "蝌": "ke",
    "髁": "ke",
    "壳": "ke",
    "咳": "ke",
    "可": "ke",
    "岢": "ke",
    "渴": "ke",
    "克": "ke",
    "刻": "ke",
    "客": "ke",
    "恪": "ke",
    "课": "ke",
    "氪": "ke",
    "骒": "ke",
    "缂": "ke",
    "嗑": "he",
    "溘": "ke",
    "锞": "guo",
    "肯": "ken",
    "垦": "ken",
    "恳": "ken",
    "啃": "ken",
    "裉": "ken",
    "吭": "keng",
    "坑": "kang",
    "铿": "keng",
    "空": "kong",
    "倥": "kong",
    "崆": "kong",
    "箜": "kong",
    "孔": "kong",
    "恐": "kong",
    "控": "kong",
    "抠": "kou",
    "芤": "kou",
    "眍": "kou",
    "口": "kou",
    "叩": "kou",
    "扣": "kou",
    "寇": "kou",
    "筘": "kou",
    "蔻": "kou",
    "刳": "ku",
    "枯": "ku",
    "哭": "ku",
    "堀": "ku",
    "窟": "ku",
    "骷": "ku",
    "苦": "ku",
    "库": "ku",
    "绔": "ku",
    "喾": "ku",
    "裤": "ku",
    "酷": "ku",
    "夸": "kua",
    "侉": "kua",
    "垮": "kua",
    "挎": "kua",
    "胯": "kua",
    "跨": "kua",
    "蒯": "kuai",
    "块": "kuai",
    "快": "kuai",
    "侩": "kuai",
    "郐": "kuai",
    "哙": "guai",
    "狯": "kuai",
    "脍": "kuai",
    "筷": "kuai",
    "宽": "kuan",
    "髋": "kuan",
    "款": "kuan",
    "匡": "kuang",
    "诓": "kuang",
    "哐": "kuang",
    "筐": "kuang",
    "狂": "kuang",
    "诳": "kuang",
    "夼": "kuang",
    "邝": "kuang",
    "圹": "kuang",
    "纩": "kuang",
    "况": "kuang",
    "旷": "kuang",
    "矿": "kuang",
    "贶": "kuang",
    "框": "kuang",
    "眶": "kuang",
    "亏": "kui",
    "岿": "kui",
    "悝": "kui",
    "盔": "kui",
    "窥": "kui",
    "奎": "kui",
    "逵": "kui",
    "馗": "kui",
    "喹": "kui",
    "揆": "kui",
    "葵": "kui",
    "暌": "kui",
    "魁": "kui",
    "睽": "kui",
    "蝰": "kui",
    "夔": "kui",
    "傀": "kui",
    "跬": "kui",
    "匮": "kui",
    "喟": "kui",
    "愦": "kui",
    "愧": "kui",
    "溃": "kui",
    "蒉": "kuai",
    "馈": "kui",
    "篑": "kui",
    "聩": "kui",
    "坤": "kun",
    "昆": "kun",
    "琨": "kun",
    "锟": "kun",
    "髡": "kun",
    "醌": "kun",
    "鲲": "kun",
    "悃": "kun",
    "捆": "kun",
    "阃": "kun",
    "困": "kun",
    "扩": "kuo",
    "括": "kuo",
    "栝": "gua",
    "蛞": "kuo",
    "阔": "kuo",
    "廓": "kuo",
    "垃": "la",
    "拉": "la",
    "啦": "la",
    "邋": "la",
    "旯": "la",
    "砬": "la",
    "喇": "la",
    "剌": "la",
    "腊": "la",
    "瘌": "la",
    "蜡": "la",
    "辣": "la",
    "来": "lai",
    "崃": "lai",
    "徕": "lai",
    "涞": "lai",
    "莱": "lai",
    "铼": "lai",
    "赉": "lai",
    "睐": "lai",
    "赖": "lai",
    "濑": "lai",
    "癞": "lai",
    "籁": "lai",
    "兰": "lan",
    "岚": "lan",
    "拦": "lan",
    "栏": "lan",
    "婪": "lan",
    "阑": "lan",
    "蓝": "lan",
    "谰": "lan",
    "澜": "lan",
    "褴": "lan",
    "斓": "lan",
    "篮": "lan",
    "镧": "lan",
    "览": "lan",
    "揽": "lan",
    "缆": "lan",
    "榄": "lan",
    "漤": "lan",
    "罱": "lan",
    "懒": "lan",
    "烂": "lan",
    "滥": "lan",
    "啷": "lang",
    "郎": "lang",
    "狼": "lang",
    "莨": "lang",
    "廊": "lang",
    "琅": "lang",
    "榔": "lang",
    "稂": "lang",
    "锒": "lang",
    "螂": "lang",
    "朗": "lang",
    "阆": "lang",
    "浪": "lang",
    "蒗": "lang",
    "捞": "lao",
    "劳": "lao",
    "牢": "lao",
    "唠": "lao",
    "崂": "lao",
    "痨": "lao",
    "铹": "lao",
    "醪": "lao",
    "老": "lao",
    "佬": "lao",
    "姥": "lao",
    "栳": "lao",
    "铑": "lao",
    "潦": "liao",
    "涝": "lao",
    "烙": "lao",
    "耢": "liao",
    "酪": "lao",
    "仂": "le",
    "乐": "le",
    "叻": "le",
    "泐": "le",
    "勒": "le",
    "鳓": "le",
    "雷": "lei",
    "嫘": "lei",
    "缧": "lei",
    "檑": "lei",
    "镭": "lei",
    "羸": "lei",
    "耒": "lei",
    "诔": "lei",
    "垒": "lei",
    "磊": "lei",
    "蕾": "lei",
    "儡": "lei",
    "肋": "le",
    "泪": "lei",
    "类": "lei",
    "累": "lei",
    "酹": "lei",
    "擂": "lei",
    "嘞": "le",
    "塄": "ling",
    "棱": "ling",
    "楞": "leng",
    "冷": "ling",
    "愣": "leng",
    "厘": "li",
    "梨": "li",
    "狸": "li",
    "离": "li",
    "莉": "li",
    "骊": "li",
    "犁": "li",
    "喱": "li",
    "鹂": "li",
    "漓": "li",
    "缡": "li",
    "蓠": "li",
    "蜊": "li",
    "嫠": "li",
    "璃": "li",
    "鲡": "li",
    "黎": "li",
    "篱": "li",
    "罹": "li",
    "藜": "li",
    "黧": "li",
    "蠡": "li",
    "礼": "li",
    "李": "li",
    "里": "li",
    "俚": "li",
    "哩": "li",
    "娌": "li",
    "逦": "li",
    "理": "li",
    "锂": "li",
    "鲤": "li",
    "澧": "li",
    "醴": "li",
    "鳢": "li",
    "力": "li",
    "历": "li",
    "厉": "li",
    "立": "li",
    "吏": "li",
    "丽": "li",
    "利": "li",
    "励": "li",
    "呖": "li",
    "坜": "li",
    "沥": "li",
    "苈": "li",
    "例": "li",
    "戾": "li",
    "枥": "li",
    "疠": "li",
    "隶": "li",
    "俐": "li",
    "俪": "li",
    "栎": "li",
    "疬": "li",
    "荔": "li",
    "轹": "li",
    "郦": "li",
    "栗": "li",
    "猁": "li",
    "砺": "li",
    "砾": "li",
    "莅": "li",
    "唳": "li",
    "笠": "li",
    "粒": "li",
    "粝": "li",
    "蛎": "li",
    "傈": "li",
    "痢": "li",
    "詈": "li",
    "跞": "li",
    "雳": "li",
    "溧": "li",
    "篥": "li",
    "俩": "lian",
    "奁": "lian",
    "连": "lian",
    "帘": "lian",
    "怜": "lian",
    "涟": "lian",
    "莲": "lian",
    "联": "lian",
    "裢": "lian",
    "廉": "lian",
    "鲢": "lian",
    "濂": "lian",
    "臁": "lian",
    "镰": "lian",
    "蠊": "lian",
    "敛": "lian",
    "琏": "lian",
    "脸": "lian",
    "裣": "chan",
    "蔹": "lian",
    "练": "lian",
    "娈": "lian",
    "炼": "lian",
    "恋": "lian",
    "殓": "lian",
    "链": "lian",
    "楝": "lian",
    "潋": "lian",
    "良": "liang",
    "凉": "liang",
    "梁": "liang",
    "椋": "liang",
    "粮": "liang",
    "粱": "liang",
    "墚": "liang",
    "踉": "liang",
    "两": "liang",
    "魉": "liang",
    "亮": "liang",
    "谅": "liang",
    "辆": "liang",
    "晾": "liang",
    "量": "liang",
    "辽": "liao",
    "疗": "liao",
    "聊": "liao",
    "僚": "liao",
    "寥": "liao",
    "廖": "liao",
    "嘹": "liao",
    "寮": "liao",
    "撩": "liao",
    "獠": "liao",
    "缭": "liao",
    "燎": "liao",
    "镣": "liao",
    "鹩": "liao",
    "钌": "liao",
    "蓼": "liao",
    "了": "liao",
    "尥": "liao",
    "料": "liao",
    "撂": "liao",
    "咧": "lei",
    "列": "lie",
    "劣": "lie",
    "冽": "lie",
    "洌": "lie",
    "埒": "lie",
    "烈": "lie",
    "捩": "li",
    "猎": "lie",
    "裂": "lie",
    "趔": "lie",
    "躐": "lie",
    "鬣": "lie",
    "邻": "lin",
    "林": "lin",
    "临": "lin",
    "啉": "lan",
    "淋": "lin",
    "琳": "lin",
    "粼": "lin",
    "嶙": "lin",
    "遴": "lin",
    "辚": "lin",
    "霖": "lin",
    "瞵": "lin",
    "磷": "lin",
    "鳞": "lin",
    "麟": "lin",
    "凛": "lin",
    "廪": "lin",
    "懔": "lan",
    "檩": "lin",
    "吝": "lin",
    "赁": "lin",
    "蔺": "lin",
    "膦": "lian",
    "躏": "lin",
    "拎": "ling",
    "伶": "ling",
    "灵": "ling",
    "囹": "ling",
    "岭": "ling",
    "泠": "ling",
    "苓": "ling",
    "柃": "ling",
    "玲": "ling",
    "瓴": "ling",
    "凌": "ling",
    "铃": "ling",
    "陵": "ling",
    "棂": "ling",
    "绫": "ling",
    "羚": "ling",
    "翎": "ling",
    "聆": "ling",
    "菱": "ling",
    "蛉": "ling",
    "零": "ling",
    "龄": "ling",
    "鲮": "ling",
    "酃": "ling",
    "领": "ling",
    "令": "ling",
    "另": "ling",
    "呤": "ling",
    "溜": "liu",
    "熘": "liu",
    "刘": "liu",
    "浏": "liu",
    "流": "liu",
    "留": "liu",
    "琉": "liu",
    "硫": "liu",
    "旒": "liu",
    "遛": "liu",
    "馏": "liu",
    "骝": "liu",
    "榴": "liu",
    "瘤": "liu",
    "镏": "liu",
    "鎏": "liu",
    "柳": "liu",
    "绺": "liu",
    "锍": "liu",
    "六": "liu",
    "鹨": "liu",
    "咯": "ke",
    "龙": "long",
    "咙": "long",
    "泷": "long",
    "茏": "long",
    "栊": "long",
    "珑": "long",
    "胧": "long",
    "砻": "long",
    "笼": "long",
    "聋": "long",
    "隆": "long",
    "癃": "long",
    "窿": "long",
    "礲": "",
    "陇": "long",
    "垄": "long",
    "垅": "long",
    "拢": "long",
    "娄": "lou",
    "偻": "liu",
    "喽": "lou",
    "蒌": "liu",
    "楼": "lou",
    "耧": "lou",
    "蝼": "lou",
    "髅": "lou",
    "嵝": "lou",
    "搂": "lou",
    "篓": "lou",
    "陋": "lou",
    "漏": "lou",
    "瘘": "lou",
    "镂": "lou",
    "露": "lu",
    "噜": "lu",
    "撸": "lu",
    "卢": "lu",
    "庐": "lu",
    "芦": "lu",
    "垆": "lu",
    "泸": "lu",
    "炉": "lu",
    "栌": "lu",
    "胪": "lu",
    "轳": "lu",
    "鸬": "lu",
    "舻": "lu",
    "颅": "lu",
    "鲈": "lu",
    "卤": "lu",
    "虏": "lu",
    "掳": "lu",
    "鲁": "lu",
    "橹": "lu",
    "镥": "lu",
    "陆": "lu",
    "录": "lu",
    "赂": "lu",
    "辂": "lu",
    "渌": "lu",
    "逯": "dai",
    "鹿": "lu",
    "禄": "lu",
    "滤": "lv",
    "碌": "lu",
    "路": "lu",
    "漉": "lu",
    "戮": "lu",
    "辘": "lu",
    "潞": "lu",
    "璐": "lu",
    "簏": "lu",
    "鹭": "lu",
    "麓": "lu",
    "氇": "lu",
    "驴": "lv",
    "闾": "lv",
    "榈": "lv",
    "吕": "lv",
    "侣": "lv",
    "旅": "lv",
    "稆": "lv",
    "铝": "lv",
    "屡": "lv",
    "缕": "lv",
    "膂": "lv",
    "褛": "lv",
    "履": "lv",
    "律": "lv",
    "虑": "lv",
    "率": "lv",
    "绿": "lv",
    "氯": "lv",
    "孪": "luan",
    "峦": "luan",
    "挛": "lian",
    "栾": "luan",
    "鸾": "luan",
    "脔": "ji",
    "滦": "luan",
    "銮": "luan",
    "卵": "luan",
    "乱": "luan",
    "掠": "lue",
    "略": "lue",
    "锊": "lue",
    "抡": "liu",
    "仑": "lun",
    "伦": "lun",
    "囵": "lun",
    "沦": "lun",
    "纶": "lun",
    "轮": "lun",
    "论": "lun",
    "捋": "lv",
    "罗": "luo",
    "猡": "luo",
    "脶": "luo",
    "萝": "luo",
    "逻": "luo",
    "椤": "luo",
    "锣": "luo",
    "箩": "luo",
    "骡": "luo",
    "镙": "luo",
    "螺": "luo",
    "倮": "luo",
    "裸": "luo",
    "瘰": "luo",
    "蠃": "guo",
    "泺": "luo",
    "洛": "luo",
    "络": "luo",
    "荦": "luo",
    "骆": "luo",
    "珞": "li",
    "落": "luo",
    "摞": "luo",
    "漯": "lei",
    "雒": "luo",
    "妈": "ma",
    "嬷": "ma",
    "麻": "ma",
    "蟆": "mo",
    "马": "ma",
    "犸": "ma",
    "玛": "ma",
    "码": "ma",
    "蚂": "ma",
    "杩": "ma",
    "骂": "ma",
    "唛": "ma",
    "吗": "ma",
    "嘛": "ma",
    "埋": "mai",
    "霾": "mai",
    "买": "mai",
    "荬": "mai",
    "劢": "mai",
    "迈": "mai",
    "麦": "mai",
    "卖": "mai",
    "脉": "mai",
    "颟": "man",
    "蛮": "man",
    "馒": "man",
    "瞒": "man",
    "鞔": "man",
    "鳗": "man",
    "满": "man",
    "螨": "man",
    "曼": "man",
    "谩": "man",
    "墁": "man",
    "幔": "man",
    "慢": "man",
    "漫": "man",
    "缦": "man",
    "蔓": "man",
    "熳": "man",
    "镘": "man",
    "邙": "mang",
    "忙": "mang",
    "芒": "mang",
    "盲": "mang",
    "茫": "mang",
    "硭": "mang",
    "莽": "mang",
    "漭": "mang",
    "蟒": "mang",
    "猫": "miao",
    "毛": "mao",
    "矛": "mao",
    "牦": "mao",
    "茅": "mao",
    "旄": "mao",
    "蛑": "mao",
    "锚": "mao",
    "髦": "mao",
    "蝥": "mao",
    "蟊": "mao",
    "卯": "mao",
    "峁": "mao",
    "泖": "liu",
    "茆": "mao",
    "昴": "mao",
    "铆": "mao",
    "茂": "mao",
    "冒": "mao",
    "贸": "mao",
    "耄": "mao",
    "袤": "mao",
    "帽": "mao",
    "瑁": "mao",
    "瞀": "mao",
    "貌": "mao",
    "懋": "mao",
    "么": "me",
    "没": "mei",
    "枚": "mei",
    "玫": "mei",
    "眉": "mei",
    "莓": "mei",
    "梅": "mei",
    "媒": "mei",
    "嵋": "mei",
    "湄": "mei",
    "猸": "mei",
    "楣": "mei",
    "煤": "mei",
    "酶": "mei",
    "镅": "mei",
    "鹛": "mei",
    "霉": "mei",
    "每": "mei",
    "美": "mei",
    "浼": "mei",
    "镁": "mei",
    "妹": "mei",
    "昧": "mei",
    "袂": "mei",
    "媚": "mei",
    "寐": "mei",
    "魅": "mei",
    "门": "men",
    "扪": "men",
    "钔": "men",
    "闷": "men",
    "焖": "men",
    "懑": "men",
    "们": "men",
    "氓": "meng",
    "虻": "meng",
    "萌": "meng",
    "盟": "meng",
    "甍": "meng",
    "瞢": "meng",
    "朦": "mang",
    "檬": "meng",
    "礞": "meng",
    "艨": "meng",
    "勐": "meng",
    "猛": "meng",
    "蒙": "meng",
    "锰": "meng",
    "艋": "meng",
    "蜢": "meng",
    "懵": "meng",
    "蠓": "meng",
    "孟": "meng",
    "梦": "meng",
    "咪": "mai",
    "弥": "mi",
    "祢": "ni",
    "迷": "mi",
    "猕": "mi",
    "谜": "mi",
    "醚": "mi",
    "糜": "mi",
    "縻": "mi",
    "麋": "mi",
    "靡": "mi",
    "蘼": "mi",
    "米": "mi",
    "芈": "mi",
    "弭": "mi",
    "敉": "mi",
    "脒": "mi",
    "眯": "mi",
    "汨": "mi",
    "宓": "mi",
    "泌": "mi",
    "觅": "mi",
    "秘": "mi",
    "密": "mi",
    "幂": "mi",
    "谧": "mi",
    "嘧": "mi",
    "蜜": "mi",
    "眠": "mian",
    "绵": "mian",
    "棉": "mian",
    "免": "mian",
    "沔": "mian",
    "黾": "meng",
    "勉": "mian",
    "眄": "mian",
    "娩": "mian",
    "冕": "mian",
    "湎": "mian",
    "缅": "mian",
    "腼": "mian",
    "面": "mian",
    "喵": "miao",
    "苗": "miao",
    "描": "miao",
    "瞄": "miao",
    "鹋": "miao",
    "杪": "miao",
    "眇": "miao",
    "秒": "miao",
    "淼": "miao",
    "渺": "miao",
    "缈": "miao",
    "藐": "miao",
    "邈": "miao",
    "妙": "miao",
    "庙": "miao",
    "乜": "nie",
    "咩": "mie",
    "灭": "mie",
    "蔑": "mie",
    "篾": "mie",
    "蠛": "mie",
    "民": "min",
    "岷": "min",
    "玟": "men",
    "苠": "min",
    "珉": "min",
    "缗": "hun",
    "皿": "min",
    "闵": "min",
    "抿": "min",
    "泯": "min",
    "闽": "min",
    "悯": "min",
    "敏": "min",
    "愍": "fen",
    "鳘": "bie",
    "名": "ming",
    "明": "ming",
    "鸣": "ming",
    "茗": "ming",
    "冥": "ming",
    "铭": "ming",
    "溟": "ming",
    "暝": "ming",
    "瞑": "ming",
    "螟": "ming",
    "酩": "ming",
    "命": "ming",
    "谬": "miu",
    "缪": "miao",
    "摸": "mo",
    "谟": "mo",
    "嫫": "mo",
    "馍": "mo",
    "摹": "mo",
    "模": "mo",
    "膜": "mo",
    "麽": "ma",
    "摩": "mo",
    "磨": "mo",
    "蘑": "mo",
    "魔": "mo",
    "抹": "mo",
    "末": "mo",
    "殁": "wen",
    "沫": "mo",
    "茉": "mo",
    "陌": "mo",
    "秣": "mo",
    "莫": "mo",
    "寞": "mo",
    "漠": "mo",
    "蓦": "mo",
    "貊": "mo",
    "墨": "mo",
    "瘼": "mo",
    "镆": "mo",
    "默": "mo",
    "貘": "mo",
    "耱": "mo",
    "哞": "mou",
    "牟": "mou",
    "侔": "mao",
    "眸": "mou",
    "谋": "mou",
    "鍪": "mou",
    "某": "mou",
    "母": "mu",
    "毪": "mu",
    "亩": "mu",
    "牡": "mu",
    "姆": "mu",
    "拇": "mu",
    "木": "mu",
    "仫": "mu",
    "目": "mu",
    "沐": "mu",
    "坶": "mei",
    "牧": "mu",
    "苜": "mu",
    "钼": "mu",
    "募": "mu",
    "墓": "mu",
    "幕": "mu",
    "睦": "mu",
    "慕": "mu",
    "暮": "mu",
    "穆": "mu",
    "拿": "na",
    "镎": "na",
    "哪": "na",
    "内": "na",
    "那": "na",
    "纳": "na",
    "肭": "na",
    "娜": "na",
    "衲": "na",
    "钠": "na",
    "捺": "na",
    "乃": "nai",
    "奶": "nai",
    "艿": "nai",
    "氖": "nai",
    "奈": "nai",
    "柰": "nai",
    "耐": "nai",
    "萘": "nai",
    "鼐": "nai",
    "囡": "nan",
    "男": "nan",
    "南": "nan",
    "难": "nan",
    "喃": "nan",
    "楠": "nan",
    "赧": "nan",
    "腩": "nan",
    "蝻": "nan",
    "囔": "nang",
    "囊": "nan",
    "馕": "nang",
    "曩": "nang",
    "攮": "nang",
    "孬": "nao",
    "呶": "nu",
    "挠": "nao",
    "硇": "nao",
    "铙": "nao",
    "猱": "nao",
    "蛲": "nao",
    "垴": "nao",
    "恼": "nao",
    "脑": "nao",
    "瑙": "nao",
    "闹": "nao",
    "淖": "ne",
    "讷": "ne",
    "呐": "na",
    "呢": "ne",
    "馁": "nei",
    "嫩": "nen",
    "能": "nen",
    "嗯": "en",
    "妮": "ni",
    "尼": "ni",
    "坭": "ni",
    "怩": "ni",
    "泥": "ni",
    "倪": "ni",
    "铌": "ni",
    "猊": "ni",
    "霓": "ni",
    "鲵": "ni",
    "伲": "ni",
    "你": "ni",
    "拟": "ni",
    "旎": "ni",
    "昵": "ni",
    "逆": "ni",
    "匿": "ni",
    "溺": "ni",
    "睨": "ni",
    "腻": "ni",
    "拈": "nian",
    "年": "nian",
    "鲇": "nian",
    "鲶": "nian",
    "黏": "nian",
    "捻": "nian",
    "辇": "nian",
    "撵": "nian",
    "碾": "nian",
    "廿": "nian",
    "念": "nian",
    "埝": "dian",
    "娘": "niang",
    "酿": "niang",
    "鸟": "niao",
    "茑": "niao",
    "袅": "niao",
    "嬲": "niao",
    "尿": "niao",
    "脲": "niao",
    "捏": "nie",
    "陧": "nie",
    "涅": "nie",
    "聂": "nie",
    "臬": "nie",
    "啮": "nie",
    "嗫": "nie",
    "镊": "nie",
    "镍": "nie",
    "颞": "nie",
    "蹑": "nie",
    "孽": "nie",
    "蘖": "nie",
    "您": "nin",
    "宁": "ning",
    "咛": "ning",
    "拧": "ning",
    "狞": "ning",
    "柠": "nin",
    "聍": "ning",
    "凝": "ning",
    "佞": "ning",
    "泞": "ning",
    "甯": "ning",
    "妞": "niu",
    "牛": "niu",
    "忸": "niu",
    "扭": "niu",
    "狃": "niu",
    "纽": "niu",
    "钮": "niu",
    "农": "nong",
    "侬": "nong",
    "哝": "nang",
    "浓": "nong",
    "脓": "nong",
    "弄": "long",
    "耨": "nou",
    "奴": "nu",
    "孥": "nu",
    "驽": "nu",
    "努": "nu",
    "弩": "nu",
    "胬": "nu",
    "怒": "nu",
    "女": "nv",
    "钕": "nv",
    "恧": "nv",
    "衄": "nv",
    "疟": "nue",
    "虐": "nuenue",
    "暖": "nuan",
    "挪": "nuo",
    "傩": "nuo",
    "诺": "nuo",
    "喏": "nuo",
    "搦": "nuo",
    "锘": "nuo",
    "懦": "nuo",
    "糯": "nuo",
    "噢": "ao",
    "哦": "ou",
    "讴": "xu",
    "欧": "ou",
    "殴": "ou",
    "瓯": "ou",
    "鸥": "ou",
    "呕": "ou",
    "偶": "ou",
    "耦": "ou",
    "藕": "ou",
    "怄": "ou",
    "沤": "ou",
    "趴": "pa",
    "啪": "pa",
    "葩": "pa",
    "杷": "ba",
    "爬": "pa",
    "耙": "ba",
    "琶": "pa",
    "筢": "pa",
    "帕": "pa",
    "怕": "pa",
    "拍": "pai",
    "俳": "pai",
    "徘": "pai",
    "排": "pai",
    "牌": "pai",
    "哌": "gu",
    "派": "pai",
    "湃": "pai",
    "蒎": "pai",
    "潘": "pan",
    "攀": "pan",
    "爿": "pan",
    "盘": "pan",
    "磐": "pan",
    "蹒": "pan",
    "蟠": "pan",
    "判": "pan",
    "泮": "pan",
    "叛": "pan",
    "盼": "pan",
    "畔": "pan",
    "袢": "pan",
    "襻": "pan",
    "乓": "pang",
    "滂": "pang",
    "庞": "pang",
    "逄": "pang",
    "旁": "pang",
    "螃": "bang",
    "耪": "pang",
    "胖": "pang",
    "抛": "pao",
    "脬": "pao",
    "刨": "pao",
    "咆": "pao",
    "庖": "pao",
    "狍": "pao",
    "炮": "pao",
    "袍": "pao",
    "匏": "pao",
    "跑": "pao",
    "泡": "pao",
    "疱": "pao",
    "呸": "pei",
    "胚": "pei",
    "醅": "pei",
    "陪": "pei",
    "培": "pei",
    "赔": "pei",
    "锫": "pei",
    "裴": "pei",
    "沛": "pei",
    "佩": "pei",
    "帔": "pei",
    "旆": "pei",
    "配": "pei",
    "辔": "pei",
    "霈": "pei",
    "喷": "pen",
    "盆": "pen",
    "湓": "pen",
    "怦": "peng",
    "抨": "peng",
    "砰": "peng",
    "烹": "peng",
    "嘭": "peng",
    "朋": "peng",
    "堋": "peng",
    "彭": "peng",
    "棚": "peng",
    "硼": "peng",
    "蓬": "peng",
    "鹏": "peng",
    "澎": "peng",
    "篷": "peng",
    "膨": "peng",
    "蟛": "peng",
    "捧": "peng",
    "碰": "peng",
    "丕": "pi",
    "批": "pi",
    "纰": "pi",
    "邳": "pi",
    "坯": "peng",
    "披": "pi",
    "砒": "pi",
    "铍": "pi",
    "劈": "pi",
    "噼": "pi",
    "霹": "pi",
    "皮": "pi",
    "芘": "bi",
    "枇": "pi",
    "毗": "pi",
    "疲": "pi",
    "蚍": "pi",
    "郫": "pi",
    "陴": "pi",
    "啤": "pi",
    "埤": "bei",
    "琵": "pi",
    "脾": "pi",
    "罴": "pi",
    "蜱": "miao",
    "貔": "pi",
    "鼙": "pi",
    "匹": "pi",
    "庀": "pi",
    "仳": "bi",
    "圮": "pi",
    "痞": "pi",
    "擗": "pi",
    "癖": "pi",
    "屁": "pi",
    "淠": "pei",
    "媲": "pi",
    "睥": "pi",
    "僻": "pi",
    "甓": "pi",
    "譬": "pi",
    "片": "pian",
    "偏": "pian",
    "犏": "pian",
    "篇": "pian",
    "翩": "pian",
    "骈": "pian",
    "胼": "pian",
    "蹁": "pian",
    "谝": "pian",
    "骗": "pian",
    "剽": "piao",
    "漂": "piao",
    "缥": "piao",
    "飘": "piao",
    "螵": "piao",
    "瓢": "piao",
    "殍": "piao",
    "瞟": "piao",
    "票": "piao",
    "嘌": "piao",
    "嫖": "piao",
    "氕": "pie",
    "撇": "pie",
    "瞥": "pie",
    "苤": "pie",
    "姘": "pin",
    "拼": "pin",
    "贫": "pin",
    "嫔": "pin",
    "频": "pin",
    "颦": "pin",
    "品": "pin",
    "榀": "pin",
    "牝": "pin",
    "娉": "ping",
    "聘": "pin",
    "乒": "ping",
    "俜": "ping",
    "平": "ping",
    "评": "ping",
    "凭": "ping",
    "坪": "ping",
    "苹": "ping",
    "屏": "ping",
    "枰": "ping",
    "瓶": "ping",
    "萍": "ping",
    "鲆": "ping",
    "钋": "po",
    "坡": "po",
    "泼": "po",
    "颇": "po",
    "婆": "po",
    "鄱": "po",
    "皤": "po",
    "叵": "po",
    "钷": "po",
    "笸": "po",
    "迫": "po",
    "珀": "po",
    "破": "po",
    "粕": "po",
    "魄": "po",
    "剖": "pou",
    "掊": "pei",
    "裒": "pou",
    "仆": "pu",
    "攴": "zhi",
    "扑": "pu",
    "铺": "pu",
    "噗": "pu",
    "匍": "pu",
    "莆": "pu",
    "菩": "pu",
    "葡": "pu",
    "蒲": "pu",
    "璞": "pu",
    "濮": "pu",
    "镤": "pu",
    "朴": "pu",
    "圃": "pu",
    "埔": "pu",
    "浦": "pu",
    "普": "pu",
    "溥": "po",
    "谱": "pu",
    "氆": "pu",
    "镨": "pu",
    "蹼": "pu",
    "瀑": "pu",
    "曝": "pu",
    "七": "qi",
    "沏": "qi",
    "妻": "qi",
    "柒": "qi",
    "凄": "qi",
    "栖": "qi",
    "桤": "qi",
    "戚": "qi",
    "萋": "qi",
    "期": "qi",
    "欺": "qi",
    "嘁": "qi",
    "槭": "qi",
    "漆": "qi",
    "蹊": "qi",
    "亓": "qi",
    "祁": "qi",
    "齐": "qi",
    "圻": "qi",
    "岐": "qi",
    "芪": "chi",
    "其": "qi",
    "奇": "qi",
    "歧": "qi",
    "祈": "qi",
    "耆": "shi",
    "脐": "qi",
    "颀": "ken",
    "崎": "qi",
    "淇": "qi",
    "畦": "qi",
    "萁": "ji",
    "骐": "qi",
    "骑": "qi",
    "棋": "qi",
    "琦": "qi",
    "琪": "qi",
    "祺": "qi",
    "蛴": "qi",
    "旗": "qi",
    "綦": "qi",
    "蜞": "qi",
    "蕲": "qin",
    "鳍": "qi",
    "麒": "qi",
    "乞": "qi",
    "企": "qi",
    "屺": "qi",
    "岂": "qi",
    "芑": "qi",
    "启": "qi",
    "杞": "qi",
    "起": "qi",
    "绮": "qi",
    "綮": "qi",
    "气": "qi",
    "讫": "qi",
    "汔": "qi",
    "迄": "qi",
    "弃": "qi",
    "汽": "qi",
    "泣": "qi",
    "契": "qi",
    "砌": "qi",
    "荠": "ci",
    "葺": "qi",
    "碛": "qi",
    "器": "qi",
    "憩": "qi",
    "掐": "qia",
    "葜": "qia",
    "恰": "qia",
    "洽": "qia",
    "髂": "ge",
    "千": "qian",
    "仟": "qian",
    "阡": "qian",
    "扦": "qian",
    "芊": "qian",
    "迁": "qian",
    "佥": "qian",
    "岍": "qian",
    "钎": "qian",
    "牵": "qian",
    "悭": "qian",
    "铅": "qian",
    "谦": "qian",
    "愆": "qian",
    "签": "qian",
    "骞": "qian",
    "搴": "qian",
    "褰": "qian",
    "前": "qian",
    "荨": "qian",
    "钤": "qian",
    "虔": "qian",
    "钱": "qian",
    "钳": "qian",
    "乾": "qian",
    "掮": "qian",
    "箝": "qian",
    "潜": "qian",
    "黔": "qian",
    "浅": "qian",
    "肷": "qian",
    "慊": "qian",
    "遣": "qian",
    "谴": "qian",
    "缱": "qian",
    "欠": "qian",
    "芡": "qian",
    "茜": "xi",
    "倩": "qing",
    "堑": "qian",
    "嵌": "qian",
    "椠": "qian",
    "歉": "qian",
    "呛": "qiang",
    "羌": "qiang",
    "戕": "zang",
    "戗": "qiang",
    "枪": "qiang",
    "跄": "qiang",
    "腔": "qiang",
    "蜣": "qiang",
    "锖": "qiang",
    "锵": "qiang",
    "镪": "qiang",
    "强": "qiang",
    "墙": "qiang",
    "嫱": "qiang",
    "蔷": "qiang",
    "樯": "qiang",
    "抢": "qiang",
    "羟": "qiang",
    "襁": "qiang",
    "炝": "qiang",
    "悄": "qiao",
    "硗": "qiao",
    "跷": "qiao",
    "劁": "qiao",
    "敲": "qiao",
    "锹": "qiao",
    "橇": "qiao",
    "缲": "qiao",
    "乔": "qiao",
    "侨": "qiao",
    "荞": "qiao",
    "桥": "qiao",
    "谯": "qiao",
    "憔": "qiao",
    "鞒": "qiao",
    "樵": "qiao",
    "瞧": "qiao",
    "巧": "qiao",
    "愀": "qiao",
    "俏": "qiao",
    "诮": "qiao",
    "峭": "qiao",
    "窍": "qiao",
    "翘": "qiao",
    "撬": "qiao",
    "鞘": "qiao",
    "切": "qie",
    "茄": "qie",
    "且": "qie",
    "妾": "qie",
    "怯": "qie",
    "窃": "qie",
    "挈": "qie",
    "惬": "qie",
    "箧": "qie",
    "锲": "qie",
    "亲": "qin",
    "侵": "qin",
    "钦": "qin",
    "衾": "qin",
    "芩": "qin",
    "芹": "qin",
    "秦": "qin",
    "琴": "qin",
    "禽": "qin",
    "勤": "qin",
    "嗪": "qin",
    "溱": "qin",
    "噙": "qin",
    "擒": "qin",
    "檎": "qin",
    "螓": "qin",
    "锓": "jin",
    "寝": "qin",
    "吣": "qin",
    "沁": "qin",
    "揿": "qin",
    "青": "qing",
    "氢": "qing",
    "轻": "qing",
    "倾": "qing",
    "卿": "qing",
    "圊": "qing",
    "清": "qing",
    "蜻": "qing",
    "鲭": "qing",
    "情": "qing",
    "晴": "qing",
    "氰": "qing",
    "擎": "qing",
    "檠": "qing",
    "黥": "qing",
    "苘": "qing",
    "顷": "qing",
    "请": "qing",
    "謦": "qing",
    "庆": "qing",
    "箐": "qing",
    "磬": "qing",
    "罄": "qing",
    "跫": "qiang",
    "銎": "qiong",
    "邛": "qiong",
    "穷": "qiong",
    "穹": "qiong",
    "茕": "qiong",
    "筇": "qiong",
    "琼": "qiong",
    "蛩": "gong",
    "丘": "qiu",
    "邱": "qiu",
    "秋": "qiu",
    "蚯": "qiu",
    "楸": "qiu",
    "鳅": "qiu",
    "囚": "qiu",
    "犰": "qiu",
    "求": "qiu",
    "虬": "qiu",
    "泅": "qiu",
    "俅": "qiu",
    "酋": "qiu",
    "逑": "qiu",
    "球": "qiu",
    "赇": "qiu",
    "巯": "qiu",
    "遒": "qiu",
    "裘": "qiu",
    "蝤": "qiu",
    "鼽": "qiu",
    "糗": "qiu",
    "区": "qu",
    "曲": "qu",
    "岖": "qu",
    "诎": "qu",
    "驱": "qu",
    "屈": "qu",
    "祛": "qu",
    "蛆": "qu",
    "躯": "qu",
    "蛐": "qu",
    "趋": "qu",
    "麴": "qu",
    "黢": "qu",
    "劬": "qu",
    "朐": "chun",
    "鸲": "gou",
    "渠": "qu",
    "蕖": "qu",
    "磲": "qu",
    "璩": "qu",
    "蘧": "qu",
    "氍": "qu",
    "癯": "qu",
    "衢": "qu",
    "蠼": "qu",
    "取": "qu",
    "娶": "qu",
    "龋": "qu",
    "去": "qu",
    "阒": "qu",
    "觑": "qu",
    "趣": "qu",
    "悛": "quan",
    "圈": "quan",
    "全": "quan",
    "权": "quan",
    "诠": "quan",
    "泉": "quan",
    "荃": "quan",
    "拳": "quan",
    "辁": "quan",
    "痊": "quan",
    "铨": "quan",
    "筌": "quan",
    "蜷": "quan",
    "醛": "quan",
    "鬈": "quan",
    "颧": "quan",
    "犬": "quan",
    "畎": "quan",
    "绻": "quan",
    "劝": "quan",
    "券": "quan",
    "炔": "que",
    "缺": "que",
    "瘸": "que",
    "却": "que",
    "悫": "que",
    "雀": "que",
    "确": "que",
    "阕": "kui",
    "阙": "que",
    "鹊": "que",
    "榷": "que",
    "逡": "qun",
    "裙": "qun",
    "群": "qun",
    "蚺": "tian",
    "然": "ran",
    "髯": "ran",
    "燃": "ran",
    "冉": "ran",
    "苒": "ran",
    "染": "ran",
    "禳": "rang",
    "瓤": "rang",
    "穰": "rang",
    "嚷": "rang",
    "壤": "rang",
    "攘": "rang",
    "让": "rang",
    "荛": "rao",
    "饶": "rao",
    "桡": "rao",
    "扰": "rao",
    "娆": "rao",
    "绕": "rao",
    "惹": "ruo",
    "热": "re",
    "人": "ren",
    "仁": "ren",
    "壬": "ren",
    "忍": "ren",
    "荏": "ren",
    "稔": "ren",
    "刃": "ren",
    "认": "ren",
    "仞": "ren",
    "任": "ren",
    "纫": "ren",
    "妊": "ren",
    "轫": "ren",
    "韧": "ren",
    "饪": "ren",
    "衽": "ren",
    "恁": "nen",
    "葚": "ren",
    "扔": "reng",
    "仍": "reng",
    "日": "ri",
    "戎": "rong",
    "肜": "chen",
    "狨": "rong",
    "绒": "rong",
    "茸": "rong",
    "荣": "rong",
    "容": "rong",
    "嵘": "rong",
    "溶": "rong",
    "蓉": "rong",
    "榕": "rong",
    "熔": "rong",
    "蝾": "rong",
    "融": "rong",
    "冗": "rong",
    "柔": "rou",
    "揉": "rou",
    "糅": "rou",
    "蹂": "rou",
    "鞣": "rou",
    "肉": "rou",
    "如": "ru",
    "茹": "ru",
    "铷": "ru",
    "儒": "ru",
    "嚅": "ru",
    "孺": "ru",
    "濡": "ru",
    "薷": "ru",
    "襦": "ru",
    "蠕": "ru",
    "颥": "ru",
    "汝": "ru",
    "乳": "ru",
    "辱": "ru",
    "入": "ru",
    "洳": "ru",
    "溽": "ru",
    "缛": "rong",
    "蓐": "ru",
    "褥": "ru",
    "阮": "ruan",
    "朊": "ruan",
    "软": "ruan",
    "蕤": "rui",
    "蕊": "rui",
    "芮": "rui",
    "枘": "nen",
    "蚋": "rui",
    "锐": "rui",
    "瑞": "rui",
    "睿": "rui",
    "闰": "run",
    "润": "run",
    "若": "ruo",
    "偌": "re",
    "弱": "ruo",
    "箬": "na",
    "仨": "sa",
    "撒": "sa",
    "洒": "sa",
    "卅": "sa",
    "飒": "sa",
    "脎": "sha",
    "萨": "sa",
    "塞": "sai",
    "腮": "sai",
    "噻": "sai",
    "鳃": "sai",
    "赛": "sai",
    "三": "san",
    "叁": "san",
    "毵": "san",
    "伞": "san",
    "散": "san",
    "糁": "san",
    "馓": "san",
    "桑": "sang",
    "嗓": "sang",
    "搡": "sang",
    "磉": "sang",
    "颡": "sang",
    "丧": "sang",
    "搔": "sao",
    "骚": "sao",
    "缫": "zao",
    "臊": "sao",
    "鳋": "sao",
    "扫": "sao",
    "嫂": "sao",
    "埽": "sao",
    "瘙": "sao",
    "色": "se",
    "啬": "se",
    "铯": "se",
    "瑟": "se",
    "穑": "se",
    "森": "sen",
    "僧": "seng",
    "杀": "sha",
    "沙": "sha",
    "纱": "sha",
    "刹": "sha",
    "砂": "sha",
    "莎": "sha",
    "铩": "se",
    "痧": "sha",
    "裟": "sha",
    "鲨": "sha",
    "傻": "sha",
    "唼": "qie",
    "啥": "sha",
    "歃": "sha",
    "煞": "sha",
    "霎": "sha",
    "筛": "shai",
    "晒": "shai",
    "山": "shan",
    "删": "shan",
    "杉": "shan",
    "芟": "shan",
    "姗": "shan",
    "衫": "shan",
    "钐": "shan",
    "埏": "shan",
    "珊": "shan",
    "舢": "shan",
    "跚": "shan",
    "煽": "shan",
    "潸": "shan",
    "膻": "shan",
    "闪": "shan",
    "陕": "shan",
    "讪": "shan",
    "汕": "shan",
    "疝": "shan",
    "苫": "shan",
    "剡": "shan",
    "扇": "shan",
    "善": "shan",
    "骟": "shan",
    "鄯": "shan",
    "缮": "shan",
    "嬗": "chan",
    "擅": "shan",
    "膳": "shan",
    "赡": "shan",
    "蟮": "shan",
    "鳝": "shan",
    "伤": "shang",
    "殇": "shang",
    "商": "shang",
    "觞": "shang",
    "墒": "shang",
    "熵": "shang",
    "裳": "shang",
    "垧": "shang",
    "晌": "shang",
    "赏": "shang",
    "上": "shang",
    "尚": "shang",
    "绱": "shang",
    "捎": "shao",
    "梢": "shao",
    "烧": "shao",
    "稍": "shao",
    "筲": "shao",
    "艄": "shao",
    "蛸": "shao",
    "勺": "shao",
    "芍": "shao",
    "苕": "shao",
    "韶": "shao",
    "少": "shao",
    "劭": "shao",
    "邵": "shao",
    "绍": "shao",
    "哨": "shao",
    "潲": "shao",
    "奢": "she",
    "猞": "she",
    "赊": "she",
    "畲": "she",
    "舌": "she",
    "佘": "she",
    "蛇": "she",
    "舍": "she",
    "厍": "she",
    "设": "she",
    "社": "she",
    "射": "she",
    "涉": "she",
    "赦": "she",
    "慑": "she",
    "摄": "she",
    "滠": "ni",
    "麝": "she",
    "申": "shen",
    "伸": "shen",
    "身": "shen",
    "呻": "shen",
    "绅": "shen",
    "诜": "shen",
    "娠": "shen",
    "砷": "shen",
    "深": "shen",
    "神": "shen",
    "沈": "shen",
    "审": "shen",
    "哂": "shen",
    "矧": "shen",
    "谂": "shen",
    "婶": "shen",
    "渖": "shen",
    "肾": "shen",
    "甚": "shen",
    "胂": "chen",
    "渗": "shen",
    "慎": "shen",
    "椹": "shen",
    "蜃": "shen",
    "升": "sheng",
    "生": "sheng",
    "声": "sheng",
    "牲": "sheng",
    "胜": "sheng",
    "笙": "sheng",
    "甥": "sheng",
    "渑": "sheng",
    "绳": "sheng",
    "省": "sheng",
    "眚": "sheng",
    "圣": "sheng",
    "晟": "cheng",
    "盛": "sheng",
    "剩": "sheng",
    "嵊": "cheng",
    "尸": "shi",
    "失": "shi",
    "师": "shi",
    "虱": "shi",
    "诗": "shi",
    "施": "shi",
    "狮": "shi",
    "湿": "shi",
    "蓍": "shi",
    "酾": "shai",
    "鲺": "shi",
    "十": "shi",
    "什": "shi",
    "石": "shi",
    "时": "shi",
    "识": "shi",
    "实": "shi",
    "拾": "shi",
    "炻": "shi",
    "蚀": "shi",
    "食": "shi",
    "埘": "shi",
    "莳": "shi",
    "鲥": "shi",
    "史": "shi",
    "矢": "shi",
    "豕": "shi",
    "使": "shi",
    "始": "shi",
    "驶": "shi",
    "屎": "shi",
    "士": "shi",
    "氏": "shi",
    "世": "shi",
    "仕": "shi",
    "市": "shi",
    "示": "shi",
    "式": "shi",
    "事": "shi",
    "侍": "shi",
    "势": "shi",
    "视": "shi",
    "试": "shi",
    "饰": "shi",
    "室": "shi",
    "恃": "shi",
    "拭": "shi",
    "是": "shi",
    "柿": "shi",
    "贳": "shi",
    "适": "shi",
    "舐": "shi",
    "轼": "shi",
    "逝": "shi",
    "铈": "shi",
    "弑": "shi",
    "谥": "shi",
    "释": "shi",
    "嗜": "shi",
    "筮": "shi",
    "誓": "shi",
    "噬": "shi",
    "螫": "shi",
    "收": "shou",
    "手": "shou",
    "守": "shou",
    "首": "shou",
    "艏": "shou",
    "寿": "shou",
    "受": "shou",
    "狩": "shou",
    "兽": "shou",
    "售": "shou",
    "授": "shou",
    "绶": "shou",
    "瘦": "shou",
    "书": "shu",
    "殳": "shu",
    "抒": "shu",
    "纾": "shu",
    "叔": "shu",
    "枢": "shu",
    "姝": "shu",
    "倏": "shu",
    "殊": "shu",
    "梳": "shu",
    "淑": "shu",
    "菽": "shu",
    "疏": "shu",
    "舒": "shu",
    "摅": "lu",
    "毹": "shu",
    "输": "shu",
    "蔬": "shu",
    "秫": "shu",
    "孰": "shu",
    "赎": "shu",
    "塾": "shu",
    "熟": "shu",
    "暑": "shu",
    "黍": "shu",
    "署": "shu",
    "鼠": "shu",
    "蜀": "shu",
    "薯": "shu",
    "曙": "shu",
    "术": "shu",
    "戍": "shu",
    "束": "shu",
    "沭": "shu",
    "述": "shu",
    "树": "shu",
    "竖": "shu",
    "恕": "shu",
    "庶": "shu",
    "数": "shu",
    "腧": "shu",
    "墅": "shu",
    "漱": "shu",
    "澍": "shu",
    "刷": "shua",
    "唰": "shua",
    "耍": "shua",
    "衰": "shuai",
    "摔": "shuai",
    "甩": "shuai",
    "帅": "shuai",
    "蟀": "shuai",
    "闩": "shuan",
    "拴": "shuan",
    "栓": "shuan",
    "涮": "shua",
    "双": "shuang",
    "霜": "shuang",
    "孀": "shuang",
    "爽": "shuang",
    "谁": "shui",
    "水": "shui",
    "氺": "",
    "税": "shui",
    "睡": "shui",
    "吮": "shun",
    "顺": "shun",
    "舜": "shun",
    "瞬": "shun",
    "说": "shuo",
    "妁": "shuo",
    "烁": "shuo",
    "朔": "shuo",
    "铄": "shuo",
    "硕": "shuo",
    "嗍": "shuo",
    "搠": "shuo",
    "蒴": "shuo",
    "嗽": "sou",
    "槊": "shuo",
    "厶": "mou",
    "丝": "si",
    "司": "si",
    "私": "si",
    "咝": "si",
    "思": "si",
    "鸶": "si",
    "斯": "si",
    "缌": "si",
    "蛳": "si",
    "厮": "si",
    "锶": "si",
    "嘶": "si",
    "撕": "si",
    "澌": "si",
    "死": "si",
    "巳": "si",
    "四": "si",
    "寺": "si",
    "汜": "si",
    "伺": "si",
    "似": "si",
    "兕": "si",
    "姒": "si",
    "祀": "si",
    "泗": "si",
    "饲": "si",
    "驷": "si",
    "俟": "si",
    "笥": "si",
    "耜": "si",
    "嗣": "si",
    "肆": "si",
    "忪": "song",
    "松": "song",
    "凇": "song",
    "崧": "song",
    "淞": "song",
    "菘": "song",
    "嵩": "song",
    "怂": "song",
    "悚": "song",
    "耸": "song",
    "竦": "song",
    "讼": "song",
    "宋": "song",
    "诵": "song",
    "送": "song",
    "颂": "song",
    "嗖": "sou",
    "搜": "sou",
    "溲": "sou",
    "馊": "sou",
    "飕": "sou",
    "锼": "sou",
    "艘": "sou",
    "螋": "sou",
    "叟": "sou",
    "嗾": "sou",
    "瞍": "sou",
    "擞": "sou",
    "薮": "cou",
    "苏": "su",
    "酥": "su",
    "稣": "su",
    "俗": "su",
    "夙": "su",
    "诉": "su",
    "肃": "su",
    "涑": "shu",
    "素": "su",
    "速": "su",
    "宿": "su",
    "粟": "su",
    "谡": "su",
    "嗉": "su",
    "塑": "su",
    "愫": "su",
    "溯": "su",
    "僳": "su",
    "蔌": "su",
    "觫": "su",
    "簌": "su",
    "狻": "jun",
    "酸": "suan",
    "蒜": "suan",
    "算": "suan",
    "虽": "sui",
    "荽": "lei",
    "眭": "sui",
    "睢": "sui",
    "濉": "sui",
    "绥": "sui",
    "隋": "sui",
    "随": "sui",
    "髓": "sui",
    "岁": "sui",
    "祟": "sui",
    "谇": "sui",
    "遂": "sui",
    "碎": "sui",
    "隧": "sui",
    "燧": "sui",
    "穗": "sui",
    "邃": "sui",
    "孙": "sun",
    "狲": "sun",
    "荪": "sun",
    "飧": "sun",
    "损": "sun",
    "笋": "sun",
    "隼": "sun",
    "榫": "sun",
    "唆": "suo",
    "娑": "suo",
    "挲": "sa",
    "桫": "suo",
    "梭": "suo",
    "睃": "suo",
    "嗦": "suo",
    "羧": "suo",
    "蓑": "sui",
    "缩": "suo",
    "所": "suo",
    "唢": "suo",
    "索": "suo",
    "琐": "suo",
    "锁": "suo",
    "他": "ta",
    "它": "ta",
    "趿": "qi",
    "铊": "shi",
    "塌": "ta",
    "溻": "ta",
    "塔": "ta",
    "獭": "ta",
    "鳎": "die",
    "挞": "ta",
    "闼": "ta",
    "遢": "ta",
    "榻": "ta",
    "踏": "ta",
    "蹋": "ta",
    "骀": "dai",
    "胎": "tai",
    "台": "tai",
    "邰": "tai",
    "抬": "tai",
    "苔": "tai",
    "炱": "tai",
    "跆": "tai",
    "鲐": "tai",
    "薹": "tai",
    "太": "tai",
    "汰": "tai",
    "态": "tai",
    "肽": "tai",
    "钛": "tai",
    "泰": "tai",
    "酞": "tai",
    "坍": "tan",
    "贪": "tan",
    "摊": "tan",
    "滩": "tan",
    "瘫": "tan",
    "坛": "tan",
    "昙": "tan",
    "谈": "tan",
    "郯": "tan",
    "覃": "tan",
    "痰": "tan",
    "锬": "tan",
    "谭": "tan",
    "潭": "tan",
    "檀": "tan",
    "忐": "keng",
    "坦": "tan",
    "袒": "tan",
    "钽": "tan",
    "毯": "tan",
    "叹": "tan",
    "炭": "tan",
    "探": "tan",
    "赕": "dan",
    "碳": "tan",
    "汤": "tang",
    "铴": "tang",
    "羰": "tang",
    "镗": "tang",
    "饧": "tang",
    "唐": "tang",
    "堂": "tang",
    "棠": "tang",
    "塘": "tang",
    "搪": "tang",
    "溏": "tang",
    "瑭": "tang",
    "樘": "cheng",
    "膛": "tang",
    "糖": "tang",
    "螗": "tang",
    "螳": "tang",
    "醣": "tang",
    "帑": "nu",
    "倘": "thang",
    "淌": "thang",
    "傥": "tang",
    "耥": "tang",
    "躺": "thang",
    "烫": "theng",
    "趟": "theng",
    "涛": "tao",
    "绦": "tao",
    "掏": "tao",
    "滔": "tao",
    "韬": "tao",
    "饕": "tao",
    "洮": "dao",
    "逃": "tao",
    "桃": "tao",
    "陶": "tao",
    "啕": "tao",
    "淘": "tao",
    "萄": "tao",
    "鼗": "tao",
    "讨": "tao",
    "套": "tao",
    "忑": "dao",
    "忒": "tui",
    "特": "te",
    "铽": "xin",
    "慝": "ni",
    "疼": "teng",
    "腾": "teng",
    "誊": "teng",
    "滕": "teng",
    "藤": "teng",
    "剔": "ti",
    "梯": "ti",
    "锑": "ti",
    "踢": "ti",
    "绨": "ti",
    "啼": "ti",
    "提": "ti",
    "缇": "ti",
    "鹈": "ti",
    "题": "ti",
    "蹄": "ti",
    "醍": "ti",
    "体": "ti",
    "屉": "ti",
    "剃": "ti",
    "倜": "zhou",
    "悌": "ti",
    "涕": "ti",
    "逖": "ti",
    "惕": "ti",
    "替": "ti",
    "裼": "ti",
    "嚏": "ti",
    "天": "tian",
    "添": "tian",
    "田": "tian",
    "恬": "tian",
    "畋": "tian",
    "甜": "tian",
    "填": "tian",
    "阗": "tian",
    "忝": "tian",
    "殄": "tian",
    "腆": "tian",
    "舔": "tian",
    "掭": "tian",
    "佻": "tiao",
    "挑": "tao",
    "祧": "tiao",
    "条": "tiao",
    "迢": "tiao",
    "笤": "shao",
    "龆": "tiao",
    "蜩": "diao",
    "髫": "jie",
    "鲦": "tiao",
    "窕": "tiao",
    "眺": "tiao",
    "粜": "diao",
    "铫": "tiao",
    "跳": "tiao",
    "贴": "tie",
    "萜": "tie",
    "铁": "tie",
    "帖": "tie",
    "餮": "tie",
    "厅": "ting",
    "汀": "ting",
    "听": "ting",
    "町": "ding",
    "烃": "ting",
    "廷": "ting",
    "亭": "ting",
    "庭": "ting",
    "莛": "ting",
    "停": "ting",
    "婷": "ting",
    "葶": "ting",
    "蜓": "ting",
    "霆": "ting",
    "挺": "ting",
    "梃": "ting",
    "铤": "ding",
    "艇": "ting",
    "通": "tong",
    "嗵": "tong",
    "仝": "tong",
    "同": "tong",
    "佟": "tong",
    "彤": "tong",
    "茼": "tong",
    "桐": "tong",
    "砼": "tong",
    "铜": "tong",
    "童": "tong",
    "酮": "tong",
    "僮": "tong",
    "潼": "tong",
    "瞳": "tong",
    "统": "tong",
    "捅": "tong",
    "桶": "tong",
    "筒": "tong",
    "恸": "tong",
    "痛": "tong",
    "偷": "tou",
    "头": "tou",
    "投": "tou",
    "骰": "gu",
    "透": "tou",
    "凸": "tu",
    "秃": "tu",
    "突": "tu",
    "图": "tu",
    "徒": "tu",
    "涂": "tu",
    "荼": "tu",
    "途": "tu",
    "屠": "tu",
    "酴": "tu",
    "土": "tu",
    "吐": "tu",
    "钍": "tu",
    "兔": "tu",
    "堍": "tu",
    "菟": "tu",
    "湍": "tuan",
    "团": "tuan",
    "抟": "zhuan",
    "疃": "tuan",
    "彖": "duan",
    "推": "tui",
    "颓": "tui",
    "腿": "tui",
    "退": "tui",
    "煺": "tui",
    "蜕": "tui",
    "褪": "tui",
    "吞": "tun",
    "暾": "tun",
    "屯": "tun",
    "饨": "tun",
    "豚": "tun",
    "臀": "tun",
    "氽": "qiu",
    "乇": "tuo",
    "托": "tuo",
    "拖": "tuo",
    "脱": "tuo",
    "驮": "tuo",
    "佗": "tuo",
    "陀": "tuo",
    "坨": "tuo",
    "沱": "tuo",
    "驼": "tuo",
    "柁": "duo",
    "砣": "tuo",
    "鸵": "tuo",
    "跎": "tuo",
    "酡": "dou",
    "橐": "du",
    "鼍": "tuo",
    "妥": "tuo",
    "庹": "tuo",
    "椭": "tuo",
    "拓": "tuo",
    "柝": "tuo",
    "唾": "tuo",
    "箨": "tuo",
    "哇": "wa",
    "娃": "wa",
    "挖": "wa",
    "洼": "wa",
    "娲": "wa",
    "蛙": "wa",
    "瓦": "wa",
    "佤": "wa",
    "袜": "wa",
    "腽": "wa",
    "歪": "wai",
    "崴": "wei",
    "外": "wai",
    "弯": "wan",
    "剜": "wan",
    "湾": "wan",
    "蜿": "wan",
    "豌": "wan",
    "丸": "wan",
    "纨": "wan",
    "芄": "wan",
    "完": "wan",
    "玩": "wan",
    "顽": "wan",
    "烷": "wan",
    "宛": "wan",
    "挽": "wan",
    "晚": "wan",
    "莞": "guan",
    "婉": "wan",
    "惋": "wan",
    "绾": "wan",
    "脘": "wan",
    "菀": "wan",
    "琬": "wan",
    "皖": "wan",
    "畹": "wan",
    "碗": "wan",
    "万": "wan",
    "腕": "wan",
    "汪": "wang",
    "亡": "wang",
    "王": "wang",
    "网": "wang",
    "往": "wang",
    "枉": "wang",
    "罔": "wang",
    "惘": "wang",
    "辋": "wang",
    "魍": "wang",
    "妄": "wang",
    "忘": "wang",
    "旺": "wang",
    "望": "wang",
    "危": "wei",
    "威": "wei",
    "偎": "wei",
    "逶": "wei",
    "隈": "wei",
    "葳": "wei",
    "微": "wei",
    "煨": "wei",
    "薇": "wei",
    "巍": "wei",
    "为": "wei",
    "韦": "wei",
    "圩": "xu",
    "围": "wei",
    "帏": "wei",
    "沩": "wei",
    "违": "wei",
    "闱": "wei",
    "桅": "wei",
    "涠": "wei",
    "唯": "wei",
    "帷": "wei",
    "惟": "wei",
    "维": "wei",
    "嵬": "wei",
    "潍": "wei",
    "伟": "wei",
    "伪": "wei",
    "尾": "wei",
    "纬": "wei",
    "苇": "wei",
    "委": "wei",
    "炜": "wei",
    "玮": "wei",
    "洧": "wei",
    "娓": "wei",
    "诿": "wei",
    "萎": "wei",
    "隗": "kui",
    "猥": "wei",
    "痿": "wei",
    "艉": "wei",
    "韪": "wei",
    "鲔": "wei",
    "卫": "wei",
    "未": "wei",
    "位": "wei",
    "味": "wei",
    "畏": "wei",
    "胃": "wei",
    "軎": "wei",
    "尉": "wei",
    "谓": "wei",
    "喂": "wei",
    "渭": "wei",
    "猬": "wei",
    "蔚": "wei",
    "慰": "wei",
    "魏": "wei",
    "温": "wen",
    "瘟": "wen",
    "文": "wen",
    "纹": "wen",
    "闻": "wen",
    "蚊": "wen",
    "阌": "wen",
    "雯": "wen",
    "刎": "wen",
    "吻": "wen",
    "紊": "wen",
    "稳": "wen",
    "问": "wen",
    "汶": "wen",
    "璺": "wen",
    "翁": "weng",
    "嗡": "weng",
    "蓊": "weng",
    "瓮": "weng",
    "蕹": "weng",
    "挝": "wo",
    "倭": "wei",
    "涡": "wo",
    "莴": "wo",
    "喔": "o",
    "窝": "wo",
    "蜗": "wo",
    "我": "wo",
    "沃": "wo",
    "肟": "wo",
    "卧": "wo",
    "幄": "wo",
    "握": "wo",
    "渥": "wo",
    "硪": "e",
    "斡": "wo",
    "龌": "wo",
    "乌": "wu",
    "圬": "wu",
    "污": "wu",
    "邬": "wu",
    "呜": "wu",
    "巫": "wu",
    "屋": "wu",
    "诬": "wu",
    "钨": "wu",
    "无": "wu",
    "毋": "wu",
    "吴": "wu",
    "吾": "wu",
    "芜": "wu",
    "唔": "en",
    "梧": "wu",
    "浯": "wu",
    "蜈": "wu",
    "鼯": "wu",
    "五": "wu",
    "午": "wu",
    "仵": "wu",
    "伍": "wu",
    "坞": "wu",
    "妩": "wu",
    "庑": "wu",
    "忤": "wu",
    "怃": "wu",
    "迕": "wu",
    "武": "wu",
    "侮": "wu",
    "捂": "wu",
    "牾": "wu",
    "鹉": "wu",
    "舞": "wu",
    "兀": "wu",
    "勿": "wu",
    "务": "wu",
    "戊": "wu",
    "阢": "wu",
    "杌": "wo",
    "芴": "wu",
    "物": "wu",
    "误": "wu",
    "悟": "wu",
    "晤": "wu",
    "焐": "wu",
    "婺": "mou",
    "痦": "pi",
    "骛": "wu",
    "雾": "wu",
    "寤": "wu",
    "鹜": "wu",
    "鋈": "wu",
    "齀": "",
    "夕": "xi",
    "兮": "xi",
    "汐": "xi",
    "西": "xi",
    "吸": "xi",
    "希": "xi",
    "昔": "xi",
    "析": "xi",
    "矽": "xi",
    "穸": "xi",
    "诶": "ai",
    "郗": "xi",
    "唏": "xi",
    "奚": "xi",
    "息": "xi",
    "浠": "xi",
    "牺": "xi",
    "悉": "xi",
    "惜": "xi",
    "欷": "xi",
    "淅": "xi",
    "烯": "xi",
    "硒": "xi",
    "菥": "si",
    "晰": "xi",
    "犀": "xi",
    "稀": "xi",
    "粞": "xi",
    "翕": "xi",
    "舾": "xi",
    "溪": "xi",
    "皙": "xi",
    "锡": "xi",
    "僖": "xi",
    "熄": "xi",
    "熙": "xi",
    "蜥": "xi",
    "嘻": "xi",
    "嬉": "xi",
    "膝": "xi",
    "樨": "xi",
    "歙": "xie",
    "熹": "xi",
    "羲": "xi",
    "螅": "ci",
    "蟋": "xi",
    "醯": "xi",
    "曦": "xi",
    "鼷": "xi",
    "习": "xi",
    "席": "xi",
    "袭": "xi",
    "觋": "xi",
    "媳": "xi",
    "隰": "xi",
    "檄": "xi",
    "洗": "xi",
    "玺": "xi",
    "徙": "xi",
    "铣": "xi",
    "喜": "xi",
    "葸": "xi",
    "屣": "xi",
    "蓰": "xi",
    "禧": "xi",
    "戏": "xi",
    "系": "xi",
    "饩": "xi",
    "细": "xi",
    "郄": "qie",
    "阋": "xi",
    "舄": "tuo",
    "隙": "xi",
    "禊": "xi",
    "呷": "ga",
    "虾": "xia",
    "瞎": "xia",
    "匣": "xia",
    "侠": "xia",
    "狎": "xia",
    "峡": "xia",
    "柙": "jian",
    "狭": "xia",
    "硖": "xia",
    "遐": "xia",
    "暇": "xia",
    "瑕": "xia",
    "辖": "xia",
    "霞": "xia",
    "黠": "xia",
    "下": "xia",
    "吓": "xia",
    "夏": "xia",
    "厦": "xia",
    "罅": "xia",
    "仙": "xian",
    "先": "xian",
    "纤": "xian",
    "氙": "xian",
    "祆": "xian",
    "籼": "xian",
    "莶": "kan",
    "掀": "xia",
    "跹": "xian",
    "酰": "xian",
    "锨": "xian",
    "鲜": "xian",
    "暹": "xian",
    "闲": "xian",
    "弦": "xian",
    "贤": "xian",
    "咸": "xian",
    "涎": "xian",
    "娴": "xian",
    "舷": "xian",
    "衔": "xian",
    "痫": "xian",
    "鹇": "xian",
    "嫌": "xian",
    "冼": "xian",
    "显": "xian",
    "险": "xian",
    "猃": "xian",
    "蚬": "xian",
    "筅": "xian",
    "跣": "sun",
    "藓": "xian",
    "燹": "bing",
    "县": "xian",
    "岘": "xian",
    "苋": "wan",
    "现": "xian",
    "线": "xian",
    "限": "xian",
    "宪": "xian",
    "陷": "xian",
    "馅": "xian",
    "羡": "xian",
    "献": "xian",
    "腺": "xian",
    "線": "",
    "霰": "san",
    "乡": "xiang",
    "芗": "xiang",
    "相": "xiang",
    "香": "xiang",
    "厢": "xiang",
    "湘": "xiang",
    "缃": "xiang",
    "葙": "xiang",
    "箱": "xiang",
    "襄": "xiang",
    "骧": "xiang",
    "镶": "xiang",
    "详": "xiang",
    "庠": "xiang",
    "祥": "xiang",
    "翔": "xiang",
    "享": "xiang",
    "响": "xiang",
    "饷": "xiang",
    "飨": "xiang",
    "想": "xiang",
    "鲞": "xiang",
    "向": "xiang",
    "巷": "xiang",
    "项": "xiang",
    "象": "xiang",
    "像": "xiang",
    "橡": "xiang",
    "蟓": "xiang",
    "枭": "xiao",
    "削": "xiao",
    "哓": "xiao",
    "枵": "xiao",
    "骁": "xiao",
    "宵": "xiao",
    "消": "xiao",
    "绡": "xiao",
    "逍": "xiao",
    "萧": "xiao",
    "硝": "xiao",
    "销": "xiao",
    "潇": "xiao",
    "箫": "xiao",
    "霄": "xiao",
    "魈": "xiao",
    "嚣": "xiao",
    "崤": "xiao",
    "淆": "xiao",
    "小": "xiao",
    "晓": "xiao",
    "筱": "xiao",
    "孝": "xiao",
    "肖": "xiao",
    "哮": "xiao",
    "效": "xiao",
    "校": "xiao",
    "笑": "xiao",
    "啸": "xiao",
    "些": "xie",
    "楔": "xie",
    "歇": "xie",
    "蝎": "xie",
    "协": "xie",
    "邪": "xie",
    "胁": "xie",
    "挟": "xie",
    "偕": "xie",
    "斜": "xie",
    "谐": "xie",
    "携": "xie",
    "勰": "xie",
    "撷": "xie",
    "缬": "xie",
    "鞋": "xie",
    "写": "xie",
    "泄": "xie",
    "泻": "xie",
    "绁": "xie",
    "卸": "xie",
    "屑": "xie",
    "械": "xie",
    "亵": "xie",
    "渫": "die",
    "谢": "xie",
    "榍": "xie",
    "榭": "xie",
    "廨": "xie",
    "懈": "xie",
    "獬": "jie",
    "薢": "",
    "薤": "xie",
    "邂": "xie",
    "燮": "xie",
    "瀣": "xie",
    "蟹": "xie",
    "躞": "xie",
    "心": "xin",
    "忻": "xin",
    "芯": "xin",
    "辛": "xin",
    "昕": "cuan",
    "欣": "xin",
    "莘": "xin",
    "锌": "xin",
    "新": "xin",
    "歆": "xin",
    "薪": "xin",
    "馨": "xin",
    "鑫": "xin",
    "囟": "xin",
    "信": "xin",
    "衅": "xin",
    "兴": "xing",
    "星": "xing",
    "惺": "xing",
    "猩": "xing",
    "腥": "xing",
    "刑": "xing",
    "行": "xing",
    "邢": "xing",
    "形": "xing",
    "陉": "xing",
    "型": "xing",
    "硎": "xing",
    "醒": "xing",
    "擤": "xing",
    "杏": "xing",
    "姓": "xing",
    "幸": "xing",
    "性": "xing",
    "荇": "xing",
    "悻": "xing",
    "凶": "xiong",
    "兄": "xiong",
    "匈": "xiong",
    "芎": "xiong",
    "汹": "xiong",
    "胸": "xiong",
    "雄": "xiong",
    "熊": "xiong",
    "休": "xiu",
    "修": "xiu",
    "咻": "xiao",
    "庥": "xiu",
    "羞": "xiu",
    "鸺": "xiu",
    "貅": "xiu",
    "馐": "xiu",
    "髹": "xiu",
    "朽": "xiu",
    "秀": "xiu",
    "岫": "xiu",
    "绣": "xiu",
    "袖": "xiu",
    "锈": "xiu",
    "溴": "chou",
    "戌": "xu",
    "盱": "xu",
    "砉": "xu",
    "胥": "xu",
    "须": "xu",
    "顼": "xu",
    "虚": "xu",
    "嘘": "xu",
    "需": "xu",
    "墟": "xu",
    "徐": "xu",
    "许": "xu",
    "诩": "xu",
    "栩": "xu",
    "糈": "xu",
    "醑": "xu",
    "旭": "xu",
    "序": "xu",
    "叙": "xu",
    "恤": "xu",
    "洫": "xu",
    "畜": "xu",
    "勖": "mao",
    "绪": "xu",
    "续": "xu",
    "酗": "xu",
    "婿": "xu",
    "溆": "xu",
    "絮": "xu",
    "嗅": "xiu",
    "煦": "xu",
    "蓄": "xu",
    "蓿": "xu",
    "轩": "xuan",
    "宣": "xuan",
    "谖": "xuan",
    "喧": "xuan",
    "揎": "xuan",
    "萱": "xuan",
    "暄": "xuan",
    "煊": "xuan",
    "瑄": "",
    "儇": "xuan",
    "玄": "xuan",
    "痃": "xuan",
    "悬": "xuan",
    "旋": "xuan",
    "漩": "xuan",
    "璇": "xuan",
    "选": "xuan",
    "癣": "xuan",
    "泫": "xuan",
    "炫": "xuan",
    "绚": "xuan",
    "眩": "xuan",
    "铉": "xuan",
    "渲": "xuan",
    "楦": "xuan",
    "碹": "xuan",
    "镟": "xuan",
    "靴": "xue",
    "薛": "xue",
    "穴": "xue",
    "学": "xue",
    "泶": "xue",
    "踅": "chi",
    "雪": "xue",
    "鳕": "xue",
    "血": "xue",
    "谑": "nue",
    "勋": "xun",
    "埙": "xun",
    "熏": "xun",
    "窨": "xun",
    "獯": "mi",
    "薰": "xun",
    "曛": "xun",
    "醺": "xun",
    "寻": "xun",
    "巡": "xun",
    "旬": "xun",
    "驯": "xun",
    "询": "xun",
    "峋": "xun",
    "恂": "shun",
    "洵": "xuan",
    "浔": "xun",
    "荀": "xun",
    "循": "xun",
    "鲟": "xun",
    "训": "xun",
    "讯": "xun",
    "汛": "xun",
    "迅": "xun",
    "徇": "xun",
    "逊": "xun",
    "殉": "xun",
    "巽": "xun",
    "蕈": "tan",
    "丫": "ya",
    "压": "ya",
    "呀": "ya",
    "押": "ya",
    "鸦": "ya",
    "桠": "ya",
    "鸭": "ya",
    "牙": "ya",
    "伢": "ya",
    "岈": "ya",
    "芽": "ya",
    "琊": "ya",
    "蚜": "ya",
    "崖": "ya",
    "涯": "ya",
    "睚": "ya",
    "衙": "ya",
    "疋": "pi",
    "哑": "ya",
    "痖": "ya",
    "雅": "ya",
    "亚": "ya",
    "讶": "ya",
    "迓": "ya",
    "垭": "e",
    "娅": "ya",
    "砑": "ya",
    "氩": "ya",
    "揠": "ya",
    "咽": "yan",
    "恹": "yan",
    "烟": "yan",
    "胭": "yan",
    "崦": "yan",
    "淹": "yan",
    "焉": "yan",
    "菸": "yan",
    "阉": "yan",
    "湮": "yan",
    "腌": "yan",
    "鄢": "yan",
    "嫣": "yan",
    "蔫": "nian",
    "延": "yan",
    "闫": "yan",
    "严": "yan",
    "妍": "yan",
    "芫": "yan",
    "言": "yan",
    "岩": "yan",
    "沿": "yan",
    "炎": "yan",
    "研": "yan",
    "盐": "yan",
    "阎": "yan",
    "筵": "yan",
    "蜒": "yan",
    "颜": "yan",
    "檐": "dan",
    "兖": "yan",
    "奄": "yan",
    "俨": "yan",
    "衍": "yan",
    "偃": "yan",
    "厣": "yan",
    "掩": "yan",
    "眼": "yan",
    "郾": "yan",
    "琰": "yan",
    "罨": "yan",
    "演": "yan",
    "魇": "yan",
    "鼹": "yan",
    "厌": "yan",
    "彦": "yan",
    "砚": "yan",
    "唁": "yan",
    "宴": "yan",
    "晏": "yan",
    "艳": "yan",
    "验": "yan",
    "谚": "yan",
    "堰": "yan",
    "焰": "yan",
    "焱": "yan",
    "雁": "yan",
    "滟": "yan",
    "酽": "yan",
    "谳": "yan",
    "餍": "yan",
    "燕": "yan",
    "赝": "yan",
    "央": "yang",
    "泱": "yang",
    "殃": "yang",
    "秧": "yang",
    "鸯": "yang",
    "鞅": "yang",
    "扬": "yang",
    "羊": "yang",
    "阳": "yang",
    "杨": "yang",
    "炀": "yang",
    "佯": "yang",
    "疡": "yang",
    "徉": "yang",
    "洋": "yang",
    "烊": "yang",
    "蛘": "yang",
    "仰": "yang",
    "养": "yang",
    "氧": "yang",
    "痒": "yang",
    "怏": "yang",
    "恙": "yang",
    "样": "yang",
    "漾": "yang",
    "幺": "yao",
    "夭": "yao",
    "吆": "yao",
    "妖": "yao",
    "腰": "yao",
    "邀": "yao",
    "爻": "yao",
    "尧": "yao",
    "肴": "yao",
    "姚": "yao",
    "轺": "diao",
    "珧": "yao",
    "窑": "yao",
    "谣": "yao",
    "徭": "yao",
    "摇": "yao",
    "遥": "yao",
    "瑶": "yao",
    "繇": "yao",
    "鳐": "yao",
    "杳": "yao",
    "咬": "yao",
    "窈": "yao",
    "舀": "yao",
    "崾": "yao",
    "药": "yao",
    "要": "yao",
    "鹞": "yao",
    "曜": "yao",
    "耀": "yao",
    "椰": "ye",
    "噎": "ye",
    "爷": "ye",
    "耶": "ye",
    "揶": "ye",
    "铘": "ye",
    "也": "ye",
    "冶": "ye",
    "野": "ye",
    "业": "ye",
    "叶": "ye",
    "曳": "ye",
    "页": "ye",
    "邺": "ye",
    "夜": "ye",
    "晔": "ye",
    "烨": "ye",
    "掖": "ye",
    "液": "ye",
    "谒": "ye",
    "腋": "ye",
    "靥": "yan",
    "一": "yi",
    "伊": "yi",
    "衣": "yi",
    "医": "yi",
    "依": "yi",
    "咿": "yi",
    "猗": "yi",
    "铱": "yi",
    "壹": "yi",
    "揖": "yi",
    "欹": "qi",
    "漪": "yi",
    "噫": "yi",
    "黟": "yi",
    "仪": "yi",
    "圯": "yi",
    "夷": "yi",
    "沂": "yi",
    "诒": "yi",
    "宜": "yi",
    "怡": "yi",
    "迤": "yi",
    "饴": "yi",
    "咦": "yi",
    "姨": "yi",
    "荑": "ti",
    "贻": "yi",
    "眙": "chi",
    "胰": "yi",
    "酏": "yi",
    "痍": "yi",
    "移": "yi",
    "遗": "yi",
    "颐": "yi",
    "疑": "yi",
    "嶷": "yi",
    "彝": "yi",
    "乙": "yi",
    "已": "yi",
    "以": "yi",
    "钇": "yi",
    "矣": "yi",
    "苡": "yi",
    "舣": "yi",
    "蚁": "yi",
    "倚": "yi",
    "椅": "yi",
    "旖": "yi",
    "义": "yi",
    "亿": "yi",
    "弋": "yi",
    "刈": "yi",
    "忆": "yi",
    "艺": "yi",
    "仡": "ge",
    "议": "yi",
    "亦": "yi",
    "屹": "yi",
    "异": "yi",
    "佚": "die",
    "呓": "yi",
    "役": "yi",
    "抑": "yi",
    "译": "yi",
    "邑": "yi",
    "佾": "yi",
    "峄": "yi",
    "怿": "yi",
    "易": "yi",
    "绎": "yi",
    "诣": "yi",
    "驿": "yi",
    "奕": "yi",
    "弈": "yi",
    "疫": "yi",
    "羿": "yi",
    "轶": "die",
    "悒": "yi",
    "挹": "yi",
    "益": "yi",
    "谊": "yi",
    "埸": "yi",
    "翊": "yi",
    "翌": "yi",
    "逸": "yi",
    "意": "yi",
    "溢": "yi",
    "缢": "yi",
    "肄": "yi",
    "裔": "yi",
    "瘗": "yi",
    "蜴": "yi",
    "毅": "yi",
    "熠": "yi",
    "镒": "yi",
    "劓": "yi",
    "殪": "yi",
    "薏": "yi",
    "翳": "yi",
    "翼": "yi",
    "臆": "yi",
    "癔": "yi",
    "镱": "yi",
    "懿": "yi",
    "因": "yin",
    "阴": "yin",
    "姻": "yin",
    "洇": "yan",
    "茵": "yin",
    "荫": "yin",
    "音": "yin",
    "殷": "yin",
    "氤": "yin",
    "铟": "yin",
    "喑": "yin",
    "堙": "yin",
    "吟": "yin",
    "垠": "ken",
    "狺": "yin",
    "寅": "yin",
    "淫": "yin",
    "银": "yin",
    "鄞": "yin",
    "夤": "yin",
    "龈": "yin",
    "霪": "yin",
    "尹": "yin",
    "引": "yin",
    "吲": "shen",
    "饮": "yin",
    "蚓": "yin",
    "隐": "yin",
    "瘾": "yin",
    "印": "yin",
    "茚": "yin",
    "胤": "yin",
    "应": "ying",
    "英": "ying",
    "莺": "ying",
    "婴": "ying",
    "瑛": "ying",
    "嘤": "ying",
    "撄": "ying",
    "缨": "ying",
    "罂": "ying",
    "樱": "ying",
    "璎": "ying",
    "鹦": "ying",
    "膺": "ying",
    "鹰": "ying",
    "迎": "ying",
    "茔": "ying",
    "盈": "ying",
    "荥": "xing",
    "荧": "ying",
    "莹": "ying",
    "萤": "ying",
    "营": "ying",
    "萦": "ying",
    "楹": "ying",
    "滢": "ying",
    "蓥": "ning",
    "潆": "ying",
    "蝇": "ying",
    "嬴": "ying",
    "赢": "ying",
    "瀛": "ying",
    "郢": "ying",
    "颍": "ying",
    "颖": "ying",
    "影": "ying",
    "瘿": "ying",
    "映": "ying",
    "硬": "ying",
    "媵": "sheng",
    "哟": "yo",
    "唷": "yo",
    "佣": "yong",
    "拥": "yong",
    "痈": "yong",
    "邕": "yong",
    "庸": "yong",
    "雍": "yong",
    "墉": "yong",
    "慵": "yong",
    "壅": "yong",
    "镛": "yong",
    "臃": "yong",
    "鳙": "yong",
    "饔": "yong",
    "喁": "yu",
    "永": "yong",
    "甬": "yong",
    "咏": "yong",
    "泳": "yong",
    "俑": "yong",
    "勇": "yong",
    "涌": "yong",
    "恿": "yong",
    "蛹": "yong",
    "踊": "yong",
    "用": "yong",
    "优": "you",
    "忧": "you",
    "攸": "you",
    "呦": "you",
    "幽": "you",
    "悠": "you",
    "尢": "wang",
    "尤": "you",
    "由": "you",
    "犹": "you",
    "邮": "you",
    "油": "you",
    "柚": "you",
    "疣": "you",
    "莜": "di",
    "莸": "you",
    "铀": "you",
    "蚰": "zhu",
    "游": "you",
    "鱿": "you",
    "猷": "you",
    "蝣": "you",
    "友": "you",
    "有": "you",
    "卣": "you",
    "酉": "you",
    "莠": "xiu",
    "铕": "you",
    "牖": "you",
    "黝": "you",
    "又": "you",
    "右": "you",
    "幼": "you",
    "佑": "you",
    "侑": "you",
    "囿": "you",
    "宥": "you",
    "诱": "you",
    "蚴": "niu",
    "釉": "you",
    "鼬": "you",
    "纡": "yu",
    "迂": "yu",
    "淤": "yu",
    "渝": "yu",
    "瘀": "yu",
    "于": "yu",
    "予": "yu",
    "余": "yu",
    "妤": "yu",
    "欤": "yu",
    "於": "yu",
    "盂": "yu",
    "臾": "kui",
    "鱼": "yu",
    "俞": "yu",
    "禺": "yu",
    "竽": "yu",
    "舁": "yu",
    "娱": "yu",
    "狳": "yu",
    "谀": "yu",
    "馀": "ye",
    "渔": "yu",
    "萸": "yu",
    "隅": "yu",
    "雩": "yu",
    "嵛": "yu",
    "愉": "yu",
    "揄": "yu",
    "腴": "yu",
    "逾": "yu",
    "愚": "yu",
    "榆": "yu",
    "瑜": "yu",
    "虞": "yu",
    "觎": "yu",
    "窬": "dou",
    "舆": "yu",
    "蝓": "yu",
    "与": "yu",
    "伛": "yu",
    "宇": "yu",
    "屿": "yu",
    "羽": "yu",
    "雨": "yu",
    "俣": "yu",
    "禹": "yu",
    "语": "yu",
    "圄": "yu",
    "圉": "yu",
    "庾": "yu",
    "瘐": "yu",
    "窳": "yu",
    "龉": "yu",
    "玉": "yu",
    "驭": "yu",
    "吁": "yu",
    "聿": "yu",
    "芋": "yu",
    "妪": "yu",
    "饫": "yu",
    "育": "yu",
    "郁": "yu",
    "昱": "yu",
    "狱": "yu",
    "峪": "yu",
    "浴": "yu",
    "钰": "yu",
    "预": "yu",
    "域": "yu",
    "欲": "yu",
    "谕": "yu",
    "阈": "yu",
    "喻": "yu",
    "寓": "yu",
    "御": "yu",
    "裕": "yu",
    "遇": "yu",
    "鹆": "yu",
    "愈": "yu",
    "煜": "yu",
    "蓣": "yu",
    "誉": "yu",
    "毓": "yu",
    "蜮": "guo",
    "豫": "yu",
    "燠": "yu",
    "鹬": "shu",
    "鬻": "zhou",
    "鸢": "yuan",
    "冤": "yuan",
    "眢": "yuan",
    "鸳": "yuan",
    "渊": "yuan",
    "箢": "wan",
    "元": "yuan",
    "员": "yuan",
    "园": "yuan",
    "沅": "yuan",
    "垣": "yuan",
    "爰": "yuan",
    "原": "yuan",
    "圆": "yuan",
    "袁": "yuan",
    "援": "yuan",
    "缘": "yuan",
    "鼋": "yuan",
    "塬": "yuan",
    "源": "yuan",
    "猿": "yuan",
    "辕": "yuan",
    "圜": "huan",
    "橼": "yuan",
    "螈": "yuan",
    "远": "yuan",
    "苑": "yuan",
    "怨": "yuan",
    "院": "yuan",
    "垸": "huan",
    "媛": "yuan",
    "掾": "chuan",
    "瑗": "yuan",
    "愿": "yuan",
    "曰": "yue",
    "约": "yue",
    "月": "yue",
    "刖": "yue",
    "岳": "yue",
    "钥": "yue",
    "悦": "yue",
    "钺": "yue",
    "阅": "yue",
    "跃": "yue",
    "粤": "yue",
    "越": "yue",
    "樾": "yue",
    "龠": "yue",
    "瀹": "yao",
    "云": "yun",
    "匀": "yun",
    "纭": "yun",
    "芸": "yun",
    "昀": "yun",
    "郧": "yun",
    "耘": "yun",
    "氲": "yun",
    "允": "yun",
    "狁": "yun",
    "陨": "yun",
    "殒": "yun",
    "孕": "yun",
    "运": "yun",
    "郓": "yun",
    "恽": "yun",
    "晕": "yun",
    "酝": "yun",
    "愠": "wen",
    "韫": "wen",
    "韵": "yun",
    "熨": "wei",
    "蕴": "yun",
    "匝": "za",
    "咂": "za",
    "拶": "za",
    "杂": "za",
    "砸": "za",
    "灾": "zai",
    "甾": "zai",
    "哉": "zai",
    "栽": "zai",
    "宰": "zai",
    "载": "zai",
    "崽": "zai",
    "再": "zai",
    "在": "zai",
    "糌": "zan",
    "簪": "zan",
    "咱": "zai",
    "昝": "zan",
    "攒": "zan",
    "趱": "zan",
    "暂": "zan",
    "赞": "zan",
    "錾": "zan",
    "瓒": "zan",
    "赃": "zang",
    "臧": "zang",
    "驵": "zu",
    "奘": "zang",
    "脏": "zang",
    "葬": "zang",
    "遭": "zao",
    "糟": "zao",
    "凿": "zao",
    "早": "zao",
    "枣": "zao",
    "蚤": "zao",
    "澡": "zao",
    "藻": "zao",
    "灶": "zao",
    "皂": "zao",
    "唣": "zao",
    "造": "zao",
    "噪": "zao",
    "燥": "zao",
    "躁": "zao",
    "则": "ze",
    "择": "ze",
    "泽": "ze",
    "责": "ze",
    "迮": "ze",
    "啧": "ze",
    "帻": "ce",
    "笮": "ze",
    "舴": "ze",
    "箦": "ze",
    "赜": "ze",
    "仄": "ze",
    "昃": "ze",
    "贼": "zei",
    "怎": "zen",
    "谮": "zen",
    "曾": "zeng",
    "增": "zeng",
    "憎": "zeng",
    "缯": "zeng",
    "罾": "zeng",
    "锃": "zeng",
    "甑": "zeng",
    "赠": "zeng",
    "吒": "zha",
    "咋": "zha",
    "哳": "zha",
    "喳": "zha",
    "揸": "zha",
    "渣": "zha",
    "楂": "cha",
    "齄": "zha",
    "扎": "zha",
    "札": "zha",
    "轧": "zha",
    "闸": "zha",
    "铡": "zha",
    "眨": "zha",
    "砟": "zha",
    "乍": "zha",
    "诈": "zha",
    "咤": "zha",
    "栅": "zha",
    "炸": "zha",
    "痄": "zha",
    "蚱": "zha",
    "榨": "zha",
    "膪": "chuai",
    "斋": "zhai",
    "摘": "zhai",
    "宅": "zhai",
    "翟": "di",
    "窄": "zhai",
    "债": "zhai",
    "砦": "zhai",
    "寨": "zhai",
    "瘵": "ji",
    "沾": "zhan",
    "毡": "zhan",
    "旃": "zhan",
    "粘": "zhan",
    "詹": "zhan",
    "谵": "zhan",
    "澶": "chan",
    "瞻": "zhan",
    "斩": "zhan",
    "展": "zhan",
    "盏": "zhan",
    "崭": "zhan",
    "搌": "zhan",
    "辗": "zhan",
    "占": "zhan",
    "战": "zhan",
    "栈": "zhan",
    "站": "zhan",
    "绽": "zhan",
    "湛": "zhan",
    "骣": "chan",
    "蘸": "zhan",
    "张": "zhang",
    "章": "zhang",
    "鄣": "zhang",
    "嫜": "zhang",
    "彰": "zhang",
    "漳": "zhang",
    "獐": "zhang",
    "樟": "zhang",
    "璋": "zhang",
    "蟑": "zhang",
    "仉": "zhang",
    "涨": "zhang",
    "掌": "zhang",
    "丈": "zhang",
    "仗": "zhang",
    "帐": "zhang",
    "杖": "zhang",
    "胀": "zhang",
    "账": "zhang",
    "障": "zhang",
    "嶂": "zhang",
    "幛": "zhang",
    "瘴": "zhang",
    "钊": "zhao",
    "招": "zhao",
    "昭": "zhao",
    "啁": "dao",
    "找": "zhao",
    "沼": "zhao",
    "召": "zhao",
    "兆": "zhao",
    "诏": "zhao",
    "赵": "zhao",
    "笊": "zhao",
    "棹": "zhao",
    "照": "zhao",
    "罩": "zhao",
    "肇": "zhao",
    "蜇": "zhe",
    "遮": "zhe",
    "折": "zhe",
    "哲": "zhe",
    "辄": "zhe",
    "蛰": "zhe",
    "谪": "zhe",
    "摺": "la",
    "磔": "zhe",
    "辙": "zhe",
    "者": "zhe",
    "锗": "zhe",
    "赭": "zhe",
    "褶": "die",
    "这": "zhe",
    "柘": "zhe",
    "浙": "zhe",
    "蔗": "zhe",
    "鹧": "zhe",
    "贞": "zhen",
    "针": "zhen",
    "侦": "zhen",
    "浈": "cheng",
    "珍": "zhen",
    "桢": "zhen",
    "真": "zhen",
    "砧": "zhen",
    "祯": "zhen",
    "斟": "zhen",
    "甄": "zhen",
    "蓁": "qin",
    "榛": "zhen",
    "箴": "jian",
    "臻": "zhen",
    "诊": "zhen",
    "枕": "zhen",
    "胗": "zhen",
    "轸": "zhen",
    "畛": "zhen",
    "疹": "zhen",
    "缜": "zhen",
    "稹": "bian",
    "圳": "chou",
    "阵": "zhen",
    "鸩": "zhen",
    "振": "zhen",
    "朕": "zhen",
    "赈": "zhen",
    "镇": "zhen",
    "震": "zhen",
    "争": "zheng",
    "征": "zheng",
    "怔": "zheng",
    "峥": "zheng",
    "挣": "zheng",
    "狰": "zheng",
    "钲": "zheng",
    "睁": "zheng",
    "铮": "zheng",
    "筝": "zheng",
    "蒸": "zheng",
    "徵": "cheng",
    "拯": "zheng",
    "整": "zheng",
    "正": "zheng",
    "证": "zheng",
    "诤": "zheng",
    "郑": "zheng",
    "帧": "zheng",
    "政": "zheng",
    "症": "zheng",
    "之": "zhi",
    "支": "zhi",
    "卮": "zhi",
    "汁": "zhi",
    "芝": "zhi",
    "吱": "zhi",
    "枝": "zhi",
    "知": "zhi",
    "织": "zhi",
    "肢": "zhi",
    "栀": "zhi",
    "祗": "zhi",
    "胝": "chi",
    "脂": "zhi",
    "蜘": "zhi",
    "执": "zhi",
    "侄": "zhi",
    "直": "zhi",
    "值": "zhi",
    "埴": "zhi",
    "职": "zhi",
    "植": "zhi",
    "殖": "zhi",
    "絷": "zhi",
    "跖": "zhi",
    "摭": "zhi",
    "踯": "zhi",
    "止": "zhi",
    "只": "zhi",
    "旨": "zhi",
    "址": "zhi",
    "纸": "zhi",
    "芷": "zhi",
    "祉": "zhi",
    "咫": "zhi",
    "指": "zhi",
    "枳": "zhi",
    "轵": "zhi",
    "趾": "zhi",
    "黹": "zhi",
    "酯": "zhi",
    "至": "zhi",
    "志": "zhi",
    "忮": "zhi",
    "豸": "zhi",
    "制": "zhi",
    "帙": "zhi",
    "帜": "zhi",
    "治": "zhi",
    "炙": "zhi",
    "质": "zhi",
    "郅": "zhi",
    "峙": "zhi",
    "栉": "zhi",
    "陟": "zhi",
    "挚": "zhi",
    "桎": "zhi",
    "秩": "zhi",
    "致": "zhi",
    "贽": "zhi",
    "轾": "zhi",
    "掷": "zhi",
    "痔": "zhi",
    "窒": "zhi",
    "鸷": "zhi",
    "彘": "zhi",
    "智": "zhi",
    "滞": "zhi",
    "痣": "zhi",
    "蛭": "zhi",
    "骘": "zhi",
    "稚": "zhi",
    "置": "zhi",
    "雉": "zhi",
    "誌": "",
    "膣": "zhi",
    "觯": "zhi",
    "踬": "zhi",
    "中": "zhong",
    "忠": "zhong",
    "终": "zhong",
    "盅": "zhong",
    "钟": "zhong",
    "舯": "zhong",
    "衷": "zhong",
    "锺": "zhong",
    "螽": "zhong",
    "肿": "zhong",
    "种": "zhong",
    "冢": "zhong",
    "踵": "zhong",
    "仲": "zhong",
    "众": "zhong",
    "重": "zhong",
    "州": "zhou",
    "舟": "zhou",
    "诌": "zhou",
    "周": "zhou",
    "洲": "zhou",
    "粥": "zhou",
    "妯": "chou",
    "轴": "zhou",
    "碡": "zhou",
    "肘": "zhou",
    "帚": "zhou",
    "纣": "zhou",
    "咒": "zhou",
    "宙": "zhou",
    "绉": "chao",
    "昼": "zhou",
    "胄": "zhou",
    "荮": "zhou",
    "皱": "zhou",
    "酎": "zhou",
    "骤": "zhou",
    "籀": "zhou",
    "朱": "zhu",
    "侏": "zhu",
    "诛": "zhu",
    "邾": "zhu",
    "洙": "zhu",
    "茱": "zhu",
    "株": "zhu",
    "珠": "zhu",
    "诸": "zhu",
    "猪": "zhu",
    "铢": "zhu",
    "蛛": "zhu",
    "槠": "zhu",
    "潴": "zhu",
    "橥": "zhu",
    "竹": "zhu",
    "竺": "zhu",
    "烛": "zhu",
    "逐": "zhu",
    "舳": "zhou",
    "瘃": "zhu",
    "躅": "zhu",
    "主": "zhu",
    "拄": "zhu",
    "渚": "zhu",
    "属": "shu",
    "煮": "zhu",
    "嘱": "zhu",
    "麈": "zhu",
    "瞩": "zhu",
    "伫": "zhu",
    "住": "zhu",
    "助": "zhu",
    "苎": "zhu",
    "杼": "zhu",
    "注": "zhu",
    "贮": "zhu",
    "驻": "zhu",
    "柱": "zhu",
    "炷": "zhu",
    "祝": "zhu",
    "疰": "zhu",
    "著": "zhu",
    "蛀": "zhu",
    "筑": "zhu",
    "铸": "zhu",
    "箸": "zhu",
    "翥": "zhu",
    "抓": "zhua",
    "爪": "zhao",
    "拽": "zhuai",
    "专": "zhuan",
    "砖": "zhuan",
    "颛": "zhuan",
    "转": "zhuan",
    "啭": "zhuan",
    "赚": "zhuan",
    "撰": "zhuan",
    "篆": "zhuan",
    "馔": "xuan",
    "妆": "zhuang",
    "庄": "zhuang",
    "桩": "zhuang",
    "装": "zhuang",
    "壮": "zhuang",
    "状": "zhuang",
    "幢": "chuang",
    "撞": "zhuang",
    "隹": "cui",
    "追": "zhui",
    "骓": "zhui",
    "椎": "zhui",
    "锥": "zhui",
    "坠": "zhui",
    "缀": "zhui",
    "惴": "chuan",
    "缒": "zhui",
    "赘": "zhui",
    "肫": "chun",
    "窀": "tun",
    "谆": "zhun",
    "准": "zhun",
    "卓": "zhuo",
    "拙": "zhuo",
    "倬": "zhuo",
    "捉": "zhuo",
    "桌": "zhuo",
    "涿": "zhuo",
    "灼": "zhuo",
    "茁": "zhuo",
    "斫": "zhuo",
    "浊": "zhuo",
    "浞": "zhuo",
    "诼": "zhuo",
    "酌": "zhuo",
    "啄": "zhou",
    "着": "zhou",
    "琢": "zhuo",
    "禚": "zhuo",
    "擢": "zhuo",
    "濯": "shuo",
    "镯": "shu",
    "仔": "zi",
    "孜": "zi",
    "兹": "zi",
    "咨": "zi",
    "姿": "zi",
    "赀": "zi",
    "资": "zi",
    "淄": "zi",
    "缁": "zi",
    "谘": "zi",
    "孳": "zi",
    "嵫": "zi",
    "滋": "zi",
    "粢": "zi",
    "辎": "zi",
    "觜": "zi",
    "趑": "ci",
    "锱": "zi",
    "龇": "chai",
    "髭": "zi",
    "鲻": "zi",
    "籽": "zi",
    "子": "zi",
    "姊": "zi",
    "秭": "zi",
    "耔": "zi",
    "笫": "zi",
    "梓": "zi",
    "紫": "zi",
    "滓": "zi",
    "訾": "zi",
    "字": "zi",
    "自": "zi",
    "恣": "zi",
    "渍": "zi",
    "眦": "zi",
    "宗": "zong",
    "综": "zong",
    "棕": "zong",
    "腙": "zong",
    "踪": "zong",
    "鬃": "zong",
    "总": "zong",
    "偬": "cong",
    "纵": "zong",
    "粽": "zong",
    "邹": "zou",
    "驺": "zhu",
    "诹": "zhou",
    "陬": "zhe",
    "鄹": "zou",
    "鲰": "zou",
    "走": "zou",
    "奏": "zou",
    "揍": "zou",
    "租": "zu",
    "菹": "zu",
    "足": "zu",
    "卒": "zu",
    "族": "zu",
    "镞": "chuo",
    "诅": "zu",
    "阻": "zu",
    "组": "zu",
    "俎": "zu",
    "祖": "zu",
    "躜": "cuo",
    "缵": "zuan",
    "纂": "zuan",
    "钻": "zuan",
    "攥": "zuan",
    "嘴": "zui",
    "最": "zui",
    "罪": "zui",
    "蕞": "zhuo",
    "醉": "zui",
    "尊": "zun",
    "遵": "zun",
    "樽": "zun",
    "鳟": "zun",
    "撙": "zun",
    "昨": "zuo",
    "左": "zuo",
    "佐": "zuo",
    "作": "zuo",
    "坐": "zuo",
    "阼": "zuo",
    "怍": "zha",
    "柞": "zuo",
    "祚": "zuo",
    "胙": "zuo",
    "唑": "shi",
    "座": "zuo",
    "做": "zuo"
  };
  Pinyin._getPinYin = function (C, index) {
    // index==0为简拼，==1为全拼
    C = C.toUpperCase();
    var D = C.length;
    var F,
        B = "",
        E;
    for (var A = 0; A < D; A++) {
      F = C.substr(A, 1);
      if (!this.codeTable[F]) continue;
      E = this.codeTable[F];
      if (index == 0) E = E.substr(0, 1);
      B += E;
    }
    return B.toLowerCase();
  };
  Pinyin.getJP = function (C) {
    return this._getPinYin(C, 0);
  };
  Pinyin.getQP = function (C) {
    return this._getPinYin(C, 1);
  };

  return Pinyin;
}();

//事件 $$
(function () {
  var device = DEVICE,
      createMyTouchEven = function createMyTouchEven(obj) {
    this.obj = obj;
    this.mytarget = null;

    if (this.obj == null) {
      return;
    }

    this.clickLongTimeFn = null;
    this.clickTimeFn = null;
    this.points = [];

    this.isTouchOk = true;
    this.isTouchStarted = false;
    this.isTouchMoved = false;
    this.isLongClicked = false;
    this.isTouchEnded = false;

    this.clickDownEven = null;
    this.clickOkEven = null;
    this.clickUpEven = null;
    this.longClickEven = null;
    //this.slideUpEven=null;
    //this.slideDownEven=null;
    //this.slideRightEven=null;
    //this.slideLeftEven=null;

    this.touchSTime = null;
    this.touchJQ = 400;
    //this.touchDelay=10;
    this.longClickDelay = 100000;
    this.allowMove = 10;
    this.hasTouch = device.hasTouch;

    this.eventBind();
  };

  createMyTouchEven.prototype = {
    eventBind: function eventBind() {
      var _this = this;
      this.obj.addEventListener(device.START_EV, this.touchStart = function (e) {
        _this.touchStartHandler(e);
      }, false);
      this.obj.addEventListener(device.MOVE_EV, this.touchMove = function (e) {
        _this.touchMoveHandler(e);
      }, false);
      this.obj.addEventListener(device.END_EV, this.touchEnd = function () {
        _this.touchEndHandler();
      }, false);

      this.clickDownEven = document.createEvent('Event');
      this.clickDownEven.initEvent("myclickdown", true, true);

      this.clickOkEven = document.createEvent('Event');
      this.clickOkEven.initEvent("myclickok", true, true);

      this.clickUpEven = document.createEvent('Event');
      this.clickUpEven.initEvent("myclickup", true, true);

      this.longClickEven = document.createEvent('Event');
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
    f5: function f5() {
      this.points = [];
      this.isTouchStarted = false;
      this.isTouchMoved = false;
      this.isLongClicked = false;
      this.isTouchEnded = false;
    },
    isTouchOkFn: function isTouchOkFn() {
      //判断是否是有效点击
      var nowdatatime = new Date().getTime();

      //点击时间间隔控制
      if (this.touchSTime) {
        /*
         if(nowdatatime-this.touchSTime>this.touchJQ){
         //有效
         this.isTouchOk=true;
         }else{
         //无效
         this.isTouchOk=false;
         }
         */
        this.isTouchOk = nowdatatime - this.touchSTime > this.touchJQ;
        if (this.isTouchOk) {
          this.touchSTime = nowdatatime;
        }
      } else {
        this.isTouchOk = true;
        this.touchSTime = nowdatatime;
      }
    },
    //长按事件监听
    clickLongListenerFn: function clickLongListenerFn() {
      var _this = this;
      this.clickLongTimeFn = setTimeout(function () {
        _this.isLongClicked = true;
        _this.isTouchEnded = true;
        //长按。。。。。
        //触发事件
        _this.clickUpEven.mytarget = _this.mytarget;
        _this.longClickEven.mytarget = _this.mytarget;
        _this.obj.dispatchEvent(_this.clickUpEven);
        _this.obj.dispatchEvent(_this.longClickEven);
        //_this.clickUpHandler(e);
        //_this.clickLongHandler(e);
      }, this.longClickDelay);
    },
    //点击时
    touchStartHandler: function touchStartHandler(e) {
      //e.preventDefault();

      this.isTouchOkFn(); //判断是否是有效点击
      if (!this.isTouchOk) {
        return;
      }

      this.mytarget = e.target;
      this.mytarget.clickX = e.touches ? e.touches[0].clientX : e.clientX;
      this.mytarget.clickY = e.touches ? e.touches[0].clientY : e.clientY;

      this.f5(); //刷新参数
      this.savePoint(e); //记录当前点

      //点击延时执行
      var _this = this;
      //this.clickTimeFn=setTimeout(function(){
      _this.touchStartHandlerGo();
      //},this.touchDelay);
    },
    //点击后延迟执行
    touchStartHandlerGo: function touchStartHandlerGo() {
      this.isTouchStarted = true;

      //注册长按事件
      this.clickLongListenerFn();

      //执行按下动作
      //
      this.clickDownEven.mytarget = this.mytarget;
      this.obj.dispatchEvent(this.clickDownEven);
      //this.clickDownHandler(e);
    },
    //移动时判断 未动 长滑
    touchMoveCondition: function touchMoveCondition() {
      var poinglength = this.points.length;
      //当前点
      var thispointx = this.points[poinglength - 1].x;
      var thispointy = this.points[poinglength - 1].y;
      //初始点击时的点
      var yuanpointx = this.points[0].x;
      var yuanpointy = this.points[0].y;

      if (!this.isTouchMoved) {
        //规定的移动范围内算作未移动处理
        if (thispointx >= yuanpointx - this.allowMove && thispointx <= yuanpointx + this.allowMove && thispointy >= yuanpointy - this.allowMove && thispointy <= yuanpointy + this.allowMove) {
          this.isTouchMoved = false;
        } else {
          this.isTouchMoved = true;
        }
      }
    },
    //移动时的处理
    touchMoveHandler: function touchMoveHandler(e) {
      //            e.preventDefault();
      if (!this.isTouchOk) {
        return;
      }
      if (this.isTouchEnded) {
        return;
      }
      if (this.isLongClicked) {
        return;
      }

      //记录当前点
      this.savePoint(e);

      //判断移动超出
      this.touchMoveCondition();

      if (this.isTouchMoved) {
        //判断移动类型
        clearTimeout(this.clickTimeFn);
        clearTimeout(this.clickLongTimeFn);
        if (this.isTouchStarted) {
          this.isTouchEnded = true;
          this.clickUpEven.mytarget = this.mytarget;
          this.obj.dispatchEvent(this.clickUpEven);
          //this.clickUpHandler(e);
        }
      }
    },
    //点击结束的处理
    touchEndHandler: function touchEndHandler() {
      if (!this.isTouchOk) {
        return;
      }
      clearTimeout(this.clickTimeFn);
      clearTimeout(this.clickLongTimeFn);
      //if(this.isTouchEnded){return;}   //move超出  没有进入滑动  结束
      if (this.isLongClicked) {
        return;
      } //长按了  结束


      this.isTouchEnded = true;

      if (this.isTouchStarted) {
        var _this = this;
        if (!this.isTouchMoved) {
          //延时执行
          setTimeout(function () {
            _this.clickUpEven.mytarget = _this.mytarget;
            _this.clickOkEven.mytarget = _this.mytarget;
            _this.obj.dispatchEvent(_this.clickUpEven);
            _this.obj.dispatchEvent(_this.clickOkEven);
          }, 200);
        } else {
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
    chooseSlideType: function chooseSlideType() {
      var thisstartpoint = this.points[0],
          pointlength = this.points.length,
          thisendpoint = this.points[pointlength - 1],
          hlength = Math.abs(thisstartpoint.x - thisendpoint.x),
          vlength = Math.abs(thisstartpoint.y - thisendpoint.y),
          _this = this;

      if (hlength > vlength) {
        //横向移动
        if (thisstartpoint.x > thisendpoint.x) {
          //左滑
          _this.slideLeftEven.mytarget = _this.mytarget;
          _this.obj.dispatchEvent(_this.slideLeftEven);
        } else {
          //右滑
          _this.slideRightEven.mytarget = _this.mytarget;
          _this.obj.dispatchEvent(_this.slideRightEven);
        }
      } else {
        //纵向移动
        if (thisstartpoint.y > thisendpoint.y) {
          //上滑
          _this.slideUpEven.mytarget = _this.mytarget;
          _this.obj.dispatchEvent(_this.slideUpEven);
        } else {
          //下滑
          _this.slideDownEven.mytarget = _this.mytarget;
          _this.obj.dispatchEvent(_this.slideDownEven);
        }
      }
    },
    savePoint: function savePoint(e) {
      var touch;
      if (this.hasTouch) {
        touch = e.touches[0];
      } else {
        touch = e;
      }
      this.points.push({ x: touch.clientX, y: touch.clientY });
    }
  };

  var events = {
    addClickListener: function addClickListener() {
      var _this = this;
      new createMyTouchEven(document);
      //clickok
      document.addEventListener("myclickok", function (e) {
        //                e.preventDefault();
        _this.dothis("myclickok", e);
      }, false);
      //clickdown
      document.addEventListener("myclickdown", function (e) {
        //                e.preventDefault();
        _this.dothis("myclickdown", e);
      }, false);
      //clickup
      document.addEventListener("myclickup", function (e) {
        //                e.preventDefault();
        _this.dothis("myclickup", e);
      }, false);
      //longclick
      document.addEventListener("mylongclick", function (e) {
        //                e.preventDefault();
        _this.dothis("mylongclick", e);
      }, false);

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
    dothis: function dothis(type, e) {
      var _this = this,
          that = e.mytarget,
          isfind = false;

      var gonext = function gonext(obj) {
        var p_obj = obj.parentNode;
        handlerthis(p_obj);
      };

      var handlerthis = function handlerthis(obj) {
        if (!obj) {
          return;
        }
        if (obj.nodeName.toLowerCase() == "html") {
          return;
        }

        var _eventid = obj.__bens_eventid__;

        if (_this.savefn[_eventid]) {
          isfind = true;
          if (_this.savefn[_eventid][type]) {
            _this.savefn[_eventid][type].call(obj, e);
          } else {
            if (type == "myclickdown") {
              $(obj).css({ opacity: 0.5 });
            }
            if (type == "myclickup") {
              $(obj).css({ opacity: 1 });
            }
          }
        }

        if (!isfind) {
          gonext(obj);
        }
      };

      handlerthis(that);
    },
    savefn: {}
  };
  events.addClickListener();

  var eventBind = function eventBind(a) {
    this.objs = null; //传入的obj
    if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object") {
      if (a.length && a.length > 0) {
        this.objs = a;
      } else {
        this.objs = $(a);
      }
    } else {
      this.objs = $(a);
    }
    this.idArray = [];
    this.saveobj = events.savefn;
    this.init();
  };
  eventBind.prototype = {
    init: function init() {
      if (this.objs.length == 0) {
        console.log("有事件绑定失败");return;
      }

      var _this = this;

      //遍历对象 写入事件id
      this.objs.each(function () {
        var thisobj = this;

        if (thisobj.__bens_eventid__) {
          _this.idArray.push(thisobj.__bens_eventid__);
        } else {
          var eventname = "e" + device.counter();
          thisobj.__bens_eventid__ = eventname;
          _this.idArray.push(eventname);
          _this.saveobj[eventname] = {};
        }
      });
    },
    savefn: function savefn(fn, type) {
      var data = this.idArray;

      for (var i = 0, l = data.length; i < l; i++) {
        var id = data[i];
        this.saveobj[id][type] = fn;
      }
    },
    trigger: function trigger(type) {
      for (var i = 0, l = this.idArray.length; i < l; i++) {
        var id = this.idArray[i];
        if (this.saveobj[id] && this.saveobj[id][type]) {
          this.saveobj[id][type]();
        }
      }
      return this;
    },
    myclickok: function myclickok(callback) {
      this.savefn(callback, "myclickok");
      return this;
    },
    myclickdown: function myclickdown(callback) {
      this.savefn(callback, "myclickdown");
      return this;
    },
    myclickup: function myclickup(callback) {
      this.savefn(callback, "myclickup");
      return this;
    },
    mylongclick: function mylongclick(callback) {
      this.savefn(callback, "mylongclick");
      return this;
    },
    unbind: function unbind(type) {
      var data = this.idArray,
          delall = false,
          _this = this;

      if (type && typeof type == "boolean") {
        delall = true;
      }

      var clearAll = function clearAll(this_obj) {
        var id = this_obj.__bens_eventid__;
        delete this_obj.__bens_eventid__;
        delete _this.saveobj[id];
      };

      this.objs.each(function () {
        var this_obj = this;
        if (delall) {
          clearAll(this_obj);
        } else {
          delete _this.saveobj[id][type];

          //检查是否所有事件都为空
          var this_data = _this.saveobj[id],
              isnull = true;

          for (var key in this_data) {
            if (this_data[key]) {
              isnull = false;
              break;
            }
          }
          if (isnull) {
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
  window.$$ = function (a) {
    return new eventBind(a);
  };
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
(function () {
  var device = DEVICE;

  var createMySlideEven = function createMySlideEven(datas) {
    var obj = datas.obj;

    this.events = datas.saveAddress;

    if (!$.isObject(obj)) {
      console.log("滑动参数错误");return;
    }
    if (obj.length > 0) {
      obj = obj.get(0);
    }

    this.obj = obj;

    this.slideEventJG = 500; //释放后300秒触发一次
    this.eventobj = null;
    this.startTime = null;
    this.allowTrigerTime = 500; //500秒内释放有效
    this.moveStartTime = 0;
    this.movefnTrigerTime = 10; //移动事件回调10毫秒触发一次
    this.points = [];

    //this.leftSlideEven=null;
    //this.rightSlideEven=null;
    //this.upSlideEven=null;
    //this.downSlideEven=null;

    this.touchStart = null;
    this.touchMove = null;
    this.touchEnd = null;

    this.minLength = 10;
    this.hasTouch = device.hasTouch;
    this.state = false;

    this.eventBind();
  };
  createMySlideEven.prototype = {
    eventBind: function eventBind() {
      var _this = this;
      this.obj.addEventListener(device.START_EV, this.touchStart = function (e) {
        _this.touchStartHandler(e);
      }, false);
      this.obj.addEventListener(device.MOVE_EV, this.touchMove = function (e) {
        _this.touchMoveHandler(e);
      }, false);
      this.obj.addEventListener(device.END_EV, this.touchEnd = function (e) {
        _this.touchEndHandler(e);
      }, false);

      //this.leftSlideEven=document.createEvent('Event');
      //this.leftSlideEven.initEvent("myslideleft", true, true);

      //this.rightSlideEven=document.createEvent('Event');
      //this.rightSlideEven.initEvent("myslideright", true, true);

      //this.upSlideEven=document.createEvent('Event');
      //this.upSlideEven.initEvent("myslideup", true, true);

      //this.downSlideEven=document.createEvent('Event');
      //this.downSlideEven.initEvent("myslidedown", true, true);
    },
    removeEven: function removeEven() {
      this.obj.removeEventListener(device.START_EV, this.touchStart, false);
      this.obj.removeEventListener(device.MOVE_EV, this.touchMove, false);
      this.obj.removeEventListener(device.END_EV, this.touchEnd, false);
    },
    f5: function f5() {
      this.points = [];
    },
    touchStartHandler: function touchStartHandler(e) {
      var starttime = new Date().getTime(),
          savetime = this.startTime || 0;
      if (starttime - savetime < this.slideEventJG) {
        this.startTime = starttime;
        this.state = false;
        return;
      }
      this.f5(); //刷新参数
      this.savePoint(e); //记录当前点
      this.state = true;
      this.startTime = new Date().getTime();
      this.eventobj = e;
      if (typeof this.events.start === "function") {
        this.events.start.call(this.obj, e);
      }
    },
    touchMoveHandler: function touchMoveHandler(e) {
      e.preventDefault();
      if (!this.state) {
        return;
      }
      this.savePoint(e);

      var nowtime = new Date().getTime();
      if (typeof this.events.move === "function" && nowtime - this.moveStartTime > this.movefnTrigerTime) {
        this.moveStartTime = nowtime;
        this.events.move.call(this.obj, e);
      }
    },
    touchEndHandler: function touchEndHandler(e) {
      var thistime = new Date().getTime();

      if (!this.state) {
        this.state = false;return;
      }
      this.state = false;
      if (this.points.length < 2) {
        return;
      }

      if (!(this.startTime && thistime - this.startTime <= this.allowTrigerTime)) {

        this.triggerEndFn(e);
        return;
      }

      var lastpoint = this.points[this.points.length - 1];
      var lastpointx = lastpoint.x;
      var lastpointy = lastpoint.y;

      //            var startpoint=this.points[this.points.length-2];
      var startpoint = this.points[0];
      var startpointx = startpoint.x;
      var startpointy = startpoint.y;

      var pointsx = Math.abs(startpointx - lastpointx);
      var pointsy = Math.abs(startpointy - lastpointy);

      //未超过最小滑动距离
      if (pointsx < this.minLength && pointsy < this.minLength) {
        this.triggerEndFn(e);return;
      }

      this.startTime = thistime;
      //判断方向
      if (pointsx >= pointsy) {
        //横向滑动
        if (startpointx > lastpointx) {
          //左滑
          //this.obj.dispatchEvent(this.leftSlideEven);
          if (typeof this.events.left === "function") {
            this.events.left.call(this.obj, this.eventobj);
          }
        } else {
          //右滑
          //this.obj.dispatchEvent(this.rightSlideEven);
          if (typeof this.events.right === "function") {
            this.events.right.call(this.obj, this.eventobj);
          }
        }
      } else {
        //纵向滑动
        if (startpointy > lastpointy) {
          //上滑
          //this.obj.dispatchEvent(this.upSlideEven);
          if (typeof this.events.up === "function") {
            this.events.up.call(this.obj, this.eventobj);
          }
        } else {
          //下滑
          //this.obj.dispatchEvent(this.downSlideEven);
          if (typeof this.events.down === "function") {
            this.events.down.call(this.obj, this.eventobj);
          }
        }
      }
    },
    triggerEndFn: function triggerEndFn(e) {
      if (typeof this.events.end === "function") {
        this.events.end.call(this.obj, e);
      }
    },
    savePoint: function savePoint(e) {
      var touch;
      if (this.hasTouch) {
        touch = e.touches[0];
      } else {
        touch = e;
      }
      this.points.push({ x: touch.screenX, y: touch.screenY });
    }
  };

  var savefn = {},
      saveobj = {};

  var eventbind = function eventbind(obj) {
    obj = $.getDom(obj);

    if (!$.isObject(obj)) {
      console.log("slide bind error");return;
    }

    var id;
    if (obj.__bens_slide_event_id__) {
      //帮定过事件
      id = obj.__bens_slide_event_id__;
    } else {
      //没有注册监听事件
      id = device.counter();
      obj.__bens_slide_event_id__ = id;
      savefn[id] = {
        up: null,
        left: null,
        down: null,
        right: null,
        end: null,
        start: null,
        move: null
      };
      saveobj[id] = new createMySlideEven({
        obj: obj,
        saveAddress: savefn[id]
      });
    }

    this.obj = obj;
    this.id = id;
    this.saveFn = savefn[id];
  };
  eventbind.prototype = {
    myslidedown: function myslidedown(fn) {
      if (typeof fn === "function") {
        this.saveFn.down = fn;
      }
      return this;
    },
    myslideup: function myslideup(fn) {
      if (typeof fn === "function") {
        this.saveFn.up = fn;
      }
      return this;
    },
    myslideleft: function myslideleft(fn) {
      if (typeof fn === "function") {
        this.saveFn.left = fn;
      }
      return this;
    },
    myslideright: function myslideright(fn) {
      if (typeof fn === "function") {
        this.saveFn.right = fn;
      }
      return this;
    },
    myend: function myend(fn) {
      if (typeof fn === "function") {
        this.saveFn.end = fn;
      }
      return this;
    },
    mystart: function mystart() {
      if (typeof fn === "function") {
        this.saveFn.start = fn;
      }
      return this;
    },
    mymoving: function mymoving(fn) {
      if (typeof fn === "function") {
        this.saveFn.move = fn;
      }
      return this;
    },
    unbind: function unbind(type) {
      if (type && $.isBoolean(type)) {
        this._removeObj();
        return;
      }

      var new_type = null;
      switch (type) {
        case "mymoving":
          new_type = "move";
          break;
        case "myend":
          new_type = "end";
          break;
        case "mystart":
          new_type = "start";
          break;
        default:
          new_type = type.replace("myslide", "");
          break;
      }

      type = new_type;

      if (this.saveFn[type]) {
        delete this.saveFn[type];
      }

      this._checkHasFn();
      return this;
    },
    //检查是否还有事件绑定
    _checkHasFn: function _checkHasFn() {
      var isfind = false;

      for (var key in this.saveFn) {
        if (this.saveFn.hasOwnProperty(key)) {
          if (this.saveFn[key]) {
            isfind = true;
            break;
          }
        }
      }
      if (!isfind) {
        this._removeObj();
      }
    },
    //解除事件绑定
    _removeObj: function _removeObj() {
      var id = this.id;
      delete savefn[id];
      saveobj[id].removeEven();
      delete saveobj[id];
      delete this.obj.__bens_slide_event_id__;
    }
  };

  window.$$$ = function (obj) {
    return new eventbind(obj);
  };
})();

// 朗读文字
// iphone必须在点击事件后播放  >=ios7
//  android chrome>=55 才行


DEVICE.speak = function (text, lang, name) {
  if (!window.speechSynthesis) {
    console.log("not support speak!");return;
  }

  var synth = window.speechSynthesis,
      voices = synth.getVoices();
  synth.cancel();
  lang = lang || "zh-cn";
  name = name || "google";

  var utterThis = new SpeechSynthesisUtterance(text);
  var opticon = [],
      selectOpticon = "";

  for (var i = 0, l = voices.length; i < l; i++) {
    var this_lang = voices[i].lang;

    if (this_lang.toLowerCase() == lang) {
      opticon.push(voices[i]);
    }
  }

  if (opticon.length == 1) {
    selectOpticon = opticon[i];
  } else if (opticon.length == 0) {
    selectOpticon = voices[i];
  } else {
    for (var z = 0, zl = opticon.length; z < zl; z++) {
      var this_name = opticon[z].name;
      if (this_name.toLowerCase().indexOf(name) > -1) {
        selectOpticon = opticon[z];
        break;
      }
    }
    if (!selectOpticon) {
      selectOpticon = opticon[0];
    }
  }

  utterThis.voice = selectOpticon;
  synth.speak(utterThis);
};