/*
 * Filename : 
 * =====================================
 * Created with WebStorm.
 * User: bens
 * Date: 14-8-28
 * Time: 下午2:44
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

//DEVICE.ver                @param:number   浏览器版本或  ipad/iphone/android系统版本
//---------------------------------------------------------
(function(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/ipad; cpu os ([\d_]+)/)) ? Sys.ipad = s[1].replace(/_/g,".") :
    (s = ua.match(/iphone os ([\d_]+)/)) ? Sys.iphone = s[1].replace(/_/g,".") :
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
    for(var key in Sys){
        if(Sys.hasOwnProperty(key)){
            ver = Sys[key];
        }
    }
    ver = ver.split(".");
    var _ver = [];
    for(var i= 0,l=ver.length;i<l;i++){
        if(i>=2){
            break;
        }
        _ver.push(ver[i]);
    }
    _ver = _ver.join(".");
    DEVICE.ver = _ver;
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
(function(){
    var dummyStyle = document.createElement("div").style,
        vendor = (function () {
            if(window.navigator.msPointerEnabled){return "";}
            if("MozTransform" in dummyStyle){return "";}
            var vendors = 'webkitT,MozT,msT,OT,t'.split(','),
                t,
                i = 0,
                l = vendors.length;

            for ( ; i < l; i++ ) {
                t = vendors[i] + 'ransform';
                if ( t in dummyStyle ) {
                    return vendors[i].substr(0, vendors[i].length - 1);
                }
            }

            return false;
        })(),
        prefixStyle = function(style){
            if ( !vendor ) return style;

            style = style.charAt(0).toUpperCase() + style.substr(1);
            return vendor + style;
        },
        has3d = prefixStyle('perspective') in dummyStyle,


        windowTouch = (window.navigator.msMaxTouchPoints && window.navigator.msMaxTouchPoints > 0)? true : false,
        webkitTouch = 'ontouchstart' in window,
        hasTouch = (webkitTouch || windowTouch),
        hasTransform = vendor !== false,

        _transform = prefixStyle('transform'),
        _transitionProperty = prefixStyle('transitionProperty'),
        _transitionDuration = prefixStyle('transitionDuration'),
        _transformOrigin = prefixStyle('transformOrigin'),
        _transitionTimingFunction = prefixStyle('transitionTimingFunction'),
        _transitionDelay = prefixStyle('transitionDelay'),


        RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV = webkitTouch ? 'touchstart' : windowTouch? 'MSPointerDown' : 'mousedown',
        MOVE_EV = webkitTouch ? 'touchmove' : windowTouch? 'MSPointerMove' : 'mousemove',
        END_EV = webkitTouch ? 'touchend' : windowTouch? 'MSPointerUp' : 'mouseup',
        CANCEL_EV = webkitTouch ? 'touchcancel' : windowTouch? 'MSPointerUp' : 'mouseup',
        TRNEND_EV = (function () {
            if ( vendor === false ) return "transitionend";

            var transitionEnd = {
                ''			: 'transitionend',
                'webkit'	: 'webkitTransitionEnd',
                'Moz'		: 'transitionend',
                'O'			: 'otransitionend',
                'ms'		: 'MSTransitionEnd'
            };

            return transitionEnd[vendor];
        })(),
        nextFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) { return setTimeout(callback, 1); };
        })(),
        cancelFrame = (function () {
            return window.cancelRequestAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
        })(),
        counter = (function(){
            var a = 0;
            return function(){
                a += 1;
                return a;
            }
        })(),
        language = (navigator.browserLanguage || navigator.language).toLowerCase(),



        t_v = (function(){
            var _vendors = 'webkitT,MozT,msT,OT'.split(','),
                t,
                i = 0,
                l = _vendors.length;

            for ( ; i < l; i++ ) {
                t = _vendors[i] + 'ransform';
                if ( t in dummyStyle ) {
                    return ("-"+_vendors[i].substr(0, _vendors[i].length - 1)+"-");
                }
            }
            return "";
        })(),
        getCssName = function(style){
            return (style in dummyStyle)? style :
                   (t_v+style in dummyStyle)? t_v+style : style;
        },
        //判断盒子模型的版本 2009版 2011版  2013版
        boxVendors = "",
        boxType = (function(){

            if("boxPack" in dummyStyle){return 2009;}
            if(t_v+"box-pack" in dummyStyle){boxVendors = t_v; return 2009;}

            if("flexPack" in dummyStyle){return 2011;}
            if(t_v+"flex-pack" in dummyStyle){boxVendors = t_v; return 2011;}


            if("flexBasis" in dummyStyle){return 2013;}
            if(t_v+"flex-basis" in dummyStyle){boxVendors = t_v; return 2013;}
        })(),

        //（值）定义盒子模型 display:flex
        box =  (boxType == 2013)? boxVendors + "flex" :
                (boxType == 2011)? boxVendors + "flexbox" :
                (boxType == 2009)? boxVendors + "box" : "flex",
        //与盒子内布局方向相同，  start  end 。。。
        align_items = (boxType == 2013)? boxVendors + "align-items" :
                      (boxType == 2011)? boxVendors + "flex-pack" :
                      (boxType == 2009)? boxVendors + "box-pack" : "align-items",
        //与盒子内布局方向相反，  start  end 。。。
        justify_content = (boxType == 2013)? boxVendors + "justify-content" :
                        (boxType == 2011)? boxVendors + "flex-align" :
                        (boxType == 2009)? boxVendors + "box-align" : "justify-content",

        //盒子子元素所占比例
        flex = (boxType == 2013)? boxVendors + "flex" :
               (boxType == 2011)? boxVendors + "flex" :
               (boxType == 2009)? boxVendors + "box-flex" : "flex",

        //盒子方向
        flex_direction = (boxType == 2013)? boxVendors + "flex-direction" :
                         (boxType == 2011)? boxVendors + "flex-direction" :
                         (boxType == 2009)? boxVendors + "box-orient" : "flex-direction",

        //（值）横向排列
        flex_direction_row = (boxType == 2013)?  "row" :
                             (boxType == 2011)?  "row" :
                             (boxType == 2009)?  "horizontal" : "row",

        //（值）纵向排列
        flex_direction_column = (boxType == 2013)?  "column" :
                                (boxType == 2011)?  "column" :
                                (boxType == 2009)?  "vertical" : "column",




        box_shadow = getCssName("box-shadow"),
        backgroundSize = getCssName("background-size"),
        transform = getCssName("transform"),
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
            "box":box,
            "justify-content":justify_content,
            "align-items":align_items,
            "background-size":backgroundSize,
            "background-clip":background_clip,
            "flex":flex,
            "flex-direction":flex_direction,
            "row":flex_direction_row,
            "column":flex_direction_column,
            "transform":transform,
            "border-radius":border_radius,
            "border-bottom-left-radius":border_bottom_left_radius,
            "border-bottom-right-radius":border_bottom_right_radius,
            "border-top-left-radius":border_top_left_radius,
            "border-top-right-radius":border_top_right_radius,
            "box-sizing":box_sizing,
            "box-shadow":box_shadow,
            "backface-visibility":backface_visibility,
            "transition":transition,
            "transition-property":transition_property,
            "transition-duration":transition_duration,
            "transition-timing-function":transition_timing_function
        },
        gz = (function(){
            var reg,a=[];
            for(var key in css){
                if(css.hasOwnProperty(key)){
                    if(key == "box" || key == "transition" || key == "flex"){
                        a.push("([^-]"+key+"[^-])");
                    }else if(key == "row" || key == "column"){
                        a.push(key);
                    }else{
                        a.push("([^-]"+key+")");
                    }
                }
            }
            reg = a.join("|");
            return new RegExp(reg,"ig");
        })(),
        css_prefix = function(data){
            var text = JSON.stringify(data),
                newtext = cssfile_prefix(text);

            return JSON.parse(newtext);
        },
        cssfile_prefix = function(data){
            return  data.replace(gz,function(a){
                var str = a.substr(1, a.length-2);
                if(str == "box" || str == "transition" || str=="flex"){
                    var newstr = css[str];
                    return a.substr(0,1)+newstr+ a.substr(a.length-1);
                }else if(a == "row" || a == "column"){
                    return css[a];
                }else{
                    return a.substr(0,1)+css[a.substr(1)];
                }
            });
        },
        fix_css = function(css){
            css = css.replace(/;/ig," ; ");
            return cssfile_prefix(css);
        };

    dummyStyle = null;



    DEVICE.has3d = has3d;         //是否支持3d
    DEVICE.hasTouch = hasTouch;  //是否是触摸屏
    DEVICE.hasTransform = hasTransform;  //是否支持变形


    DEVICE._transform = transform;        //自动添加前缀
    DEVICE._transitionProperty = _transitionProperty;
    DEVICE._transitionDuration = _transitionDuration;
    DEVICE._transformOrigin =_transformOrigin;
    DEVICE._transitionTimingFunction = _transitionTimingFunction;
    DEVICE._transitionDelay = _transitionDelay;



    DEVICE.RESIZE_EV = RESIZE_EV;    //窗口变化
    DEVICE.START_EV = START_EV;  //点击
    DEVICE.MOVE_EV = MOVE_EV;   //移动
    DEVICE.END_EV = END_EV;     //释放
    DEVICE.CANCEL_EV = CANCEL_EV;      //结束
    DEVICE.TRNEND_EV = TRNEND_EV;       //变形结束 webkitTransitionEnd


    DEVICE.nextFrame = nextFrame;
    DEVICE.cancelFrame = cancelFrame;

    DEVICE.language = language;   //语言版本  zh-cn
    DEVICE.counter = counter;        //计数器  fn

    DEVICE.fixObjCss = css_prefix;
    DEVICE.fixCss = fix_css;


    DEVICE.css = css;
    DEVICE.boxType = boxType;
    DEVICE.boxVendors = boxVendors;
})();





//*****************************************************
//事件监听
//DEVICE.addEvent(obj,event,fn);            添加事件
//DEVICE.removeEvent(obj,event,fn);         取消事件
//*****************************************************
DEVICE.addEvent = function (target, type, func) {
    if (target.addEventListener) {
        target.addEventListener(type, func, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    } else {
        target["on" + type] = func;
    }
};
DEVICE.removeEvent = function (target, type, func) {
    if (target.removeEventListener) {
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
        target.detachEvent("on" + type, func);
    } else {
        delete target["on" + type];
    }
};

























//*****************************************************
//ie6还是７的　　　JSON.stringify 和 JSON.parse
//JSON的序列化和反序列化
//*****************************************************
if (!this.JSON) {
    this.JSON = {};
}
(function () {

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {


        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {


        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

            // If the type is 'object', we might be dealing with an object or an array or
            // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

                // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', { '': value });
        };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
                test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({ '': j }, '') : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());




//事件
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
            this.touchJQ=600;
            this.touchDelay=10;
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
            this.clickTimeFn=setTimeout(function(){
                _this.touchStartHandlerGo();
            },this.touchDelay);
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
            if($.is$(a)){
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



//数字加  st  rd   。。。。
Number.prototype.toOrdinal = function() {
    var n = this % 100;
    var suffix = ['th', 'st', 'nd', 'rd', 'th'];
    var ord = n < 21 ? (n < 4 ? suffix[n] : suffix[0]) : (n % 10 > 4 ? suffix[0] : suffix[n % 10]);
    return this + ord;
};



DEVICE.loading  = (function(){
    var __loading = function(datas){
        this.obj = ($.is$(datas.obj))? datas.obj.get(0) : datas.obj;    //要放入的对象
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
                position:"absolute",
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
                "position":"absolute",
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