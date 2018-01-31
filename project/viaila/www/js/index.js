
// var ProductDian = [0,920,1812,2867,3720];
var ProductClass = ['','back_','','','back_'];


$(document).ready(function(){
	page.init();
});


var page = {
	init:function(){
		this.addEvent();
		this.videoEvent();
	},
	addEvent:function(){
		var p1 = $('#p1Btn'),
			p2 = $('#p2Btn'),
			p3 = $('#p3Btn'),
			p4 = $('#p4Btn'),
			p5 = $('#p5Btn');

		p1.click(function(){
			window.location.href = 'p1.html';
		});

		p2.click(function(){
			window.location.href = 'p2.html';
		});
		p3.click(function(){
			window.location.href = 'p3.html';
		});
		p4.click(function(){
			window.location.href = 'p4.html';
		});
		p5.click(function(){
			window.location.href = 'p5.html';
		});
	},
	videoEvent:function(){
		var video = $('video').get(0),
			playBtn = $('#p6_play'),
			startBtn = $('#p6_play1'),
			zz = $('#p6_fm');

		startBtn.click(function(){
			video.play();
			zz.css({
				display:'none',
				background:'rgba(0,0,0,0.5)'
			});
			playBtn.css({display:'block'});
			startBtn.remove();

		});


		video.addEventListener('loadeddata',function(){
			startBtn.css({display:'block'});
		},false);


		playBtn.click(function(){
			video.play();
			zz.css({display:'none'});
		});

		video.addEventListener('click',function(){
			video.pause();
			zz.css({display:'block'});
		},false)


	}
};