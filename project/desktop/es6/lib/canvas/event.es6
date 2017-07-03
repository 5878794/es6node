
// 事件点击
// 需要在scene上执行 addEvent 方法
// 事件在sprite上绑定

let baseEvent = require("./../event/baseTouch"),
	target = Symbol(),
	findTarget = Symbol(),
	listenerEventsName = Symbol(),
	getScenePoint = Symbol(),
	checkSpriteEvent = Symbol();




class Event extends baseEvent{
	constructor(opt){
		super(opt);

		this.scene = opt.scene;
		this[target] = null;
		this[listenerEventsName] = ["myclickdown","myclickup","myclickok"];

	}

	startFn(e){
		super.startFn(e);
		this[findTarget]();

		if(this[target] && this[target].myclickdownFn){
			this[target].myclickdownFn.call(this[target]);
		}
	}

	//查找点击目标
	[findTarget](){
		//获取场景的点击相对位置
		let {x,y} = this[getScenePoint]();
		let layers = this.scene.layers,
			isFind = false;

		for(let i=layers.length-1;i>=0;i--){
			let layer = layers[i],
				sprites = layer.sprites;
			if(isFind){break;}

			for(let s=sprites.length-1;s>=0;s--){
				let sprite = sprites[s];

				if(this[checkSpriteEvent](x,y,sprite)){
					isFind = true;
					this[target] = sprite;
					break;
				}
			}
		}
	}

	//检查精灵是否在点击点
	[checkSpriteEvent](x,y,sprite){
		//判断点击点是否在精灵上
		if(x>sprite.x && x<sprite.x1 && y>sprite.y && y<sprite.y1){

		}else{
			return false;
		}


		//判断该精灵是否有事件捆绑
		let events = this[listenerEventsName],
			hasEvent = false;

		events.map((event)=>{
			let fn = event + "Fn";
			if(sprite[fn]){
				hasEvent = true;
			}
		});

		return hasEvent;
	}

	//获取场景的点击相对位置
	[getScenePoint](){
		let n = this.points.length-1,
			{x,y} = this.points[n];
		//场景相对于页面的位置
		let scenesOffset = this.scene.dom.offset(),
			//获取滚动条的位置
			scrollTop = document.body.scrollTop,
			scrollLeft = document.body.scrollLeft,
			//获取场景相对于屏幕的位置
			scenesTop = scenesOffset.top - scrollTop,
			scenesLeft = scenesOffset.left - scrollLeft,
			//获取点击点相对于场景的位置
			touchX = x - scenesLeft,
			touchY = y - scenesTop;

		return {x:touchX,y:touchY};
	}


	moveFn(e){
		if(!this[target]){return;}
		super.moveFn(e);

		let {x,y} = this[getScenePoint]();
		if(!this[checkSpriteEvent](x,y,this[target])){
			if(this[target].myclickupFn){
				this[target].myclickupFn.call(this[target]);
			}
			this[target] = null;
		}

	}

	endFn(e){
		if(!this[target]){return;}
		super.endFn(e);

		if(this[target].myclickupFn){
			this[target].myclickupFn.call(this[target]);
		}
		if(this[target].myclickokFn){
			this[target].myclickokFn.call(this[target]);
		}

		this[target] = null;
	}

	destroy(){
		super.destroy();
	}

}




module.exports = Event;