"use strict";

$(document).ready(function () {
	DEVICE.mainfest();
	page1.init();
});

var setting = {
	length: 10 //题目数量
};

var page1 = {
	init: function init() {
		this.bindEvent();
	},
	bindEvent: function bindEvent() {
		var btns = $("#page1").find("div");

		$$(btns).myclickok(function () {
			DEVICE.speak("开始");
			page2.init();
		});
	}
};

var page2 = {
	data: null,
	right: 0,
	total: 0,
	n: 0,
	init: function init() {
		this.total = setting.length;
		this.data = data;
		this.showPage();

		this.show();
	},
	showPage: function showPage() {
		this.n++;
		var this_data = this.getNowShowCode();

		var body = $("#page2");
		body.find(".music").data({ val: this_data.code });

		var list = body.find(".lists"),
		    old = list.find(".list");
		$$(old).unbind(true);
		list.html("");

		for (var i = 0, l = this_data.select.length; i < l; i++) {
			list.append("<div class='list' data-val='" + this_data.select[i] + "'><span>" + i + ":</span>" + this_data.select[i] + "</div>");
		}

		this.bindEvent();
	},
	bindEvent: function bindEvent() {
		var body = $("#page2"),
		    music = body.find(".music"),
		    btns = body.find(".list"),
		    _this = this;

		$$(music).unbind(true);
		$$(music).myclickok(function () {
			_this.playMusic();
		});

		$$(btns).myclickdown(function () {
			_this.choosed(this);
		});
	},
	playMusic: function playMusic() {
		var body = $("#page2"),
		    music = body.find(".music"),
		    code = music.data("val");
		code = code == "ü" ? "v" : code;

		var audio = music.find("audio").get(0),
		    src = "./mp3/" + code + ".mp3";
		console.log(src);
		audio.src = src;
		audio.play();
	},
	choosed: function choosed(dom) {
		var this_choose = $(dom).data("val"),
		    this_code = $("#page2").find(".music").data("val"),
		    _this = this;

		if (this_choose == this_code) {
			//正确
			this.right++;
			$(dom).css({ background: "green" });
			DEVICE.speak("小鸡宝宝做对" + this.right + "道题");
			setTimeout(function () {
				_this.next();
			}, 1000);
		} else {
			//错误
			$(dom).css({ background: "red" });
			var error_number = this.n - this.right;
			DEVICE.speak("小鸡宝宝做错" + error_number + "道题");

			this.showRightCode(this_code);
			setTimeout(function () {
				_this.next();
			}, 3000);
		}
	},
	next: function next() {
		if (this.n + 1 > this.total) {
			page3.init(this.total, this.right);
		} else {
			this.showPage();
		}
	},
	showRightCode: function showRightCode(code) {
		var btns = $("#page2").find(".list");

		btns.each(function () {
			if ($(this).data("val") == code) {
				$(this).css({ background: "green" });
			}
		});
	},
	getNowShowCode: function getNowShowCode() {
		var this_data = JSON.parse(JSON.stringify(this.data)),
		    n = parseInt(Math.random() * (this.data.length - 1)),
		    code = this_data.splice(n, 1)[0],
		    select = [];

		for (var i = 0, l = 3; i < l; i++) {
			var _n = parseInt(Math.random() * (this_data.length - 1)),
			    _code = this_data.splice(_n, 1)[0];
			select.push(_code);
		}
		select.push(code);

		//打乱select数组
		select.sort();

		return {
			code: code,
			select: select
		};
	},
	show: function show() {
		$("#page1").css({ display: "none" });
		$("#page2").css3({ display: "box" });
	}
};

var page3 = {
	init: function init(total, right) {
		this.bindData(total, right);
		this.show();
	},
	bindData: function bindData(total, right) {
		$("#right").find("span").text(right).css({ color: "green" });
		$("#error").find("span").text(total - right).css({ color: "red" });

		var n = parseInt(right * 5 / total),
		    text = "";
		for (var i = 0, l = n; i < l; i++) {
			text += "★";
		}

		$("#stat").text(text);
	},
	show: function show() {
		$("#page2").css({ display: "none" });
		$("#page3").css3({ display: "box" });
	}
};