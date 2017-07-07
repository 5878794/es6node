
//生成桌面图标,自动对齐网格。可以单个拖动
//TODO resize窗口未处理

//var icon =  new Icon({
// 	icons:[         //要放的图标数组
// 		{
// 			icon:"tempImg/icon.png",
// 			name:"test1",
// 			openUrl:"index.html#1",
// 			id:1
// 		},
// 		{
// 			icon:"tempImg/icon.png",
// 			name:"test2",
// 			openUrl:"index.html#2",
// 			id:2
// 		},
// 		{
// 			icon:"tempImg/icon.png",
// 			name:"test3",
// 			openUrl:"index.html#3",
// 			id:3
// 		},
// 		{
// 			icon:"tempImg/icon.png",
// 			name:"test4",
// 			openUrl:"index.html#4",
// 			id:4
// 		}
// 	],
// 	body:$("#desktop"),         //插入的容器
// 	clickFn:function(data){     //点击图标执行,参数为传入的图标参数
// 		console.log(data);
// 	}
//              //...其它参数见函数体
// })

// 销毁
// icon.destroy();


require("../jq/extend");
let $$ = require("../event/$$"),
	device = require("../device");


let init = Symbol(),
	createCloneDom = Symbol(),
	cloneIcon = Symbol(),
	insertIcons = Symbol(),
	createMap = Symbol(),
	iconMap = Symbol(),
	iconXMap = Symbol(),
	iconYMap = Symbol(),
	createObj = Symbol(),
	addEvent = Symbol(),
	iconDownFn = Symbol(),
	iconUpFn = Symbol(),
	iconMoveFn = Symbol(),
	iconOkFn = Symbol(),
	reSetAllIconPosition = Symbol(),
	getPositionFromXY = Symbol(),
	getEmptyPosition = Symbol(),
	getNearEmptyPosition = Symbol(),
	getNo = Symbol(),
	setIconToMap = Symbol(),
	iconNoMap = Symbol(),
	iconDoms = Symbol(),
	mouseToIconXY = Symbol();



class Icons{
	constructor(opt = {}){
		//要生成的图标数组
		this.icons = opt.icons || [];
		//图标的宽度
		this.width = opt.width || 60;
		//容器dom对象
		this.body = opt.body;
		//图标点击执行
		this.clickFn = opt.clickFn || function(){};
		//图标文字区域高度
		this.nameHeight = opt.nameHeight || 50;
		//字体大小
		this.fontSize = opt.fontSize || 16;
		//容器的padding
		this.bodyPadding = opt.bodyPadding || 10;
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
		//图标的map对图  序号为key
		this[iconNoMap] = null;
		//横坐标起始点
		this[iconXMap] = null;
		//纵坐标起始点
		this[iconYMap] = null;
		//生成的图标dom对象
		this[iconDoms] = {};
		//鼠标到图标左上角距离
		this[mouseToIconXY] = {};


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
			mapNo = new Map(),
			xMap = [],
			yMap = [],
			no = -1;

		for(let x=0,xl=colNumber;x<xl;x++){
			for(let y=0,yl=rowNumber;y<yl;y++){
				no++;
				let key = x+"_"+y,
					key1 = no,
					val = {
						left:this.bodyPadding+iconWidth*x +this.iconPadding,
						top:this.bodyPadding+iconHeight*y+this.iconPadding,
						hasIcon:false,
						y:y,
						x:x,
						no:no
					};
				map.set(key,val);
				mapNo.set(key1,val);
			}
		}

		for(let y=0,yl=rowNumber;y<yl;y++){
			yMap.push(this.bodyPadding+iconHeight*y);
		}
		for(let x=0,xl=colNumber;x<xl;x++){
			xMap.push(this.bodyPadding+iconWidth*x);
		}

		this[iconMap] = map;
		this[iconNoMap] = mapNo;
		this[iconXMap] = xMap;
		this[iconYMap] = yMap;

	}

