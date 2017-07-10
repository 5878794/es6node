// 生成一个窗口可以拖动,拉动改变大小

//TODO 未考虑浏览器窗口缩放

// let a = new _window({
// 	name:"test4",                       //标题名称
// 	openUrl:"http://www.baidu.com",     //需要打开的地址
// 	id:4,                               //id
// 	body:$("body"),                     //插入的容器
// 	width:300,                          //宽、高、坐标
// 	height:400,
// 	left:100,
// 	top:100
// });


// a.min();             //窗口最小化
// a.max();             //窗口最大化
// a.close();           //关闭窗口
// a.show();            //显示到最顶层


let init = Symbol(),
	getParam = Symbol(),
	bodyWidth = Symbol(),
	bodyHeight = Symbol(),
	createWindow = Symbol(),
	frameAutoSize = Symbol(),
	windowDom = Symbol(),
	addMoveAndResizeEvent = Symbol(),
	windowMove = Symbol(),
	getMoveMinMaxXY = Symbol(),
	moveMinMaxXY = Symbol(),
	updateDomParam = Symbol(),
	windowResize = Symbol(),
	windowLeftChange = Symbol(),
	windowRightChange = Symbol(),
	windowBottomChange = Symbol(),
	windowTopChange = Symbol(),
	addThreeButtonEvent = Symbol(),
	setMaxZIndex = Symbol(),
	checkHasExist = Symbol();

let $$ = require("../event/$$"),
	animate = require("../fn/jsAnimate");
require("../jq/extend");
require("../jq/listenerStyle");


let openedWindow = [],
	maxZIndex = 0;
window.ww = openedWindow;

class _window{
	constructor(opt){
		this.name = opt.name;
		this.openUrl = opt.openUrl;
		this.id = opt.id;
		this.body = opt.body || $("body");
		this.width = opt.width || 600;
		this.height = opt.height || 300;
		this.minWidth = opt.minWidth || 200;
		this.minHeight = opt.minHeight || 200;
		this.left = 100;
		this.top = 100;
		this.zIndex = 500;  //不要修改

		this[bodyWidth] = null;
		this[bodyHeight] = null;
		this[moveMinMaxXY] = {};        //移动时xy点最大、最小值
		this[windowDom] = {
			main:null,
			iframe:null,
			frame:null,
			top:null,
			left:null,
			right:null,
			bottom:null,
			title:null,
			topRight:null,
			topLeft:null,
			bottomLeft:null,
			bottomRight:null,
			zz:null,
			min:null,
			max:null,
			close:null,
			btns:null,
			loading:null
		};

		this[init]();
	}

	[init](){
		let openWin = _window[checkHasExist](this.id);
		if(openWin){
			openWin.show();
			return;
		}
		this[getParam]();
		this[createWindow]();
		this[frameAutoSize]();
		this[addMoveAndResizeEvent]();
		this[addThreeButtonEvent]();
		openedWindow.push(this);
	}

	//检查窗口是否已打开
	static [checkHasExist](id){
		let isExist = false;

		openedWindow.map(_win=>{
			if(_win.id == id){
				isExist = _win;
			}
		});

		return isExist;
	}

	//将当前对象放到顶层
	show(){
		_window[setMaxZIndex]();
		this.zIndex = maxZIndex;
		this[windowDom].main.css({"z-index":maxZIndex,display:"block"});
		//所有的窗口显示遮罩层
		openedWindow.map(_win=>{
			let title = _win[windowDom].title,
				bg = title.data("background");
			if(_win == this){
				_win[windowDom].zz.css({display:"none"});
				title.css({"background":bg});
				_win[windowDom].btns.data({isTop:true});
				_win[windowDom].btns.find("div").each(function(){
					let bg = $(this).data("bg1");
					$(this).css({
						"background-color":bg,
						color:bg
					});
				});
			}else{
				_win[windowDom].zz.css({display:"block"});
				title.css({"background":"rgb(246,246,246)"});
				_win[windowDom].btns.data({isTop:false});
				_win[windowDom].btns.find("div").each(function(){
					let bg = $(this).data("bg2");
					$(this).css({
						"background-color":bg,
						color:bg
					});
				});
			}
		});

	}

