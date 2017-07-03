
// baidu地图api包装类

// 页面引入下面js
// 有些ak在坐标转换时,服务器要报错
// <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=2E8A892BB5012b048b85cceae7e32665"></script>

// let baiduMap = require("./lib/plugs/baiduMap");
//
// var aa = new baiduMap({
// 	//要插入的dom
// 	id:"test",
// 	//初始显示的中心点
// 	centerPoint:"104.08099,30.655096",
// 	//地图缩放等级
// 	mapScale:12,
//  //是否显示控制层,默认false
//  showControl:false,
//  //是否启用鼠标滚轮缩放,默认false
//  mouseScrollZoom:false,
//  //报错时处理函数,参数为报错信息
//  error:function(msg){console.log(msg)}
// });

// 	//要在地图上标记的点  异步函数
// 	let points = [
// 		//图片大小要实际的图片大小尺寸,要不显示不出来
// 		{
// 			id:1,
// 			x:104.01561838983811,
// 			y:30.686133197290367,
// 			icon:{
//              src:"image/0.png",      //icon地址
// 	            width:40,               //要显示的大小,透明度
// 	            height:40,
// 	            opacity:80
//          },
// 			click:function(data){
// 				console.log(data)
// 			}
// 		},
// 		{
// 			id:2,
// 			x:104.07267947836799,
// 			y:30.627626930487956,
// 			icon:{
//              src:"image/0.png",      //icon地址
// 	            width:40,               //要显示的大小,透明度
// 	            height:40,
// 	            opacity:80
//          },
// 			click:function(data){
// 				console.log(data)
// 			}
// 		}
// 	]
//  aa.createMarker(points);




// //获取当前定位坐标到所有点的距离,并返回传入的点的数组,距离在数组中每个对象上的distance属性
// 异步函数
// aa.getDistanceList(list=>console.log(list));

// //从当前点步行到一个传入点的id的步行线路图。回调返回ok
// aa.walkToId(1,e=>console.log("ok"));

//获取当前的经纬度(异步函数)
// aa.getMyLocation().then(point=>{console.log(point)});


let changeImageSize = require("../fn/changeImageSize");

let createMap = Symbol(),
	hiddenBaiduLogo = Symbol(),
	getImageObj = Symbol(),
	getLatAndLongFromBrowser = Symbol(),
	getLatAndLongFromH5 = Symbol(),
	getDistance = Symbol(),
	ngToBdPoint = Symbol(),
	cacheFunctions = Symbol(),
	runCacheFn = Symbol(),
	handlerImage = Symbol();



class baiduMap{
	constructor(opt){
		//要插入的容器id
		this.id = opt.id;
		//中心点
		this.centerPoint = opt.centerPoint || "";
		//地图显示的缩放级别
		this.mapScale = opt.mapScale || 12;
		//获取定位的时间
		this.getLatAndLongTime = opt.getLatAndLongTime || 10000;
		//错误处理函数
		this.error = opt.error || function(){};
		//显示控制层
		this.showControl = opt.showControl || false;
		//使用鼠标滚轮缩放
		this.mouseScrollZoom = opt.mouseScrollZoom || false;


		//百度地图对象实例
		this.baiduMapObj = null;
		//当前定位的点
		this.myLocation = null;
		//缓存的函数,待执行的队列
		this.cacheFunctions = [];
		//已经瞄的点
		this.markers = [];
		//当前标记的点
		this.points = [];


		this.init();
	}


	init(){
		this[createMap]();

		this[hiddenBaiduLogo]();
		this.getMyLocation();
	}

	//生成地普通地图
	[createMap](){
		//生成地图
		this.baiduMapObj =  new BMap.Map(this.id);

		//设置中心点
		let centerPoint = this.centerPoint.split(",");
		this.baiduMapObj.centerAndZoom(
			//中心点经纬度
			new BMap.Point(centerPoint[0],centerPoint[1]),
			//地图初始缩放级别
			this.mapScale
		);

		//是否添加控制层
		if(this.showControl){
			this.baiduMapObj.addControl(new BMap.MapTypeControl());
		}

		//是否开启鼠标滚轮缩放
		if(this.mouseScrollZoom){
			this.baiduMapObj.enableScrollWheelZoom(true);
		}

	}

	//获取图片对象
	[getImageObj](src){
		return new Promise((success,error)=>{
			let img = new Image();
			img.onload = function(){
				success(this);
			};
			img.onerror = function(){
				success("");
			};
			img.src = src;
		})
	}

	//处理图片
	[handlerImage](img,width,height,opacity){
		width = width || img.width;
		height = height || img.height;
		opacity = opacity/100 || 1;

		return new changeImageSize({
			img:img,
			width:width,
			height:height,
			opacity:opacity
		});

	}

