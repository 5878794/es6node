

require("../jq/extend");


let init = Symbol(),
	createCloneDom = Symbol(),
	cloneIcon = Symbol(),
	insertIcons = Symbol(),
	createMap = Symbol(),
	iconMap = Symbol(),
	iconXMap = Symbol(),
	iconYMap = Symbol(),
	createObj = Symbol(),
	addEvent = Symbol();



class Icons{
	constructor(opt = {}){
		//要生成的图标数组
		this.icons = opt.icons || [];
		//图标的宽度
		this.width = opt.width || 60;
		//容器dom对象
		this.body = opt.body;
		//图标文字区域高度
		this.nameHeight = opt.nameHeight || 50;
		//字体大小
		this.fontSize = opt.fontSize || 16;
		//容器的padding
		this.bodyPadding = opt.bodyPadding || 30;
		//图标的padding
		this.iconPadding = opt.iconPadding || 20;
		//图标的图层
		this.zIndex = opt.zIndex || 100;
		//图标名上下最小padding距离
		this.textMinPadding = 5;

		//需要clone 的icon的dom对象
		this[cloneIcon] = null;
		//图标的map对图
		this[iconMap] = null;
		//横坐标起始点
		this[iconXMap] = null;
		//纵坐标起始点
		this[iconYMap] = null;


		this[init]();
	}
	[init](){
		this[createMap]();
		this[createCloneDom]();
		this[insertIcons]();

	}

	//生成当前dom的显示图标的网格
	[createMap](){
		let bodyWidth = parseInt(this.body.width()) - this.bodyPadding*2,
			bodyHeight = parseInt(this.body.height()) - this.bodyPadding*2,
			iconWidth = this.width + this.iconPadding*2,
			iconHeight = this.width + this.nameHeight + this.iconPadding*2,
			colNumber = parseInt(bodyWidth/iconWidth),
			rowNumber = parseInt(bodyHeight/iconHeight),
			map = new Map(),
			xMap = [],
			yMap = [];

		for(let x=0,xl=colNumber;x<xl;x++){
			for(let y=0,yl=rowNumber;y<yl;y++){
				let key = x+"_"+y,
					val = {
						x:this.bodyPadding+iconWidth*x +this.iconPadding,
						y:this.bodyPadding+iconHeight*y+this.iconPadding,
						hasIcon:false
					};
				map.set(key,val);
			}
		}

		for(let y=0,yl=rowNumber;y<yl;y++){
			yMap.push(this.bodyPadding+iconHeight*y);
		}
		for(let x=0,xl=colNumber;x<xl;x++){
			xMap.push(this.bodyPadding+iconWidth*x);
		}

		this[iconMap] = map;
		this[iconXMap] = xMap;
		this[iconYMap] = yMap;
	}

	//生成clone的dom
	[createCloneDom](){
		let dom = $("<div></div>"),
			img = $("<img src=''/>"),
			text = $("<span></span>");

		dom.append(img).append(text);

		dom.css3({
			width:this.width,
			height:this.width+this.nameHeight,
			position:"absolute",
			left:0,
			top:0,
			"z-index":this.zIndex,
			transition:"all 0.2s linear"
		});
		img.css({
			display:"block",
			width:this.width+"px",
			height:this.width+"px"
		});

		let lineHeight = this.fontSize+parseInt(this.fontSize/4),
			line = parseInt((this.nameHeight - this.textMinPadding*2)/lineHeight),
			padding = (this.nameHeight - line*lineHeight)/2;
		text.css({
			display:"block",
			width:this.width+"px",
			height:this.nameHeight+"px",
			"text-align":"center",
			padding:padding+"px",
			"line-height":lineHeight+"px"
		});

		this[cloneIcon] = dom;
	}

	//生成icon
	[insertIcons](){
		let data = JSON.parse(JSON.stringify(this.icons)),
			x = 0,
			map = [...this[iconMap]],
			_this = this;

		let findEmptyPosition = function(){
			let obj = null;

			for(let xl=map.length;x<xl;x++){
				let this_map = map[x],
					this_val = this_map[1],
					hasIcon = this_val.hasIcon;
				if(!hasIcon){
					this_val.hasIcon = true;
					obj = this_val;
					break;
				}
			}

			return obj;
		};

		let go = function(){
			if(data.length != 0){
				let icon = data.shift(),
					position = findEmptyPosition(),
					iconObj = _this[cloneIcon].clone();

				if(!position){
					//没有空位，结束
					return;
				}

				_this[createObj](iconObj,icon,position);
				go();
			}
		};

		go();
	}

	//生成一个图标
	[createObj](dom,data,position){
		dom.find("img").attr({src:data.icon});
		dom.find("span").text(data.name);
		dom.css({
			left:position.x,
			top:position.y
		}).attr({
			openUrl:data.openUrl,
			_id:data.id
		});

		this.body.append(dom);
		this[addEvent](dom);
	}

	//图标事件
	[addEvent](dom){

	}

}


module.exports = Icons;