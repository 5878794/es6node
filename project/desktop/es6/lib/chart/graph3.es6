
// 曲线图带颜色块



// a = new svg.Graph({
// 	dom:$("#test"),       //@param:jqobj 要插入的dom
// 	data:[
// 		{x:8,y1:0,y2:12},
// 		{x:9,y1:1,y2:12},
// 		{x:10,y1:3,y2:12},
// 		{x:11,y1:4,y2:12},
// 		{x:12,y1:12,y2:12},
// 		{x:13,y1:12,y2:12},
// 		{x:14,y1:15,y2:12},
// 		{x:15,y1:25,y2:12},
// 		{x:16,y1:10,y2:12},
// 		{x:17,y1:1,y2:12},
// 		{x:18,y1:1,y2:12}
// 	]
// });


let svgObj = require("./../svg/svg"),
	init = Symbol(),
	createSVG = Symbol(),
	setDom = Symbol(),
	createXLine = Symbol(),
	getPointXY = Symbol(),
	createDataLine1 = Symbol(),
	createDataLine2 = Symbol(),
	getYScale = Symbol(),
	// sortLineArray = Symbol(),
	createXName = Symbol(),
	createTextArea = Symbol(),
	createYName = Symbol(),
	// createTitleIcon = Symbol(),
	// createTitleText = Symbol(),
	// getMaxAndMinTime = Symbol(),
	createLineBg = Symbol(),
	maskLayer = Symbol(),
	getMaxYVal = Symbol();


require("../jq/extend");



class graph2{
	constructor(opt){
		//包裹容器
		this.dom = opt.dom || $("body");
		//数据
		this.data = opt.data || [];
		//要显示的基准线
		this.yNmuber = opt.yNmuber || 4;
		//底部高度
		this.bottomHeight = 10;
		//四周留白区域
		this.padding = 10;
		//横向线条颜色,或字的颜色
		this.lineColor = "#ccc";
		//曲线的颜色
		this.graphColor1 = "rgb(91,82,212)";
		this.graphColor2 = "rgb(255,196,115)";
		//曲线距离左边的距离,不含padding
		this.graphPaddingLeft = 45;
		//曲线距离右边的距离,不含padding
		this.graphPaddingRight = 0;
		//字体大小
		this.fontSize = 14;
		//数据点的半径
		this.pointR = 3;
		//数据间隔几个在x轴写标识
		this.jg = opt.jg || 1;


		this.maxVal = null;
		this.scaleY = 1;
		let timeStamp = new Date().getTime();
		this.bgId1 = "bgid"+timeStamp;
		this.bgId2 = "bgid"+timeStamp+"1";
		this.clipPathId1 = "clipPath"+timeStamp+"2";
		this.clipPathId2 = "clipPath"+timeStamp+"3";
		this.textArea = null;
		this.width = parseInt(this.dom.width());
		this.height = parseInt(this.dom.height());
		this.svg = null;
		this.lines = [];


		this[init]();
	}
	[init]() {
		this[createSVG]();
		this[getMaxYVal]();
		this[getYScale]();
		this[setDom]();
		this[createLineBg]();
		this[createXLine]();
		this[createDataLine1]();
		this[createDataLine2]();
		this[createTextArea]();
		this[createXName]();
		this[createYName]();


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

	//获取y轴的最大值
	[getMaxYVal](){
		let maxVal = 0;
		this.data.map(data=>{
			if(data.y1 && data.y1 > maxVal){
				maxVal = data.y1;
			}
			if(data.y2 && data.y2 > maxVal){
				maxVal = data.y2;
			}
		});

		this.maxVal = maxVal;
	}

	//计算y轴数值的缩放比例
	[getYScale](){
		let height = this.height - this.padding*2 - this.bottomHeight,
			maxLineVal = this.maxVal;

		this.scaleY = height/maxLineVal;
	}

	//设置dom属性
	[setDom](){
		this.dom.css3({
			overflow:"hidden",
			position:"relative"
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
					id:this.bgId1,
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
					style:"stop-color:"+this.graphColor1+"; stop-opacity:0.9"
				}
			}),
			stop2 = this.svg.createElement({
				tag:"stop",
				attr:{
					offset:"100%",
					style:"stop-color:"+this.graphColor1+"; stop-opacity:0.1"
				}
			}),
			linearGradient1 = this.svg.createElement({
				tag:"linearGradient",
				attr:{
					id:this.bgId2,
					x1:"0%",
					y1:"0%",
					x2:"0%",
					y2:"100%"
				}
			}),
			stop3 = this.svg.createElement({
				tag:"stop",
				attr:{
					offset:"0%",
					style:"stop-color:"+this.graphColor2+"; stop-opacity:0.9"
				}
			}),
			stop4 = this.svg.createElement({
				tag:"stop",
				attr:{
					offset:"100%",
					style:"stop-color:"+this.graphColor2+"; stop-opacity:0.1"
				}
			});


		linearGradient.append(stop1);
		linearGradient.append(stop2);
		linearGradient1.append(stop3);
		linearGradient1.append(stop4);
		defs.append(linearGradient);
		defs.append(linearGradient1);
		this.svg.svg.append(defs);
	}

