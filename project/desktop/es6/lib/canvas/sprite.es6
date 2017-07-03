
//创建精灵

require("./../jq/extend");

let canvas = Symbol();




class Sprite{
	constructor(opt = {}){
		//精灵的宽、高、坐标
		this.width = opt.width || 0;
		this.height = opt.height || 0;
		this.x = opt.x || 0;
		this.y = opt.y || 0;
		this.x1 = this.x + this.width;
		this.y1 = this.y + this.height;
		//精灵的资源图片或颜色
		this.res = opt.res;
		//精灵旋转角度,根据中心点旋转
		this.rotate = opt.rotate || 0;
		//精灵缩放
		this.scale = opt.scale || 1;
		//精灵透明度 0-100
		this.alpha = opt.alpha || 100;
		//画布中心点
		this.centerX = ($.isUndefined(opt.centerX))?  opt.width/2 : opt.centerX;
		this.centerY = ($.isUndefined(opt.centerY))?  opt.height/2 : opt.centerY;
		//水平翻转
		this.flipHorizontal = $.isBoolean(opt.flipHorizontal)? opt.flipHorizontal : false;
		//垂直翻转
		this.flipVertical = $.isBoolean(opt.flipVertical)? opt.flipVertical : false;

		this[canvas] = null;
		this.ctx = null;
	}

	//设置父级画布
	set parent(dom){
		this[canvas] = dom;
		this.ctx = dom.getContext("2d");
	}

	//获取父级画布
	get parent(){
		return this[canvas];
	}

	//设置画布
	setCtx(){
		this.ctx.save();
		//设置画笔透明度
		this.ctx.globalAlpha = this.alpha/100;

		//水平或垂直翻转画布
		var translate_x = (this.flipHorizontal)? this[canvas].width : 0,
			translate_y = (this.flipVertical)? this[canvas].height : 0,
			scale_x = (this.flipHorizontal)? -1 : 1,
			scale_y = (this.flipVertical)? -1 : 1;

		this.ctx.translate(translate_x,translate_y);
		this.ctx.scale(scale_x,scale_y);

		//中心点移至画布翻转后元素的中心点
		let center_x = this.x + this.centerX,
			center_y = this.y + this.centerY,
			x = (this.flipHorizontal)? this[canvas].width - center_x : center_x,
			y = (this.flipVertical)? this[canvas].height - center_y : center_y;


		this.ctx.translate(x,y);
		this.ctx.rotate(Math.PI*this.rotate/180);
		//画布旋转后还原到翻转后的顶点（左上角）
		this.ctx.translate(-x,-y);


		//计算元素的左上角坐标
		let elem_x,elem_y;
		if(this.flipHorizontal){
			elem_x = this[canvas].width - center_x - (this.width - this.centerX) * this.scale;
		}else{
			elem_x = center_x - (center_x - this.x)*this.scale;
		}
		if(this.flipVertical){
			elem_y = this[canvas].height - center_y - (this.height - this.centerY) * this.scale;
		}else{
			elem_y = center_y - (center_y - this.y)*this.scale;
		}

		return {x:elem_x,y:elem_y};
	}

	//还原画布
	restoreCtx(){
		this.ctx.globalAlpha = 1;
		this.ctx.restore();
	}

	//渲染
	render(){
		let {x,y} = this.setCtx();


		//判断是图片还是颜色
		if($.isObject(this.res)){
			this.ctx.drawImage(
				this.res,
				0,
				0,
				this.res.width,
				this.res.height,
				x,
				y,
				this.width*this.scale,
				this.height*this.scale
			);
		}else{
			this.ctx.fillStyle = this.res;

			this.ctx.fillRect(
				x,
				y,
				this.width*this.scale,
				this.height*this.scale
			)

		}


		this.restoreCtx();


	}


	//添加按下的事件
	myclickdown(callback){
		this.myclickdownFn = callback;
		return this;
	}

	//添加放开的事件
	myclickup(callback){
		this.myclickupFn = callback;
		return this;
	}

	//添加执行的事件
	myclickok(callback){
		this.myclickokFn = callback;
		return this;
	}
}






module.exports = Sprite;