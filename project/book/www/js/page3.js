"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAGE3 = {
	from: "",
	bookUrl: "",
	infoUrl: "",
	n: "",
	init: function init(bookUrl, infoUrl, infoName, from, n) {
		var _this2 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			var setting, data;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_this2.from = from;
							_this2.bookUrl = bookUrl;
							_this2.infoUrl = infoUrl;
							_this2.n = n;

							_context.next = 6;
							return _this2.getLocalSetting();

						case 6:
							setting = _context.sent;
							_context.next = 9;
							return _this2.useLocalSetting(setting);

						case 9:
							_context.next = 11;
							return _this2.refreshPage3();

						case 11:
							_context.next = 13;
							return _this2.getData(bookUrl, infoUrl);

						case 13:
							data = _context.sent;
							_context.next = 16;
							return _this2.bindData(infoName, data);

						case 16:
							_context.next = 18;
							return _this2.scrollTop();

						case 18:
							_context.next = 20;
							return _this2.saveTempInfo(infoName, data);

						case 20:
							_context.next = 22;
							return _this2.bindEvent();

						case 22:
							_context.next = 24;
							return _this2.show();

						case 24:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, _this2);
		}))();
	},

	//异常关闭后进入 入口
	init1: function init1(bookUrl, infoUrl, infoName, from, n, data, scrollTop) {
		var _this3 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
			var setting;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_this3.from = from;
							_this3.bookUrl = bookUrl;
							_this3.infoUrl = infoUrl;
							_this3.n = n;

							_context2.next = 6;
							return _this3.getLocalSetting();

						case 6:
							setting = _context2.sent;
							_context2.next = 9;
							return _this3.useLocalSetting(setting);

						case 9:
							_context2.next = 11;
							return _this3.refreshPage3();

						case 11:
							_context2.next = 13;
							return _this3.bindData(infoName, data);

						case 13:
							_context2.next = 15;
							return _this3.scrollTop(scrollTop);

						case 15:
							_context2.next = 17;
							return _this3.bindEvent();

						case 17:
							_context2.next = 19;
							return _this3.show();

						case 19:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, _this3);
		}))();
	},
	loadNextPage: function loadNextPage() {
		var _this4 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
			var info, data;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return _this4.getNextInfoUrl();

						case 2:
							info = _context3.sent;
							_context3.next = 5;
							return _this4.getData(_this4.bookUrl, info.url);

						case 5:
							data = _context3.sent;


							_this4.infoUrl = info.url;
							_this4.n++;

							_context3.next = 10;
							return _this4.bindData(info.name, data);

						case 10:
							_context3.next = 12;
							return _this4.scrollTop();

						case 12:
							_context3.next = 14;
							return _this4.saveTempInfo(info.name, data);

						case 14:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, _this4);
		}))();
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
	setLocalSetting: function setLocalSetting(color, fontSize) {
		var _this5 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
			var oldSetting;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return _this5.getLocalSetting();

						case 2:
							oldSetting = _context4.sent;

							if (color) {
								oldSetting.bg = color;
							}
							if (fontSize) {
								oldSetting.font = fontSize;
							}
							DEVICE.localData.setItem("setting", JSON.stringify(oldSetting));

							_context4.next = 8;
							return _this5.useLocalSetting(oldSetting);

						case 8:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, _this5);
		}))();
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
		click: function click(id) {
			var _this6 = this;

			return _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
				var clickId, otherId;
				return regeneratorRuntime.wrap(function _callee5$(_context5) {
					while (1) {
						switch (_context5.prev = _context5.next) {
							case 0:
								clickId = void 0, otherId = void 0;

								clickId = id == "page3_text_body" ? "page3_text_body" : "page3_bg_body";
								otherId = clickId == "page3_text_body" ? "page3_bg_body" : "page3_text_body";

								if (!_this6.isShow[clickId]) {
									_context5.next = 8;
									break;
								}

								_context5.next = 6;
								return _this6.hide(clickId);

							case 6:
								_context5.next = 13;
								break;

							case 8:
								if (!_this6.isShow[otherId]) {
									_context5.next = 11;
									break;
								}

								_context5.next = 11;
								return _this6.hide(otherId);

							case 11:
								_context5.next = 13;
								return _this6.show(clickId);

							case 13:
							case "end":
								return _context5.stop();
						}
					}
				}, _callee5, _this6);
			}))();
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

//# sourceMappingURL=page3.js.map