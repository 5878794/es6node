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
				alert('请输入需要查询的防伪码');
			}
		})
	},
	getData:function(code) {
		var _this = this,
			imageDom = $('#images');

		imageDom.html('');

		this.loading.show('查询中');
		$.ajax({
			url: "http://viaila.hyxmt.cn/ServiceAPI/usercenter/Manager.aspx",
			type: "GET",
			catch:false,
			data: {
				action:'queryfw',
				FWcode: code
			},
			dataType: "jsonp", //指定服务器返回的数据类型
			success: function (data) {
				_this.loading.hide();
				alert(data.messages);
			},
			error: function () {
				_this.loading.hide();
				alert('网络错误,请稍后在试!');
			}
		})
	}
};