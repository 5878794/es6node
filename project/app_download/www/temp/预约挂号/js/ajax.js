//var otherUrl = "http://118.123.173.101:7001/api/"; //第三方项目url 测试环境
//var otherUrl = "http://172.16.12.10:8080/api/"; //第三方项目url 本地环境
var
	// __server__ = "http://118.123.173.101:7001/",
	__server__ = "http://phr.care4u.cn/",
	otherUrl = __server__+"api/",
	smsUrl = __server__+"HealthServer/",
	regUrl = __server__ + "healthweixin/preRegPlatform/",
	appKey = "qiNWUrR5ILoZFnXJjZQo6jPcNr5rvz0akt",
	// appKey = "aoqsh9VdYzAfVC6XDlub9gnxwSLvNngjqt"
	testUrl='http://118.123.173.101:7001/api/home/get/area.do',
	// 居民健康卡
	HealthCard='http://118.123.173.101:7001/api/record/';

var AJAX = {
	go: function(url, data, success, error) {
		url = SYS.serverUrl + url;
		JK.loading.show("急速加载中");
		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				JK.loading.hide();

				var state = rs.status;
				if(state == 1) {

					var data = rs.data;

					success(data);
				} else {
					var errCode = rs.code;
					//token过期  或  未登陆
					if(errCode == "032") {
						if(error) {
							error();
							return;
						}
						JK.reLogin();
					} else {
						var msg = rs.codeMsg;

						JK.info.showError(msg);
					}
				}
			},
			error: function() {
				JK.loading.hide();
				JK.noListShow.netWorkErr();
				//JK.info.showError("请检查网络");
			}
		});
	},
	errorBack: function(rs) {
		if(rs.stateCode) {
			return true;
		}
		return false;
	},
	go1: function(url, data, success) {
		url = otherUrl + "ws/restful/service/" + url;
	//	console.log(SYS.isApp)
		if(SYS.isApp) {
			JK.loading.show("急速加载中");
		} else {
			var a = new DEVICE.loading();
			a.show("loading");
		}
		var _this = this;
		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}
				var state = rs.msgHeader.code;
				if(state == "0") {
					var data = rs;
					success(data);
				} else {
					WD.alert("提示", rs.msgHeader.desc);
				}
			},
			error: function() {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}
				WD.alert("提示", "网络错误!");
				//JK.noListShow.netWorkErr();
				//JK.info.showError("请检查网络");
			}
		});
	},
    goInfo: function(url, data, success) {
        url = otherUrl  + url;
        //	console.log(SYS.isApp)
        if(SYS.isApp) {
            JK.loading.show("急速加载中");
        } else {
            var a = new DEVICE.loading();
            a.show("loading");
        }
        var _this = this;
        $.ajax({
            type: "post",
            cache: false,
            url: url,
            data: data,
            //contentType:"application/json",
            dataType: "json",
            timeout: 60000,
            success: function(rs) {
                if(SYS.isApp) {
                    JK.loading.hide();
                } else {
                    a.hide();
                    a.destroy();
                }
               // console.log(rs);
                var state = rs.state;
                if(state == "1") {
                     data = rs.data;
                    success(data);
                } else {
                    WD.alert("提示", rs.msg);
                }
            },
            error: function() {
                if(SYS.isApp) {
                    JK.loading.hide();
                } else {
                    a.hide();
                    a.destroy();
                }
                WD.alert("提示", "网络错误!");
                //JK.noListShow.netWorkErr();
                //JK.info.showError("请检查网络");
            }
        });
    },
	go2: function(url, data, success) { //获取token
		var _this = this;
		if(SYS.isApp) {
			JK.loading.show("急速加载中");
		} else {
			var a = new DEVICE.loading();
			a.show("loading");
		}
		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}
				if(rs.return_code == "SUCCESS") {
					return success(rs);
				} else {
					//JK.info.showError("请检查网络");
					WD.alert("提示", "无法连接服务器!");
					return;
				}
			},
			error: function() {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}
				WD.alert("提示", "网络错误!");
				//JK.info.showError("请检查网络");
			}
		});
	},

	
	go3: function(url, data, success){
		var _this = this;

		if(SYS.isApp) {
			JK.loading.show("急速加载中");
		} else {
			var a = new DEVICE.loading();
			a.show("loading");
		}

		$.ajax({
			type: "post",
			cache: false,
			url: url,
			data: data,
			//contentType:"application/json",
			dataType: "json",
			timeout: 60000,
			success: function(rs) {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}

				if(rs.stateCode == "success") {
					success(rs.data);
				} else {
					//JK.info.showError("请检查网络");
					WD.alert("提示", "获取验证码错误,请重试!");
				}
			},
			error: function() {
				if(SYS.isApp) {
					JK.loading.hide();
				} else {
					a.hide();
					a.destroy();
				}
				WD.alert("提示", "网络错误!");
				//JK.info.showError("请检查网络");
			}
		});
	}
};

