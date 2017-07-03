
//批量加载图片,返回promise对象
//永远返回成功,根据对象状态判断成功失败。。。

// opt = {
// 	key:"http://....",
// 	key1:"http://...."
// };


// let imgObj = await new imageLoader(
//      opt,
//      function(loaded,total){...}
// );


// if(imgObj.state == 1){
//      //输出{key,imgObj对象, ...}
//      console.log(imgObj.data)
// }else{
//      //返回出错的图片地址
//      console.log(imgObj.msg)
// }


let data = Symbol(),
	handlerData = Symbol(),
	loadImg = Symbol(),
	promiseAll = Symbol(),
	promise = Symbol(),
	dataLength = Symbol(),
	loaded = Symbol();


class imageLoader{
	constructor(opt,propFn){
		this.ress = opt;
		this.propFn = propFn || function(){};

		this.data = [];
		this[dataLength] = Object.entries(this.ress).length;
		this[loaded] = 0;

		this[handlerData]();

		//return new Promise(嵌套this[init])

		return this[promise]();
	}

	//数据处理
	[handlerData](){
		for(let [key,src] of Object.entries(this.ress)){
			this.data.push({
				key:key,
				src:src
			})
		}
	}

	//加载图片
	[loadImg](obj){
		let key = obj.key,
			val = obj.src,
			_this = this;

		return new Promise(function(success,error){
			let img = new Image();
			img.onload = function(){
				_this[loaded]++;
				_this.propFn(_this[loaded],_this[dataLength]);
				success({key,val:this})
			};
			img.onerror = function(){error(val)};
			img.src = val;
		})
	}

	//开始执行
	[promiseAll](){
		var _this = this;
		let ImgLoaderPromise = this.data.map(function(obj){
			return _this[loadImg](obj);
		});

		return Promise.all(ImgLoaderPromise);
	}


	//返回处理后的数据
	[promise](){
		//新建promise对象,返回处理后的数据
		return new Promise((success,error)=>{
			//批量加载图片
			this[promiseAll]()
				.then(rs=>{
					//全部成功处理数据格式返回
					let obj = {};
					rs.map(r=>{
						let {key,val} = r;
						obj[key] = val;
					});
					success({
						state:1,
						data:obj
					})
				})
				.catch(e=>{
					//失败返回出错的图片地址
					success({
						state:0,
						msg:e
					})
				})
		})
	}

}



module.exports = imageLoader;