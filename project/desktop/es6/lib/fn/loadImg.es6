//图片加载 返回promise对象
// let loadImg = require("./loadImg");
//   资源文件格式
// let resource = [
// 		{key:"a",val:"http://img05.tooopen.com/images/20140917/sl_95734016877.jpg"},
// 		{key:"b",val:"http://img02.tooopen.com/images/20141229/sl_107003776898.jpg"},
// 		{key:"c",val:"http://img02.tooopen.com/images/20160316/tooopen_sl_156105422846.jpg"}
// 	];


// async function test(){
// 	let cc = await loadImg(resources)
// 		.then(function(rs){
//          //rs为resource的格式,只是图片地址换成了img对象
//          //转换格式为obj对象   {a:img,b:img,c:img,.}
// 			let newResources = {};
// 			rs.map(function(obj){
// 				newResources[obj.key] = obj.val;
// 			});
// 			return newResources;
// 		})
// 		.catch(function(src){
// 			return {}
// 		});
//
// 	console.log(cc);
// }



let loadImg = (obj) => {
	let key = obj.key,
		val = obj.val;

	return new Promise(function(success,error){
		let img = new Image();
		img.onload = function(){success({key,val:this})};
		img.onerror = function(){error(val)};
		img.src = val;
	})
};



module.exports = (srcs) =>{
	let ImgLoaderPromise = srcs.map(function(obj){
		return loadImg(obj);
	});

	return Promise.all(ImgLoaderPromise);
};