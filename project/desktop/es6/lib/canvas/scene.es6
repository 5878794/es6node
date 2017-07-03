
//创建一个场景,可以包含多个画布

let event = require("./event"),
	createDiv = Symbol(),
	setDivCss = Symbol(),
	body = Symbol(),
	layers = Symbol(),
	parentDom = Symbol(),
	refreshParentDom = Symbol(),
	eventObj = Symbol();



class Scene{
	constructor(){
		//当前场景包含的画布层
		this[layers] = [];
		//当前场景包裹层
		this[body] = null;
		//父级层
		this[parentDom] = null;

		//事件对象
		this[eventObj] = null;

		this[createDiv]();


	}

	//创建场景的包裹层
	[createDiv](){
		let div = $("<div></div>");

		this[body] = div;
	}

	//设置场景的样式
	[setDivCss](){
		let width = parseInt(this[parentDom].width()),
			height = parseInt(this[parentDom].height());

		this[body].css({
			width:width+"px",
			height:height+"px",
			position:"absolute",
			left:0,
			top:0
		});
	}

	//父级容器变更时执行刷新所包含的所有画布层的父级容器设置
	[refreshParentDom](){
		this[layers].map((layer)=>{
			layer.parent = this[body];
		})
	}

	get dom(){
		return this[body];
	}


	get layers(){
		return this[layers];
	}


	//设置父级包裹层
	set parent(dom){
		this[parentDom] = dom;
		this[setDivCss]();
		dom.append(this[body]);
		this[refreshParentDom]();
	}

	//获取父级包裹层
	get parent(){
		return this[parentDom];
	}

	//添加场景
	append(layer){
		layer.parent = this[body];
		this[layers].push(layer);

		return this;
	}

	//删除场景
	del(layer){
		let n = this[layers].indexOf(layer);
		if(n>-1){
			this[layers].splice(n,1);
		}
	}

	//渲染场景
	render(){
		this[layers].map((layer)=>{

			layer.render();
		})
	}

	addEvent(){
		this[eventObj] = new event({
			dom:this[body],
			scene:this
		})
	}


	//销毁场景
	destroy(){
		if(this[eventObj]){
			this[eventObj].destroy();
		}
		this[body].remove();
	}
}


module.exports = Scene;