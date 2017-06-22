"use strict";

var PAGE3 = {
	from: "",
	bookUrl: "",
	infoUrl: "",
	n: "",
	init: async function init(bookUrl, infoUrl, infoName, from, n) {
		this.from = from;
		this.bookUrl = bookUrl;
		this.infoUrl = infoUrl;
		this.n = n;

		var setting = await this.getLocalSetting();
		await this.useLocalSetting(setting);
		await this.refreshPage3();
		var data = await this.getData(bookUrl, infoUrl);
		await this.bindData(infoName, data);
		await this.scrollTop();
		await this.saveTempInfo(infoName, data);
		await this.bindEvent();
		await this.show();

		// console.log(data);
	},

	//异常关闭后进入 入口
	init1: async function init1(bookUrl, infoUrl, infoName, from, n, data, scrollTop) {
		this.from = from;
		this.bookUrl = bookUrl;
		this.infoUrl = infoUrl;
		this.n = n;

		var setting = await this.getLocalSetting();
		await this.useLocalSetting(setting);
		await this.refreshPage3();
		await this.bindData(infoName, data);
		await this.scrollTop(scrollTop);
		await this.bindEvent();
		await this.show();
	},
	loadNextPage: async function loadNextPage() {
		var info = await this.getNextInfoUrl();
		var data = await this.getData(this.bookUrl, info.url);

		this.infoUrl = info.url;
		this.n++;

		await this.bindData(info.name, data);
		await this.scrollTop();
		await this.saveTempInfo(info.name, data);
	},
	getNextInfoUrl: function getNextInfoUrl() {
		var _this = this;
		return new Promise(function (success, error) {
			var dir = DATA.booksDir[_this.bookUrl],
			    n = _this.n + 1;

			if (n >= dir.length) {
				error("已是最后一章");
			} else {
				success(dir[n]);
			}
		});
	},
	getLocalSetting: function getLocalSetting() {
		return new Promise(function (success, error) {
			var setting = DEVICE.localData.getItem("setting") || "{}";
			setting = JSON.parse(setting);
			success(setting);
		});
	},
	useLocalSetting: function useLocalSetting(setting) {
		var bg = setting.bg || "rgb(145, 175, 132)",
		    font_size = setting.font || "20";

		$("#page3_body").css({
			background: bg,
			"font-size": font_size + "px"
		});
	},
	setLocalSetting: async function setLocalSetting(color, fontSize) {
		var oldSetting = await this.getLocalSetting();
		if (color) {
			oldSetting.bg = color;
		}
		if (fontSize) {
			oldSetting.font = fontSize;
		}
		DEVICE.localData.setItem("setting", JSON.stringify(oldSetting));

		await this.useLocalSetting(oldSetting);
	},
	getData: function getData(bookUrl, infoUrl) {
		var url = bookUrl + infoUrl.split("\/")[2];

		return new Promise(function (success, error) {
			AJAX.go("./api/info", { url: url }, function (rs) {
				if (rs.data) {
					success(rs.data);
				} else {
					error("获取数据失败");
				}
			}, function () {
				error("获取数据失败");
			});
		});
	},
	show: function show() {
		var dom = $("#page3"),
		    win_width = window.innerWidth,
		    _this = this;

		return new Promise(function (success, error) {
			dom.css3({
				transform: "translateX(" + win_width + "px)",
				display: "box"
			});

			dom.cssAnimate({
				transform: "translateX(0)"
			}, 500, function () {
				$("#" + _this.from).css({ display: "none" });
				success();
			});
		});
	},
	hide: function hide() {
		var dom = $("#page3"),
		    win_width = window.innerWidth,
		    _this = this;

		return new Promise(function (success, error) {
			$("#" + _this.from).css3({ display: "box" });
			dom.cssAnimate({
				transform: "translateX(" + win_width + "px)"
			}, 500, function () {
				dom.css({ display: "none" });
				success();
			});
		});
	},
	refreshPage3: function refreshPage3() {
		var back = $("#page3_back"),
		    body = $("#page3_body"),
		    voice = $("#page3_voice"),
		    font = $("#page3_font"),
		    bg = $("#page3_bg"),
		    next = $("#page3_next"),
		    text_body = $("#page3_text_body"),
		    bg_body = $("#page3_bg_body"),
		    text_add = text_body.find(".page3_texts_add"),
		    text_less = text_body.find(".page3_texts_-"),
		    bg_btns = bg_body.find(".page3_bg_list");

		$$(back).unbind(true);
		$$(voice).unbind(true);
		$$(font).unbind(true);
		$$(bg).unbind(true);
		$$(next).unbind(true);
		$$(body).unbind(true);
		$$(text_add).unbind(true);
		$$(text_less).unbind(true);
		$$(bg_btns).unbind(true);
		body.html("");

		this.bottomBtn.allHide();
	},
	bindData: function bindData(title, text) {
		var _this = this;
		return new Promise(function (success, error) {
			$("#page3_title").text(title);
			text = text.replace(/\u3000*/ig, "");
			text = text.replace(/[a-z]+\(\)\;?/, "");
			text = text.replace(/\s+/ig, "<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
			text = "<br/><br/><div style='text-align: center; font-weight: bold;'>" + title + "</div>" + text;
			$("#page3_body").html("");

			setTimeout(function () {
				$("#page3_body").html(text);
				_this.saveHasRead();
				success();
			}, 100);
		});
	},
	bindEvent: function bindEvent() {
		var back = $("#page3_back"),
		    voice = $("#page3_voice"),
		    font = $("#page3_font"),
		    bg = $("#page3_bg"),
		    body = $("#page3_body"),
		    next = $("#page3_next"),
		    text_body = $("#page3_text_body"),
		    bg_body = $("#page3_bg_body"),
		    text_add = text_body.find(".page3_texts_add"),
		    text_less = text_body.find(".page3_texts_-"),
		    bg_btns = bg_body.find(".page3_bg_list"),
		    _this = this;

		$$(body).myclickdown(function () {
			_this.bottomBtn.allHide();
		});

		$$(back).myclickok(function () {
			_this.clearTempInfo();
			_this.bottomBtn.allHide();
			_this.hide();
		});

		$$(voice).myclickok(function () {
			_this.bottomBtn.allHide();
			var _text = $("#page3_body").text();
			DEVICE.speak(_text);
		});

		$$(font).myclickok(function () {
			_this.bottomBtn.click("page3_text_body");
		});

		$$(bg).myclickok(function () {
			_this.bottomBtn.click("page3_bg_body");
		});

		$$(next).myclickok(function () {
			_this.bottomBtn.allHide();
			_this.loadNextPage().catch(function (e) {
				DEVICE.info.show(e);
			});
		});

		$$(text_add).myclickok(function () {
			var now_text_dom = $(this).parent().find(".page3_texts_text"),
			    now_text = parseInt(now_text_dom.text());
			now_text++;
			now_text = now_text > 30 ? 30 : now_text;
			now_text_dom.text(now_text);
			_this.setLocalSetting("", now_text);
		});
		$$(text_less).myclickok(function () {
			var now_text_dom = $(this).parent().find(".page3_texts_text"),
			    now_text = parseInt(now_text_dom.text());
			now_text--;
			now_text = now_text < 12 ? 12 : now_text;
			now_text_dom.text(now_text);
			_this.setLocalSetting("", now_text);
		});
		$$(bg_btns).myclickok(function () {
			var color = $(this).css("background-color");
			_this.setLocalSetting(color, "");
		});
	},

	bottomBtn: {
		isShow: {
			page3_text_body: false,
			page3_bg_body: false
		},
		hide: function hide(id) {
			var _this = this;
			return new Promise(function (success, error) {
				var dom = $("#" + id);
				dom.cssAnimate({
					transform: "translateY(0)"
				}, 300, function () {
					dom.css({
						display: "none"
					});
					_this.isShow[id] = false;
					success();
				});
			});
		},
		show: function show(id) {
			var _this = this;
			return new Promise(function (success, error) {
				var dom = $("#" + id);
				dom.css3({
					display: "box",
					transform: "translateY(0)"
				});
				setTimeout(function () {
					dom.cssAnimate({
						transform: "translateY(-50px)"
					}, 300, function () {
						_this.isShow[id] = true;
						success();
					});
				}, 100);
			});
		},
		click: async function click(id) {
			var clickId = void 0,
			    otherId = void 0;
			clickId = id == "page3_text_body" ? "page3_text_body" : "page3_bg_body";
			otherId = clickId == "page3_text_body" ? "page3_bg_body" : "page3_text_body";

			if (this.isShow[clickId]) {
				await this.hide(clickId);
			} else {
				if (this.isShow[otherId]) {
					await this.hide(otherId);
				}
				await this.show(clickId);
			}
		},
		allHide: function allHide() {
			var doms = this.isShow;
			for (var key in doms) {
				if (doms.hasOwnProperty(key)) {
					if (doms[key]) {
						this.hide(key);
					}
				}
			}
		}
	},
	saveHasRead: function saveHasRead() {
		var data = JSON.parse(DEVICE.localData.getItem("cache") || '{}'),
		    hasRead = data.hasRead || {};

		hasRead[this.bookUrl] = this.infoUrl;
		data.hasRead = hasRead;

		DEVICE.localData.setItem("cache", JSON.stringify(data));

		DATA.hasRead = hasRead;

		PAGE2.listShowHasRead(this.n);

		//更新page1的未读数量
		var total = DATA.booksDir[this.bookUrl].length,
		    number = total - 1 - this.n;
		PAGE1.refreshNotReadNumber(this.bookUrl, number);
	},
	scrollTop: function scrollTop(top) {
		top = top || 0;
		$("#page3_body").animate({ scrollTop: top + "px" }, 10);
	},
	saveTempInfo: function saveTempInfo(title, text) {
		var bookUrl = this.bookUrl,
		    infoUrl = this.infoUrl;

		DEVICE.localData.setItem("temp", JSON.stringify({
			title: title,
			text: text,
			bookUrl: bookUrl,
			infoUrl: infoUrl,
			n: this.n
		}));
	},
	clearTempInfo: function clearTempInfo() {
		DEVICE.localData.setItem("temp", "");
	}
};