

//批量图片资源加载(雪碧图),返回promise对象
//图片不能跨域,因为需要处理图片
//永远返回成功,根据对象状态判断成功失败。。。



// opt = {
// 	key:{
// 		src:"http://...",
// 		map:"x,y,width,height"
// 	},
// 	key1:{
// 		src:"http://...",
// 		map:"x,y,width,height"
// 	}
// };


// let imgObj = await new imageMapLoader(
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




let imageLoader = require("./image"),
	handlerData = Symbol(),
	init = Symbol(),
	mapLoader = Symbol(),
	spriteGet = Symbol(),
	createImgObj = Symbol(),
	run = Symbol();



class imageMapLoader{
	constructor(opt,propFn){
		this.data = opt;
		this.propFn = propFn || function(){};


		return this[run]();
	}

	//返回最终的promise对象,主要用于数据处理后返回
	[run](){
		return new Promise((success,error)=>{
			this[init]()
				.then(rs=>{
					//如果返回错误,找不到图片
					if(typeof rs === "string"){
						success({
							state:0,
							msg:rs
						});
						return;
					}

					//加载完成返回对象
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
					//报错返回对象
					success({
						state:0,
						msg:e
					})
				});
		})
	}

	async [init](){
		//处理成普通图片加载需要的数据格式
		let newData = this[handlerData]();
		//加载图片
		let imgObj = await new imageLoader(newData,this.propFn);

		if(imgObj.state == 0){
			return imgObj.msg;
		}

		//获取图片对象
		imgObj = imgObj.data;

		//通过canvas获取雪碧图的base64的src
		let tempObj = this[mapLoader](imgObj);

		//生成批量生成图片的promise对象
		let tempPromiseAll = [];
		for(let [key,src] of Object.entries(tempObj)){
			tempPromiseAll.push(this[createImgObj](key,src));
		}

		return await Promise.all(tempPromiseAll);
	}

	//处理成普通图片加载的数据格式
	[handlerData](){
		let _data = {};
		for(let [key,val] of Object.entries(this.data)){
			_data[key] = val.src;
		}

		return _data;
	}

	//资源图加载
	[mapLoader](obj){
		let _obj = {};

		for(let [key,val] of Object.entries(obj)){
			let [x,y,w,h] = this.data[key].map.split(",");

			_obj[key] = this[spriteGet](val,x,y,w,h);
		}

		return _obj;
	}

	//使用canvas获取图片部分,生成新的图片base64的scr
	[spriteGet](img,x,y,w,h){
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");

		canvas.width = w;
		canvas.height = h;

		ctx.drawImage(img,x,y,w,h,0,0,w,h);

		return canvas.toDataURL("image/png");
	}

	//生成图片对象promise
	[createImgObj](key,src){
		return new Promise((success,error)=>{
			let img = new Image();
			img.onload = function(){
				success({
					key,
					val:this
				})
			};
			img.src = src;
		})
	}

}



module.exports = imageMapLoader;