var myPhone, myUserId, openId;
var storage = window.sessionStorage;

var WD = {
	init: function() {
		myPhone = storage.getItem("myPhoness");
		myUserId = storage.getItem("myUserIds");
		openId = storage.getItem("myOpenId");
	},
	alert: function(msg, title, callback) {
		if(SYS.isApp) { //app
			JK.alert(msg, title, callback);
		} else {
			alert(title);
			callback ? callback() : function() {};
		}
	},
	//获取第三方token objFun 回调方法
	getToken: function(objFun) {
		AJAX.go2(otherUrl + "auth.do?appkey="+appKey, "", function(res) {
			if(res.return_code == "SUCCESS") {
				return objFun(res.token);
			}
		});
	},
	openUrl: function(url, data) {
		var urlData = "";
		var urlEed = "";
		if(data) {
			for(var item in data) {
				urlData += item + "=" + data[item] + "&"; //key所对应的value
			}
			urlEed = urlData.substr(0, urlData.length - 1);
		}
		if(SYS.isApp) { //app
			if(data) {
				JK.openUrl(window.location.origin + "/" + url + '?' + urlEed);
			} else {
				JK.openUrl(window.location.origin + "/" + url);
			}
		} else {
			if(data) {
				window.location.href = url + '?' + urlEed;
			} else {
				window.location.href = url;
			}
		}
		//window.location.href =url+'?'+ urlEed;
	},
	user: {
		getInfo: function(success) {
			if(SYS.isApp) { //app
				if(YJH && YJH.AppUserInfoManager) {
					JK.user.getInfo(success);
				} else {
					WD.getInfo(success)
				}
			} else {
				if(openId && myUserId){
					//已注册
					var userId = {
						"token": openId,
						"userId": myUserId
					};
					return success(userId);
				}else{
					//未注册,调用快速注册,弹窗

					FastReg.init();
				}
			}
		}
	},
	select: function(sex, nl, datapush, success) {
		if(SYS.isApp) {
			if(YJH && YJH.AppUserInfoManager) {
				JK.select("", "", datapush, function(key) {
					if(key) {
						$('#sex').find('b').text(key);
					}
				});
			} else {
				DEVICE.showBottomList3(
					datapush, //数据
					function(rs) {
						$('#sex').find('b').text(rs.text());
					}
				);
			}
		} else {
			DEVICE.showBottomList3(
				datapush, //数据
				function(rs) {
					$('#sex').find('b').text(rs.text());
				}
			);
		}
	},
	getInfo: function(success) {
		YJH.H5ModuleManager.getValue(function(rs) {
			SYS.userToken = rs.result;
			success(rs);
		}, function(rs) {
			WD.alert("提示", "获取用户信息失败!")
		}, "userInfo");
	}
};
WD.init();


