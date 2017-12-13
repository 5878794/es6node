
let getData = Symbol(),
	createCanvas = Symbol(),
	grayImageAndGetTwoColorImageData = Symbol(),
	loadImage = Symbol(),
	CorrosionOrExpansion = Symbol(),
	clearNoise = Symbol(),
	getImageN = Symbol(),
	getTextArea = Symbol(),
	mergeGroup = Symbol();



let verCodeDiscern = {
	async getText(imgSrc){
		let img = await this[loadImage](imgSrc),
			data = this[getData](img,3),
			towColorData = this[grayImageAndGetTwoColorImageData](data),
			clearNoiseData = this[clearNoise](towColorData),
			textArea = this[getTextArea](clearNoiseData);




		this.showImage(clearNoiseData,textArea);

		this.showChildrenImage(clearNoiseData,textArea);


	},

	//图片加载
	[loadImage](src){
		return new Promise(success=>{
			let img = new Image();

			img.addEventListener('load',rs=>{
				success(rs.target);
			},false);

			img.addEventListener('error',rs=>{
				throw('无法加载图片');
			},false);

			img.src = src;
		})
	},

	//获取图片的rgb数据
	//scale放大倍数获取数据
	[getData](img,scale){
		let {canvas,ctx} = this[createCanvas]();

		//原图放大2背处理
		canvas.width = img.width * scale;
		canvas.height = img.height * scale;

		ctx.drawImage(img,0,0,img.width*scale,img.height*scale);
		return ctx.getImageData(0,0,canvas.width,canvas.height);
	},

	//创建一个画布
	[createCanvas](){
		let canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		return {canvas,ctx}
	},

	//图片转2色
	[grayImageAndGetTwoColorImageData](data){
		let rgbData = data.data;

		//遍历rgb数据
		//gray = (r+g+b)/3;
		let min,max;

		//图片转灰色。并获取最大值与最小值
		for(var i=0,l=rgbData.length/4;i<l;i++){
			var ii = i*4;
			var gray = (rgbData[ii]+rgbData[ii+1]+rgbData[ii+2])/3;
			if(!min || !max){
				min = gray;
				max = gray;
			}else{
				min = (min<gray)? min : gray;
				max = (max>gray)? max : gray;
			}

			rgbData[ii] = gray;
			rgbData[ii+1] = gray;
			rgbData[ii+2] = gray;
		}

		//获取灰度的中间值（这个值根据图片情况来定的）；
		var n = min+(max-min)/2;

		//通过中间色转2色图片
		//低于中间色转255，高于转0
		for(var z=0,zl=rgbData.length/4;z<zl;z++){
			var zz = z*4;
			var newVal = (rgbData[zz]<n)? 255 : 0;
			rgbData[zz] = newVal;
			rgbData[zz+1] = newVal;
			rgbData[zz+2] = newVal;
		}

		return data;
	},

	//去除噪点
	[clearNoise](data){
		//腐蚀
		let tempData = this[CorrosionOrExpansion](data,'corrosion');
		//膨胀
		tempData = this[CorrosionOrExpansion](tempData,'expansion');

		//还原数据到data
		let RGBData = data.data;
		tempData = tempData.data;
		for(let i=0,l=RGBData.length;i<l;i++){
			RGBData[i] = tempData[i];
		}

		return data;
	},

	//腐蚀或膨胀
	//腐蚀  type=corrosion
	//膨胀  type=expansion
	[CorrosionOrExpansion](data,type){
		let w = data.width,
			h = data.height,
			rgbData = data.data,
			newData = [],
			_this = this;

		var handlerData = function(x,y){
			var points = [];
			for(var i=-1,l=1;i<=l;i++){
				for(var z=-1,zl=1;z<=zl;z++){
					var x1 = x+z,
						y1 = y+i,
						n1 = _this[getImageN](x1,y1,w),
						val = rgbData[n1];

					if(val==0 || val){
						points.push(val);
					}

				}
			}

			points.sort(function(a,b){
				return (a>b)? 1 : -1;
			});


			let setVal;
			if(type == 'corrosion'){
				setVal = points[0];
			}else{
				setVal = points[points.length-1];
			}


			var n = _this[getImageN](x,y,w);

			newData[n] = setVal;
			newData[n+1] = setVal;
			newData[n+2] = setVal;
			newData[n+3] = rgbData[n+3];
		};


		for(var y=0,yl=h;y<yl;y++){
			for(var x=0,xl=w;x<xl;x++){
				handlerData(x,y);
			}
		}

		return {
			data:newData,
			width:w,
			height:h
		};
	},

	//通过图片的x，y坐标获取图片元素的序列
	[getImageN](x,y,w){
		if(x<0 || y<0){
			return -1;
		}
		return (y*w+x)*4;
	},


	//合并分组处理出最终的分组情况
	[mergeGroup](data){
		let backData = {};
		let cloneData = JSON.parse(JSON.stringify(data));

		for(let [fromGroup,toGroups] of Object.entries(data)){
			let preVal;
			toGroups.map(group=>{
				let findVal = group;
				//查找最终要加入的组号
				while(cloneData[findVal]){
					findVal = Math.min.apply(this,cloneData[findVal]);
				}

				//第一次直接插入
				if(!preVal){
					if(!backData[findVal]){
						backData[findVal] = [];
					}
					backData[findVal].push(fromGroup);
					preVal = findVal;
				}else{
					if(preVal == findVal){
						//指向同一个组  忽略
					}else{
						//指向不同的组，合并这2个指向的组, 合并到序号小的组里面
						let temp = [preVal,findVal],
							minG = Math.min.apply(this,temp),
							maxG = Math.max.apply(this,temp);


						if(backData[maxG]){
							backData[maxG].map(g=>{
								if(!backData[minG]){
									backData[minG] = [];
								}
								backData[minG].push(g);
							})
						}
						backData[minG].push(maxG);

						//删除大序号的组
						delete backData[maxG];

						//增加新的对应关系到克隆数组
						cloneData[maxG] = [minG];

						//将最小的值认为是前一个溶入的组值
						preVal = minG;
					}
				}
			});
		}


		let newData = [];
		for(let [key,val] of Object.entries(backData)){
			val.push(key);
			newData.push(val);
		}

		return newData;
	},


	//获取图片中文字的区域
	//连笔的区域
	//带修正方向及忽略几个像素的值  TODO
	[getTextArea](data){
		let newData = {},              //通过序号  创建点的集合（方便查找用）
			newGroupPoints = {},      //通过组区分创建 数组
			groups = {},    //记录相等第组
			rgbData = data.data,
			w = data.width,
			h = data.height,
			group = 0;

		//遍历
		for(let y=0,yl=h;y<yl;y++){
			for(let x=0,xl=w;x<xl;x++){
				let n = this[getImageN](x,y,w),
					val = rgbData[n];

				if(!val){continue;}

				//获取该点上面的点
				let p1n = this[getImageN](x,y-1,w),
				//获取该点左面的点
					p2n = this[getImageN](x-1,y,w),
				//获取该点左上的点
					p3n = this[getImageN](x-1,y-1,w);

				let p1 = newData[p1n] || {},
					p2 = newData[p2n] || {},
					p3 = newData[p3n] || {},
					p1group = p1.group || 0,
					p2group = p2.group || 0,
					p3group = p3.group || 0,
					tempGroup = [p1group,p2group,p3group],
					minGroup,
					thisGroup;


				tempGroup = tempGroup.filter(rs=>{if(rs!=0){return rs}});


				minGroup = (tempGroup.length == 0)? 0 : Math.min.apply(this,tempGroup);
				if(minGroup != 0){
					thisGroup = minGroup;
					if(p1group && p1group != minGroup){
						if(!groups[p1group]){
							groups[p1group] = [];
						}
						if(groups[p1group].indexOf(minGroup) == -1){
							groups[p1group].push(minGroup);
						}
					}
					if(p2group && p2group != minGroup){
						if(!groups[p2group]){
							groups[p2group] = [];
						}
						if(groups[p2group].indexOf(minGroup) == -1){
							groups[p2group].push(minGroup);
						}
					}
					if(p3group && p3group != minGroup){
						if(!groups[p3group]){
							groups[p3group] = [];
						}
						if(groups[p3group].indexOf(minGroup) == -1){
							groups[p3group].push(minGroup);
						}
					}

				}else{
					group++;
					thisGroup = group;
				}


				if(!newGroupPoints[thisGroup]){
					newGroupPoints[thisGroup] = [];
				}
				newGroupPoints[thisGroup].push({group:thisGroup,x:x,y:y,n:n});

				newData[n] = {group:thisGroup,x:x,y:y,n:n}
			}
		}


		//合并分组处理出最终的分组情况
		groups = this[mergeGroup](groups);


		//合并分组中点
		let mergeData = [];
		for(let i = 0,l = groups.length;i<l;i++){
			let thisGroup = groups[i];
			let thisMergeData = [];
			mergeData.push(thisMergeData);
			for(let j=0,jl=thisGroup.length;j<jl;j++){
				newGroupPoints[thisGroup[j]].map(p=>{
					thisMergeData.push(p);
				});
			}
		}


		//获取分组的区块坐标及大小
		//分组数据在 newGroupPoints 中
		let area = [];
		mergeData.map(g=>{
			let minX,maxX,minY,maxY;

			g.map(point=>{
				if(!minX && minX != 0){
					minX = point.x;
					maxX = point.x;
					minY = point.y;
					maxY = point.y;
				}else{
					minX = (point.x > minX)? minX : point.x;
					maxX = (point.x > maxX)? point.x : maxX;
					minY = (point.y > minY)? minY : point.y;
					maxY = (point.y > maxY)? point.y : maxY;
				}
			});

			area.push({x:minX,y:minY,w:maxX-minX,h:maxY-minY});
		});




		//去除过小的
		area = area.filter(rs=>{
			if(rs.w > 9 && rs.h > 9){
				return rs;
			}
		});

		//分开过大的
		let newArea = [];
		area.map(rs=>{
			if(rs.w>35){
				newArea.push({
					w:35,
					h:rs.h,
					x:rs.x,
					y:rs.y
				});
				newArea.push({
					w:rs.w-35,
					h:rs.h,
					x:rs.x+35,
					y:rs.y
				})
			}else{
				newArea.push(rs);
			}
		});


		return newArea;

	},

	//显示图片
	showImage(data,textArea){
		let {canvas,ctx} = this[createCanvas]();
		canvas.width = data.width;
		canvas.height = data.height;
		ctx.putImageData(data,0,0);


		document.body.appendChild(canvas);


		console.log(textArea)
		let colors = ['red','antiquewhite','cadetblue','blue','green'];
		textArea.map((rs,i)=>{
			ctx.fillStyle = colors[i];
			ctx.fillRect(rs.x,rs.y,rs.w,rs.h);
		})
	},


	showChildrenImage(data,textArea){
		textArea.map((rs,i)=>{
			let {canvas,ctx} = this[createCanvas]();
			canvas.width = rs.w;
			canvas.height = rs.h;
			ctx.putImageData(data,-rs.x,-rs.y);
			let newData = canvas.toDataURL();

			let img = new Image();
			img.onload = function(){
				canvas.width = 90;
				canvas.height = 90;
				ctx.drawImage(img,0,0,rs.w,rs.h,0,0,90,90);
				document.body.appendChild(canvas);
			};
			img.src= newData;
		})
	}
};








