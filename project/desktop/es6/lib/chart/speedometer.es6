


//生成仪表盘图效果的百分比
// var a = new svg.speedometer({
//    body:$("#aa"),                  //要插入的dom
//    startDeg:30,                    //开始角度（缺口在底部）
//    endDeg:330,                     //结束角度
//    jgDeg:2,                        //间隔的角度
//    lineColor:"#000",               //线条颜色
//    selectLineColor:"#f00",         //有数据显示的颜色
//    lineLength:20                   //线条的长度
// });

//a.coloring(30);                     //要显示数据的百分比


var svgObj = require("./../svg/svg");
var radian = 2*Math.PI/360,
	sin = function(deg){
		return Math.sin(deg*radian);
	},
	cos = function(deg){
		return Math.cos(deg*radian);
	};

var speedometer = function(opt){
	this.body = opt.body || $("body");
	this.startDeg = opt.startDeg || 30;
	this.endDeg = opt.endDeg || 330;
	this.jgDeg = opt.jgDeg || 2;
	this.lineColor = opt.lineColor || "#000";
	this.selectLineColor = opt.selectLineColor || "#f00";
	this.lineLength = opt.lineLength || 20;

	this.bodyWidth = parseInt(this.body.width());
	this.bodyHeight = parseInt(this.body.height());
	this.lineNumber = parseInt((this.endDeg - this.startDeg)/this.jgDeg)+1;
	this.centerX = this.bodyWidth/2;
	this.centerY = this.bodyHeight/2;
	this.r = (this.centerX > this.centerY)? this.centerY : this.centerX;

	this.points1 = [];
	this.points2 = [];
	this.lines = [];

	this.init();
};


speedometer.prototype = {
	init:function(){
		this.createSvg();
		this.getPoints();
		this.createLine();
		//this.coloring();
	},
	createSvg:function(){
		this.svg = new svgObj({
			container:this.body,
			id:"",
			viewBoxWidth:this.bodyWidth,
			viewBoxHeight:this.bodyHeight
		});
	},
	getPoints:function(){
		var points1 = [],
			points2 = [],
			r1 = this.r - this.lineLength,
			r2 = this.r;


		for(var i= 0,l=this.lineNumber;i<l;i++){
			var deg = this.startDeg + this.jgDeg * i,
				x1 = this.centerX - (r1 * sin(deg)),
				x2 = this.centerX - (r2 * sin(deg)),
				y1 = this.centerY + (r1 * cos(deg)),
				y2 = this.centerY + (r2 * cos(deg));

			points1.push({
				x:x1,
				y:y1
			});
			points2.push({
				x:x2,
				y:y2
			});
		}

		this.points1 = points1;
		this.points2 = points2;
	},
	createLine:function(){
		for(var i = 0,l=this.points1.length;i<l;i++){
			var line = this.svg.createElement({
				tag:"path",
				attr:{
					d:"M "+this.points1[i].x+","+this.points1[i].y+" L "+this.points2[i].x+","+this.points2[i].y,
					"stroke-width":1,
					stroke:this.lineColor,
					fill:"none"
				}
			});
			this.lines.push(line);
			this.svg.svg.append(line);
		}
	},
	coloring:function(pre){
		var line_n = this.lineNumber*pre/100;
		line_n = line_n.toFixed(0);

		for(var i= 0,l=line_n;i<l;i++){
			$(this.lines[i]).attr({
				stroke:this.selectLineColor
			})
		}

	}
};


module.exports = speedometer;