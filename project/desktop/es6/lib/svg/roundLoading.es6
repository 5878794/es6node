

//圆环进度动画
//注意r1、r2的值不能大于容器的宽或高

//b = new svg.loading({
//    dom:$("#test1"),        //@param：jqobj    要插入的dom对象
//    r1:100,                 //@param:number    外圆大小
//    r2:80,                  //@param：number   内圆大小, 2个圆之间的区域填充成圆环显示
//    startDeg:90             //@param:number    初始角度
//    bgColor:"rgba(0,0,0,0.5)"  //@param:str    圆环的颜色
//});

//b.progress(10);           //@param:number   要显示圆环的百分比

let svgObj = require("./svg");


var load = function(opt){
	this.dom = opt.dom;
	this.r1 = opt.r1 || 100;
	this.r2 = opt.r2 || 90;
	this.startDeg = opt.startDeg || 0;
	this.bgColor = opt.bgColor || "rgba(0,0,0,0.5)";

	this.svg = null;
	this.yuan = null;
	this.body_width = parseInt(this.dom.width());
	this.body_height = parseInt(this.dom.height());
	this.r = (this.body_width > this.body_height)? this.body_height/2 : this.body_width/2;
	this.cx = this.body_width/2;
	this.cy = this.body_height/2;


	this.init();
};
load.prototype = {
	init:function(){
		this.createSvg();
		this.createGraph(0);
	},
	createSvg:function(){
		this.svg = new svgObj({
			container:this.dom,
			id:"",
			viewBoxWidth:this.r*2,
			viewBoxHeight:this.r*2
		});
	},
	createGraph:function(val){
		var yuan = this.svg.createElement({
			tag:"path",
			attr:{
				d:this.getPath(val),
				fill:this.bgColor
			}
		});

		this.yuan = yuan;
		this.svg.svg.append(yuan);
	},
	getPath:function(deg_val){
		var startAngle= this.startDeg,
			cx = this.cx,
			cy = this.cy,
			r1 = this.r1,
			r2 = this.r2,
			deg= startAngle + deg_val;

		var x0 = cx+r1*Math.cos(startAngle*Math.PI/180);
		var y0 = cy+r1*Math.sin(startAngle*Math.PI/180);
		var x1 = cx+r1*Math.cos(deg*Math.PI/180);
		var y1 = cy+r1*Math.sin(deg*Math.PI/180);

		var x2 = cx+r2*Math.cos(startAngle*Math.PI/180);
		var y2 = cy+r2*Math.sin(startAngle*Math.PI/180);
		var x3 = cx+r2*Math.cos(deg*Math.PI/180);
		var y3 = cy+r2*Math.sin(deg*Math.PI/180);

		//圆弧的属性
		var yh = (deg_val > 180)? 1 : 0;

		//顺时针
		return  "M "+x0+","+y0+
			" A "+r1+" "+r1+" 0 "+yh+" 1 "+x1+" "+y1+
			" L "+x3+","+y3+
			" A "+r2+" "+r2+" 0 "+yh+" 0 "+x2+" "+y2+
			" Z";

	},
	progress:function(val){
		val = 360 * val / 100;
		val = (val == 360)? 359.999 : val;

		$(this.yuan).attr({
			d:this.getPath(val)
		})
	}
};


module.exports = load;


//$(document).ready(function(){
//    b = new loading({
//        dom:$("#test1"),
//        r1:100,
//        r2:80,
//        startDeg:90
//    })
//});