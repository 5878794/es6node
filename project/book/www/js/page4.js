"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAGE4 = {
	from: "",
	init: function init(from) {
		var _this2 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_this2.from = from;
							_context.next = 3;
							return _this2.refresh();

						case 3:
							_context.next = 5;
							return _this2.show();

						case 5:
							_context.next = 7;
							return _this2.bindEvent();

						case 7:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, _this2);
		}))();
	},
	search: function search() {
		var _this3 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
			var inputVal, data;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _this3.checkInput();

						case 2:
							inputVal = _context2.sent;
							_context2.next = 5;
							return _this3.searchBQ(inputVal);

						case 5:
							data = _context2.sent;


							_this3.bindData(data);
							_this3.cacheData(data);
							_this3.bindListEvent();

						case 9:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, _this3);
		}))();
	},

	//显示
	show: function show() {
		var dom = $("#page4"),
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

	//隐藏
	hide: function hide() {
		var dom = $("#page4"),
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

	//重载页面
	refresh: function refresh() {
		var back = $("#page4_back"),
		    input = $("#page4_search"),
		    search = $("#page4_search_btn"),
		    body = $("#page4_body"),
		    list = body.find(".page4_list");

		$$(list).unbind(true);
		$$(back).unbind(true);
		$$(search).unbind(true);
		input.val("");
		body.html("");
	},

	//事件绑定
	bindEvent: function bindEvent() {
		var back = $("#page4_back"),
		    search = $("#page4_search_btn"),
		    _this = this;

		$$(back).myclickok(function () {
			_this.hide();
		});

		$$(search).myclickok(function () {
			_this.search().catch(function (msg) {
				DEVICE.info.show(msg);
			});
		});
	},

	//检查输入框
	checkInput: function checkInput() {
		return new Promise(function (success, error) {
			var input_val = $.trim($("#page4_search").val());

			if (input_val == "") {
				error("请输入要搜索的内容");
			} else {
				success(input_val);
			}
		});
	},

	//获取数据
	searchBQ: function searchBQ(val) {
		return new Promise(function (success, error) {
			AJAX.go("./api/search", { val: val }, function (rs) {
				if (rs && rs.name) {
					success(rs);
				} else {
					error("未找到该书籍");
				}
			}, error);
		});
	},

	//数据绑定
	bindData: function bindData(data) {
		var body = $("#page4_body"),
		    list = $("#page4_list");

		var oldList = body.find(".page4_list");
		$$(oldList).unbind(true);
		body.html("");

		var this_list = list.clone().css({ display: "block" }).attr({ id: "" });

		this_list.find(".page4_list_name").text(data.name);
		this_list.data({ url: data.url });
		this_list.find(".page4_list_worker").text(data.worker);
		this_list.find(".page4_list_info").text(data.info);

		body.append(this_list);
	},

	//缓存数据
	cacheData: function cacheData(data) {
		var url = data.url,
		    dir = data.dir;

		DATA.booksDir[url] = dir;
	},

	//列表事件绑定
	bindListEvent: function bindListEvent() {
		var body = $("#page4_body"),
		    list = body.find(".page4_list"),
		    _this = this;

		$$(list).myclickok(function () {
			var url = $(this).data("url"),
			    name = $(this).find(".page4_list_name").text();

			PAGE2.init(url, name, "page4");
		});
	}
};

//# sourceMappingURL=page4.js.map