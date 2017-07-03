/**
 * Created by beens on 16/3/18.
 */




//ios系统安装应用时的进度展示

//a = new svg.ios_app_install_effect({
//    body:$("#test")           //需要放入的容器  @param:jqobj
//});
//显示进度
//a.progress(val);              //显示进度 @param:number 1-100

let svgObj = require("./svg");


var effect = function(opt){
	this.body = opt.body;


	this.body_width = 100;   //容器宽高
	this.body_height = 100;
	this.cx = this.body_width/2;            //中心点坐标
	this.cy = this.body_height/2;
	this.cr = this.cx - 8;                 //内圆半径
	this.outCr = 60;              //外圆半径
	this.borderWidth = 30;                  //外圆边线厚

	this.svg = null;
	this.yuan = null;

	this.init();
};

effect.prototype = {
	init:function(){
		this.createSvg();
		this.createOutCircle();
		this.createInCircle();
	},
	createSvg:function(){
		this.svg = new svgObj({
			container:this.body,
			id:"",
			viewBoxWidth:this.body_width,
			viewBoxHeight:this.body_height
		});
	},
	createOutCircle:function(){
		var _this = this;

		var yuan = this.svg.createElement({
			tag:"circle",
			attr:{
				cx:_this.cx,
				cy:_this.cy,
				r:_this.outCr,
				"stroke-width":_this.borderWidth,
				stroke:"rgba(0,0,0,0.5)",
				fill:"none"
			}
		});

		this.svg.svg.append(yuan);
	},
	createInCircle:function(){
		var _this = this;
		var deg = 359.999;

		var yuan = this.svg.createElement({
			tag:"path",
			attr:{
				d:_this.getPath(deg),
				fill:"rgba(0,0,0,0.5)"
			}
		});

		this.yuan = yuan;
		this.svg.svg.append(yuan);
	},
	getPath:function(deg_val){
		var startAngle= 90,
			cx = this.cx,
			cy = this.cy,
			r = this.cr,
			deg= deg_val + startAngle;

		var x0 = cx+r*Math.cos(startAngle*Math.PI/180);
		var y0 = cy-r*Math.sin(startAngle*Math.PI/180);

		var x1 = cx+r*Math.cos(deg*Math.PI/180);
		var y1 = cy-r*Math.sin(deg*Math.PI/180);

		//圆弧的属性
		var yh = (deg_val > 180)? 1 : 0;

		return "M "+cx+","+cy+" L "+x0+","+y0+" A "+r+" "+r+" 0 "+yh+" 0 "+x1+" "+y1+" Z";

	},
	//@param:val  number   1-100
	progress:function(val){
		val = 360 - 360 * val / 100;
		val = (val == 360)? 359.999 : val;
		var d = this.getPath(val);
		//console.log(d);
		//console.log(this.yuan)
		$(this.yuan).attr({
			d:d
		})
	}
};

module.exports = effect;




