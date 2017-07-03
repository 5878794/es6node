




//调用发送短信界面
//DEVICE.sendSMS(10086,"11");
//也可以直接写成a链接。


let DEVICE = require("./../device");

let sendSMS = function(phone,text){
	if(DEVICE.isAndroid || DEVICE.isIphone){
		window.location.href = "sms:"+phone+"?body="+text;
	}
};



//打电话
//DEVICE.tel(10086);
//也可以直接写成a链接

let tel = function(number){
	if(DEVICE.isAndroid || DEVICE.isIphone) {
		window.location.href = "tel:" + number;
	}
};



module.exports = {
	sms:sendSMS,
	tel:tel
};
