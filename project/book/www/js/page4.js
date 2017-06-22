"use strict";

var PAGE4 = {
	from: "",
	init: async function init(from) {
		this.from = from;
		await this.refresh();
		await this.show();
		await this.bindEvent();
	},
	search: async function search() {
		var inputVal = await this.checkInput();
		var data = await this.searchBQ(inputVal);

		this.bindData(data);
		this.cacheData(data);
		this.bindListEvent();
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