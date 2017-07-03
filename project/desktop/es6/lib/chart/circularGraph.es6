

//圆环图表   上中为起始角度
// new svg.circularGraph({
//    body:$("#test"),                    //要插入的dom元素   jqobj
//    value:[70,20,30],                   //数据
//    color:["#ccc","#bbb","#aaa"],       //颜色
//    lineWidth:20                        //圆环边框大小
// });

var svgObj = require("./../svg/svg");

var circularGraph = function(opt){
	this.body = opt.body || $("body");
	this.value = opt.value || [];
	this.color = opt.color || ["#ccc","#bbb","#aaa","#999","#888","#777","#666","#555","#444","#333","#222"];
	this.lineWidth = opt.lineWidth || "20";   //圆环厚度

	this.centerX = 0;
	this.centerY = 0;
	this.r1 = 0;        //内圆半径
	this.r2 = 0;        //外圆半径
	this.bodyWidth = 0;
	this.bodyHeight = 0;
	this.svg = null;
	this.degs = [];
	this.newColor = [];

	this.init();
};

circularGraph.prototype = {
	init:function(){
		this.getParam();
		this.handleData();
		this.createSvg();
		this.create();
	},
	getParam:function(){
		var width = parseInt(this.body.width()),
			height = parseInt(this.body.height()),
			r = (width > height)? height : width;

		this.centerX = width/2;
		this.centerY = height/2;
		this.r2 = r/2;
		this.r1 = r/2 - this.lineWidth;
		this.bodyWidth = width;
		this.bodyHeight = height;

	},
	handleData:function(){
		var n_val = [],
			n_color = [],
			total = 0;

		for(var i= 0,l=this.value.length;i<l;i++){
			total += parseInt(this.value[i]);
		}

		for(var z= 0,zl=this.value.length;z<zl;z++){
			var this_val = parseInt(this.value[z]),
				per = this_val/total,
				deg = per*360,
				color_l = this.color.length,
				color = (this.color[z])? this.color[z] : this.color[color_l-1];

			n_val.push(deg);
			n_color.push(color);
		}

		this.degs = n_val;
		this.newColor = n_color;
	},
	createSvg:function(){
		this.svg = new svgObj({
			container:this.body,
			id:"",
			viewBoxWidth:this.bodyWidth,
			viewBoxHeight:this.bodyHeight
		});
	},
	getPath:function(s_deg,e_deg){
		var startAngle= s_deg,
			cx = this.centerX,
			cy = this.centerY,
			r1 = this.r1,
			r2 = this.r2,
			deg= e_deg;

		var x0 = cx+r1*Math.sin(startAngle*Math.PI/180);
		var y0 = cy-r1*Math.cos(startAngle*Math.PI/180);
		var x1 = cx+r1*Math.sin(deg*Math.PI/180);
		var y1 = cy-r1*Math.cos(deg*Math.PI/180);

		var x2 = cx+r2*Math.sin(startAngle*Math.PI/180);
		var y2 = cy-r2*Math.cos(startAngle*Math.PI/180);
		var x3 = cx+r2*Math.sin(deg*Math.PI/180);
		var y3 = cy-r2*Math.cos(deg*Math.PI/180);

		//圆弧的属性
		var yh = (e_deg-s_deg > 180)? 1 : 0;

		//顺时针
		return  "M "+x0+","+y0+
			" A "+r1+" "+r1+" 0 "+yh+" 1 "+x1+" "+y1+
			" L "+x3+","+y3+
			" A "+r2+" "+r2+" 0 "+yh+" 0 "+x2+" "+y2+
			" Z";



	},
	create:function(){
		var t_deg = 0;

		for(var i= 0,l=this.degs.length;i<l;i++){
			var this_deg = this.degs[i],
				this_color = this.newColor[i];

			var yuan = this.svg.createElement({
				tag:"path",
				attr:{
					d:this.getPath(t_deg,t_deg+this_deg),
					fill:this_color
				}
			});
			this.svg.svg.append(yuan);

			t_deg += this_deg;
		}
	}

};

module.exports = circularGraph;