	//设置zindex
	setZIndex(){
		this[windowDom].main.css({"z-index":this.zIndex});
	}

	//获取参数
	[getParam](){
		this[bodyWidth] = parseInt(this.body.width());
		this[bodyHeight] = parseInt(this.body.height());
		maxZIndex = (this.zIndex > maxZIndex)? this.zIndex : maxZIndex;
		_window[setMaxZIndex]();
		this.zIndex = maxZIndex;
	}

	//处理最大层级数（500-1000）
	static  [setMaxZIndex](){
		maxZIndex++;
		if(maxZIndex < 510){return;}

		//大于1000重新生成zindex
		openedWindow = openedWindow.sort(function(a ,b){
			return a.zIndex > b.zIndex;
		});

		let maxNo = 0;
		for(var i=0,l=openedWindow.length;i<l;i++){
			maxNo =  500 + i;
			openedWindow[i].zIndex = maxNo;
			openedWindow[i].setZIndex();
		}
		maxNo = (maxNo<500)? 500 : maxNo;
		maxZIndex = maxNo + 1;
	}

	//创建窗口
	[createWindow](){
		//主容器
		let main = $("<div></div>");
		main.css3({
			width:this.width+"px",
			height:this.height+40+"px",
			position:"absolute",
			"border-radius":"10px",
			left:this.left+"px",
			top:this.top+"px",
			"box-sizing":"border-box",
			border:"1px solid #ccc",
			overflow:"hidden",
			"z-index":this.zIndex,
			"box-shadow":"10px 10px 20px 3px #ddd"
		}).data({param:{
			width:this.width,
			height:this.height+40,
			left:this.left,
			top:this.top
		}});
console.log(this.zIndex)
		//标题栏
		let title = $("<div>"+this.name+"</div>");
		title.css3({
			width:"100%",
			height:"40px",
			cursor:"crosshair",
			"line-height":"40px",
			position:"relative",
			"text-align":"center",
			background:"linear-gradient(rgb(235,237,235) 0%,rgb(215,213,215) 100%)"
		}).data({background:"linear-gradient(rgb(235,237,235) 0%,rgb(215,213,215) 100%)"});

		//标题栏3按钮
		let btns = $("<div></div>");
		btns.css({
			position:"absolute",
			width:"70px",
			height:"40px",
			cursor:"default",
			left:"10px",top:0
		});

		let btn = $("<div></div>");
		btn.css({
			width:"14px",height:"14px",
			"font-size":"9px",
			"line-height":"14px",
			"text-align":"center",
			"border-radius":"14px",
			margin:"13px 4px",
			background:"red",
			float:"left"
		});
		let close = btn.clone().text("x").css({
			background:"rgb(252,98,93)",
			"line-height":"13px"
		});
		let min = btn.clone().text("－").css({
			background:"rgb(253,188,64)"
		});
		let max = btn.clone().text("↕").css3({
			background:"rgb(53,204,74)",
			transform:"rotate(45deg)",
			"line-height":"13px"
		});
		btns.append(close).append(min).append(max);
		title.append(btns);

		//包含页面iframe
		let frame = $("<div></div>");
		frame.css({
			left:0,right:0,bottom:0,top:"40px",
			position:"absolute",
			background:"#fff"
		});

		let iframe = $("<iframe src='"+this.openUrl+"'  marginheight='0' marginwidth='0' frameborder='none'  />");
		frame.append(iframe);


		//窗口大小改变的感应条
		let divH = $("<div></div>"),
			divS = $("<div></div>");
		divH.css({
			position:"absolute",
			left:0,
			top:0,
			width:"100%",
			height:"10px",
			"z-index":10
		});
		divS.css({
			position:"absolute",
			left:0,
			top:0,
			width:"10px",
			height:"100%",
			"z-index":10
		});
		let div_top = divH.clone().css({cursor:"n-resize"}),
			div_bottom = divH.clone().css({top:"auto",bottom:0,cursor:"s-resize"}),
			div_left = divS.clone().css({cursor:"w-resize"}),
			div_right = divS.clone().css({left:"auto",right:0,cursor:"e-resize"});

		//四个角的感应条
		let div_angle = $("<div></div>");
		div_angle.css({
			position:"absolute",
			left:0,
			top:0,
			width:"10px",
			height:"10px",
			"z-index":20
		});
		let div_left_top = div_angle.clone().css({cursor:"nw-resize"}),
			div_right_top = div_angle.clone().css({left:"auto",right:0,cursor:"ne-resize"}),
			div_left_bottom = div_angle.clone().css({top:"auto",bottom:0,cursor:"sw-resize"}),
			div_right_bottom = div_angle.clone().css({top:"auto",left:"auto",right:0,bottom:0,cursor:"se-resize"});

		//创建遮罩层
		let div_zz = $("<div></div>");
		div_zz.css({
			position:"absolute",
			left:"10px",
			top:"40px",
			right:"10px",
			bottom:"10px",
			"z-index":100,
			display:"none"
		});

		//loading层
		let div_loading = div_zz.clone().text("loading...").css3({
			background:"#fff",
			display:"box",
			"box-pack":"center",
			"box-align":"center"
		});


		main.append(title)
			.append(frame)
			.append(div_top)
			.append(div_bottom)
			.append(div_left)
			.append(div_right)
			.append(div_left_top)
			.append(div_right_top)
			.append(div_left_bottom)
			.append(div_right_bottom)
			.append(div_zz)
			.append(div_loading);

		this[windowDom].top = div_top;
		this[windowDom].left = div_left;
		this[windowDom].bottom = div_bottom;
		this[windowDom].right = div_right;
		this[windowDom].title = title;
		this[windowDom].topRight = div_right_top;
		this[windowDom].topLeft = div_left_top;
		this[windowDom].bottomLeft = div_left_bottom;
		this[windowDom].bottomRight = div_right_bottom;
		this[windowDom].main = main;
		this[windowDom].frame = frame;
		this[windowDom].iframe = iframe;
		this[windowDom].zz = div_zz;
		this[windowDom].btns = btns;
		this[windowDom].min = min;
		this[windowDom].max = max;
		this[windowDom].close = close;
		this[windowDom].loading = div_loading;

		this.body.append(main);
	}