	//生成clone的dom
	[createCloneDom](){
		let dom = $("<div></div>"),
			img = $("<p></p>"),
			text = $("<span></span>");

		dom.append(img).append(text);

		dom.css3({
			width:this.width,
			height:this.width+this.nameHeight,
			position:"absolute",
			left:0,
			top:0,
			"z-index":this.zIndex,
			transition:"all 0.2s linear",
			cursor:"pointer"
		});
		img.css({
			display:"block",
			width:this.width+"px",
			height:this.width+"px",

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
		position.hasIcon = "icon_"+data.id;

		dom.find("p").css3({
			"background-image":"url("+data.icon+")",
			"background-size":"100% 100%"
		});
		dom.find("span").text(data.name);
		dom.css({
			left:position.left,
			top:position.top
		}).attr({
			openUrl:data.openUrl,
			_id:"icon_"+data.id
		}).data({
			position:position,
			data:data
		});

		this.body.append(dom);
		this[iconDoms]["icon_"+data.id] = dom;
		this[addEvent](dom);
	}

	//图标事件
	[addEvent](dom){
		var _this = this;
		$$(dom).myclickdown(function(e){
			let domOffset = $(this).offset();
			_this[mouseToIconXY] = {
				x:e.clientX - domOffset.left,
				y:e.clientY - domOffset.top
			};
			_this[iconDownFn](this,e);
		}).myclickup(function(){
			_this[iconUpFn](this);
		}).myclickok(function(){
			_this[iconOkFn](this);
		}).mymove(function(x,y){
			_this[iconMoveFn](this,x,y);
		});
	}

	//图标被点击
	[iconDownFn](dom,e){
		$(dom).css3({
			transition:"",
			opacity:0.5,
			"z-index":this.zIndex+1
		});
	}

	//鼠标释放
	[iconUpFn](dom){
		$(dom).css3({
			transition:"all 0.2s linear",
			opacity:1,
			"z-index":this.zIndex
		});
		this[reSetAllIconPosition](dom);
	}

	//鼠标移动时
	[iconMoveFn](dom,x,y){
		let oldPosition = $(dom).data("position"),
			left = oldPosition.left,
			top = oldPosition.top;

		$(dom).css({
			left:left+x+"px",
			top:top+y+"px"
		});
	}

	//图标被运行
	[iconOkFn](dom){
		let data = $(dom).data("data");
		this.clickFn(data);
	}

	//图标重新排位
	[reSetAllIconPosition](dom){
		//获取移动dom之前的位置
		let data = $(dom).data("position"),
			y = data.y,
			x = data.x;

		//清除map上该位置的标示为无图标
		this[iconMap].get(x+"_"+y).hasIcon = false;

		//获取当前坐标点所在的位置(row,col)
		let left = parseInt($(dom).css("left")),
			top = parseInt($(dom).css("top")),
			{_x,_y} = this[getPositionFromXY](left,top);

		//判断需要移动的点上是否已有图标
		let oldMap = this[iconMap].get(_x+"_"+_y);
		if(!oldMap.hasIcon){
			//移动点上没有图标
			//移动点
			this[setIconToMap](dom,oldMap);
			return;
		}

		//有图标
		//获取所有的可以放置图标的位置
		let emptyPosition = this[getEmptyPosition](),
			//获取最近的可以放图标的位置
			nearEmptyPosition = this[getNearEmptyPosition](emptyPosition,_x,_y),
			//当前鼠标点网格序号
			nowNo = oldMap.no;

		if(nearEmptyPosition.before){
			//当前点 到 找到的前面空点 之间的图标全部向前移动1个
			let startNo = nearEmptyPosition.before.no;
			for(let val of this[iconMap].values()){
				if(val.no >= startNo && val.no<=nowNo && val.hasIcon){
					//这一块向上移动一个
					let this_id = val.hasIcon,
						this_no = val.no-1,
						this_dom = this[iconDoms][this_id],
						this_map = this[iconNoMap].get(this_no);

					this[setIconToMap](this_dom,this_map);
					val.hasIcon = false;
				}
			}
		}else{
			//当前点 到 找到的后面空点 之间的图标全部向后移动1个
			let endNo = nearEmptyPosition.after.no,
				_array = [...this[iconMap]].reverse();

			for(let val of _array){
				val = val[1];
				if(val.no >= nowNo && val.no<=endNo && val.hasIcon){
					//这一块向上移动一个
					let this_id = val.hasIcon,
						this_no = val.no+1,
						this_dom = this[iconDoms][this_id],
						this_map = this[iconNoMap].get(this_no);
					this[setIconToMap](this_dom,this_map);

					val.hasIcon = false;
				}
			}
		}


		this[setIconToMap](dom,oldMap);
	}


	//将一个点设置到一个位置
	[setIconToMap](dom,map){
		map.hasIcon = $(dom).attr("_id");

		$(dom).css({
			left:map.left,
			top:map.top
		}).data({
			position:map
		});
	}

	//通过当前的left top 获取需要放入的地图map对象属性
	[getPositionFromXY](x,y){
		let col = 0,
			row = 0;
		for(let i = 1,l=this[iconXMap].length;i<l;i++){
			if(x+this[mouseToIconXY].x>=this[iconXMap][i]){
				col = i;
			}
		}
		for(let i = 1,l=this[iconYMap].length;i<l;i++){
			if(y+this[mouseToIconXY].y>=this[iconYMap][i]){
				row = i;
			}
		}

		return {
			_x:col,
			_y:row
		}
	}

	//获取所有的可以放图标的位置
	[getEmptyPosition](){
		let temp = [];
		for(let val of this[iconMap].values()){
			if(!val.hasIcon){
				temp.push(val);
			}
		}
		return temp;
	}

	//获取最近的2个位置,一前一后 或这有一个
	[getNearEmptyPosition](data,col,row){
		let backData = [],
			nowNo = this[getNo](row,col),
			no = 0,
			before,after;

		//获取之前的空位
		for(let i=0,l=data.length;i<l;i++){
			let this_data = data[i],
				this_no = this_data.no;

			no = i;
			if(nowNo>this_no){
				backData.push(this_data);
			}else{
				break;
			}
		}

		if(backData.length != 0){
			before = backData[backData.length-1];
		}

		//获取后面一个空位
		if(data[no]){
			after = data[no];
		}

		//如果只找到一个直接返回
		if(!before || !after){
			return {before,after}
		}

		//判断前面还是后面的距离当前点最近
		let beforeNo = before.no,
			afterNo = after.no,
			{abs} = Math;

		if(abs(beforeNo-nowNo) > abs(afterNo-nowNo)){
			before = null;
			return {before,after};
		}else{
			after = null;
			return {before,after};
		}
	}

	//获取当前位置的序号,根据行列数计算
	[getNo](row,col){
		let maxRow = this[iconYMap].length,
			maxCol = this[iconXMap].length;

		return col*maxRow+row;
	}

	//销毁
	destroy(){
		for(let icon of Object.entries(this[iconDoms])){
			$$(icon).unbind(true);
			icon.remove();
		}
	}
}


module.exports = Icons;