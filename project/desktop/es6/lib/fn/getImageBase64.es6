

//根据图片地址返回该图片的base64
//异步函数 new
// let base64Str = await new getImageBase64(src);



let createCanvas = Symbol(),
	drawCanvas = Symbol(),
	init = Symbol(),
	getImgObj = Symbol();

class getImageBase64{
	constructor(src){
		this.src = src || "";


		this.canvas = null;
		this.ctx = null;

		return this[init]();
	}

	async [init](){
		if(!this.src){
			return "";
		}

		let imgObj = await this[getImgObj]();
		if(!imgObj){
			return "";
		}

		this[createCanvas](imgObj);
		this[drawCanvas](imgObj);

		return this.canvas.toDataURL("image/png");
	}

	[getImgObj](){
		let  img = new Image();

		return new Promise((success,error)=>{
			img.onload = function(){
				success(this);
			};
			img.onerror = function(){
				success();
			};
			img.src = this.src;
		});
	}

	//创建canvas
	[createCanvas](img){
		var canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		canvas.width = img.width;
		canvas.height = img.height;

		this.canvas = canvas;
		this.ctx = ctx;
	}

	//渲染画布
	[drawCanvas](img){
		this.ctx.save();
		//设置画笔透明度
		this.ctx.globalAlpha = this.opacity;
		this.ctx.drawImage(
			img,
			0,
			0,
			img.width,
			img.height,
			0,
			0,
			img.width,
			img.height
		);

		this.ctx.globalAlpha = 1;
		this.ctx.restore();
	}



}


module.exports = getImageBase64;