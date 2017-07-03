
// 曲线图带颜色块



// a = new svg.Graph({
// 	dom:$("#test"),       //@param:jqobj 要插入的dom
// 	data:[
// 		{x:8,y:""},
// 		{x:9,y:1},
// 		{x:10,y:3},
// 		{x:11,y:4},
// 		{x:12,y:12},
// 		{x:13,y:12},
// 		{x:14,y:15},
// 		{x:15,y:20},
// 		{x:16,y:10},
// 		{x:17,y:""},
// 		{x:18,y:""},
// 	],
// 	line:[{name:"底",val:0},{name:"中",val:10},{name:"高",val:20}]
// });


let svgObj = require("./../svg/svg"),
	init = Symbol(),
	createSVG = Symbol(),
	setDom = Symbol(),
	createXLine = Symbol(),
	getPointXY = Symbol(),
	createDataLine = Symbol(),
	getYScale = Symbol(),
	sortLineArray = Symbol(),
	createXName = Symbol(),
	createTextArea = Symbol(),
	createYName = Symbol(),
	createTitleIcon = Symbol(),
	createTitleText = Symbol(),
	getMaxAndMinTime = Symbol(),
	createLineBg = Symbol(),
	maskLayer = Symbol();


require("../jq/extend");



class graph2{
	constructor(opt){
		//包裹容器
		this.dom = opt.dom || $("body");
		//顶部icon
		this.titleIcon = opt.titleIcon || "";
		//数据
		this.data = opt.data || [];
		//要显示的基准线
		this.lines = opt.line || [];
		//背景色
		this.bg = opt.bg || "rgb(136,135,231)";
		//顶部高度
		this.topHeight = 60;
		//底部高度
		this.bottomHeight = 30;
		//四周留白区域
		this.padding = 10;
		//横向线条颜色,或字的颜色
		this.lineColor = "#ccc";
		//曲线的颜色
		this.graphColor = "#fff";
		//曲线距离左边的距离,不含padding
		this.graphPaddingLeft = 45;
		//曲线距离右边的距离,不含padding
		this.graphPaddingRight = 15;
		//曲线到x轴的投影颜色
		this.areaColor = "rgb(255,255,255)";
		//x,y、标题 字体大小
		this.xFontSize = 14;
		this.yFontSize = 12;
		this.titleFontSize = 16;
		//数据点的半径
		this.pointR = 3;
		//顶部图片icon的宽高
		this.titleIconWidth = 40;
		//数据间隔几个在x轴写标识
		this.jg = opt.jg || 1;


		this.bgId = "bgid"+new Date().getTime();
		this.clipPathId = "clipPath"+new Date().getTime();
		this.textArea = null;
		this.scaleY = 1;
		this.width = parseInt(this.dom.width());
		this.height = parseInt(this.dom.height());
		this.maxVal = null;
		this.svg = null;
		this.minData = null;
		this.maxData = null;


		this[init]();
	}
	[init]() {
		this[createSVG]();
		this[sortLineArray]();
		this[getYScale]();
		this[getMaxAndMinTime]();
		this[setDom]();
		this[createLineBg]();
		this[createXLine]();
		this[createDataLine]();
		this[createTextArea]();
		this[createXName]();
		this[createYName]();
		this[createTitleIcon]();
		this[createTitleText]();


		this.dom.html(this.dom.html());
	}

	//创建svg对象
	[createSVG](){
		this.svg = new svgObj({
			container:this.dom,
			viewBoxWidth:this.width,
			viewBoxHeight:this.height
		});
	}

	//线条数组排序
	[sortLineArray](){
		//添加x轴的底线
		this.lines.sort(function(x,y){return x.val>y.val});
	}

	//计算y轴数值的缩放比例
	[getYScale](){
		let height = this.height - this.padding*2 - this.topHeight - this.bottomHeight,
			maxLineVal = this.lines[this.lines.length-1].val;

		this.scaleY = height/maxLineVal;
		this.maxVal = this.lines[this.lines.length-1].val || 0
	}

	//获取最大和最小时间点
	//最大值为第一次出现超过的值
	//最小值为第一次出现的最低值
	[getMaxAndMinTime](){
		let min = "",
			max = "",
			minObj = "",
			maxObj = "";
		for(var i=0,l=this.data.length;i<l;i++){
			let this_data = this.data[i],
				val = this_data.y;

			if(val == ""){continue;}
			val  = (val > this.maxVal)? this.maxVal : val;

			if(!minObj){
				min = val;
				max = val;
				minObj = this_data;
				maxObj = this_data;
			}

			if(val<min){
				min = val;
				minObj = this_data;
			}
			if(val>max){
				max = val;
				maxObj = this_data;
			}
		}

		this.minData = minObj;
		this.maxData = maxObj;
	}

	//设置dom属性
	[setDom](){
		this.dom.css3({
			background:this.bg,
			overflow:"hidden",
			"border-radius":"10px"
		})
	}