	//iframe窗口自适应,设置main窗口大小时需要用 $.fn.CSS方法
	[frameAutoSize](){
		let body = this[windowDom].main,
			main = this[windowDom].frame,
			iframe = this[windowDom].iframe,
			setWH = function(){
				iframe.get(0).width = main.get(0).clientWidth;
				iframe.get(0).height = main.get(0).clientHeight;
			},
			_this = this;

		body.listenerStyle(["width","height"],function(){
			setWH();
		});


		iframe.load(function(){
			_this[windowDom].loading.remove();
			setWH();
		});

		setWH();
	}

	//增加事件
	[addMoveAndResizeEvent](){
		let _this = this;

		//标题移动
		$$(this[windowDom].title).myclickdown(function(){
			_this.show();
			_this[windowDom].zz.css({display:"block"});
			_this[getMoveMinMaxXY]();
			$(this).css({opacity:0.6});
		}).myclickup(function(){
			_this[windowDom].zz.css({display:"none"});
			$(this).css({opacity:1});
			_this[updateDomParam]();
		}).mymove(function(x,y){
			_this[windowMove](x,y);
		});

		//改变容器
		let doms = [
			"left",
			"top",
			"right",
			"bottom",
			"topLeft",
			"topRight",
			"bottomLeft",
			"bottomRight"
		];
		doms.map(type=>{
			$$(this[windowDom][type]).myclickdown(function(){
				_this.show();
				_this[windowDom].zz.css({display:"block"});
				$(this).css({opacity:0.6});
			}).myclickup(function(){
				_this[windowDom].zz.css({display:"none"});
				$(this).css({opacity:1});
				_this[updateDomParam]();
			}).mymove(function(x,y){
				_this[windowResize](x,y,type);
			});
		});

		//遮罩层点击
		$$(this[windowDom].zz).myclickok(function(){
			_this.show();
		});

	}