var FastReg = {
	iconPhone:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA0CAYAAAD46nqNAAAAAXNSR0IArs4c6QAAAjdJREFUaAXtmb9Kw1AUxk0oxFKQiqAdBB+goG7u4uoacWkp9s8L+BAOPoEBS0tAcHUVX0AHFZzt4FARcWls45D4nZKUEHriobZNh3sh5N7vnHvPL18y5WhLsdFsNpdj0lyXlUplEC2o0cKyrA3P884xPcBVIC3F0UXtW13XT2u12rvWbrfX+/3+E8S0weKedLPZ7E4GcGcxuC9N055933fjO2a5Rk0DNbdRYzWoUyC2DAL7CAw1zK8xr9Tr9e9ZwnBn423mBoPBJRhMyiE2HYutYEMvn8+fNBqNVOCIoVQqOcSAaY/WxKbTJBgvpmkOA6GQxj1geAlrjwBh508opn2PsowA04bi6itAzhmprhyUOsXlKQc5Z6S6clDqFJenHOSckerKQalTXJ5ykHNGqisHpU5xecpBzhmprhyUOsXlKQc5Z6S6clDqFJenHOSckerKQalTXJ5ykHNGqisHpU5xeQvvYIYj/0tH8+cYP7kPkTdsBiXk+/ile4OmzFVCDhuaCDDoTNk4VfQG8CBH2HNHnSOWhAmICsT3VqvVD7jyENcT1ve0JyHOhiZyEHAeTtxD47GAHl/iQ6Ln5qFB2EX/hYVICkQBjaTEcTEqPE6fgjZiiT590bbtlSkc/q8jAoZieAgBdmiBDznnOE4rTUiqTQzEQkz4lF61CwwINRJoQHRwo1bUXLudqEevtRjCYU4sltZqtdZc131EYJPERRmAezMMY1cvl8ufNCFawHUWALBDLMREbL8lPKrjpl992gAAAABJRU5ErkJggg==",
	iconYZM:"data:image/png;base64,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",
	buttonYZM:null,
	buttonSubmit:null,
	inputPhone:null,
	inputYZM:null,
	dom:null,
	callback:null,
	init:function(callback){
		this.callback = callback;
		this.createDiv();
		this.bindSendSMSButton();
		$("body").append(this.dom);
		// callback(openId,myUserId);
	},
	createDiv:function(){
		var div = $("<div></div>");
		div.addClass("center").css({
			width:"100%",
			height:"100%",
			background:"rgba(0,0,0,0.5)",
			position:"fixed",
			left:0,top:0,
			"z-index":"10000",
			"font-size":"0.4rem"
		});
		var main = $("<div></div>");
		main.addClass("border_box").css3({
			width:"5.7rem",
			height:"5.5rem",
			background:"#fff",
			padding:"0 0.27rem",
			"border-radius":"0.2rem"
		});
		var title = $("<div>快速注册</div>");
		title.css({
			width:"100%",
			height:"1.2rem",
			"text-align":"center",
			"line-height":"1.4rem"
		});
		div.append(main);
		main.append(title);

		var label = $("<label></label>");
		label.addClass("box_h").addClass("center_s").css({
			width:"100%",
			height:"1.16rem",
			"border-bottom":"0.01rem solid #ccc",
			"font-size":"0.25rem"
		});
		var label1 = label.clone();

		var span = $("<span></span>");
		span.css3({
			display:"block",
			width:"0.7rem",
			height:"1.16rem",
			"text-align":"right",
			background:"url("+this.iconPhone+") no-repeat center center",
			"background-size":"0.4rem 0.52rem"
		});
		var span1 = span.clone().css3({
			background:"url("+this.iconYZM+") no-repeat center center",
			"background-size":"0.48rem 0.56rem"
		});

		var input = $("<input type='tel' placeholder='输入手机号' />");
		input.addClass("boxflex1").css({
			display:"block",
			height:"0.4rem",
			"font-size":"0.3rem",
			"margin":"0 0.2rem",
			"font-weight":"lighter"
		});
		var input1 = input.clone().attr({placeholder:"输入验证码"});

		var sendSms = $("<div>发送短信</div>");
		sendSms.css({
			display:"block",
			width:"1.9rem",
			height:"0.84rem",
			"text-align":"center",
			"line-height":"0.84rem",
			background:"rgb(234,140,81)",
			color:"#fff",
			"letter-spacing":"0.02rem",
			"font-size":"0.3rem",
			"border-radius":"0.1rem",
			"font-weight":"lighter"
		});

		label.append(span).append(input);
		label1.append(span1).append(input1).append(sendSms);

		var submit = $("<div>注册</div>");
		submit.css3({
			width:"100%",
			height:"1rem",
			"text-align":"center",
			"line-height":"1rem",
			"margin-top":"0.65rem",
			background:"#ccc",
			color:"#fff",
			"border-radius":"0.2rem"
		});

		main.append(label).append(label1).append(submit);

		this.dom = div;
		this.buttonSubmit = submit;
		this.buttonYZM = sendSms;
		this.inputPhone = input;
		this.inputYZM = input1;
	},
	bindEvent:function(data){
		var _this = this;
		$(this.buttonSubmit).css({
			background:"rgb(29,173,232)"
		});

		$$(this.buttonSubmit).myclickok(function(){
			if(_this.checkInput()){
				_this.submit(data);
			}
		}).myclickdown(function(){
			$(this).css({opacity:0.5})
		}).myclickup(function(){
			$(this).css({opacity:1})
		});
	},
	checkInput:function(){
		var phoneNumber = $.trim(this.inputPhone.val()),
			pzmNumber = $.trim(this.inputYZM.val());

		if(phoneNumber.length != 11){
			WD.alert("提示","请输入11位手机号码!");
			return false;
		}

		if(pzmNumber.length != 5){
			WD.alert("提示","请输入正确的验证码!");
			return false;
		}

		return true;
	},
	bindSendSMSButton:function(){
		var _this = this;

		var sms = new DEVICE.btnSendSmsInterval({
			//按钮
			dom:this.buttonYZM,
			//电话号码输入框
			phone:this.inputPhone,
			//按钮可以点击的class名
			canClickClass:{
				background:"rgb(234,140,81)"
			},
			//按钮不能点击的class
			canNotClickClass:{
				background:"#ccc"
			},
			//电话号码验证失败执行
			error:function(text){
				WD.alert("","请输入正确的电话号码!")
			},
			//清除失败时的样式，未更改样式可以不传
			clearError:function(){

			},
			//电话号码验证成功执行ajax函数
			ajaxFn:function(){
				//ajax。。。
				AJAX.go3(smsUrl+"vercode.do", {
					number:$.trim(_this.inputPhone.val()),
					type:6,
					appType:2
				}, function(data) {
					_this.bindEvent(data);
					//ajax成功后执行，开始倒计时
					sms.startInterval();
				});
			},
			//倒计时时间
			intervalTime:60,
			//倒计时按钮显示的文字，{x}为变量。
			intervalText:"{x}秒后重试"
		});
	},
	submit:function(data){
		var _this = this;
		AJAX.go3(regUrl+"login.do", {
			phone:$.trim(_this.inputPhone.val()),
			vercodeToken:data.token,
			vercode:$.trim(_this.inputYZM.val()),
			openId:openId
		}, function(data1) {
			storage.setItem("myPhoness", (data1.phone||""));
			storage.setItem("myUserIds", (data1.userId||""));
			storage.setItem("myOpenId", (data1.openId||""));
			WD.init();
			_this.destroy();
		});
	},
	destroy:function(){
		$$(this.buttonYZM).unbind(true);
		$$(this.buttonSubmit).unbind(true);
		this.dom.remove();
		this.callback();
	}
};