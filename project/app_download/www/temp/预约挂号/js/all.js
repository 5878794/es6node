/**
 * Created by beens on 16/5/24.
 */

SYS = {
	//是否是app
	isApp: true,
	//服务器地址
	serverUrl: "",
	apiUrl: "",
	localUrl: "", //
	otherUrl: "", //第三方项目url token
	imgUrl: "", //部分图片地址前缀
	//商城banner跳转地址
	//mallBannerLink:"http://www.baidu.com",
	//客服电话
	mallAdvisoryTel: "4001158811",
	mallAdvisoryTel1: "400-115-8811",
	//意见反馈默认显示文字
	chatWelcomeText: "请留言建议，我们将第一时间回复您",
	//分享图标地址
	shareIcon: "",
	//分享地址
	shareUrl: ""
};

(function() {
	$(document).ready(function() {
		init();
	});
	document.addEventListener("deviceready", function() {
		init();
	}, false);

	var aa = 0;
	var init = function() {
		aa++;
		var n = (SYS.isApp) ? 2 : 1;
		if(aa >= n) {
			if(SYS.isApp) {
				JK.getServerUrl(function(src) {
					SYS.serverUrl = src;
					src = src.substr(0, src.length - 1);
					src = src.substr(0, src.lastIndexOf("/"));

					SYS.apiUrl = src + "/api/";
					SYS.otherUrl = src + "/";
					SYS.shareIcon = src + "/wx/icon.png";
					SYS.shareUrl = src + "/wx/news_detail.html";
					SYS.imgUrl = src + "/HealthWeb/";
					PAGE.init();
				});
			} else {
				PAGE.init();
			}
		}
	};
})();

//顶部信息按钮点击事件
var msgBtnClick = function() {
	JK.openUrl("personal_center/myNews.html");
};

//改变viewport大小
// (function() {
// 	var psd_width = 640,
// 		win_width = window.outerWidth || window.innerWidth,
// 		viewport = document.querySelector('meta[name="viewport"]'),
// 		dpr = window.devicePixelRatio || 1,
// 		scale = 1 / dpr,
// 		rem;
//
// 	//viewport.setAttribute('content', 'width=' + dpr * win_width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
//
// 	$(viewport).remove();
// 	$("head").append('<meta name="format-detection" content="telphone=no, email=no"/><meta name="viewport" content="width='+psd_width+',user-scalable=no,target-densitydpi=device-dpi">');
// 	var style = document.createElement('style');
// 	//win_width = window.innerWidth;
// 	win_width = psd_width;
// 	rem = win_width / psd_width * 100;
//
// 	style.innerHTML = "html{font-size:" + rem + "px!important;}";
// 	document.querySelector("head").appendChild(style);
//
// 	$(window).resize(function() {
// 		win_width = window.innerWidth;
// 		rem = win_width / psd_width * 100;
// 		style.innerHTML = "html{font-size:" + rem + "px!important;}";
// 	});
//
// })();
(function(){
	var psd_width = 640,
		win_width = window.innerWidth,
		viewport = document.querySelector('meta[name="viewport"]'),
		// dpr = window.devicePixelRatio || 1,
		// scale = 1 / dpr,
		rem;

	//设置meta
	if(viewport){
		viewport.setAttribute('content', 'width= device-width,initial-scale=1,maximum-scale=1, minimum-scale=1,user-scalable=no');
	}else{
		$("head").append('<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1">');
	}


	//设置页面字体,可使用rem
	var style = document.createElement('style');
	win_width = window.innerWidth;
	rem = win_width/psd_width*100;

	style.innerHTML = "html{font-size:"+rem+"px!important;}";
	document.querySelector("head").appendChild(style);

	//有些浏览器viewport宽度获取不准确
	//因此初始不停刷新页面字体
	var temp_interval = setInterval(function () {

		win_width = window.innerWidth;
		var _rem = win_width/psd_width*100;
		console.log(win_width,psd_width,rem)
		if(rem != _rem){
			rem = _rem;
			style.innerHTML = "html{font-size:"+rem+"px!important;}";
		}
	},500);
	//10秒后取消自动刷新
	setTimeout(function(){
		clearInterval(temp_interval);
	},10000);


	//页面大小变化刷新
	$(window).resize(function(){
		win_width = window.innerWidth;
		rem = win_width/psd_width*100;
		style.innerHTML = "html{font-size:"+rem+"px!important;}";
	});
})();





