


//生成菜单按钮到关闭按钮的动画
//var menu_close_test = function(div_id){
//	svg.menu_close({
//		//id:"",					//@param:str    	svg容器的id
//		container:$("#"+div_id),		//@param:jqobj  	要插入的容器dom
//      color:"#000",                   //@param:str     颜色
//      closeFn:function(){},           //@param:fn      返回时执行
//      showFn:function(){}             //@param:fn      显示菜单执行
//	})
//};

let svgObj = require("./svg"),
	JsAnimate = require("./../fn/jsAnimate");

let menu_close = function(opt){
	var showFn = opt.showFn || function(){},
		closeFn = opt.closeFn || function(){},
		color = opt.color || "#000";


	var a = new svgObj({
		container:opt.container,
		id:opt.id || "",
		viewBoxWidth:"80",
		viewBoxHeight:"60"
	});


	var l1 = a.createElement({
		tag:"path",
		attr:{
			d:"M30,22 C30,22 52,22 54,22 C74,22 64,54 52,42 C44,34 30,20 30,20",
			fill:"none",
			stroke:color,
			"stroke-width":"3",
			"stroke-linecap": "round",
			"stroke-dasharray":"24 95",
			"stroke-dashoffset":"0",
			id:"__l1"
		}
	});

	var l2 = a.createElement({
		tag:"path",
		attr:{
			d:" M30,32 L54,32",
			stroke:color,
			fill:"none",
			"stroke-width":"3",
			"stroke-linecap": "round",
			id:"__l2",
			"stroke-dasharray":"24 0",
			"stroke-dashoffset":"0"
		}
	});
	var l3 = a.createElement({
		tag:"path",
		attr:{
			d:"M30,21 C30,21 52,21 54,21 C74,21 64,53 52,41 C44,33 30,19 30,19",
			fill:"none",
			stroke:color,
			"stroke-width":"3",
			"stroke-linecap":"round",
			id:"__l3",
			transform:"translate(48, 32) scale(1, -1) translate(-48, -31.8) ",
			"stroke-dasharray":"24 95",
			"stroke-dashoffset":"0"
		}
	});

	a.svg.append(l1).append(l2).append(l3);

	var isBackState = false,
		isPlaying = false;


	var animate = null,
		line1 = $("#__l1"),
		line2 = $("#__l2"),
		line3 = $("#__l3"),
		animateFn = function(){
			animate = new JsAnimate({
				start:0,                  //@param:number   初始位置
				end:1,                    //@param:number   结束位置
				time:300,                 //@param:number   动画执行时间  ms
				type:"Sine",             //@param:str      tween动画类别,默认：Linear 详见函数内tween函数
				class:"easeInOut",           //@param:str      tween动画方式,默认：easeIn 详见函数内tween函数
				stepFn:function(val){     //@param:fn       每步执行函数,返回当前属性值
					var v1 = -12*val,
						v3 = (1-val)*24,
						v2 = -65 * val;

					line2.css({
						"stroke-dashoffset":v1 + "px",
						"stroke-dasharray":v3 +"px 24px"
					});

					line1.css({
						"stroke-dashoffset":v2 + "px"
					});
					line3.css({
						"stroke-dashoffset":v2 + "px"
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


module.exports = menu_close;