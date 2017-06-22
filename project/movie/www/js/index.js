"use strict";

/**
 * Created by beens on 16/12/22.
 */

var PAGE;

$(document).ready(function () {
	DEVICE.mainfest();
	PAGE.init();
});

PAGE = {
	init: function init() {
		this.bindEvent();
		this.openPage();
	},
	getData: function getData(id) {
		var _this = this;
		AJAX[id]({ success: function success(rs) {
				_this.bindData(rs);
			} });
	},
	bindData: function bindData(data) {
		var body = $(".body");
		body.html("");
		window.scrollTo(0, 0);

		var movie = data.movie || [],
		    tv = data.tv || [];

		for (var i = 0, l = movie.length; i < l; i++) {
			body.append("" + "<a href='" + movie[i].url + "'>" + "<img src='" + movie[i].img + "'  />" + "<div>" + movie[i].title + "</div>" + "</a>");
		}

		for (var z = 0, zl = tv.length; z < zl; z++) {
			body.append("" + "<a href='" + tv[z].url + "'>" + "<img src='" + tv[z].img + "'  />" + "<div>" + tv[z].title + "</div>" + "</a>");
		}
	},
	bindEvent: function bindEvent() {
		var _this = this;
		var a = new DEVICE.touchSlideEvent({
			dom: $("body"), //@param:jqobj   要监听的dom
			startFn: function startFn() {}, //@param:fn      手指按下时执行
			moveFn: function moveFn(opt) {//@param:fn      手指滑动时执行
				//opt.start.x   初始点 x，y
				//opt.start.y
				//opt.end.x     当前点 x ，y
				//opt.end.y
				//opt.move.x    当前点到初始点的距离  x ，y
				//opt.move.y
			},
			endFn: function endFn(opt, isSlide) {//@param：fn  手指释放的时候执行
				//opt同上
				//isSlide   布尔，是否触发快速滑动
			},
			slideLeftFn: function slideLeftFn() {
				_this.hideZZ();
			}, //@param:fn   快速左滑促发
			slideRightFn: function slideRightFn() {
				_this.showZZ();
			}, //@param:fn   快速右滑促发
			slideUpFn: function slideUpFn() {}, //@param:fn   快速上滑促发
			slideDownFn: function slideDownFn() {}, //@param:fn   快速下滑促发
			slideMaxTime: 500, //@param：number  触发快速滑动的最大时间 默认：500 ms
			useDirection: "x" //@param:str    "x","y","xy"
			//使用哪个方向的滑动   默认：x
		});

		$$("#zz").myclickok(function () {
			setTimeout(function () {
				_this.hideZZ();
			}, 200);
		});

		var icons = $("#zz").find(".item");
		$$(icons).myclickdown(function () {
			$(this).css({ opacity: 0.5 });
		}).myclickup(function () {
			$(this).css({ opacity: 1 });
		}).myclickok(function () {
			_this.hideZZ();
			var id = $(this).attr("id");
			_this.openPage(id);
		});
	},
	isShow: false,
	showZZ: function showZZ() {
		if (this.isShow) {
			return;
		}
		$("#zz").css({ display: "block" });
		setTimeout(function () {
			$("#zz").find(".list").cssAnimate({ transform: "translateX(0)" }, 500);
		}, 100);
	},
	hideZZ: function hideZZ() {
		$("#zz").css({ display: "none" });
		$("#zz").find(".list").css3({ transform: "translateX(-80px)" });
	},
	openPage: function openPage(id) {
		id = id || "qq";
		this.getData(id);
	}
};