	//在地图上标点,可使用自定义图标
	async createMarker(points){
		if(points.length == 0){return;}

		for(let i=0,l=points.length;i<l;i++){
			this.points.push(points[i]);
		}



		for(let i=0,l=points.length;i<l;i++){
			let point = points[i],
				this_point = new BMap.Point(point.x,point.y),
				marker;


			if(point.icon && point.icon.src){
				//有图标
				let imgObj = await this[getImageObj](point.icon.src);
				//处理图片生成base64
				imgObj = await this[handlerImage](imgObj,point.icon.width,point.icon.height,point.icon.opacity);
				if(imgObj){
					let this_icon = new BMap.Icon(imgObj.src,new BMap.Size(imgObj.width,imgObj.height));
					marker = new BMap.Marker(this_point,{icon:this_icon});
				}
			}else{
				//无图标
				marker = new BMap.Marker(this_point);
			}

			if(marker){
				//marker绑定数据
				marker.__data__ = point;
				//判断是否有事件
				if(point.click){
					marker.addEventListener("click",function(e){
						let data = e.target.__data__;
						point.click(data);
					})
				}

				this.markers.push(marker);
				this.baiduMapObj.addOverlay(marker);

			}
		}
	}

	//清除所有的标记
	clearAllMarker(){
		for(let i=0,l=this.markers.length;i<l;i++){
			let this_mark = this.markers[i];

			this.baiduMapObj.removeOverlay(this_mark);
		}
	}

	//清除所有
	clearAll(){
		this.baiduMapObj.clearOverlays();
	}

	//获取当前经纬度
	async getMyLocation(){
		let options = {
				enableHighAccuracy: true,
				timeout: this.getLatAndLongTime,
				maximumAge: 0
			};

			//高精度获取地理位置
		let me = await this[getLatAndLongFromH5](options);
		if(!me){
			//失败使用普通精度获取
			me = await this[getLatAndLongFromH5]({});
		}
		if(!me){
			//失败使用浏览器的获取接口获取
			me = await this[getLatAndLongFromBrowser]();
		}

		//都获取不到定位信息报错
		if(!me){
			this.error("无法获取定位信息");
			return;
		}

		this.myLocation = me;

		this.moveMapTo(me.x,me.y);

		this[runCacheFn]();

		return me;
	}

	//运行缓存的fn
	[runCacheFn](){
		for(let i=0,l=this.cacheFunctions.length;i<l;i++){
			this.cacheFunctions[i]();
		}
	}

	//视窗中心移动到一个点
	moveMapTo(x,y){
		let point = new BMap.Point(x,y),
			marker = new BMap.Marker(point);

		this.baiduMapObj.addOverlay(marker);
		this.baiduMapObj.setCenter(point)
	}

	//根据h5接口获取经纬度
	[getLatAndLongFromH5](options){
		let _this = this;

		return new Promise((success,error)=>{
			navigator.geolocation.getCurrentPosition(
				function (position) {

					//转换为baidu坐标
					_this[ngToBdPoint](position.coords.longitude,position.coords.latitude,function(rs){
						if(rs){
							success({
								x:rs.lng,
								y:rs.lat
							});
						}else{
							success("");
						}
					});
				},
				function(){
					success("");
				},
				options);
		});
	}

	//普通经纬度转百度经纬度
	[ngToBdPoint](x,y,callback){
		let point = new BMap.Point(x,y),
			convertor = new BMap.Convertor();

		convertor.translate([point], 1, 5, function(data){
			if(data.status === 0) {
				let point = data.points[0];
				callback(point);
			}else{
				callback("");
			}
		})
	}

	//获取当前位置经纬度
	[getLatAndLongFromBrowser](){
		var _this = this;
		return new Promise((success,error)=>{
			var geolocation = new BMap.Geolocation();
			geolocation.getCurrentPosition(function(r){
				if(this.getStatus() == BMAP_STATUS_SUCCESS){
					success({x:r.point.lng,y:r.point.lat});
				}else {
					success("");
				}
			},{enableHighAccuracy: true});
		})
	}

	//获取距离列表
	async getDistanceList(success){
		if(!this.myLocation){
			this.cacheFunctions.push(()=>{
				this.getDistanceList.call(this,success);
			});
			return;
		}

		//计算当前定位点和各个点之间的距离
		for(let i =0,l=this.points.length;i<l;i++){
			let this_point = this.points[i];
			this_point.distance = this[getDistance](this.myLocation,this_point);
		}


		//排序并输出
		this.points.sort((x,y)=>{
			return x.distance > y.distance
		});

		let backObj = JSON.parse(JSON.stringify(this.points));
		success(backObj);
	}

	//获取2个经纬度之间的距离
	[getDistance](point1,point2){
		var pointA = new BMap.Point(point1.x , point1.y);
		var pointB = new BMap.Point(point2.x , point2.y);

		return (this.baiduMapObj.getDistance(pointA, pointB));
	}

	//步行导航到一个id
	async walkToId(id,success){
		if(!this.myLocation){
			this.cacheFunctions.push(()=>{
				this.walkToId.call(this,id,success);
			});
			return;
		}

		//通过id获取点的对象
		let obj1;
		this.points.map((point)=>{
			if(point.id == id){
				obj1 = point;
			}
		});

		let walking = new BMap.WalkingRoute(this.baiduMapObj, {renderOptions:{map: this.baiduMapObj, autoViewport: true}}),
			p1 = new BMap.Point(obj1.x , obj1.y),
			p2 = new BMap.Point(this.myLocation.x , this.myLocation.y);
		walking.search(p2,p1);
		success("ok");
	}



	//隐藏baidu logo等文字
	[hiddenBaiduLogo](){
		var style = $("<style>.anchorBL{display:none !important;}</style>");
		$("body").append(style);
	}
}


module.exports = baiduMap;