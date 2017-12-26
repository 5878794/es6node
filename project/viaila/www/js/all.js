$(document).ready(function(){
	window.ProductDian = [];
	window.animate = [];
	$("#body").children().each(function(){
		var top = $(this).offset().top - 100;
		top = (top<0)? 0 : top;
		window.ProductDian.push(top);
		window.animate.push(top);
	});
	ALL.init();
});




var ALL = {
	init:function(){
		$('#top_').css({display:"block"});
		this.openWinEvent();
		this.topEvent();
		this.logoEvent();
		this.initAnimateDivStyle();
		this.pageAnimate(0);
	},
	openWinEvent:function(){
		var body = 	$('#open_win'),
			btn = $('#join'),
			btn1 = $('#join1'),
			btn2 = $('.top_2ma'),
			close = $('#open_win_close'),
			zx1Body = $('#zx1'),
			zx2Body = $('#zx2'),
			zx1Btn = $('#zxBtn1'),
			zx2Btn = $('#zxBtn2');

		btn.click(function(){
			body.css({
				display:'block'
			}).cssAnimate({
				background:'rgba(0,0,0,0.5)'
			},500);
		});
		btn1.click(function(){
			body.css({
				display:'block'
			}).cssAnimate({
				background:'rgba(0,0,0,0.5)'
			},500);
		});
		btn2.addClass('hover_animate').click(function(){
			body.css({
				display:'block'
			}).cssAnimate({
				background:'rgba(0,0,0,0.5)'
			},500);
		});

		close.click(function(){
			body.css({display:'none',background:'rgba(0,0,0,0)'});
			zx1Body.css({display:'block'});
			zx2Body.css({display:'none'});
		});

		zx1Btn.click(function(){
			zx1Body.css({display:'none'});
			zx2Body.css({display:'block'});
		});

		zx2Btn.click(function(){
			zx1Body.css({display:'block'});
			zx2Body.css({display:'none'});
		})


	},
	topEvent:function(){
		var top1 = $('#top'),
			top2 = $('#top_'),
			_this = this;

		var autoSetTopClass = function(topVal){
			if(!window.ProductDian){return;}
			var data = JSON.parse(JSON.stringify(ProductDian));
			data.push(topVal);
			data.sort(function(a,b){
				return (a>b)? 1 : -1;
			});
			var n = data.indexOf(topVal);
			n = n -1;
			if(!window.ProductClass){return;}
			var class_ = ProductClass[n];
			if(class_){
				top2.addClass(class_);
			}else{
				top2.get(0).className = 'top_';
			}
		};

		$(window).scroll(function(){
			// console.log($(window).scrollTop())
			var topVal = $(window).scrollTop();
			autoSetTopClass(topVal);
			_this.rightPointEvent(topVal);
			_this.pageAnimate(topVal);
			if(topVal<=140){
				// top1.css({visibility: 'visible'});
				// top2.css({display:'none'});
				top2.cssAnimate({
					transform:'translateY(-41px)'
				},800,function(){},true,'ease')
			}else{
				// top1.css({visibility: 'hidden'});
				// top2.css({display:'block'});
				top2.cssAnimate({
					transform:'translateY(0)'
				},800,function(){},true,'ease')
			}
		});
	},
	rightPointEvent:function(val){
		var allP = $('#scroll_dian').find('.scroll_dian_item');

		if(!window.ProductDian){return;}
		var data = JSON.parse(JSON.stringify(ProductDian));
		data.push(val);
		data.sort(function(a,b){
			return (a>b)? 1 : -1;
		});
		var n = data.indexOf(val);
		n = n -1;
		n = (n<=0)? 0 : n;

		allP.removeClass('select');
		allP.eq(n).addClass('select');
	},
	logoEvent:function(){
		var logo = $('#top').find('.top_left'),
			logo1 = $('#top_').find('.top__logo');

		logo.click(function(){
			window.location.href = 'index.html';
		});
		logo1.click(function(){
			window.location.href = 'index.html';
		});
	},
	initAnimateDivStyle:function(){
		if(!window.animate || !window.animateType){return;}

		// var doms = $('#body').children();
		// for(var b=2,bl=doms.length;b<bl;b++){
		// 	doms.eq(b).css({display:'none'});
		// }


		var body = $('._scroll');
		for(var i=0,l=body.length;i<l;i++){
			var divs = body.eq(i).find('div');
			for(var d=0,dl=divs.length;d<dl;d++){
				var this_div = divs.eq(d),
					this_data = (animateType[i])? animateType[i][d] : {};
				this_data = this_data || {};

				if(this_data.type){
					var style_,dir_;
					if(this_data.type == 'left'){
						style_ = 'translateX';
						dir_ = '-';
					}else if(this_data.type=='right'){
						style_ = 'translateX';
						dir_ = '';
					}else if(this_data.type == 'up'){
						style_ = 'translateY';
						dir_ = '-';
					}else if(this_data.type=='down'){
						style_ = 'translateY';
						dir_ = '';
					}else{
						continue;
					}

					this_div.css3({
						transform:style_+'('+dir_+this_data.val+'px)'
					})
				}
			}
		}
	},
	pageAnimate:function(topVal){
		if(!window.animate || !window.animateType){return;}

		var data = JSON.parse(JSON.stringify(animate));
		data.push(topVal);
		data.sort(function(a,b){
			return (a>b)? 1 : -1;
		});
		var n = data.indexOf(topVal);
		n = n -1;
		n = (n<=0)? 0 : n;

		var fn = function(time,detail,dom,callback){
			// console.log(time,dom,detail)
			setTimeout(function(){
				// console.log(time,detail,dom)
				dom.cssAnimate({
					transform:'translate3D(0,0,0)',
					opacity:1
				},time,function(){
					// callback();
				},true,'ease')
			},detail)
		};

		var animateData = animateType[n];
		if(animateData.isRun){return;}


		var body = $('._scroll'),
			doms = body.eq(n).find('div');
		for(var i =0,l=animateData.length;i<l;i++){
			var time = animateData[i].time,
				dom = doms.eq(i);
			// console.log(dom)

			fn(time,animateData[i].detail,dom);
		}
		animateData.isRun = true;
	}
};