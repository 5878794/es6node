"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAGE2 = {
	//之前的页面
	from: "",
	//当前书籍地址
	url: "",
	//当前书名
	name: "",
	//当前书籍是否加入收藏
	hasAdd: "",
	//当前书籍未读的章节dom
	notReadFirstDom: 0,
	//页面初始化
	init: function init(url, name, from) {
		var _this2 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_this2.name = name;
							_this2.url = url;
							_this2.from = from;

							_context.next = 5;
							return _this2.clearOldData();

						case 5:
							_context.next = 7;
							return _this2.bindData();

						case 7:
							_context.next = 9;
							return _this2.scrollToNotReadList();

						case 9:
							_context.next = 11;
							return _this2.bindEvent();

						case 11:
							_context.next = 13;
							return _this2.show();

						case 13:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, _this2);
		}))();
	},

	//显示
	show: function show() {
		var dom = $("#page2"),
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
		var dom = $("#page2"),
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

	//清空数据
	clearOldData: function clearOldData() {
		var dom = $("#page2_body"),
		    list = dom.find(".page2_list_item"),
		    back = $("#page2_back"),
		    add = $("#page2_add");

		$$(list).unbind(true);
		$$(back).unbind(true);
		$$(add).unbind(true);
		dom.html("");
	},

	//绑定数据
	bindData: function bindData() {
		var bookDir = DATA.booksDir[this.url] || [],
		    hasReadUrl = DATA.hasRead[this.url],
		    bookName = this.name,
		    hasAdd = this.checkBookHasAdd(),
		    dom = $("#page2");

		this.hasAdd = hasAdd;

		dom.find(".page2_header").find(".diandian").text(bookName);
		if (hasAdd) {
			dom.find(".page2_header").find(".right").text("");
		} else {
			dom.find(".page2_header").find(".right").html("&#xe62b;");
		}

		var body = $("#page2_body"),
		    list = $("#page2_list_item"),
		    isRead = hasReadUrl ? true : false,
		    notReadFirstDom = 0;

		for (var i = 0, l = bookDir.length; i < l; i++) {
			var this_list = list.clone().css({ display: "block" }).attr({ id: "" }),
			    this_data = bookDir[i],
			    this_name = this_data.name,
			    this_url = this_data.url;

			this_list.data({
				url: this_url,
				n: i
			});
			this_list.text(this_name);
			if (isRead) {
				this_list.addClass("isRead");
			}

			if (this_url == hasReadUrl) {
				isRead = false;
				notReadFirstDom = i;
			}

			body.append(this_list);
		}

		this.notReadFirstDom = notReadFirstDom;
	},

	//滚动到第一个未读的章节
	scrollToNotReadList: function scrollToNotReadList() {
		var domNumber = this.notReadFirstDom,
		    listHeight = $("#page2_list_item").height() + 1,
		    body = $("#page2_body");

		var top = domNumber * listHeight;
		body.animate({ scrollTop: top + "px" }, 300);
	},

	//检查是否已添加至收藏
	checkBookHasAdd: function checkBookHasAdd() {
		var books = DATA.books,
		    hasAdd = false;

		for (var i = 0, l = books.length; i < l; i++) {
			var this_name = books[i].url;
			if (this_name == this.url) {
				hasAdd = true;
				break;
			}
		}

		return hasAdd;
	},

	//绑定事件
	bindEvent: function bindEvent() {
		var back = $("#page2_back"),
		    add = $("#page2_add"),
		    list = $("#page2_body").find(".page2_list_item"),
		    _this = this;

		$$(back).myclickok(function () {
			_this.hide();
		});

		$$(add).myclickok(function () {
			_this.addBook();
		});

		$$(list).myclickok(function () {
			var url = $(this).data("url"),
			    name = $(this).text(),
			    n = $(this).data("n");

			_this.openInfo(url, name, n);
		});
	},

	//添加书籍
	addBook: function addBook() {
		var name = $("#page2").find(".page2_header").find(".diandian").text(),
		    url = this.url,
		    data = DATA.books;

		data.push({
			name: name,
			url: url
		});

		var localData = JSON.parse(DEVICE.localData.getItem("cache") || '{}');
		localData.books = data;
		DEVICE.localData.setItem("cache", JSON.stringify(localData));

		var bookDir = JSON.parse(DEVICE.localData.getItem("bookDir") || '{}');
		var this_dir = DATA.booksDir[url];
		bookDir[url] = this_dir;
		DEVICE.localData.setItem("bookDir", JSON.stringify(bookDir));

		$("#page2").find(".page2_header").find(".right").text("");

		PAGE1.refreshDir();

		DEVICE.info.show("添加成功!", true);
	},

	//打开章节详细
	openInfo: function openInfo(url, name, n) {
		var bookUrl = this.url,
		    infoUrl = url,
		    infoName = name;

		PAGE3.init(bookUrl, infoUrl, infoName, "page2", n).catch(function (e) {
			DEVICE.info.show("获取数据失败!");
		});
	},

	//标示n之前章节为已读
	listShowHasRead: function listShowHasRead(n) {
		var nowList = $("#page2_body").find(".page2_list_item").eq(n);
		nowList.prevAll().addClass("isRead");
		nowList.addClass("isRead");
	}
};

//# sourceMappingURL=page2.js.map