/**
 * Created by bens on 2017/12/25.
 */



$(document).ready(function(){
	page.init();
});



var page = {
	loading:null,
	init:function(){
		this.loading = new DEVICE.loading();
		this.bindEvent();
	},
	bindEvent:function(){
		var input = $('#code'),
			_this = this;

		$('#submit').click(function(){
			var val = $.trim(input.val());
			if(val){
				_this.getData(val);
			}else{
				alert('请输入需要查询代理的微信号、手机号或代理授权编号进行查询');
			}
		})
	},
	getData:function(code) {
		var _this = this,
			imageDom = $('#images');

		imageDom.html('');

		this.loading.show('查询中');
		$.ajax({
			url: "http://hccrm.bj.bdysite.com/shouquan_api.php",
			type: "GET",
			data: {
				queryString: code
			},
			dataType: "jsonp", //指定服务器返回的数据类型
			success: function (data) {

				if(data.code==0){
					_this.loading.hide();
					alert(data.msg);
				}else{
					var src = data.image,
						img = new Image();

					img.onload = function(){
						_this.loading.hide();
						imageDom.append(img);
					};
					img.src = src;
				}
			},
			error: function () {
				_this.loading.hide();
				alert('网络错误,请稍后在试!');
			}
		})
	}
};