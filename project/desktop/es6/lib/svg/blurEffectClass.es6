


//创建模糊的效果class

//svg.createBlurEffectClass({
//	className:"aaa"		//@param:str      要创建模糊效果的class名字
// 	blurNumber:10       //@paran:number   模糊的属性数字 默认10
//})


let svgObj = require("./svg");


var blurEffect = function(opt){
	var __id__ = "svg_blur_"+new Date().getTime()+"_"+parseInt(Math.random()*100),
		div,
		a,
		className = opt.className || "",
		blurNumber = opt.blurNumber || 10;

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
				stdDeviation:blurNumber
			}
		});


		$(defs).append(filter);
		$(filter).append(feGaussianBlur);
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

module.exports = blurEffect;

