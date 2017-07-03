


//柱状图
// new svg.histogram({
//    body:$("#test"),      //@param:jqobj   容器
//    maxYNumber:"",        //@param:number  y轴显示最大值  默认数据中的最大值
//    minYNumber:"",        //@param:number  y轴显示最小值  默认0
//    showYTextNumber:"",   //@param:number  y轴显示几个刻度
//    showXTextNumber:"",   //@param:number  x轴显示几个刻度
//    YUnit:"",             //@param:string  y轴单位
//    fontColor:"",         //@param:string  字体颜色
//    graphColor:"",        //@param:string  图形颜色
//    graphNoDataColor:"",  //@param:string  图形数据为0时的颜色
//    lineWidth:"",         //@param:number  柱状图线条的宽度
//    fontSize:"",          //@param:number  x，y轴文字大小  px
//    xAxisHeight:"",       //@param:number  x轴文本高度
//    yAxisWidth:"",        //@param:number  y轴文本宽度
//    rightPadding:"",      //@param:number  右侧留白区域
//    value:[               //@param:array   要显示的数据
//          {"10-1":11},            //数据格式  key为x轴显示的文字，value为值
//          {"10-2":22},
//          {"10-3":33},
//          {"10-4":44},
//          {"10-5":33},
//          {"10-4":44},
//          {"10-5":33},
//          {"10-4":44},
//          {"10-5":33},
//          {"10-4":44},
//          {"10-5":33},
//          {"10-4":44},
//          {"10-5":33}
//      ]
// });


var svgObj = require("./../svg/svg");

var histogram = function(opt){
	this.body = opt.body || $("body");          //容器
	this.maxYNumber = parseInt(opt.maxYNumber) || "";     //y轴显示最大值
	this.minYNumber = parseInt(opt.minYNumber) || 0;      //y轴显示最小值
	this.showYNumber = parseInt(opt.showYTextNumber) || 6;    //y轴显示几个刻度
	this.showXNumber = parseInt(opt.showXTextNumber) || opt.value.length;    //x轴显示几个刻度
	this.YUnit = opt.YUnit || "";               //y轴单位
	this.value = opt.value || [];               //要显示的数据  [{"10-1":1,"10-2":2}]
	this.fontColor = opt.fontColor || "#000";   //字体颜色
	this.graphColor = opt.graphColor || "#b8b8f0"; //图形颜色
	this.graphNoDataColor = opt.graphNoDataColor || "#ccc";  //图形数据为0时的颜色
	this.lineWidth = parseInt(opt.lineWidth) || 11;           //柱状图线条的宽度
	this.fontSize = parseInt(opt.fontSize) || 16;             //x，y轴文字大小
	this.xAxisHeight = parseInt(opt.xAxisHeight) || 50;       //x轴文本高度
	this.yAxisWidth = parseInt(opt.yAxisWidth) || 30;         //y轴文本宽度
	this.rightPadding = parseInt(opt.rightPadding) || 10;     //右侧留白

	this.svg = null;
	this.bodyWidth = 0;
	this.bodyHeight = 0;
	this.showIndexX = [];                   //计算后要显示的x轴的数据序号
	this.showTextY = [];                    //y轴要显示的文本数组
	this.maxVal = 0;                        //数据中的最大值

	this.init();
};