	//创建线性渐变bg
	[createLineBg](){
		let defs = this.svg.createElement({
				tag:"defs",
				attr:{}
			}),
			linearGradient = this.svg.createElement({
				tag:"linearGradient",
				attr:{
					id:this.bgId,
					x1:"0%",
					y1:"0%",
					x2:"0%",
					y2:"100%"
				}
			}),
			stop1 = this.svg.createElement({
				tag:"stop",
				attr:{
					offset:"0%",
					style:"stop-color:"+this.areaColor+"; stop-opacity:0.9"
				}
			}),
			stop2 = this.svg.createElement({
				tag:"stop",
				attr:{
					offset:"100%",
					style:"stop-color:"+this.areaColor+"; stop-opacity:0.1"
				}
			});

		linearGradient.append(stop1);
		linearGradient.append(stop2);
		defs.append(linearGradient);
		this.svg.svg.append(defs);
	}

	//坐标从左上角转换为左下角
	[getPointXY](x,y){
		let newY = this.height - y;
		return x+","+newY;
	}

	//创建横线
	[createXLine](){
		for(var i=0,l=this.lines.length;i<l;i++){

			let x1 = this.padding,
				y1 = this.padding + this.bottomHeight + this.scaleY*this.lines[i].val,
				line_width = this.width - this.padding*2,
				p1 = this[getPointXY](x1,y1),
				xLine = this.svg.createElement({
					tag:"path",
					attr:{
						d:"M "+p1+" H "+line_width,
						fill:"none",
						stroke:this.lineColor,
						"stroke-width":"1",
						"stroke-linecap": "round",
						"stroke-dasharray":(i==0 || i==this.lines.length-1)? "2 0" : "2 2"
					}
				});
			this.svg.svg.append(xLine);
		}
	}

	//创建数据线
	[createDataLine](){
		var number = this.data.length,
			pointJg = (this.width - this.padding*2 - this.graphPaddingLeft - this.graphPaddingRight)/(number-1),
			areaPath = [];

		for(var i=0,l=number;i<l;i++){
			if(this.data[i].y == ""){continue;}

			//生成当前点
			let _y1 = (this.data[i].y > this.maxVal)? this.maxVal : this.data[i].y,
				x1 = this.padding + this.graphPaddingLeft + i*pointJg,
				y1 = this.padding + this.bottomHeight + _y1*this.scaleY,
				p1 = this[getPointXY](x1,y1),
				_p1 = p1.split(","),
				point = this.svg.createElement({
				tag:"circle",
				attr:{
					cx:_p1[0],
					cy:_p1[1],
					r:this.pointR,
					"stroke-width":2,
					fill:this.bg,
					stroke:this.graphColor
				}
			});


			//判断下一个点是否存在,存在就划线到下一个点
			if(this.data[i+1] && this.data[i+1].y !== ""){
				let _y2 = (this.data[i+1].y > this.maxVal)? this.maxVal : this.data[i+1].y,
					x2 = this.padding + this.graphPaddingLeft + (i+1)*pointJg,
					y2 = this.padding + this.bottomHeight + _y2*this.scaleY,
					p2 = this[getPointXY](x2,y2),
					_p2 = p2.split(","),
					line = this.svg.createElement({
						tag:"path",
						attr:{
							d:"M "+p1+" L "+p2,
							fill:"none",
							stroke:this.graphColor,
							"stroke-width":"1",
							"stroke-linecap": "round"
						}
					}),
					x3 = _p2[0],
					y3 = this.padding+this.bottomHeight,
					//第2点在x轴的投影点
					p3 = this[getPointXY](x3,y3),
					x4 = _p1[0],
					y4 = y3,
					//第1点在x轴的投影点
					p4 = this[getPointXY](x4,y4);
				areaPath.push("M "+p1+" L "+p2+" L "+p3+" L "+p4+" L "+p1+" ");

				this.svg.svg.append(line);
			}

			this.svg.svg.append(point);
		}
		this[maskLayer](areaPath.join(""));
	}

	//创建曲线到x坐标的投影区域
	[maskLayer](path){
		let defs = this.svg.createElement({
			tag: "defs",
			attr: {}
		});
		let clipPath = this.svg.createElement({
			tag: "clipPath",
			attr: {
				id:this.clipPathId,
			}
		});
		let path1 = this.svg.createElement({
			tag: "path",
			attr: {
				d:path
			}
		});
		clipPath.append(path1);
		defs.append(clipPath);
		this.svg.svg.append(defs);

		let area = this.svg.createElement({
			tag: "rect",
			attr: {
				x: 0, y: 0, width: this.width, height: this.height,
				fill: "url(#" + this.bgId + ")",
				"clip-path": "url(#" + this.clipPathId + ")"
			}
		});
		this.svg.svg.append(area);
	}

	//创建文字容器
	[createTextArea](){
		this.textArea = this.svg.createElement({
			tag:"text",
			attr:{
				x:0,
				y:0,
				"font-size":this.xFontSize+"px",
				width:this.width,
				height:this.height,
				overflow:"visible"
			}
		});
		this.svg.svg.append(this.textArea);
	}

