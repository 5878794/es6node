"use strict";

$(document).ready(function () {
	page.init();
});

var page = {
	n: -1,
	showed: [],
	init: function init() {
		this.data = JSON.parse(JSON.stringify(DATA));
		this.addEvent();
		this.bindEvent();
		this.showNext();
	},
	addEvent: function addEvent() {
		var body = $("body"),
		    _this = this;
		$$$(body).myslideright(function () {
			_this.showNext();
		}).myslideleft(function () {
			_this.showPre();
		});
	},
	bindEvent: function bindEvent() {
		var c = $("#chinese"),
		    e = $("#english"),
		    _this = this;

		$$(c).myclickok(function () {
			var text = $(this).text();
			_this.speak(text);
		});
	},
	showNext: function showNext() {
		this.n++;

		var text;

		if (this.showed[this.n]) {
			text = this.showed[this.n];
		} else {
			var l = this.data.length,
			    n = parseInt(Math.random() * l);
			text = this.data.splice(n, 1);
			this.showed.push(text);
		}

		$("#chinese").text(text);
	},
	showPre: function showPre() {
		this.n--;
		var text;
		if (this.showed[this.n]) {
			text = this.showed[this.n];
			$("#chinese").text(text);
		}
	},
	speak: function speak(text) {
		DEVICE.speak(text);
	}
};