	//窗体移动
	[windowMove](x,y){
		let dom = this[windowDom].main,
			{left,top} = $(dom).data("param");
		let newX = left+x,
			newY = top+y,
			data = this[moveMinMaxXY];

		newX = (newX < data.minX)? data.minX : newX;
		newX = (newX > data.maxX)? data.maxX : newX;
		newY = (newY < data.minY)? data.minY : newY;
		newY = (newY > data.maxY)? data.maxY : newY;

		$(dom).css({
			left:newX + "px",
			top:newY + "px"
		})

	}

	//窗口改变大小
	[windowResize](x,y,type){
		let dom = this[windowDom].main,
			{left,top,width,height} = $(dom).data("param"),
			newX = left,
			newY = top,
			newW = width,
			newH = height,
			right = this[bodyWidth] - left - width,
			bottom = this[bodyHeight] - top - height,
			_this = this;

		switch(type) {
			case("left"):
				var {nowX,nowW} = _this[windowLeftChange](newX,newW,right,x);
				newX = nowX;
				newW = nowW;
				break;
			case("right"):
				newW = _this[windowRightChange](newW,left,x);
				break;
			case("top"):
				var {nowY,nowH} = _this[windowTopChange](newY,newH,bottom,y);
				newY = nowY;
				newH = nowH;
				break;
			case("bottom"):
				newH = _this[windowBottomChange](newH,top,y);
				break;
			case("topLeft"):
				var {nowY,nowH} = _this[windowTopChange](newY,newH,bottom,y);
				newY = nowY;
				newH = nowH;
				var {nowX,nowW} = _this[windowLeftChange](newX,newW,right,x);
				newX = nowX;
				newW = nowW;
				break;
			case("bottomLeft"):
				var {nowX,nowW} = _this[windowLeftChange](newX,newW,right,x);
				newX = nowX;
				newW = nowW;
				newH = _this[windowBottomChange](newH,top,y);
				break;
			case("topRight"):
				newW = _this[windowRightChange](newW,left,x);
				var {nowY,nowH} = _this[windowTopChange](newY,newH,bottom,y);
				newY = nowY;
				newH = nowH;
				break;
			case("bottomRight"):
				newW = _this[windowRightChange](newW,left,x);
				newH = _this[windowBottomChange](newH,top,y);
				break;
			default:
				console.log("未找到resize的类别");
				break;
		}

		$(dom).CSS({
			width:newW+"px",
			height:newH+"px",
			left:newX+"px",
			top:newY+"px"
		})
	}
	//窗口left变化
	[windowLeftChange](newX,newW,right,x){
		let maxX = this[bodyWidth] - right - this.minWidth,
			maxW = this[bodyWidth] - right;

		newX += x;
		newW -= x;
		newX = (newX<0)? 0 : newX;
		newX = (newX>maxX)? maxX : newX;
		newW = (newW<this.minWidth)? this.minWidth : newW;
		newW = (newW>maxW)? maxW : newW;

		return {nowX:newX,nowW:newW};
	}
	//窗口right变化
	[windowRightChange](newW,left,x){
		let maxW = this[bodyWidth] - left;

		newW += x;
		newW = (newW<this.minWidth)? this.minWidth : newW;
		newW = (newW>maxW)? maxW : newW;

		return newW;
	}
	//窗口bottom变化
	[windowBottomChange](newH,top,y){
		let maxH = this[bodyHeight] - top;

		newH += y;
		newH = (newH<this.minHeight)? this.minHeight : newH;
		newH = (newH>maxH)? maxH : newH;

		return newH;
	}
	//窗口top变化
	[windowTopChange](newY,newH,bottom,y){
		let maxY = this[bodyHeight] - bottom - this.minHeight,
			maxH = this[bodyHeight] - bottom;

		newY += y;
		newH -= y;
		newY = (newY<0)? 0 : newY;
		newY = (newY>maxY)? maxY : newY;
		newH = (newH<this.minHeight)? this.minHeight : newH;
		newH = (newH>maxH)? maxH : newH;

		return {nowY:newY,nowH:newH};
	}

