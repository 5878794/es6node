
//dom对象的css监听


// 首先需要执行监听器
//  $("#aaa").listenerStyle(
//          ["width","height"],             //需要监听的属性
//          function(){                     //属性变动时执行的回调
//              console.log(this);          //this为该dom对象
//          }
// )


//更改属性需要特定的方法,因此更改了css的赋值函数
// $("#aaa").CSS({                          //必须使用此方法才能触发回调
// 	width:"200px"
// });


require("../jq/extend");

$.fn.listenerStyle = function(array,callback){
	let data = $(this).data("__listener_style__") || {},
		_this = $(this).get(0);

	array.map(param=>{
		let _param = "_"+param;
		data[param] = true;
		Object.defineProperty(_this,_param,{
			set(val){
				callback.call(_this);
			}
		})
	});

	$(this).data({"__listener_style__":data});
};

$.fn.CSS = function(obj){

	$(this).css3(obj);

	let data = $(this).data("__listener_style__") || {},
		_this = $(this).get(0);

	for(let key of Object.keys(data)){
		if(obj.hasOwnProperty(key)){
			let val = new Date().getTime()+parseInt(Math.random()*100);
			_this["_"+key] = val;
			break;
		}
	}


};








module.exports = null;