var JK = {
	//设置标题
	setTitle: function(text) {
		YJH.H5NativeAppInfo.setNavBarTitle(text);
	},
	//显示提示信息 文本
	info: {
		//@param msg:   str    要提示的文字
		showText: function(msg) {
			YJH.H5ProgressHUD.showInfo(msg);
		},
		showSuccess: function(msg) {
			YJH.H5Dialogs.showSuccess(msg);
		},
		showError: function(msg) {
			YJH.H5Dialogs.showError(msg);
		}
	},
	//loading 显示、隐藏
	//loading:{
	//    n:0,
	//    //@param msg:  str   要提示的文字
	//    show:function(msg){
	//
	//
	//        msg = msg || "loading";
	//        YJH.H5ProgressHUD.showLoading(msg,1000);
	//    },
	//    hide:function(){
	//        YJH.H5ProgressHUD.hideLoading();
	//    }
	//},
	loading: (function() {
		var n = 0;

		var show = function(msg) {
			n++;
			if(n == 1) {
				msg = msg || "loading";
				YJH.H5ProgressHUD.showLoading(msg, 1000);
			}
		};
		var hide = function() {
			n--;
			if(n == 0) {
				YJH.H5ProgressHUD.hideLoading();
			}
		};

		return {
			show: show,
			hide: hide
		}
	})(),
	//数据缓存、获取
	//key不存在获取的时候返回空字符串
	cache: {
		//@param   key:     str    要缓存的数据的键
		//@param   val:     任意形式   要缓存的数据的值
		//@param   success: function  执行成功回调
		save: function(key, val, success) {
			success = success || function() {};
			YJH.H5ModuleManager.setValueForKey(
				function() {
					success();
				},
				function(bb) {

				},
				key,
				val
			)
		},
		//@param   key:     str    要获取的数据的键
		//@param   success: function  执行成功回调并返回对应key的值，如key未缓存返回空字符串
		get: function(key, success) {
			success = success || function() {};
			YJH.H5ModuleManager.getValue(
				function(aa) {
					aa = aa.result || "";
					//统一android和ios统一返回字符串
					if(typeof aa != "string") {
						aa = JSON.stringify(aa);
					}
					success(aa);
				},
				function(bb) {
					success("");
				},
				key
			);
		}
	},
	//调用系统的alert
	//@param  title:     str    标题
	//@param  msg:       str    信息
	//@param  callback   function  点击确定执行回调函数
	alert: function(title, msg, callback) {
		callback = callback || function() {};
		title = title || "系统提示";
		YJH.H5Dialogs.alert(msg.toString(), callback, title);
	},
	//调用系统的confirm
	//@param  title:     str    标题
	//@param  msg:       str    信息
	//@param  success   function  点击确定执行回调函数
	//@param  cancel   function  点击取消执行回调函数
	confirm: function(title, msg, success, cancel) {
		if(SYS.isApp){
			YJH.H5Dialogs.confirm(
				msg,
				function(aa) {
					aa = aa.buttonIndex;
					if(aa == 1) {
						cancel();
					} else {
						success();
					}
				},
				title, ["取消", "确定"]
			)
		}else{
			if(confirm(msg)){
				success();
			}
		}


	},
	/**
	 *
	 * @param success  成功回调
	 * @param error    失败回调
	 * @param type     选择器类型，0 表示 时间选择器，1表示自定义选择器
	 * @param dataSouce    如果是使用时间选择器，则需要传递当前的时间 时间格式为yyyy-MM-dd 默认值为""表示当前时间.
	 *                      如果是使用自定义选择器，参数则是数组类型，系统会根据数组的组成方式进行解析.
	 * @param title    标题，默认为不现实.
	 */
	showPickerView: function(success, error, type, dataSouce, title) {
		YJH.H5NativeUIManager.showPickerView(success, error, type, dataSouce, title)
	},
	//获取app列表  安装、卸载app
	app: {
		//获取应用列表
		getList: function(success, error) {
			YJH.H5ModuleManager.requestH5AppList(
				success,
				error
			)
		},
		//安装应用  opt参数要转换服务器的参数
		install: function(id, success, error) {
			success = success || function() {};
			YJH.H5ModuleManager.installation(function(rs) {
				success(rs);
			}, function(err) {
				console.log("安装应用失败")
				console.log(err);
				error();
				JK.info.show("载入应用失败，请重试！");
			}, id)
		},
		//卸载应用
		unInstall: function(id, success, error) {
			success = success || function() {};
			error = error || function() {};
			YJH.H5ModuleManager.uninstall(success, error, id);
		},
		open: function(id) {
			var open = function() {
				YJH.H5ModuleManager.openH5App({
					h5Id: id,
					relativeUrl: ""
				});
			};

			var checkHasToken = function() {
				JK.user.getInfo(function(rs) {
					var token = rs.token || "";
					if(token) {
						open();
					} else {
						JK.reLogin();
					}
				})
			};

			checkHasToken();
		},
		close: function(url) {
			YJH.H5ModuleManager.closeH5App({
				url: url
			});
		}
	},
	//打开下一级页面
	//@param url:str   相对于项目的相对地址
	openUrl: function(url) {
		if(YJH && YJH.AppUserInfoManager){
			YJH.H5ModuleManager.openWebInApp(url);
		}else{
			window.location.href=url;
		}
	},
	//先从本地获取图片，没有就下载图片保存本地并返回图片的base64
	//@param  url:   str    一般为在线图片地址
	//@param  success:  function   成功后返回图片的base64，失败返回在线地址
	saveImageGetLocalUrl: function(url, success) {
		YJH.Cameramethod.fetchPic([url], function(rs) {
			rs = rs.result;
			if(rs) {
				success(rs);
			}
		}, function(msg) {
			//失败直接使用网上地址
			success(url);
		})
	},
	//获取服务器server地址
	//@param  success:  function   返回服务器的地址前缀
	getServerUrl: function(success) {
		JK.cache.get("AppNetWorkBaseUrl", success)
	},
	//底部弹出选择列表 类似select
	//@param title:    str   标题
	//@param msg:      str   说明文字
	//@param value:    array 选择的列表 [{key:1,val:男},{key:2,val:"女"}]
	//@param callback：function 返回选择的数组下标  取消返回空
	select: function(title, msg, values, callback) {
		var val = [];
		for(var i = 0, l = values.length; i < l; i++) {
			val.push(values[i].val);
		}

		YJH.H5Dialogs.actionSheet(
			msg,
			function(aa) {
				aa = aa.buttonIndex;

				if(aa == 0) {
					callback("");
				} else {
					callback(values[aa - 1].key);
				}
			},
			title,
			val
		);
	},
	//获取本地图片（附带编辑）
	//@param  success:  function   成功回调选择的图片的base64
	//@param  error:  function   失败回调返回错误信息，取消也会执行失败回调
	getLocalImage: function(success, error) {
		YJH.Cameramethod.getThePicture(
			function(aa) {
				var state = aa.status;
				if(state == 0) {
					success(aa.result.result)
				} else {
					error(aa.result);
				}
			}
		)
	},
	//用户登录（密码、短信登陆）  获取用户信息
	user: {
		//用户名、密码登陆
		//@param  username:str    登陆用户名
		//@param  password:str    登陆密码
		//@param  success:function   登陆成功返回用户信息
		//@param  error:function     登陆失败回调
		login: function(username, password, success, error) {
			YJH.AppUserInfoManager.requestLogin(
				success,
				error,
				"1",
				username, //"18583702682",
				password, //"123456"
				""
			)
		},
		//用户名、短信登陆
		//@param  username:str    登陆用户名
		//@param  sms:str          短信验证码
		//@param  success:function   登陆成功返回用户信息
		//@param  error:function     登陆失败回调
		smsLogin: function(username, sms, text, success, error) {
			YJH.AppUserInfoManager.requestLogin(
				success,
				error,
				"2",
				username,
				sms,
				text
			)
		},
		//获取用户信息，未登陆返回空对象
		//@param  success:function   获取成功回调
		getInfo: function(success) {
			YJH.AppUserInfoManager.fetchUserInfo(
				function(rs) {
					rs = rs.result || {};
					success(rs);
				}
			)
		},
		//保存用户信息
		//@param   data:json       要保存的用户信息对象
		saveInfo: function(data) {
			YJH.AppUserInfoManager.saveUserInfo(data);
		},
		//退出登录
		//@param success:function   退出登录成功回调
		//@param error:function   退出登录失败回调
		loginOut: function(success, error) {
			YJH.AppUserInfoManager.requestLoginOut(
				success,
				error
			)
		}
	},

	//页面后退，关闭当前显示的页面
	goBack: function() {
		//if(state){
		//    YJH.H5ModuleManager.setParentNeedRefresh(true);
		//}
		JK.app.close(window.location.href);
	},
	//跳转到打电话界面
	//@param number: str    跳转到打电话界面
	tel: function(number) {
		YJH.H5NativeAppInfo.callPhone(number);
	},
	//支付接口
	//var data = {
	//    userid:SYS.userInfo.userId,      //用户id
	//    cid:product_id,         //商品id
	//    subject:product_name,     //商品名称
	//    body:user_bz,         //用户备注
	//    show_url:product_img,      //商品图地址
	//    totalFee:money,      //总价
	//    color:"",           //颜色
	//    nums:start_number,            //数量
	//    addressId:address_id            //地址id
	//};
	pay: function(data, success) {
		YJH.H5ModuleManager.requestPayment(success, 1, data);
	},
	imageSaveAndShow: {
		//获取本地图片并设置背景
		bg: function(dom, imgSrc) {
			JK.saveImageGetLocalUrl(imgSrc, function(rs) {
				dom.css({
					"background": "url('" + rs + "')",
					"background-size": "100% 100%",
					"-webkit-background-size": "100% 100%"
				});
			});
		},
		//获取本地图片设置图片地址
		img: function(dom, imgSrc) {
			JK.saveImageGetLocalUrl(imgSrc, function(rs) {
				dom.attr({
					src: rs
				});
			});
		}
	},
	//打开应用保存使用历史列表
	useAppList: {
		save: function(id, callback) {
			var _this = this;
			id = parseInt(id);

			var _get = function() {
				JK.cache.get("__useAppList__", function(rs) {
					if(rs) {
						rs = JSON.parse(rs);
						rs = ($.isArray(rs)) ? rs : [];
					} else {
						rs = [];
					}

					if(rs.indexOf(id) > -1 || rs.indexOf(id.toString()) > -1) {
						var l = rs.indexOf(id);
						rs.splice(l, 1);

					} else {
						rs = rs.slice(0, 5);

					}

					rs.unshift(id);

					_save(rs);
				});
			};

			var _save = function(rs) {
				rs = JSON.stringify(rs);
				JK.cache.save("__useAppList__", rs, function(rs) {
					callback();
				});
			};

			//检查是否是顶部应用id
			var _checkInTopApps = function() {
				JK.cache.get("__top_app_ids__", function(rs) {
					if(rs) {
						rs = JSON.parse(rs);
						rs = ($.isArray(rs)) ? rs : [];
					} else {
						rs = [];
					}

					if(rs.indexOf(id) > -1 || rs.indexOf(id.toString()) > -1) {
						callback();
					} else {
						_get();
					}

				})
			};

			_checkInTopApps();
		},
		get: function(callback) {
			JK.cache.get("__useAppList__", function(rs) {
				if(rs) {
					rs = JSON.parse(rs);
					rs = ($.isArray(rs)) ? rs : [];
				} else {
					rs = [];
				}
				callback(rs);
			});
		}
	},
	reLogin: function() {
		//JK.alert("",window.location.href,function(){
		YJH.H5NativeAppInfo.reLogin(function() {
			window.location.reload();
		}, function() {});
		//});

		//JK.backRefreshPage();
		//JK.openUrl("login/index.html");
	},
	//跳转到其它页面后，后退回到该页面执行刷新本页面操作
	//@param:callback   function   不传默认刷新，传了执行其传入的函数
	backRefreshPage: function(callback) {
		DEVICE.windowShowRun(function() {
			callback = callback || function() {
				window.location.reload();
			};
			callback();
		});
	},
	topBar: {
		//设置顶部条 标题
		//@param  text:str    标题文字
		setTitle: function(text) {
			YJH.H5NativeAppInfo.setNavBarTitle(text);
		},
		//设置顶部条按钮
		//注意：图片和文字同时设置时，显示文字 忽略图片参数
		//** 设置导航栏左侧按钮信息，包括标题，图片，以及按钮触发方法
		//** param (Object) options 按钮配置信息，包括标题，图片（以http网络连接）,以及按钮触发方法
		//** options.btnTitle {String} 按钮标题
		//** options.btnTitleColor {String} 颜色
		//** opetion.enable {BOOL}是否可用.默认为true
		//** options.msgCount {Int} 消息数量
		//** options.btnImg {String} 按钮图片
		//** btnFunction {Function} 按钮触发方法
		setBtn: function(opt) {
			var img = opt.btnImg || "",
				text = opt.btnTitle || img,
				number = opt.msgCount || 0,
				color = opt.btnTitleColor || "",
				enable = opt.enable || true,
				type = opt.type || "right",
				callback = opt.btnFunction || function() {};

			type = (type.toLowerCase() == "right") ? "Right" : "Left";
			var fnName = "setNavBar" + type + "Btn";
			YJH.H5NativeAppInfo[fnName](callback, {
				msgCount: number,
				btnTitle: text,
				btnImg: img,
				btnTitleColor: color,
				enable: enable,
				url: window.location.pathname
			});
		}
	},
	//上拉加载
	pullUpLoad: {
		//@param:callback   function  触发时执行的函数
		set: function(callback) {
			callback = callback || function() {};
			YJH.H5NativeUIManager.needLoadNextPage(callback);
		},
		//@param:endData   bool     数据是否还有更多
		end: function(endData) {
			endData = ($.isBoolean(endData)) ? endData : false;
			YJH.H5NativeUIManager.endLoadNextPage(endData)
		}
	},
	//直接回退到之前打开的页面地址,如果找不到打开过的页面直接返回到跟页面
	//@param:url   str     页面的相对地址，为空返回到跟页面
	//rollBack("index/index.html")
	rollBack: function(url) {
		//JK.app.close(window.location.href);
		YJH.H5NativeAppInfo.goToRootPage(0);

		//url = (url)? window.location.origin+"/"+url : "";
		//YJH.H5ModuleManager.rollBack(url);
	},
	//获取app版本
	getVer: function(success) {
		YJH.H5ModuleManager.getValue(function(aa) {
			aa = aa.result;
			success(aa);
		}, function() {
			success("3.3.0");
		}, "appVersion")
	},
	//分享接口
	share: function(opt) {
		var title = opt.title,
			content = opt.content,
			linkUrl = opt.url,
			imageUrl = opt.imgUrl;
		YJH.H5NativeAppInfo.shareContent(title, content, linkUrl, imageUrl);
	},
	//顶部信息按钮初始化及执行
	msgBtnInit: function() {
		JK.topBar.setBtn({
			btnImg: "",
			type: "right",
			btnFunction: msgBtnClick,
			msgCount: 0
		});

		var addListener = function() {
			JK.backRefreshPage(function() {
				getToken();
			});
		};

		var getToken = function() {
			JK.user.getInfo(function(rs) {
				var token = rs.token || "";
				if(token) {
					checkToken(token);
				}
			})
		};

		var checkToken = function(token) {
			AJAX.checkToken({
				data: {
					token: token
				},
				success: function() {
					getMsgNumber(token);
				},
				error: function() {
					//token过期  清空token
					clearToken();
				}
			})
		};

		var clearToken = function() {
			JK.user.saveInfo({});
		};

		var getMsgNumber = function(token) {
			AJAX.getNewMsgNumber({
				data: {
					token: token
				},
				success: function(rs) {
					rs = rs || [];
					rs = rs[0] || {};
					var number = rs.counts || 0;
					//if(number != 0){
					setRightNumber(number);
					//}
				}
			})
		};

		var setRightNumber = function(number) {
			JK.topBar.setBtn({
				btnImg: "",
				type: "right",
				btnFunction: msgBtnClick,
				msgCount: number
			});
		};

		getToken();
		addListener();
	},
	//顶部信息全部已读按钮初始化
	messageBtnInit: function(number, callback) {
		var messageBtnClick = function() {
			callback();
		};

		if(number == 0) {
			JK.topBar.setBtn({
				type: "right",
				btnTitleColor: "#999999",
				btnFunction: function() {}
			});
		} else {
			JK.topBar.setBtn({
				type: "right",
				btnFunction: messageBtnClick,
				btnTitleColor: "#5856d6"
			});
		}

	},
	//编辑取消按钮切换
	editChangeToCancelBtn: (function() {
		var isEdit = true;
		var change = function(editFn, cancelFn) {
			if(isEdit) {
				isEdit = false;
				setRightBtn();
				editFn();
			} else {
				isEdit = true;
				setRightBtn();
				cancelFn();
			}

		};

		var setRightBtn = function() {
			var text = (isEdit) ? "编辑" : "取消";

			JK.topBar.setBtn({
				type: "right",
				btnTitle: text,
				btnFunction: topRightBtnClick
			});
		};

		return change;
	})(),
	editChangeToCancelBtnInit: function() {
		JK.topBar.setBtn({
			type: "right",
			btnTitle: "编辑",
			btnFunction: topRightBtnClick
		});
	}

};
//窗口隐藏后显示时执行
//DEVICE.windowShowRun(function(){
//    console.log(123)
//});

