

//精灵播放资源动画
//继承Sprite类

//设置队列接口
// SpriteResAnimate.setResAnimateList({
//      resList:[],             //播放资源,最后一张同原始资源
//      canStopResPointer:[],   //资源切换时能停止的资源序号点
//      frame:number,           //动画间隔几帧播放下一张资源图,正常情况下一秒60帧
//      infinite:bool           //循环播放资源队列,true时回调不执行
//      callback:fn             //播放完后回调函数
// });
//运行接口
// SpriteResAnimate.resAnimatePlay();
//停止接口
// SpriteResAnimate.resAnimateStop();
//清除接口
// SpriteResAnimate.resAnimateClear();



let sprite = require("./sprite"),
	resList = Symbol(),
	frame = Symbol(),
	infinite = Symbol(),
	callback = Symbol(),
	isCanRunList = Symbol(),
	oldRes = Symbol(),
	setNowRes = Symbol(),
	frameCount = Symbol(),
	resPointer = Symbol(),
	reSetParam = Symbol(),
	canStopResPointer = Symbol(),
	checkCanPlayRes = Symbol(),
	setNextFrame = Symbol();


class SpriteResAnimate extends sprite{
	constructor(opt = {}){
		super(opt);

		this[oldRes] = opt.res;
		this[isCanRunList] = false;
		this[frameCount] = 0;
		this[resPointer] = -1;
	}

	//设置自身资源切换参数
	//2次设置时会自动强行停止之前的播放,需要在调用一次resPlay接口
	//资源需要反向播的,在播放队列中自己加资源图片
	//资源最后一帧需要同原始资源相同
	setResAnimateList(opt = {}){
		//重置参数
		this[reSetParam]();


		//需要切换的资源列表,图片对象
		this[resList] = opt.resList || [];
		//资源切换时能停止的资源序号点
		//比如人行走有6张资源图片,第3张和第6张为站立点
		//这里需要传入[2,5]
		//如在播放资源1时调用停止动画,则会播放到第3张才会停
		//如果需要强制马上停止需调用接口
		let resLength = this[resList].length - 1;
		this[canStopResPointer] = opt.canStopResPointer || [resLength];
		//动画间隔几帧播放下一张资源图,正常情况下一秒60帧
		this[frame] = opt.frame || 5;
		//循环播放资源队列
		//设置为true时,callback回调不会执行
		this[infinite] = ($.isBoolean(opt.infinite))? opt.infinite : false;
		//播放完后回调函数
		this[callback] = opt.callback || function(){};


	}

	//开始播放资源队列
	resAnimatePlay(){
		this[isCanRunList] = true;
	}

	//停止播放资源队列
	resAnimateStop(){
		this[isCanRunList] = false;
	}

	//清除资源队列,还原之间的资源图
	resAnimateClear(){
		this.res = this[oldRes];
		this[reSetParam]();
	}

	//重置参数
	[reSetParam](){
		this[frameCount] = 0;
		this[isCanRunList] = false;
		this[resPointer] = -1;
	}

	//检查是否播放资源队列
	[checkCanPlayRes](){
		//检查手动设置是否可以播放
		if(this[isCanRunList]){
			return true;
		}

		//检查是否开始播放过没
		if(this[resPointer] == -1){
			return false;
		}

		//检查当前资源指针是否在队列的停止点上
		return (this[canStopResPointer].indexOf(this[resPointer]) == -1);
	}

	//设置当前需要播放的资源
	[setNowRes](){
		//判断是否可以播放
		if(!this[checkCanPlayRes]()){
			return;
		}

		//间隔frame参数播放一帧
		this[frameCount] ++;
		if(this[frameCount] > this[frame]){
			this[frameCount] = 0;
			// 设置下一帧的资源
			this[setNextFrame]();
		}
	}

	// 获取下一帧的资源
	[setNextFrame](){
		this[resPointer]++;

		//判断是否是最后一帧
		if(this[resPointer] == this[resList].length){
			//判断是否是循环
			if(this[infinite]){
				this[resPointer] = 0;
			}else{
				this.resAnimateClear();
				this[callback]();
				return;
			}
		}

		let n = this[resPointer];
		this.res = this[resList][n];
	}



	render(){
		this[setNowRes]();

		super.render();
	}
}



module.exports = SpriteResAnimate;