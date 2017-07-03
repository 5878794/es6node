//浏览器点后退按钮执行回调,在次点击浏览器历史记录后退
//回调只会执行一次。。。。
//微信需要先在页面点击一次才能生效

//重复执行需要传入的函数是promise对象,取消要执行error
// var a = new browserBackCallback(function(){
// 	return new Promise((success,error)=>{
// 		if(confirm(setting.exitInfo)){
// 			window.history.go(-1);
// 		}else{
// 			error();
// 		}
// 	});
// });
//
//
// //如只执一次就不需要传入promise对象,直接传入普通函数
// var b = new browserBackCallback(function(){
// 		if(confirm(setting.exitInfo)){
// 			window.history.go(-1);
// 		}
// });




let addEvent = Symbol(),
	run = Symbol();


class browserBackCallback{
	constructor(callback){
		this.callback = callback || function(){};

		this[addEvent]();
		this[run]();
	}

	[addEvent](){
		var _this = this;
		window.addEventListener("popstate", function(e) {

			if(e.state.show){
				_this.callback().catch(()=>{
					_this[run]();
				});
			}

		}, false);
	}
	[run](){
		var  state = window.history.state;

		if(!state){
			window.history.replaceState({show:true,isOpened:false},"","");
			window.history.pushState({show:false,isOpened:true},"","");
		}else if(state && state.show){
			window.history.replaceState({show:true,isOpened:false},"","");
			window.history.pushState({show:false,isOpened:true},"","");
		}

	}
	destroy(){
		this.callback = function(){
			return new Promise((success,error)=>{
				window.history.go(-1);
			});
		}
	}

}


module.exports = browserBackCallback;