
//svg生成库

//生成svg的容器svg元素
//a = new svg({
//	container:opt.container,    //@param：jqobj 要插入的容器对象
//	id:opt.id || "",			//@param：string  svg容器的id
//	viewBoxWidth:"18",			//@param：string  svg容器的viewbox大小
//	viewBoxHeight:"18"
//});
//生成具体的svg元素
//a.createElement({
//	tag:"path",					//@param:string  要插入的标签名
//	val:"123",					//@param:string  标签的值
//	attr:{						//@param：json    要插入的标签的属性
//		d:"M 4 6  H 14  C 18 6  18 0  9 6  C 5 8  3 10  4 9",
//		fill:"none",
//		stroke:"#000",
//		"stroke-width":"1",
//		"stroke-linecap": "round",
//		"stroke-dasharray":"10 30",
//		"stroke-dashoffset":"0",
//		id:"l1"
//	}
//});




var svgObj = function(opt){
	//容器
	this.body = opt.container;
	this.id = opt.id || "";
	this.isHide = (opt.isHide === true);

	this.bodyWidth = parseInt(this.body.width());
	this.bodyHeight = parseInt(this.body.height());
	this.viewBoxWidth = opt.viewBoxWidth || this.bodyWidth;
	this.viewBoxHeight = opt.viewBoxHeight || this.bodyHeight;

	//svg元素宽高
	this.width = this.bodyWidth;
	this.height = this.bodyHeight;
	//svg的viewBox定义成与svg一样大
	this.viewBox = "0 0 "+this.viewBoxWidth+" "+this.viewBoxHeight;
	this.align = "xMidYMid";    //xMinYMin  xMaxYMax xMidYMid
	//meet 自适应
	//slice 宽高比最小的边拉满等比缩放
	//none 宽高比拉满非等比缩放
	this.scaleViewBox = "meet";
	this.preserveAspectRatio = this.align+" "+this.scaleViewBox;


	this.svg = null;



	this.init();
};
svgObj.prototype = {
	init:function(){
		this.createBody();
	},
	createBody:function(){
		var svg = $("<svg></svg>");

		if(!this.isHide){
			svg.attr({
				xmlns:"http://www.w3.org/2000/svg",
				version:"1.1",
				width:this.width,
				height:this.height,
				viewBox:this.viewBox,
				preserveAspectRatio:this.preserveAspectRatio,
				id:this.id
			});
		}else{
			svg.attr({
				xmlns: "http://www.w3.org/2000/svg",
				version: "1.1"
			});
		}


		this.body.html(svg.prop("outerHTML"));

		this.svg = this.body.find("svg");
	},
	createElement:function(opt){
		var tag = opt.tag,
			attr = opt.attr || {},
			val = opt.val || "";

		if(!tag){return;}

		var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var k in attr){
			if(attr.hasOwnProperty(k)){
				el.setAttribute(k, attr[k]);
			}
		}
		$(el).text(val);
		return $(el);
	}
};



module.exports = svgObj;
