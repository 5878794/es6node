/**
 * Created by bens on 16-1-26.
 */




//svg.createGrayEffectClass({
//	className:"aaa"		//@param:str      要创建去色彩效果的class名字
// 	grayNumber:0.5      //@param:number   0-1 越小越黑 越大越灰
//})


let svgObj = require("./svg");

var grayEffect = function(opt){
	var __id__ = "svg_gray_"+new Date().getTime()+"_"+parseInt(Math.random()*100),
		div,
		a,
		className = opt.className || "",
		grayNumber = opt.grayNumber || 0.5;

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

		var feColorMatrix = a.createElement({
			tag:"feColorMatrix",
			attr:{
				in:"blur",
				mode:"matrix",
				values:grayNumber+" "+grayNumber+" "+grayNumber+" 0 0  "+grayNumber+" "+grayNumber+" "+grayNumber+" 0 0  "+grayNumber+" "+grayNumber+" "+grayNumber+" 0 0  0 0 0 1 0",
				result:"goo"
			}
		});


		$(defs).append(filter);
		$(filter).append(feColorMatrix);
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

module.exports = grayEffect;

