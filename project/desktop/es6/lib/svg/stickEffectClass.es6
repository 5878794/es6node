


//生成有粘连效果的滤镜class（融入效果）  最好是圆形
//元素之间必须有包含关系，否则不生效(必须父元素也设置该class)



//svg.createStickEffectClass({
//	className:"aaa"		//@param:str      要创建粘贴的class名字
// 	stickNumber:7       //@paran:number   默认7效果比较好
//})


let svgObj = require("./svg");

var stickEffect = function(opt){
	var __id__ = "svg_stick_"+new Date().getTime()+"_"+parseInt(Math.random()*100),
		div,
		a,
		className = opt.className || "",
		stickNumber = opt.stickNumber || 7;

	var createDiv = function(){
		div = $("<div></div>");
		div.css({
			width:0,height:0
		});
		$("body").append(div);
	};

	var createSVG = function(){
		a = new svgObj({
			container:div,
			isHide:true,
			id:""
		});

		var defs = a.createElement({
			tag:"defs"
		});

		var filter = a.createElement({
			tag:"filter",
			attr:{
				id:__id__
			}
		});

		var feGaussianBlur = a.createElement({
			tag:"feGaussianBlur",
			attr:{
				in:"SourceGraphic",
				result:"blur",
				stdDeviation:"10"
			}
		});

		var feColorMatrix = a.createElement({
			tag:"feColorMatrix",
			attr:{
				in:"blur",
				mode:"matrix",
				values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -"+stickNumber,
				result:"goo"
			}
		});

		var feBlend = a.createElement({
			tag:"feBlend",
			attr:{
				in2:"goo",
				in:"SourceGraphic",
				result:"mix"
			}
		});


		$(defs).append(filter);
		$(filter).append(feGaussianBlur).append(feColorMatrix).append(feBlend);
		a.svg.append(defs);
	};

	var createClass = function(){
		var style = $("<style></style>");
		var text = "."+className+"{-webkit-filter:url('#"+__id__+"');filter:url('#"+__id__+"');-webkit-backface-visibility:hidden;backface-visibility:hidden;}";
		style.text(text);
		$("head").append(style);
	};

	createDiv();
	createSVG();
	createClass();
};

module.exports = stickEffect;




