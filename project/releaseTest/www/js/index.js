/**
 * Created by bens on 2018/9/5.
 */



$(document).ready(function(){
	PAGE.init();
});


var PAGE = {
	init:function(){
		this.getProjectList();
		this.addListEvent();

	},
	getProjectList:function(){
		var _this = this;
		$.ajax({
			type: 'get',
			cache: false,
			url: './api/getProjectList',
			data: {},
			contentType:"application/json",
			dataType: "json",
			timeout: 20000,     //20秒
			success: function(rs) {
				rs = rs.data || [];
				_this.createProjectList(rs);
			},
			error: function(err) {
				alert("网络错误,无法连接服务器。");
			}
		});
	},
	createProjectList:function(data){
		var div = $('#div1'),
			select = div.find('select');

		for(var i=0,l=data.length;i<l;i++){
			select.append(
				'<option value="'+data[i].id+'">'+data[i].name+'</option>'
			)
		}

		div.css({display:'block'});
	},
	addListEvent:function(){
		var _this = this;
		$('#project').get(0).addEventListener('change',function(){
			var id = $(this).val();
			if(id){
				_this.getSvnInfo(id);
			}else{
				$('#div2').css({display:'none'});
				$('#div3').css({visibility:'hidden'});
			}
		},false);


		$('#release').click(function(){
			var ver = $('#div2').find('.main').attr('id'),
				id = $('#div1').find('select').val();

			$(this).text('发布中。。。');
			$(this).unbind('click');
			_this.release(id,ver);
		});
	},
	getSvnInfo:function(id){
		var _this = this;
		$.ajax({
			type: 'get',
			cache: false,
			url: './api/getProjectVerList',
			data: {id:id},
			contentType:"application/json",
			dataType: "json",
			timeout: 20000,     //20秒
			success: function(rs) {
				rs = rs.data || [];
				_this.bindSvnInfoList(rs);
			},
			error: function(err) {
				alert("网络错误,无法连接服务器。");
			}
		});
	},
	bindSvnInfoList:function(data){
		var div = $('#div2'),
			body = div.find('.main');

		body.find('p').unbind('click');
		body.html('');

		for(var i=0,l=data.length;i<l;i++){
			var this_data = data[i],
				p = $('<p></p>');

			p.html('<span>版本：</span>'+this_data.ver+'<br/><span>信息：</span>'+this_data.msg+'<br/><span>上传人:</span>'+this_data.name+'<br/><span>时间:</span>'+this_data.date);
			p.attr({id:this_data.ver});
			p.find('span').css({
				color:'#ccc',
				'padding-right':'20px'
			});
			p.click(function(){
				var id = $(this).attr('id');
				body.attr({id:id});
				body.find('p').css({background:''});
				$(this).css({
					background:'#999'
				});
				$('#div3').css({visibility:''})
			});
			body.append(p);
		}

		div.css({display:'block'});
	},
	release:function(id,ver){
		if(!ver || !id){
			alert('请选择版本或项目');
			return;
		}

		$.ajax({
			type: 'get',
			cache: false,
			url: './api/release',
			data: {
				id:id,
				ver:ver
			},
			contentType:"application/json",
			dataType: "json",
			timeout: 2000000,     //20秒
			success: function(rs) {
				rs = rs.data || '';
				$('body').html('<a href="'+rs+'">测试环境地址:'+rs+'</a>');
			},
			error: function(err) {
				alert("网络错误,无法连接服务器。");
			}
		});
	}
}
;