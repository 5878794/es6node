
//$$事件点击

let baseTouch = require("./baseTouch"),
	hasTouchStart = Symbol(),
	myTouchDown = Symbol(),
	myTouchUp = Symbol(),
	myTouch = Symbol(),
	myLongTouch = Symbol(),
	mySlideLeft = Symbol(),
	mySlideRight = Symbol(),
	mySlideUp = Symbol(),
	mySlideDown = Symbol(),
	myMove = Symbol(),
	isTouch = Symbol(),
	checkHasMove = Symbol(),
	longTouchHasRun = Symbol(),
	tempLongClick = Symbol(),
	RunSlide = Symbol();


class touchAndSlide extends baseTouch{
	constructor(opt = {}){
		super(opt);
		this[myTouchDown] = opt.myTouchDown || function(){};
		this[myTouchUp] = opt.myTouchUp || function(){};
		this[myTouch] = opt.myTouch || function(){};
		this[myLongTouch] = opt.myLongTouch || function(){};
		this[mySlideLeft] = opt.mySlideLeft || function(){};
		this[mySlideRight] = opt.mySlideRight || function(){};
		this[mySlideUp] = opt.mySlideUp || function(){};
		this[mySlideDown] = opt.mySlideDown || function(){};
		this[myMove] = opt.myMove || function(){};
		//点击事件允许在20像素内移动
		//滑动事件必须大于20像素才能触发
		this.canMoveLength = opt.canMoveLength || 20;
		//长按事件触发时间 毫秒
		this.longClickTime = opt.longClickTime || 1000;
		//滑动事件从开始到结束的时间不能大于slideMaxTime   毫秒
		this.slideMaxTime = opt.slideMaxTime || 500;

		//是否有按下
		this[hasTouchStart] = false;
		//是否执行点击事件
		this[isTouch] = true;
		//长按事件是否已执行
		this[longTouchHasRun] = false;
	}

	startFn(e){
		super.startFn(e);
		e.myTarget = this.target;
		this[hasTouchStart] = true;
		this[isTouch] = true;
		this[longTouchHasRun] = false;

		//执行按下事件
		this[myTouchDown](e);
		//注册长按事件
		this[tempLongClick] = setTimeout(()=>{
			if(!this[isTouch]){return;}
			this[longTouchHasRun] = true;
			this[myTouchUp](e);
			this[myLongTouch](e);
		},this.longClickTime)
	}

	moveFn(e){
		e.myTarget = this.target;
		if(!this[hasTouchStart]){return;}
		super.moveFn(e);

		//判断是否移动超过规定的距离
		if(this[checkHasMove]()){
			this[isTouch] = false;
		}
	}

	endFn(e){
		e.myTarget = this.target;
		if(!this[hasTouchStart]){return;}
		super.endFn(e);
		this[hasTouchStart] = false;

		//长按事件已执行 完成
		if(this[longTouchHasRun]){return;}


		//清除长按事件
		clearTimeout(this[tempLongClick]);
		//执行释放事件
		this[myTouchUp](e);

		//判断是否是点击
		if(this[isTouch]){
			//执行点击事件
			this[myTouch](e);
			return;
		}


		//判断是否超出滑动时间
		if(this.touchStartTime - e.timestamp > this.slideMaxTime){
			return;
		}

		//判断滑动类型
		this[RunSlide](e);
	}

	//检查是否移动过,不是点击事件咯
	[checkHasMove](){
		let n = this.points.length,
			sPoint = this.points[0],
			ePoint = this.points[n-1],
			{abs} = Math;

		if(!sPoint || !ePoint ){return true;}

		let mx = ePoint.x - sPoint.x,
			my = ePoint.y - sPoint.y;

		this[myMove](mx,my);
		return (
			abs(mx) > this.canMoveLength ||
			abs(my) > this.canMoveLength
		)

	}

	//获取滑动方向
	[RunSlide](e){
		let n = this.points.length,
			sPoint = this.points[0],
			ePoint = this.points[n-1],
			{abs} = Math,
			distanceX = ePoint.x - sPoint.x,
			distanceY = ePoint.y - sPoint.y;

		if(abs(distanceX) > abs(distanceY)){
			//x
			if(distanceX>0){
				this[mySlideRight](e);
				// return "Right";
			}else{
				this[mySlideLeft](e);
				// return "Left";
			}
		}else{
			//y
			if(distanceY>0){
				this[mySlideDown](e);
				// return "Down";
			}else{
				this[mySlideUp](e);
				// return "Up";
			}
		}
	}
}



module.exports = touchAndSlide;