histogram.prototype = {
	init:function(){
		this.handlerAttr();
		this.createSVG();
		this.createChart();
		//this.createX();
		this.createY();
	},
	//计算
	handlerAttr:function(){
		this.bodyWidth = parseInt(this.body.width());
		this.bodyHeight = parseInt(this.body.height());
		this.showXNumber = (this.showXNumber<=2)? 2 : this.showXNumber;
		this.showYNumber = (this.showYNumber<=2)? 2 : this.showYNumber;

		var maxVal = this.getMaxVal();
		this.maxVal = maxVal;

		if(this.maxYNumber == ""){
			this.maxYNumber = maxVal;
		}else{
			this.maxVal = this.maxYNumber;
		}

		this.showIndexX = this.getXText();
		this.showTextY = this.getYText();

	},
	//获取传入的数据中的最大值
	getMaxVal:function(){
		var maxVal = 0;
		for(var i= 0,l=this.value.length;i<l;i++){
			var this_val = this.value[i];
			for(var key in this_val){
				if(this_val.hasOwnProperty(key)){
					var _val = parseFloat(this_val[key]);
					if(_val > maxVal){
						maxVal = _val;
					}
				}
			}
		}
		return maxVal;
	},
	//获取x轴要显示的文字
	getXText:function(){
		var text = [];
		for(var i= 0,l=this.value.length;i<l;i++){
			var name = "",
				this_val = this.value[i];

			for(var key in this_val){
				if(this_val.hasOwnProperty(key)){
					name = key;
				}
			}

			text.push(name);
		}

		var text_n = text.length,
			jg = parseInt((text_n-1)/this.showXNumber),
			new_text = [];

		if(parseInt((text_n-1)/this.showXNumber) != (text_n-1)/this.showXNumber){
			jg++;
		}

		for(var z= 0,zl=this.showXNumber;z<zl;z++){
			var n = jg*z;
			new_text.push(n);
		}

		return new_text;

	},
	//获取y轴要显示的文字
	getYText:function(){
		var jg = this.maxYNumber - this.minYNumber;
		jg = jg/(this.showYNumber-1);

		var text = [],
			temp = this.minYNumber;

		text.push(temp);

		for(var i= 0,l=this.showYNumber-1;i<l;i++){
			var this_text = temp+jg;
			text.push(this_text);
			temp = this_text;
		}

		return text;
	},
	//创建svg
	createSVG:function(){
		this.svg = new svgObj({
			container:this.body,
			id:"",
			viewBoxWidth:this.bodyWidth,
			viewBoxHeight:this.bodyHeight
		});
	},
	//创建图表
	createChart:function(){
		var width = this.bodyWidth - this.yAxisWidth - this.rightPadding,
			height = this.bodyHeight - this.xAxisHeight,
			length = this.value.length,
			itemWidth = width/ length,
			lineWidth = this.lineWidth,
			linePadding = (itemWidth - lineWidth)/2;
		linePadding = (linePadding<0)? 0 : linePadding;

		for(var i= 0,l=this.value.length;i<l;i++){
			var x = itemWidth*i + this.yAxisWidth + linePadding,
				name_x = x,
				_this_val = this.value[i],
				_val = 0,
				name = "",
				color = this.graphColor;

			for(var key in _this_val){
				if(_this_val.hasOwnProperty(key)){
					_val = _this_val[key];
					name = key;
				}
			}


			var _height = (_val/this.maxVal)*height;


			//数据为空或0时
			if(!_val || _val == 0){
				color = this.graphNoDataColor;
				_height = this.lineWidth;
			}




			var line = this.svg.createElement({
				tag:"rect",
				attr:{
					x:x,
					y:height-_height,
					rx:lineWidth,
					ry:lineWidth,
					width:lineWidth,
					height:_height,
					fill:color
				}
			});

			this.svg.svg.append(line);
			this.createX(name,name_x,i);
		}

	},
	//创建x轴
	createX:function(name,x,i){
		if(this.showIndexX.indexOf(i)>-1){
			var text = this.svg.createElement({
				tag: "text",
				val: name,
				attr: {
					x:x,
					y:this.bodyHeight - this.fontSize,
					fill:this.fontColor,
					//"text-anchor":"middle",
					//"dominant-baseline":"text-after-edge",  //垂直底部在xy的坐标
					"font-size":this.fontSize
				}
			});
			this.svg.svg.append(text);
		}
	},
	//创建y轴
	createY:function(){
		var jg = (this.bodyHeight - this.xAxisHeight)/(this.showTextY.length-1),
			//修正文字高度引起的不等分，对齐的修正值。
			xz = this.fontSize/(this.showTextY.length-1);

		for(var i = this.showTextY.length-1;i>=0;i--){
			var _xz = xz*(this.showTextY.length - 1 - i);
			var text = this.svg.createElement({
				tag: "text",
				val: parseInt(this.showTextY[i])+this.YUnit,
				attr: {
					x:0,
					y:jg*(this.showTextY.length-1-i)+this.fontSize - _xz,
					fill:this.fontColor,
					//"text-anchor":"middle",
					//"dominant-baseline":"central",  //垂直底部在xy的坐标
					"font-size":this.fontSize
				}
			});
			this.svg.svg.append(text);
		}
	}

};

module.exports = histogram;
