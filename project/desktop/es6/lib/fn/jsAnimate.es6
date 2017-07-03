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



require("./../jq/extend");

var device = require("./../device"),
	nextFrame = device.nextFrame,
	cancelFrame = device.cancelFrame,
	tween = require("./tween");




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

module.exports = animate;
