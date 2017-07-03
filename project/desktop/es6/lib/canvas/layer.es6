
//创建一个画布层,包含多个精灵


let sprites = Symbol(),
	parentDom = Symbol(),
	canvas = Symbol(),
	createCanvas = Symbol(),
	ctx = Symbol(),
	setCanvasStyle = Symbol(),
	fixCanvasImageBug = Symbol(),
	refreshParentDom = Symbol(),
	clear = Symbol();



class Layer{
	constructor(opt = {}){

		//画布宽度、高度、层级
		this.width = opt.width;
		this.height = opt.height;
		this.zIndex = opt.zIndex || 1;

		//画布内添加的精灵
		this[sprites] = [];
		//父级场景
		this[parentDom] = null;
		//当前画布
		this[canvas] = null;
		this[ctx] = null;

		this[createCanvas]();
	}

	//创建画布
	[createCanvas](){
		let _canvas = document.createElement("canvas"),
			_ctx = _canvas.getContext("2d");

		this[canvas] = _canvas;
		this[ctx] = _ctx;
	}

	//设置画布样式
	[setCanvasStyle](){
		let width = parseInt(this[parentDom].width()),
			height = parseInt(this[parentDom].height()),
			canvas_width = (this.width)? this.width : width,
			canvas_height = (this.height)? this.height : height,
			left = (width - canvas_width)/2,
			top = (height - canvas_height)/2;

		if(canvas_width==0 || canvas_height==0){
			return;
		}

		$(this[canvas]).css({
			position:"absolute",
			left:left,
			top:top,
			"z-index":this.zIndex
		});

		this[fixCanvasImageBug](canvas_width,canvas_height);
	}

	//修复画布图片有锯齿的bug
	[fixCanvasImageBug](oldWidth,oldHeight){
		let canvas1 = this[canvas],
			ctx1 = this[ctx];


		let devicePixelRatio = window.devicePixelRatio || 1,
			backingStorePixelRatio =    ctx1.webkitBackingStorePixelRatio ||
										ctx1.mozBackingStorePixelRatio ||
										ctx1.msBackingStorePixelRatio ||
										ctx1.oBackingStorePixelRatio ||
										ctx1.backingStorePixelRatio ||
										1;

		let ratio = devicePixelRatio / backingStorePixelRatio;
		canvas1.width = oldWidth * ratio;
		canvas1.height = oldHeight * ratio;

		canvas1.style.width = oldWidth + 'px';
		canvas1.style.height = oldHeight + 'px';

		ctx1.scale(ratio, ratio);

	}

	//父级场景刷新时,刷新精灵的父级层
	[refreshParentDom](){
		this[sprites].map((sprite)=>{
			sprite.parent = this[canvas];
		})
	}

	//设置画布的父级层
	set parent(dom){
		this[parentDom] = dom;
		dom.append(this[canvas]);

		this[setCanvasStyle]();
		this[refreshParentDom]();
	}

	//获取画布的父级层
	get parent(){
		return this[parentDom];
	}

	get sprites(){
		return this[sprites];
	}

	//添加精灵到当前场景
	append(sprite){
		sprite.parent = this[canvas];
		this[sprites].push(sprite);

		return this;
	}

	//删除精灵
	del(sprite){
		let n = this[sprites].indexOf(sprite);
		if(n>-1){
			this[sprites].splice(n,1);
		}
	}

	//清空画布(画布)
	[clear](){
		let color =  "rgba(0,0,0,0)";
		this[ctx].fillStyle = color;
		this[ctx].clearRect(0,0,this[canvas].width,this[canvas].height);
		this[canvas].style.display = "none";// Detach from DOM
		this[canvas].offsetHeight; // Force the detach
		this[canvas].style.display = "inherit"; // Reattach to DOM
	}

	//渲染当前画布
	render(){
		this[clear]();

		this[sprites].map((sprite)=>{

			sprite.render();
		})
	}

	//销毁当前画布
	destroy(){
		this[canvas].remove();
	}
}


module.exports = Layer;