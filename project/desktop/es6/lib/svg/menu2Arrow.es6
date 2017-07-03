


//生成菜单按钮到返回按钮的动画
//var menu_arrow_test = function(div_id){
//	svg.menu_arrow({
//		//id:"",					//@param:str    	svg容器的id
//		container:$("#"+div_id),		//@param:jqobj  	要插入的容器dom
//      color:"#000",                   //@param:str     颜色
//      closeFn:function(){},           //@param:fn      返回时执行
//      showFn:function(){}             //@param:fn      显示菜单执行
//	})
//};

let svgObj = require("./svg"),
	JsAnimate = require("./../fn/jsAnimate");

let menu_arrow = function(opt){
	var showFn = opt.showFn || function(){},
		closeFn = opt.closeFn || function(){},
		color = opt.color || "#000";



	var a = new svgObj({
		container:opt.container,
		id:opt.id || "",
		viewBoxWidth:"18",
		viewBoxHeight:"18"
	});

	var l1 = a.createElement({
		tag:"path",
		attr:{
			d:"M 4 6  H 14  C 18 6  18 0  9 6  C 5 8  3 10  4 9",
			fill:"none",
			stroke:color,
			"stroke-width":"1",
			"stroke-linecap": "round",
			"stroke-dasharray":"10 30",
			"stroke-dashoffset":"0",
			id:"l1"
		}
	});

	var l2 = a.createElement({
		tag:"path",
		attr:{
			d:" M 4 9  H 14",
			stroke:color,
			fill:"none",
			"stroke-width":"1",
			"stroke-linecap": "round",
			id:"l2",
			"stroke-dasharray":"10 10",
			"stroke-dashoffset":"0"
		}
	});
	var l3 = a.createElement({
		tag:"path",
		attr:{
			d:"M 4 12  H 14  C 18 12  18 18  9 12  C 4 9  4 9  4 9",
			fill:"none",
			stroke:color,
			"stroke-width":"1",
			"stroke-linecap":"round",
			id:"l3",
			"stroke-dasharray":"10 30",
			"stroke-dashoffset":"0"
		}
	});

	a.svg.append(l1).append(l2).append(l3);


	var isBackState = false,
		isPlaying = false;

	var animate = null,
		animateFn = function(){
			animate = new JsAnimate({
				start:0,                  //@param:number   初始位置
				end:1,                    //@param:number   结束位置
				time:700,                 //@param:number   动画执行时间  ms
				type:"Back",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
				class:"easeInOut",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
				stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
					var v1 = 10 - (10-4)*val,
						v2 = -23 * val;

					$("#l1").css({
						"stroke-dashoffset":v2 + "px",
						"stroke-dasharray":v1 +"px 30px"
					});
					$("#l3").css({
						"stroke-dashoffset":v2 + "px",
						"stroke-dasharray":v1 +"px 30px"
					});

				},
				endFn:function(){         //@param:fn       动画结束执行
					setTimeout(function(){
						animate.alternate = true;
						isBackState = !isBackState;
						isPlaying = false;
					},0)
				},
				alternate:false,          //@param:boolean  动画结束时是否反向运行，默认：false
				infinite:false            //@param:boolean  动画是否循环执行，默认：false
				//设置该参数endFn将失效
			});
		};


	a.svg.click(function(){
		if(!isPlaying){
			isPlaying = true;
			animate.play();

			if(isBackState){
				closeFn();
			}else{
				showFn();
			}
		}
	});
	animateFn();
};



module.exports = menu_arrow;