	//点击移动时 获取最大、最小点xy
	[getMoveMinMaxXY](){
		let minX = 0,
			minY = 0,
			maxX = this[bodyWidth] - parseInt(this[windowDom].main.width()),
			maxY = this[bodyHeight] - parseInt(this[windowDom].main.height());

		this[moveMinMaxXY] = {minX,minY,maxX,maxY};
	}

	//更新dom点param参数
	[updateDomParam](){
		let dom = this[windowDom].main;

		$(dom).data({"param":{
			left:parseInt($(dom).css("left")),
			top:parseInt($(dom).css("top")),
			width:parseInt($(dom).css("width")),
			height:parseInt($(dom).css("height"))
		}})

	}

	//3按钮事件
	[addThreeButtonEvent](){
		//初始设置字体颜色与背景一样,hover显示
		this[windowDom].btns.find("div").each(function(){
			let bgColor = $(this).css("background-color");
			$(this).css({
				color:bgColor
			}).data({
				bg1:bgColor,
				bg2:"rgb(227,227,227)"
			});
		});
		this[windowDom].btns.hover(function(){
			$(this).find("div").each(function(){
				let bg1 = $(this).data("bg1");
				$(this).css({
					color:"#000",
					"background-color":bg1
				});
			});
		},function(){
			let isTop = $(this).data("isTop");
			$(this).find("div").each(function(){
				let bg1 = $(this).data("bg1"),
					bg2 = $(this).data("bg2"),
					bg = (isTop)? bg1 : bg2;
				$(this).css({
					color:bg,
					"background-color":bg
				});
			});
		});


		let btns = ["min","max","close"],
			_this = this;
		btns.map(btn=>{
			$$(this[windowDom][btn]).myclickdown(function(e){
				e.stopPop();
				_this.show();
				$(this).css({opacity:0.5});
			}).myclickup(function(e){
				$(this).css({opacity:1});
				e.stopPop();
			}).myclickok(function(e){
				e.stopPop();
				_this[btn]();
			});
		})
	}

	min(){
		this[windowDom].main.css({
			display:"none"
		});
	}

	max(){
		let dom = this[windowDom].main,
			left = parseInt($(dom).css("left")),
			top = parseInt($(dom).css("top")),
			width = parseInt($(dom).css("width")),
			height = parseInt($(dom).css("height")),
			e_top = 0,
			e_left = 0,
			e_width = this[bodyWidth],
			e_height = this[bodyHeight],
			_this = this;

		let a = new animate({
			start:0,                  //@param:number   初始位置
			end:1,                    //@param:number   结束位置
			time:300,                 //@param:number   动画执行时间  ms
			type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
			class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
			stepFn:function(pre){     //@param:fn       每步执行函数,返回当前属性值
				dom.CSS({
					top:top+(e_top-top)*pre+"px",
					left:left+(e_left-left)*pre+"px",
					width:width+(e_width-width)*pre+"px",
					height:height+(e_height-height)*pre+"px"
				});
			},
			endFn:function(){
				_this[updateDomParam]();
			}
		});
		a.play();
	}

	close(){
		let dom = this[windowDom].main,
			_this = this;

		let a = new animate({
			start:0,                  //@param:number   初始位置
			end:1,                    //@param:number   结束位置
			time:300,                 //@param:number   动画执行时间  ms
			type:"Cubic",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
			class:"easeIn",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
			stepFn:function(pre){     //@param:fn       每步执行函数,返回当前属性值
				let nowPre=  1-pre;
				dom.CSS({
					transform:"scale("+nowPre+")",
					opacity:nowPre
				});
			},
			endFn:function(){
				_this.destroy();
			}
		});
		a.play();
	}

	destroy(){
		let doms = [
			"left",
			"top",
			"right",
			"bottom",
			"topLeft",
			"topRight",
			"bottomLeft",
			"bottomRight",
			"min",
			"max",
			"close"
		];
		doms.map(dom=>{$$(dom).unbind(true)});
		$(this[windowDom].btns).unbind("hover");

		this[windowDom].main.remove();

		openedWindow = openedWindow.filter(win=>{
			if(win != this){
				return win;
			}
		});
	}

}


module.exports = _window;