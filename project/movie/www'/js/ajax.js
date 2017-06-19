// var serverUrl = "http://bensxu.duapp.com/";
var serverUrl = "/movie/";
var loading;

var AJAX = {
	go: function(url, data, success) {
		url = serverUrl + url;

		if(!loading){
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
			success: function(rs) {
				rs = rs || {};
				loading.hide();

				success(rs);

			},
			error: function() {
				loading.hide();
				success({});
			}
		});
	},
	qq: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("api/qq", data, success);
	},
	youku: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("api/youku", data, success);
	},
	sohu: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("api/sohu", data, success);
	},
	tudou: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("api/tudou", data, success);
	},
	iqiyi: function(opt) {
		var data = opt.data || {},
			success = opt.success || function() {};

		this.go("api/iqiyi", data, success);
	}

};
