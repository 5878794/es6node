

//改变图片大小,返回promise对象
//传入的img对象不能改变自身的width,height属性,否则输出有问题
//TODO 生成的图片有锯齿,暂时无法解决

// async function aa(){
// 	return await new changeImageSize({
// 		img:img,                //img对象
// 		width:width,            //要改变成的宽,高,透明度
// 		height:height,
// 		opacity:opacity
// 	});
// }


let init = Symbol(),
	createCanvas = Symbol(),
	drawCanvas = Symbol(),
	getImage = Symbol();



class changeImageSize{
	constructor(opt){
		this.img = opt.img;
		this.width = opt.width || this.img.width;
		this.height = opt.height || this.img.height;
		this.opacity = (opt.opacity || opt.opacity == 0)? opt.opacity : 1;

		this.canvas = null;
		this.ctx = null;

		return this[init]();
	}

	async [init](){
		this[createCanvas]();
		this[drawCanvas]();
		return await this[getImage]();
	}

	//创建canvas
	[createCanvas](){
		var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		canvas.width = this.width;
		canvas.height = this.height;

		this.canvas = canvas;
		this.ctx = ctx;
	}

	//渲染画布
	[drawCanvas](){
		this.ctx.save();
		//设置画笔透明度
		this.ctx.globalAlpha = this.opacity;
		this.ctx.drawImage(
			this.img,
			0,
			0,
			this.img.width,
			this.img.height,
			0,
			0,
			this.width,
			this.height
		);

		this.ctx.globalAlpha = 1;
		this.ctx.restore();
	}

	//获取图片
	[getImage](){
		let src = this.canvas.toDataURL("image/png"),
			img = new Image();

		return new Promise((success,error)=>{
			img.onload = function(){
				success(this);
			};
			img.src = src;
		});
	}
}



module.exports = changeImageSize;