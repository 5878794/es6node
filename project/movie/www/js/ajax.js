"use strict";

// var serverUrl = "http://bensxu.duapp.com/";
var serverUrl = "/movie/";
var loading;

var AJAX = {
	go: function go(url, data, _success) {
		url = serverUrl + url;

		if (!loading) {
			loading = new DEVICE.loading();
		}

		loading.show("急速加载中");

		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function success(rs) {
				rs = rs || {};
				loading.hide();

				if (rs.state == 1) {
					_success(rs.data);
				} else {
					_success({});
				}
			},
			error: function error() {
				loading.hide();
				_success({});
			}
		});
	},
	qq: function qq(opt) {
		var data = opt.data || {},
		    success = opt.success || function () {};

		this.go("api/qq", data, success);
	},
	youku: function youku(opt) {
		var data = opt.data || {},
		    success = opt.success || function () {};

		this.go("api/youku", data, success);
	},
	sohu: function sohu(opt) {
		var data = opt.data || {},
		    success = opt.success || function () {};

		this.go("api/sohu", data, success);
	},
	tudou: function tudou(opt) {
		var data = opt.data || {},
		    success = opt.success || function () {};

		this.go("api/tudou", data, success);
	},
	iqiyi: function iqiyi(opt) {
		var data = opt.data || {},
		    success = opt.success || function () {};

		this.go("api/iqiyi", data, success);
	}

};