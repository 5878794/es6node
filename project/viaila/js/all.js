$(document).ready(function(){
	ALL.init();
});


var ALL = {
	init:function(){
		this.openWinEvent();
		this.topEvent();


	},
	openWinEvent:function(){
		var body = 	$('#open_win'),
			btn = $('#join'),
			btn1 = $('#join1'),
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

		})


	},
	topEvent:function(){
		var top1 = $('#top'),
			top2 = $('#top_'),
			_this = this;

		var autoSetTopClass = function(topVal){
			if(!ProductDian){return;}
			var data = JSON.parse(JSON.stringify(ProductDian));
			data.push(topVal);
			data.sort(function(a,b){
				return (a>b)? 1 : -1;
			});
			var n = data.indexOf(topVal);
			n = n -1;
			if(!ProductClass){return;}
			var class_ = ProductClass[n];
			if(class_){
				top2.addClass(class_);
			}else{
				top2.get(0).className = 'top_';
			}
		};

		$(window).scroll(function(){
			var topVal = $(window).scrollTop();
			autoSetTopClass(topVal);
			_this.rightPointEvent(topVal);
			if(topVal<=100){
				top1.css({visibility: 'visible'});
				top2.css({display:'none'});
			}else{
				top1.css({visibility: 'hidden'});
				top2.css({display:'block'});
			}
		});
	},
	rightPointEvent:function(val){
		var allP = $('#scroll_dian').find('.scroll_dian_item');

		if(!ProductDian){return;}
		var data = JSON.parse(JSON.stringify(ProductDian));
		data.push(val);
		data.sort(function(a,b){
			return (a>b)? 1 : -1;
		});
		var n = data.indexOf(val);
		n = n -1;
		n = (n<=0)? 0 : n;

		console.log(n)
		allP.removeClass('select');
		allP.eq(n).addClass('select');
	}
};