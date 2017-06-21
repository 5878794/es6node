$(document).ready(function(){
	page1.init();
});


var setting = {
	maxNumber:10,       //最大数字
	length :10          //题目数量
};


var page1 = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var divs = $("#select").find("div");

		divs.each(function(){
			this.addEventListener("touchend",function(){
				DEVICE.speak("开始");
				var number = $(this).data("number");
				setting.maxNumber = number;
				page2.init();
			},false);
		})




	}
};


var page2 = {
	inputFn1:null,
	inputFn2:null,
	n:0,
	total:0,
	scrollTop:0,
	init:function(){
		this.showPage();
		this.keyboardHandler();
		this.createTM();
		this.createJG();
	},
	createJG:function(){
		var body = $("#rs"),
			width = 100/setting.length;

		for(var i=0,l=setting.length;i<l;i++){
			body.append("<div class='center' style='width:"+width+"%;height:50px; '></div>");
		}

	},
	showPage:function(){
		$("#select").css({display:"none"});
		$("#main").css3({display:"block"});
	},
	keyboardHandler:function(){
		var input = $("#main").find("input"),
			_this = this;

		//input获的焦点自动滚到顶部
		input.get(0).addEventListener("focus",function(){
			setTimeout(function(){
				$("body").scrollTop(0);
			},0);
		},false);


		input.get(0).focus();

		//阻止滑动
		window.addEventListener("touchmove",this.inputFn1 = function(e){
			e.preventDefault();
		},false);

		input.get(0).addEventListener("blur",this.inputFn2 = function(){
			this.focus();
			_this.next(this);

		},false);


	},
	createTM:function(){
		var n1 = parseInt(Math.random()*setting.maxNumber/2+setting.maxNumber/2),
			n2 = parseInt(Math.random()*setting.maxNumber/2+setting.maxNumber/2),
			fh = "+",
			ans = 0;

		if(n1>n2){
			fh = "-";
			ans = n1-n2;
		}else{
			ans = n1+n2;
		}

		var span = $("#main").find("span"),
			fhDom = $("#fh");

		fhDom.text(fh);
		span.eq(0).text(n1);
		span.eq(1).find("ff").text(n2);

		$("#main").find("input").data({
			val:ans
		})

	},
	next:function(input){
		var val = $(input).val(),
			ans = $(input).data("val"),
			_this = this,
			speak = "";

		if(val == ""){
			return;
		}

		this.n++;

		if(val == ans){
			this.total = this.total+1;
			speak = "小鸡宝宝做对"+this.total+"道题";
			DEVICE.speak(speak);
			this.showRs(true);
		}else{
			var error_number = this.n-this.total;
			speak = "小鸡宝宝做错"+error_number+"道题";
			DEVICE.speak(speak);
			this.showRs(false);
		}



		if(this.n >=setting.length){
			this.destroy();
			setTimeout(function(){
				page3.init(_this.total);
			},100)
		}else{
			$(input).val("");
			this.createTM();
		}


	},
	showRs:function(state){
		var text = (state)? "✓" : "✘",
			color = (state)? "green" : "red";

		$("#rs").find("div").eq(this.n-1).text(text).css({color:color});
	},
	destroy:function(){
		var input = $("#main").find("input");
		input.get(0).removeEventListener("focus",this.inputFn1,false);
		input.get(0).removeEventListener("blur",this.inputFn2,false);
		input.get(0).blur();
	}
};


var page3 = {
	init:function(total){
		$("#rs_total").text(setting.length);
		$("#rs_right").text(total);

		var pre = total/setting.length;
		pre = parseInt(pre*5);

		var text = "";
		for(var i=0,l=pre;i<l;i++){
			text+= "★";
		}

		$("#rs_stat").text(text);
		$("#rs_").css3({display:"box"});
		$("#main").css({display:"none"});


	}
};