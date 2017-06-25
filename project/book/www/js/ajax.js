// var serverUrl = "http://bensxu.duapp.com/";
// var serverUrl = "/book/api";
var loading;

var AJAX = {
	go: function(url, data, success,error) {
		if(!loading){
			loading = new DEVICE.loading();
		}

		loading.show("急速加载中");

		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: JSON.stringify(data),
			contentType:"application/json;charset=UTF-8",
			dataType: "json",
			timeout: 15000,
			success: function(rs) {
				rs = rs || "";
				loading.hide();

				if(rs.state == 1){
					success(rs.data);
				}else{
					error();
				}



			},
			error: function() {
				loading.hide();
				error();
			}
		});
	}

};