//五角形数据展示
//可以不传入中间文字显示部分参数即不显示中间的文字

// new svg.fivesGraphics({
//    body:$("#test"),                      //要放置的容器  jqobj
//    value:[60,70,80,50,40],               //5个项目的得分,百分比
//    bgColor:"#ccc",                       //背景颜色
//    bgLineColor:"#fff",                   //背景线颜色
//    color:"rgba(0,0,0,0.5)",              //数据填充色
//
//    unit:"分",                            //图形中间总分数的单位
//    title:"侧测试标题",                     //图形中间的标题(第2行)
//    fontSize:"14px",                      //通用字体大小，传入带单位
//    totalFontSize:"40px",                 //得分字体大小
//    totalFontColor:"#fff"                 //中间部分统计颜色
// })


var svgObj = require("./../svg/svg");

var radian = 2*Math.PI/360,
	sin = function(deg){
		return Math.sin(deg*radian);
	},
	cos = function(deg){
		return Math.cos(deg*radian);
	};



var fivesGraphics = function(opt){
	this.body = opt.body;               //要放置的容器  jqobj
	this.value = opt.value || [];       //5个项目的得分,百分比

	this.title = opt.title || "";       //图形中间的标题
	this.unit = opt.unit || "";         //图形中间总分数的单位
	this.bgColor = opt.bgColor || "#ccc";   //背景颜色
	this.bgLineColor = opt.bgLineColor || "#fff";  //背景线颜色
	this.color = opt.color || "rgba(0,0,0,0.5)";       //数据填充色
	this.fontSize = opt.fontSize || "12px";     //通用字体大小，传入用rem
	this.totalFontSize = opt.totalFontSize || "40px";  //得分字体大小
	this.totalFontColor = opt.totalFontColor || "#fff";        //中间部分统计颜色


	this.bodyWidth = parseInt(this.body.width());
	this.bodyHeight = parseInt(this.body.height());
	this.totalValue = 0;                //计算的总得分(平均分)
	this.svg = null;                    //svg对象
	this.r = "";                        //五角星的半径
	this.centerX = "";    //中心点坐标
	this.centerY = "";
	this.fivePoints = [];               //五个点的坐标


	//必须是6条数据
	if(this.value.length !=5){return;}

	this.init();
};

fivesGraphics.prototype = {
	init:function(){
		this.getTotalVal();
		this.getR();
		this.getFivePoint();
		this.setPosition();
		this.createSVG();
		this.createBg();
		this.createBgLine();
		this.createDataLayer();
		this.createTotalText();
	},
	//计算总得分
	getTotalVal:function(){
		var total = 0;
		for(var i= 0,l=this.value.length;i<l;i++){

			total += parseInt(this.value[i]);
		}
		this.totalValue = total/5;
	},
	//计算半径
	getR:function(){
		if(this.bodyWidth > this.bodyHeight){
			this.r = this.bodyHeight/(1+cos(36));//半径
			this.centerX = this.bodyWidth/2;    //中心点坐标
			this.centerY = this.r;
		}else{
			this.r = this.bodyWidth/2/sin(72);
			this.centerX = this.bodyWidth/2;
			this.centerY = this.bodyHeight/2;
		}
	},
	//获取5个定点的坐标
	getFivePoint:function(){
		var points = [];

		for(var i= 0,l=5;i<l;i++){
			var point = this.getPointXY(100,i);
			points.push(point);
		}

		this.fivePoints = points;
	},
	//设置容器定位，要用绝对坐标
	setPosition:function(){
		var position = this.body.css("position");

		if (position == "fixed" || position == "absolute" || position == "relative"){

		}else{
			this.body.css({
				position:"relative"
			})
		}
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
	//获取五个角的坐标
	getPointXY:function(value,i){
		value = value/100*this.r;

		var deg = [0,72,144,216,288],
			x = sin(deg[i])*value + this.centerX,
			y = - cos(deg[i])*value + this.centerY;

		return {
			x:x,
			y:y
		}
	},
	//画背景
	createBg:function(){
		var d = "";

		for(var i= 0,l=this.fivePoints.length;i<l;i++){
			var point = this.fivePoints[i];

			d += "L "+point.x+","+point.y+" ";
		}

		d = "M " + d.substr(1) + "Z";

		var bg = this.svg.createElement({
			tag:"path",
			attr:{
				d:d,
				fill:this.bgColor
			}
		});
		this.svg.svg.append(bg);

	},
	//画背景的五根线
	createBgLine:function(){
		for(var i= 0,l=this.fivePoints.length;i<l;i++){
			var this_point = this.fivePoints[i];

			var line = this.svg.createElement({
				tag:"path",
				attr:{
					d:"M "+this_point.x+","+this_point.y+" L "+this.centerX+","+this.centerY,
					"stroke-width":1,
					stroke:this.bgLineColor,
					fill:"none"
				}
			});
			this.svg.svg.append(line);
		}
	},
	//画数据的显示层
	createDataLayer:function(){
		var d = "";


		for(var i= 0,l=this.value.length;i<l;i++){
			var this_val = parseInt(this.value[i]),
				this_point = this.getPointXY(this_val,i);

			d += "L "+this_point.x+","+this_point.y+" ";
		}

		d = "M" + d.substr(1) + "Z";

		var graphics = this.svg.createElement({
			tag:"path",
			attr:{
				d:d,
				fill:this.color
			}
		});
		this.svg.svg.append(graphics);
	},
	//创建统计的文字
	createTotalText:function(){
		//文本区域
		var text = this.svg.createElement({
			tag:"text",
			attr:{
				x:0,
				y:0,
				fill:this.totalFontColor,
				"font-size":this.totalFontSize

			}
		});

		//第一行文本的分数
		var number = this.svg.createElement({
			tag:"tspan",
			val:this.totalValue,
			attr:{
				x:this.centerX,
				y:this.centerY,
				"text-anchor":"middle",   //水平以xy的坐标为中心点
				"dominant-baseline":"text-after-edge",  //垂直底部在xy的坐标
				"font-size":this.totalFontSize
			}
		});
		//第一行文本的单位

		var dw = this.totalFontSize.replace(/\d*/ig,"");
		var unit = this.svg.createElement({
			tag:"tspan",
			val:this.unit,
			attr:{
				dx:parseInt(this.totalFontSize)*0.1+dw,
				dy:-parseInt(this.totalFontSize)*0.2+dw,
				"font-size":this.fontSize
			}
		});

		//第2行文本
		var title = this.svg.createElement({
			tag:"tspan",
			val:this.title,
			attr:{
				x:this.centerX,
				y:this.centerY + 5,
				"text-anchor":"middle", //水平以xy的坐标为中心点
				"dominant-baseline":"text-before-edge",//垂直顶部在xy的坐标
				"font-size":this.fontSize
			}
		});

		text.append(number);
		text.append(unit);
		text.append(title);

		this.svg.svg.append(text);


	}
};


module.exports = fivesGraphics;


