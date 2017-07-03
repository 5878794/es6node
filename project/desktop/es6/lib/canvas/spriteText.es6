
//创建文字精灵
//TODO 缩放的时候有细微投动,未找到原因

let sprite = require("./sprite"),
	autoBreakWord = Symbol(),
	handlerText = Symbol();


class spriteText extends  sprite{
	constructor(opt){
		super(opt);

		//要显示的文字
		this.text = opt.text || "";
		//字体大小
		this.fontSize = opt.fontSize || 20;
		//字体颜色
		this.color = opt.color || "#000";
		//粗体   bold或""
		this.bold = opt.bold || "";
		//行高
		this.lineHeight = opt.lineHeight || this.fontSize;
		//水平对齐方式
		this.textAlign = opt.textAlign || "left";

		this.ctxTextBaseline = "middle";
		this.ctxTextAlign = "left";
		this[handlerText] = [];

		this[autoBreakWord]();
	}

	refresh(){
		this[autoBreakWord]();
	}

	//自动换行(计算每行要显示的文字和坐标)
	//只支持中文换行,英文算法不同,要以空格来计算单词
	[autoBreakWord](){
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d"),
			res = [];

		ctx.font = this.fontSize+"px 宋体";


		//如果字体大小大于容器宽度,一行显示一个字
		if(this.fontSize > this.width){

			for(let word of this.text){
				res.push(word);
			}
		}else{
			let _width = 0,
				_res = [],
				tempRes = [];

			_res.push(tempRes);
			//计算每行要显示的文字数量,并生成2维数组
			for(let word of this.text){
				_width += ctx.measureText(word).width;
				tempRes.push(word);
				//换行
				if(_width > this.width - this.fontSize){
					tempRes = [];
					_width =0;
					_res.push(tempRes);
				}
			}
			//2维数组转1维数组
			for(let temp_ary of _res){
				res.push(temp_ary.join(""));
			}

		}

		this[handlerText] = res;
	}

	render(){
		let {x,y} = this.setCtx();
		//根据对齐方式转换为文字实际绘画的坐标
		if(this.textAlign == "center"){
			x = x + this.width*this.scale/2;
			this.ctxTextAlign = "center";
		}
		if(this.textAlign == "right"){
			x = x + this.width*this.scale;
			this.ctxTextAlign = "right";
		}


		this.ctx.fillStyle = this.color;
		this.ctx.font = this.bold + " "+this.fontSize*this.scale+"px 宋体";
		this.ctx.textBaseline = this.ctxTextBaseline;
		this.ctx.textAlign =  this.ctxTextAlign;



		for(let i=0,l=this[handlerText].length;i<l;i++){
			let _y = i*this.lineHeight*this.scale;
			this.ctx.fillText(
				this[handlerText][i],
				x,
				y + this.lineHeight*this.scale/2 + _y
			);
		}


		this.restoreCtx();
	}
}


module.exports = spriteText;