// module.exports = YZMSB;


//
//
// var img = new Image();
// img.src = document.getElementsByTagName('img')[0].src;
//
// img.onload = function(){
// 	createCanvas(this);
// };
//
// var aaa = function(data1){
// 	var w = data1.width, h = data1.height,data=data1.data;
// 	var newData = [];
//
// 	var getDataN = function(x,y){
// 		if(x<0 || y<0){
// 			return -1;
// 		}
// 		return (y*w+x)*4;
// 	};
//
// 	var setMinData = function(x,y){
// 		var points = [];
// 		for(var i=-1,l=1;i<=l;i++){
// 			for(var z=-1,zl=1;z<=zl;z++){
// 				var x1 = x+z,
// 					y1 = y+i,
// 					n1 = getDataN(x1,y1),
// 					val = data[n1];
//
// 				if(val==0 || val){
// 					points.push(val);
// 				}
//
// 			}
// 		}
//
// 		points.sort(function(a,b){
// 			return (a>b)? 1 : -1;
// 		});
// 		var minVal = points[0];
//
// 		var n = getDataN(x,y);
//
//
//
// 		newData[n] = minVal;
// 		newData[n+1] = minVal;
// 		newData[n+2] = minVal;
// 		newData[n+3] = data[n+3];
//
//
// //                if(data[n] != newData[n]){
// //                    console.log(n)
// //                }
//
// 	};
//
//
// 	for(var y=0,yl=h;y<yl;y++){
// 		for(var x=0,xl=w;x<xl;x++){
// //                    if(y==12 && x==57){
// //                        console.log(1)
// //                    }
// 			setMinData(x,y);
// 		}
// 	}
//
// 	return newData;
//
// };
// var bbb = function(data1){
// 	var w = data1.width, h = data1.height,data=data1.data;
// 	var newData = [];
//
// 	var getDataN = function(x,y){
// 		if(x<0 || y<0){
// 			return -1;
// 		}
// 		return (y*w+x)*4;
// 	};
//
// 	var setMinData = function(x,y){
// 		var points = [];
// 		for(var i=-1,l=1;i<=l;i++){
// 			for(var z=-1,zl=1;z<=zl;z++){
// 				var x1 = x+z,
// 					y1 = y+i,
// 					n1 = getDataN(x1,y1),
// 					val = data[n1];
//
// 				if(val==0 || val){
// 					points.push(val);
// 				}
//
// 			}
// 		}
//
// 		points.sort(function(a,b){
// 			return (a>b)? 1 : -1;
// 		});
// 		var minVal = points[points.length-1];
//
// 		var n = getDataN(x,y);
//
//
//
// 		newData[n] = minVal;
// 		newData[n+1] = minVal;
// 		newData[n+2] = minVal;
// 		newData[n+3] = data[n+3];
//
//
// //                if(data[n] != newData[n]){
// //                    console.log(n)
// //                }
//
// 	};
//
//
// 	for(var y=0,yl=h;y<yl;y++){
// 		for(var x=0,xl=w;x<xl;x++){
// //                    if(y==12 && x==57){
// //                        console.log(1)
// //                    }
// 			setMinData(x,y);
// 		}
// 	}
//
// 	return newData;
//
// };
//
// var createCanvas = function(obj){
// 	var canvas = document.createElement('canvas');
// 	var ctx = canvas.getContext('2d');
// 	canvas.width = 	obj.width*2;
// 	canvas.height = obj.height*2;
// 	ctx.drawImage(obj,0,0,obj.width*2,obj.height*2);
// 	document.body.append(canvas);
//
// 	var data = ctx.getImageData(0,0,obj.width*2,obj.height*2);
// 	var data1 = data.data;
// 	var min,max;
//
// 	for(var i=0,l=data1.length/4;i<l;i++){
// 		var ii = i*4;
// 		var grap = (data1[ii]+data1[ii+1]+data1[ii+2])/3;
// 		if(!min || !max){
// 			min = grap;
// 			max = grap;
// 		}else{
// 			min = (min<grap)? min : grap;
// 			max = (max>grap)? max : grap;
// 		}
//
// 		data1[ii] = grap;
// 		data1[ii+1] = grap;
// 		data1[ii+2] = grap;
// 	}
//
//
// 	var n = min+(max-min)/2;
//
// //            var n = 255/2;
// 	for(var z=0,zl=data1.length/4;z<zl;z++){
// 		var zz = z*4;
// 		var newVal = (data1[zz]<n)? 255 : 0;
// 		data1[zz] = newVal;
// 		data1[zz+1] = newVal;
// 		data1[zz+2] = newVal;
// 	}
//
// //            console.log(data)
//
// 	ctx.putImageData(data,0,0);
//
//
// 	var backData1 = aaa(data);
// 	var backData = bbb({
// 		width:obj.width*2,
// 		height:obj.height*2,
// 		data:backData1
// 	});
//
//
//
// 	var data2=  data.data;
// 	for(var j=0,jl=data2.length;j<jl;j++){
// //                if(data2[j]!=backData[j]){
// //                    console.log(data2[j],backData[j])
// //                }
// 		data2[j] = backData[j];
// 	}
//
// //            console.log(JSON.stringify(backData) == JSON.stringify(data.data))
// //            console.log(JSON.stringify(backData))
//
// 	window.imgData = data;
// 	window.imgData1 = backData;
//
//
// 	var canvas1 = document.createElement('canvas');
// 	var ctx1 = canvas1.getContext('2d');
// 	canvas1.width = 	obj.width*2;
// 	canvas1.height = obj.height*2;
// 	document.body.append(canvas1);
// 	ctx1.putImageData(data,0,0);
//
// };