	//写x轴坐标
	[createXName](){
		let pointJg = (this.width - this.padding*2 - this.graphPaddingLeft - this.graphPaddingRight)/(this.data.length-1);


		for(let i=0,l=this.data.length;i<l;i++){
			if(i%this.jg != 0){
				continue;
			}
			let this_text = this.data[i].x,
				x = this.padding + this.graphPaddingLeft + pointJg*i,
				y = this.padding + this.bottomHeight,
				p = this[getPointXY](x,y),
				_p = p.split(","),
				text = this.svg.createElement({
					tag:"tspan",
					val:(this.data[i].y == "")? "停" : this_text,
					attr:{
						x:_p[0],
						y:_p[1],
						fill:(this_text == this.maxData.x || this_text == this.minData.x || this.data[i].y == "") ? this.graphColor : this.lineColor,
						dx:-this.pointR*2+"px",
						dy:this.xFontSize+(this.bottomHeight-this.xFontSize)/2+"px"
					}
				});
			this.textArea.append(text);
		}

		let tx = this.padding,
			ty = this.padding+this.bottomHeight,
			tp = this[getPointXY](tx,ty),
			_tp = tp.split(","),
			title = this.svg.createElement({
				tag:"tspan",
				val:"时间",
				attr:{
					x:_tp[0],
					y:_tp[1],
					fill:this.lineColor,
					dx:-this.pointR*2+"px",
					dy:this.xFontSize+(this.bottomHeight-this.xFontSize)/2+"px"
				}
			});

		this.textArea.append(title);

	}

	//写y轴坐标
	[createYName](){
		for(let i=0,l=this.lines.length;i<l;i++){
			let endY = 0;
			if(i == this.lines.length-1){
				endY = this.yFontSize;
			}


			let this_text = this.lines[i].name,
				x = this.padding,
				y = this.padding + this.bottomHeight + (this.lines[i].val)*this.scaleY,
				p = this[getPointXY](x,y-endY),
				_p = p.split(","),
				text = this.svg.createElement({
					tag:"tspan",
					val:this_text,
					attr:{
						x:_p[0],
						y:_p[1],
						"font-size":this.yFontSize+"px",
						fill:this.lineColor,
						dx:0,
						dy:(i == this.lines.length-1)? this.yFontSize/5+"px" : -this.yFontSize/5+"px"
					}
				});
			this.textArea.append(text);
		}
	}

	//写顶部ICON
	[createTitleIcon](){
		//生成图片插入
		let icon1 = this.svg.createElement({
			tag:"image",
			attr:{
				"xlink:href":this.titleIcon,
				x:this.padding,
				y:(this.padding+this.topHeight-this.titleIconWidth)/2,
				width:this.titleIconWidth,
				height:this.titleIconWidth
			}
		});
		this.svg.svg.append(icon1);

		let icon2 = this.svg.createElement({
			tag:"image",
			attr:{
				"xlink:href":this.titleIcon,
				x:this.padding + this.width/2,
				y:(this.padding+this.topHeight-this.titleIconWidth)/2,
				width:this.titleIconWidth,
				height:this.titleIconWidth
			}
		});
		this.svg.svg.append(icon2);
	}

	//写顶部文字
	[createTitleText](){
		let line1Y = (this.padding+this.topHeight-this.titleIconWidth)/2,
			line2Y = line1Y + this.titleFontSize + this.padding,
			line1X = this.padding*2+this.titleIconWidth,
			line2X = this.width/2+line1X,
			maxText = this.maxData.x,
			minText = this.minData.x;

		maxText = (maxText>12)? "PM "+ (maxText-12) + ":00" : "AM " + maxText + ":00";
		minText = (minText>12)? "PM "+ (minText-12) + ":00" : "AM " + minText + ":00";




		let text1 = this.svg.createElement({
			tag:"tspan",
			val:maxText,
			attr:{
				x:line1X,
				y:line1Y,
				"font-size":this.titleFontSize+"px",
				fill:this.graphColor,
				dx:0,
				dy:this.titleFontSize
			}
		});

		let text2 = this.svg.createElement({
			tag:"tspan",
			val:minText,
			attr:{
				x:line2X,
				y:line1Y,
				"font-size":this.titleFontSize+"px",
				fill:this.graphColor,
				dx:0,
				dy:this.titleFontSize
			}
		});

		let text3 = this.svg.createElement({
			tag:"tspan",
			val:"预计高峰时间点",
			attr:{
				x:line1X,
				y:line2Y,
				fill:this.lineColor,
				"font-size":this.yFontSize,
				dx:0,
				dy:this.yFontSize
			}
		});

		let text4 = this.svg.createElement({
			tag:"tspan",
			val:"预计低峰时间点",
			attr:{
				x:line2X,
				y:line2Y,
				fill:this.lineColor,
				"font-size":this.yFontSize,
				dx:0,
				dy:this.yFontSize
			}
		});

		this.textArea.append(text1);
		this.textArea.append(text2);
		this.textArea.append(text3);
		this.textArea.append(text4);

	}
}



module.exports = graph2;