	//坐标从左上角转换为左下角
	[getPointXY](x,y){
		let newY = this.height - y;
		return x+","+newY;
	}

	//创建横线
	[createXLine](){
		let maxVal = this.maxVal,
			n = this.yNmuber,
			lines = [],
			pre = parseInt(maxVal/n);

		for(let i=0,l=n;i<=l;i++){
			let val = pre * i;
			lines.push(val);
		}
		this.lines = lines;

		for(let i=0,l=lines.length;i<l;i++){
			let x1 = this.padding,
				y1 = this.padding + this.bottomHeight + this.scaleY*lines[i],
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
						"stroke-dasharray":(i==0)? "2 0" : "2 2"
					}
				});
			this.svg.svg.append(xLine);
		}
	}

	//创建数据线1
	[createDataLine1](){
		var number = this.data.length,
			pointJg = (this.width - this.padding*2 - this.graphPaddingLeft - this.graphPaddingRight)/(number-1),
			areaPath = [];

		for(var i=0,l=number;i<l;i++){
			if(this.data[i].y1 == ""){continue;}

			//生成当前点
			let _y1 = this.data[i].y1,
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
					fill:this.graphColor1
				}
			});


			//判断下一个点是否存在,存在就划线到下一个点
			if(this.data[i+1] && this.data[i+1].y1 !== ""){
				let _y2 = this.data[i+1].y1,
					x2 = this.padding + this.graphPaddingLeft + (i+1)*pointJg,
					y2 = this.padding + this.bottomHeight + _y2*this.scaleY,
					p2 = this[getPointXY](x2,y2),
					_p2 = p2.split(","),
					line = this.svg.createElement({
						tag:"path",
						attr:{
							d:"M "+p1+" L "+p2,
							fill:"none",
							stroke:this.graphColor1,
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
		this[maskLayer](areaPath.join(""),this.clipPathId1,this.bgId1);
	}

	//创建数据线2
	[createDataLine2](){
		var number = this.data.length,
			pointJg = (this.width - this.padding*2 - this.graphPaddingLeft - this.graphPaddingRight)/(number-1),
			areaPath = [];

		for(var i=0,l=number;i<l;i++){
			if(this.data[i].y2 == ""){continue;}

			//生成当前点
			let _y1 = this.data[i].y2,
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
						fill:this.graphColor2
					}
				});


			//判断下一个点是否存在,存在就划线到下一个点
			if(this.data[i+1] && this.data[i+1].y2 !== ""){
				let _y2 = this.data[i+1].y2,
					x2 = this.padding + this.graphPaddingLeft + (i+1)*pointJg,
					y2 = this.padding + this.bottomHeight + _y2*this.scaleY,
					p2 = this[getPointXY](x2,y2),
					_p2 = p2.split(","),
					line = this.svg.createElement({
						tag:"path",
						attr:{
							d:"M "+p1+" L "+p2,
							fill:"none",
							stroke:this.graphColor2,
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
		this[maskLayer](areaPath.join(""),this.clipPathId2,this.bgId2);
	}

	//创建曲线到x坐标的投影区域
	[maskLayer](path,clipId,bgId){
		let defs = this.svg.createElement({
			tag: "defs",
			attr: {}
		});
		let clipPath = this.svg.createElement({
			tag: "clipPath",
			attr: {
				id:clipId,
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
				fill: "url(#" + bgId + ")",
				"clip-path": "url(#" + clipId + ")"
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
				"font-size":this.fontSize+"px",
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
					val:this_text,
					attr:{
						x:_p[0],
						y:_p[1],
						fill:this.lineColor,
						dx:-this.pointR*2+"px",
						dy:this.fontSize+"px"
					}
				});
			this.textArea.append(text);
		}
	}

	//写y轴坐标
	[createYName](){
		for(let i=0,l=this.lines.length;i<l;i++){
			let this_text = this.lines[i]+"",
				x = this.padding,
				y = this.padding + this.bottomHeight + (this.lines[i])*this.scaleY,
				p = this[getPointXY](x,y),
				_p = p.split(","),
				text = this.svg.createElement({
					tag:"tspan",
					val:this_text,
					attr:{
						x:_p[0],
						y:_p[1],
						"font-size":this.fontSize+"px",
						fill:this.lineColor,
						dx:0,
						dy:-this.fontSize/5+"px"
					}
				});
			console.log(this_text)
			this.textArea.append(text);
		}
	}
}



module.exports = graph2;