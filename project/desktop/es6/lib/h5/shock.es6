

//开始震动
//DEVICE.shock.start([30]);
//opt:array    eg:[2000,1000,1000]  单位:ms
//停止震动
//DEVICE.shock.stop();


//震动api h5  目前只支持android 4.4+


let shock = {
	canUse:function(){
		return  "vibrate" in navigator;
	},
	start:function(opt){
		if(!this.canUse()){return;}
		navigator.vibrate(opt);
	},
	stop:function(){
		if(!this.canUse()){return;}
		navigator.vibrate([]);
	}
};


module.exports = shock;