(function(){
    var isHiddened = false,
        fn = [];

    if(DEVICE.isAndroid){
        //原生提供
        window.addEventListener('view_visibilitychange', function(e) {
            for(var i= 0,l=fn.length;i<l;i++){
                fn[i]();
            }
        }, false);
    }else{
        document.addEventListener('visibilitychange', function(e) {
            if(document.hidden){
                isHiddened = true;
            }else{
                if(isHiddened){
                    for(var i= 0,l=fn.length;i<l;i++){
                        fn[i]();
                    }
                }
            }
        }, false);
    }



    DEVICE.windowShowRun = function(callback){
        callback = callback || function(){};
        fn.push(callback);
    };
})();
JK.noListShow = {
	data: {
		address: {
			img: "../all/img/address.png",
			title: "填写上您的收货地址",
			text: "让货品不走弯路，直达您面前"
		},
		order: {
			img: "../all/img/order.png",
			title: "好产品不容错过",
			text: "真诚呵护，健康人生"
		},
		collection: {
			img: "../all/img/collection.png",
			title: "这里像荒漠一样空旷",
			text: "赶快把你喜欢的内容收藏起来吧"
		},
		message: {
			img: "../all/img/message.png",
			title: "目前没有情报局消息",
			text: "一有通知我们马上告诉你喔"
		},
		netWorkErr: {
			img: "../all/img/netWorkErr.png",
			title: "网络中断！",
			text: "我们会尽快与你沟通联系"
		},
		business: {
			img: "../all/img/business.png",
			title: "开启增值业务服务",
			text: "过硬，便利，真诚，低廉"
		},
		reservation: {
			img: "../all/img/reservation.png",
			title: "预约挂号就诊",
			text: "一次正确的选择，一生健康的保障"
		}
	},
	createPage: function(key, inDom) {
		var dom = $("<div></div>"),
			position = (inDom) ? "relative" : "fixed";

		dom.css3({
			position: position,
			left: 0,
			top: 0,
			"z-index": "99999",
			width: window.innerWidth + "px",
			height: window.innerHeight + 50 + "px",
			background: "#f3f3f3",
			"padding-top": "1.22rem",
			"box-sizing": "border-box"
		});

		var icon = $("<div></div>");
		icon.css({
			width: "100%",
			height: "4.54rem",
			background: "url(" + this.data[key].img + ") no-repeat",
			"background-size": "100% 100%"
		});

		var title = $("<p>" + this.data[key].title + "</p>");
		title.css({
			"font-size": "0.34rem",
			color: "#5856d6",
			width: "100%",
			height: "0.34rem",
			"line-height": "0.34rem",
			"padding-top": "1rem",
			"padding-bottom": "0.2rem",
			"text-align": "center",
			"margin": 0
		});

		var message = $("<span>" + this.data[key].text + "</span>");
		message.css({
			width: "100%",
			height: "0.28rem",
			"line-height": "0.28rem",
			"font-size": "0.28rem",
			color: "#333333",
			"text-align": "center",
			"padding-bottom": "1.8rem",
			display: "block"
		});

		var btn = $("<a></a>"),
			display = (key == "netWorkErr") ? "block" : "none";
		btn.css3({
			margin: "0 auto",
			width: "1.12rem",
			height: "1.12rem",
			"background-color": "#bcbcbc",
			"border-radius": "1.12rem",
			"background-image": "url(../all/img/refresh.png)",
			"background-repeat": "no-repeat",
			"background-position": "center center",
			"background-size": "0.52rem 0.52rem",
			display: display
		});

		$$(btn).myclickdown(function() {
			$(this).css({
				"background-color": "#5856d6"
			})
		}).myclickup(function() {
			$(this).css({
				"background-color": "#bcbcbc"
			})
		}).myclickok(function() {
			window.location.reload();
		});

		dom.append(icon)
			.append(title)
			.append(message)
			.append(btn);

		return dom;
	},
	//地址
	address: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("address", inDom);
		dom.append(page);
	},
	//订单
	order: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("order", inDom);
		dom.append(page);
	},
	//收藏
	collection: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("collection", inDom);
		dom.append(page);
	},
	//信息
	message: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("message", inDom);
		dom.append(page);
	},
	//未联网
	netWorkErr: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("netWorkErr", inDom);
		dom.append(page);
	},
	//业务
	business: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("business", inDom);
		dom.append(page);
	},
	//预约
	reservation: function(dom) {
		var inDom = (dom) ? true : false;
		dom = dom || $('body');
		var page = this.createPage("reservation", inDom);
		dom.append(page);
	}
};