/**
 * Created by Administrator on 2016/8/17.
 */
//Medical_card.html
var urlData = PMZ_DEVICE.getAllParamFromUrl();
console.log(urlData);
var PAGE = {
	init: function() {
		this.click_btn();
		this.setVal();
	},
	//用户基础信息
	setVal: function() {

		$('#name_S').find('.card_right').text(urlData.cardName);
		$('#hosName').find('.card_right').text(urlData.hosName);
	},
	//提交按钮事件
	click_btn: function() {
		$('#ok_submit').click(function() {
			if($('#card_input').find('.ide_inputs').val() == "") {
				WD.alert("提示", "卡号不能为空");
				return;
			}
			WD.getToken(PAGE.pmz_upload_k); //获取token
		});
	},
	pmz_upload_k: function(token, userid) {
		WD.user.getInfo(function(res) {
			if(!res.token) {
				JK.reLogin();
				return;
			}
			var _timeStamp = getDate(new Date());
			var mediCardId = $('#card_input').find('input').val();
			var check=(urlData.hosOrgCode.indexOf("_JKZL_")>=0?"0":"1");
			var data = {
				"msgHeader": {
					"sign": Md5(["timeStamp=" + _timeStamp, "token=" + token, "hosOrgCode=" + urlData.hosOrgCode,
						"mediCardId=" + pcKg(mediCardId), "userCardNo=" + urlData.rnmsfz, "userphone=" + urlData.rnmPhone, "username=" + urlData.rnmName,
						"cardType=1", "isCheck="+check, "userId=" + String(res.userId)
					].sort()),
					"timeStamp": _timeStamp,
					"token": token
				},
				"param": {
					"hosOrgCode": urlData.hosOrgCode,
					"mediCardId": pcKg(mediCardId),
					"userCardNo": urlData.rnmsfz,
					"userPhone": urlData.rnmPhone,
					"username": urlData.rnmName,
					"cardType": "1",
					"isCheck": check,
					"userId": String(res.userId)
				}
			};

			AJAX.go1("getMediCardIdService", {
				paramString: JSON.stringify(data)
			}, function(data) {
				if(data.msgHeader.code == "0") {
					if(data.result.isValid == "true"){
						var search = decodeURI(window.location.search);
						WD.alert("提示", "添加就诊卡成功!",function(){
							WD.openUrl(SYS.localUrl+"Booking_info_1.html" + search);
						});
                    }else{
						WD.alert("提示","就诊卡无效!")
					}
				} else {
					WD.alert("提示", "添加就诊卡失败");
				}
			})
		});
	}
};