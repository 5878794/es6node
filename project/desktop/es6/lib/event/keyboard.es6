
//键盘事件监听 全局

// let kb = require("./keyboard");

//shift按键已忽略。。。。。

// a+s为组合键
// kb.bind("a+s").down(function(e){
//      //阻止重复执行,在keyUp前
//      //及整个down过程中只执行一次
// 	    e.preventRepeat();
// });
// kb.bind("a").up(function(){
//
// });
// kb.unbind("a");

//整体 停止\恢复 监听
// kb.stopListener();
// kb.resumeListener();




	//记录绑定的事件
let cache = new Map(),
	//控制函数是否执行
	canUse = true,
	//记录按键状态
	keyState = new Map(),
	//按下键盘到所有按键全部释放的过程  true
	eventProcess = new Set(),
	//事件是否执行
	preventRepeatFn = new Set();


class keyboard{
	constructor(val = ""){
		val = val.replace(/\s/ig,"");
		this.val = val.split("+").sort().join("_");

		if(!cache.has(this.val)){
			cache.set(this.val,{});
		}

		this.obj = cache.get(this.val);
	}

	//添加事件监听
	static addListener(){
		document.addEventListener("keydown",(e)=>{
			if(!canUse){return;}
			//忽略shift键的事件
			if(e.key == "Shift"){return;}

			var code = e.keyCode,
				key = e.key;

			this.handlerEvent(key,code,"down",e);
		},false);
		document.addEventListener("keyup",(e)=>{
			if(!canUse){return;}
			if(e.key == "Shift"){return;}

			var code = e.keyCode,
				key = e.key;

			this.handlerEvent(key,code,"up",e);
		},false);


		//窗口离开后清空缓存记录
		window.addEventListener("blur",()=>{
			keyState.clear();
			eventProcess.clear();
		});
	}

	//阻止连续执行,在keyUp前
	static preventRepeat(key){
		return function (){
			preventRepeatFn.add(key);
		}
	}

	//处理事件
	static handlerEvent(key,code,type,e){
		if(type == "down"){
			keyState.set(key,type);
			eventProcess.add(key);

			this.runFnDown(e);
		}else{
			keyState.delete(key);
			//特殊键  window的开始键,mac的command 键释放的时候清空所有缓存
			if(key == "Meta"){
				keyState.clear();
				eventProcess.clear();
			}

			if(keyState.size == 0){
				this.runFnUp(e);
				eventProcess.clear();
				preventRepeatFn.clear();
			}
		}
	}

	//运行事件 按下
	static runFnDown(e){
		if(keyState.size == eventProcess.size){
			let keys = [...eventProcess].sort().join("_"),
				obj = cache.get(keys);

			if(obj && obj.down){
				//在event上自定义函数
				e.preventRepeat = this.preventRepeat(keys);
				if(!preventRepeatFn.has(keys)){
					obj.down(e);
				}
			}
		}
	}

	//运行事件 放开  只有单个按键才会执行
	//组合按键需设置down属性
	static runFnUp(e){
		if(eventProcess.size == 1){
			let keys = [...eventProcess][0],
				obj = cache.get(keys);

			if(obj && obj.up){
				e.preventRepeat = function(){};
				obj.up(e);
			}
		}
	}

	//停止事件监听
	static stopListener(){
		canUse = false;
	}

	//恢复事件监听
	static resumeListener(){
		canUse = true;
	}


	down(fn){
		this.obj.down = fn || function(){};
		return this;
	}


	up(fn){
		this.obj.up = fn || function(){};
		return this;
	}

	unbind(){
		cache.delete(this.val);
	}

}



keyboard.addListener();
module.exports = {
	bind(key){
		return new keyboard(key);
	},
	unbind(key){
		new keyboard(key).unbind();
	},
	stopListener(){
		keyboard.stopListener();
	},
	resumeListener(){
		keyboard.resumeListener();
	}
};