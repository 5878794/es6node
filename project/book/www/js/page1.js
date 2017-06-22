"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAGE1 = {

	//初始执行
	init: function init() {
		var _this2 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
			var userData, bookDir;
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_context.next = 2;
							return _this2.bindEvent();

						case 2:
							_context.next = 4;
							return _this2.getLocalUserData();

						case 4:
							userData = _context.sent;

							DATA.books = userData.books;
							DATA.hasRead = userData.hasRead;
							_context.next = 9;
							return _this2.getLocalBookDirData();

						case 9:
							bookDir = _context.sent;

							DATA.booksDir = bookDir;

							_context.next = 13;
							return _this2.createList();

						case 13:
							_context.next = 15;
							return _this2.checkAbnormalClose();

						case 15:
						case "end":
							return _context.stop();
					}
				}
			}, _callee, _this2);
		}))();
	},


	//更新按钮触发
	getNewData: function getNewData() {
		var _this3 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
			var newBookDir, oldBookDir;
			return regeneratorRuntime.wrap(function _callee2$(_context2) {
				while (1) {
					switch (_context2.prev = _context2.next) {
						case 0:
							_context2.next = 2;
							return _this3.getNewBookDirData();

						case 2:
							newBookDir = _context2.sent;
							_context2.next = 5;
							return _this3.reCreateNewBookDirData(newBookDir);

						case 5:
							newBookDir = _context2.sent;
							_context2.next = 8;
							return _this3.getLocalBookDirData();

						case 8:
							oldBookDir = _context2.sent;
							_context2.next = 11;
							return _this3.saveNewBookDirData(oldBookDir, newBookDir);

						case 11:

							DEVICE.info.show("更新成功!", true);

							setTimeout(function () {
								window.location.reload();
							}, 1000);

							// return newBookDir;

						case 13:
						case "end":
							return _context2.stop();
					}
				}
			}, _callee2, _this3);
		}))();
	},


	//获取本地书地址和已读数据
	getLocalUserData: function getLocalUserData() {
		return new Promise(function (success, error) {
			var tempData = [
				// {name:"aa",url:"http://www.biquge.tw/0_4/"},
				// {name:"bb",url:"http://www.biquge.tw/9_9080/"}
			];

			var data = JSON.parse(DEVICE.localData.getItem("cache") || '{}'),
			    books = data.books || tempData,
			    hasRead = data.hasRead || {};

			success({ books: books, hasRead: hasRead });
		});
	},


	//获取本地收藏的书的目录
	getLocalBookDirData: function getLocalBookDirData() {
		return new Promise(function (success, error) {
			var bookDir = JSON.parse(DEVICE.localData.getItem("bookDir") || '{}');
			success(bookDir);
		});
	},


	//获取最新的书的目录
	getNewBookDirData: function getNewBookDirData() {
		var data = [],
		    hasRead = {};
		for (var i = 0, l = DATA.books.length; i < l; i++) {
			var bookUrl = DATA.books[i].url;
			data.push(bookUrl);

			var bookDir = DATA.booksDir[bookUrl] || [],
			    bookLength = bookDir.length - 1,
			    lastPage = bookDir[bookLength] || {};

			hasRead[bookUrl] = lastPage.url;
		}

		return new Promise(function (success, error) {
			AJAX.go("./api/", { books: data, hasRead: hasRead }, success, error);
		});
	},


	//与本地数据合成新的数据
	reCreateNewBookDirData: function reCreateNewBookDirData(data) {
		var oldData = DATA.booksDir;

		return new Promise(function (success, error) {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					oldData[key].push.apply(oldData[key], data[key]);
				}
			}

			success(oldData);
		});
	},


	//保存新的书籍的目录数据
	saveNewBookDirData: function saveNewBookDirData(oldData, data) {
		return new Promise(function (success, error) {
			var newData = {};
			for (var key in oldData) {
				if (oldData.hasOwnProperty(key)) {
					newData[key] = data[key];
				}
			}

			DEVICE.localData.setItem("bookDir", JSON.stringify(newData));
			success();
		});
	},


	//生成本地书本列表
	createList: function createList() {
		var data = DATA.books,
		    body = $("#page1_body"),
		    list = $("#page1_list");

		var old_list = body.find(".page1_list"),
		    dels = old_list.find(".page1_list_del");
		$$(old_list).unbind(true);
		$$(dels).unbind(true);
		$$$(old_list).unbind(true);
		body.html("");

		for (var i = 0, l = data.length; i < l; i++) {
			var this_list = list.clone().css3({ display: "box" }).attr({ id: "" }),
			    this_data = data[i],
			    number = this.getBooksNewDirsNumber(this_data.url);

			this_list.find(".page1_list_name").text(this_data.name);
			this_list.find(".page1_list_number").text(number);
			this_list.data({ url: this_data.url }).attr({ _id: this_data.url });

			body.append(this_list);
			this.dirClickEventBind(this_list);
		}
	},


	//获取书的未读章节数量
	getBooksNewDirsNumber: function getBooksNewDirsNumber(id) {
		var bookDir = DATA.booksDir[id] || [],
		    hasRead = DATA.hasRead[id],
		    n = 0;

		if (!hasRead) {
			return bookDir.length;
		}

		for (var i = 0, l = bookDir.length; i < l; i++) {
			var this_url = bookDir[i].url;
			if (this_url == hasRead) {
				n = i;
				break;
			}
		}

		return bookDir.length - 1 - n;
	},


	//目录事件绑定
	dirClickEventBind: function dirClickEventBind(bookList) {
		$$(bookList).myclickok(function () {
			var url = $(this).data("url"),
			    name = $(this).find(".page1_list_name").text();

			PAGE2.init(url, name, "page1");
		});

		$$$(bookList).myslideleft(function () {
			$(this).cssAnimate({
				transform: "translateX(-60px)"
			}, 300);
		});
		$$$(bookList).myslideright(function () {
			$(this).cssAnimate({
				transform: "translateX(0)"
			}, 300);
		});

		var del = bookList.find(".page1_list_del"),
		    _this = this;
		$$(del).myclickok(function () {
			var url = $(this).parent().data("url");
			_this.delBook(url, $(this).parent());
		});
	},


	//事件绑定
	bindEvent: function bindEvent() {
		var search = $("#page1_search"),
		    refresh = $("#page1_refresh"),
		    _this = this;

		$$(search).myclickok(function () {
			_this.openSearchPage();
		});

		$$(refresh).myclickok(function () {
			_this.getNewData().catch(function () {
				DEVICE.info.show("更新失败!");
			});
		});
	},


	//打开搜索页面
	openSearchPage: function openSearchPage() {
		PAGE4.init("page1");
	},


	//更改未读条数
	refreshNotReadNumber: function refreshNotReadNumber(id, number) {
		$("#page1_body").find(".page1_list_main[_id='" + id + "']").find(".page1_list_number").text(number);
	},


	//刷新目录
	refreshDir: function refreshDir() {
		var _this4 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
			var userData;
			return regeneratorRuntime.wrap(function _callee3$(_context3) {
				while (1) {
					switch (_context3.prev = _context3.next) {
						case 0:
							_context3.next = 2;
							return _this4.getLocalUserData();

						case 2:
							userData = _context3.sent;

							DATA.books = userData.books;
							DATA.hasRead = userData.hasRead;

							_context3.next = 7;
							return _this4.createList();

						case 7:
						case "end":
							return _context3.stop();
					}
				}
			}, _callee3, _this4);
		}))();
	},
	delBook: function delBook(url, obj) {
		var _this5 = this;

		return _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
			var userData, bookDir, books, hasRead, newBooks, i, l, this_url;
			return regeneratorRuntime.wrap(function _callee4$(_context4) {
				while (1) {
					switch (_context4.prev = _context4.next) {
						case 0:
							_context4.next = 2;
							return _this5.getLocalUserData();

						case 2:
							userData = _context4.sent;
							_context4.next = 5;
							return _this5.getLocalBookDirData();

						case 5:
							bookDir = _context4.sent;
							books = userData.books, hasRead = userData.hasRead;
							newBooks = [];

							for (i = 0, l = books.length; i < l; i++) {
								this_url = books[i].url;

								if (this_url != url) {
									newBooks.push(books[i]);
								}
							}

							delete bookDir[url];

							_context4.next = 12;
							return _this5.saveNewBookDirData(bookDir, bookDir);

						case 12:
							DEVICE.localData.setItem("cache", JSON.stringify({
								books: newBooks,
								hasRead: hasRead
							}));

							DATA.books = newBooks;
							DATA.hasRead = hasRead;
							DATA.booksDir = bookDir;

							obj.remove();

							DEVICE.info.show("删除成功!", true);

						case 18:
						case "end":
							return _context4.stop();
					}
				}
			}, _callee4, _this5);
		}))();
	},

	//检查是否异常关闭
	checkAbnormalClose: function checkAbnormalClose() {
		var temp = JSON.parse(DEVICE.localData.getItem("temp") || '{}'),
		    scrollTop = DEVICE.localData.getItem("temp_scroll");

		//判断是否异常关闭
		if (!temp.title) {
			return;
		}

		//判断本地缓存中书的详细目录中是否有这个书的地址
		if (!DATA.booksDir[temp.bookUrl]) {
			return;
		}

		PAGE2.init(temp.bookUrl, temp.title, "page1").then(function () {
			PAGE3.init1(temp.bookUrl, temp.infoUrl, temp.title, "page2", temp.n, temp.text, scrollTop);
		});
	}
};

//# sourceMappingURL=page1.js.map