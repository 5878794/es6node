

let sprite = require("./sprite"),
	animate = require("./canvasAnimate"),
	children = Symbol(),
	setSpriteParam = Symbol();



class spriteGroup extends sprite{
	constructor(opt){
		super(opt);

		this[children] = new Map();

	}

	children(name){
		let obj = this[children].get(name);
		if(obj){
			return obj.sprite;
		}else{
			return null;
		}
	}

	//添加精灵到组,记录组的位置
	append(name,sprite){
		var newParam = {};
		for(var key in sprite){
			if(sprite.hasOwnProperty(key)){
				newParam[key] = sprite[key];
			}
		}

		this[children].set(name,{
			param:newParam,
			sprite:sprite
		});
		return this;
	}

	//设置精灵实际的位置
	[setSpriteParam](param,sprite){
		sprite.parent = this.parent;
		sprite.x = this.x + param.x;
		sprite.y = this.y + param.y;
		sprite.x1 = sprite.x + sprite.width;
		sprite.y1 = sprite.y + sprite.height;
		sprite.rotate = this.rotate;
		sprite.scale = this.scale;
		sprite.alpha = this.alpha;
		sprite.centerX = this.centerX;
		sprite.centerY = this.centerY;
		sprite.flipHorizontal = this.flipHorizontal;
		sprite.flipVertical = this.flipVertical;
	}


	render(){
		[...this[children].values()].map((obj)=>{
			let {param,sprite} = obj;
			this[setSpriteParam](param,sprite);
			sprite.render();
		})
	}
}

class group extends animate(spriteGroup){
	constructor(opt){
		super(opt)
	}
}


module.exports = group;







