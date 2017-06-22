"use strict";

// var serverUrl = "http://bensxu.duapp.com/";
// var serverUrl = "/book/api";
var loading;

var AJAX = {
	go: function go(url, data, _success, _error) {
		if (!loading) {
			loading = new DEVICE.loading();
		}

		loading.show("急速加载中");

		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: JSON.stringify(data),
			contentType: "application/json;charset=UTF-8",
			dataType: "json",
			timeout: 15000,
			success: function success(rs) {
				rs = rs || "";
				loading.hide();

				if (rs.state == 1) {
					_success(rs.data);
				} else {
					_error();
				}
			},
			error: function error() {
				loading.hide();
				_error();
			}
		});
	}

};