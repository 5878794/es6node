
var ProductDian = [0,920,1812,2717];
var ProductClass = ['','back_','',''];


$(document).ready(function(){
	page.init();
});


var page = {
	init:function(){
		this.addEvent();
	},
	addEvent:function(){
		var p1 = $('#p1'),
			p1_ = $('#p1Btn'),
			p2 = $('#p2'),
			p3 = $('#p3'),
			p4 = $('#p4');

		p1.click(function(){
			window.location.href = 'p1.html';
		});
		p1_.click(function(){
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
	}
};