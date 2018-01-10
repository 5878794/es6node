//图片处理类


let getImageData = Symbol(),
	loadImage = Symbol(),
	createCanvas = Symbol(),
	imageDataToBase64 = Symbol(),
	gray = Symbol.for('gray'),
	BlackAndWhite = Symbol.for('BlackAndWhite'),
	lightness = Symbol.for('lightness');



let handleImage = {
	async test(){
		let src = document.getElementById('aaa').src;
			data = await this[getImageData](src);

		let newData = this[lightness](data,200),
			newSrc = this[imageDataToBase64](newData);

		let img = new Image();
		img.src = newSrc;
		document.body.appendChild(img);

	},


	//创建canvas
	[createCanvas](){
		let canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');

		return {canvas,ctx}
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


	//获取图片数据
	async [getImageData](src){
		let img = await this[loadImage](src),
			{canvas,ctx} = this[createCanvas]();

		//原图放大2背处理
		canvas.width = img.width;
		canvas.height = img.height;

		ctx.drawImage(img,0,0,img.width,img.height);
		return ctx.getImageData(0,0,canvas.width,canvas.height);
	},


	//图片数据转base64
	[imageDataToBase64](data){
		let {canvas,ctx} = this[createCanvas]();
		canvas.width = data.width;
		canvas.height = data.height;
		ctx.putImageData(data,0,0);


		return canvas.toDataURL();
	},


	//图片转灰色
	//原理:
	//gray = (r+g+b)/3
	[gray](imgData){
		let rgbaData = imgData.data;

		for(var i=0,l=rgbaData.length/4;i<l;i++){
			var ii = i*4;
			var grayNumber = (rgbaData[ii]+rgbaData[ii+1]+rgbaData[ii+2])/3;

			rgbaData[ii] = grayNumber;
			rgbaData[ii+1] = grayNumber;
			rgbaData[ii+2] = grayNumber;
		}

		return imgData;
	},


	//图片转黑白
	//原理:
	//先转  gray = (r+g+b)/3
	//取最小灰度和最大灰度的中间值n来衡量,  小于d转255 大于d转0;
	[BlackAndWhite](imgData){
		let rgbaData = imgData.data,
			minNumber,maxNumber;

		for(var i=0,l=rgbaData.length/4;i<l;i++){
			var ii = i*4;
			var grayNumber = (rgbaData[ii]+rgbaData[ii+1]+rgbaData[ii+2])/3;

			//判断最小、最大颜色值
			if(!minNumber || !maxNumber){
				minNumber = grayNumber;
				maxNumber = grayNumber;
			}else{
				minNumber = (minNumber<grayNumber)? minNumber : grayNumber;
				maxNumber = (maxNumber>grayNumber)? maxNumber : grayNumber;
			}


			rgbaData[ii] = grayNumber;
			rgbaData[ii+1] = grayNumber;
			rgbaData[ii+2] = grayNumber;
		}

		//获取灰度的中间值（这个值根据图片情况来定的）；
		var n = minNumber+(maxNumber-minNumber)/2;

		//通过中间色转2色图片
		//低于中间色转255，高于转0
		for(var z=0,zl=rgbaData.length/4;z<zl;z++){
			var zz = z*4;
			var newVal = (rgbaData[zz]<n)? 255 : 0;
			rgbaData[zz] = newVal;
			rgbaData[zz+1] = newVal;
			rgbaData[zz+2] = newVal;
		}


		return imgData;
	},


	//图片增加亮度
	// number为增加亮度的数值 (负值变暗,正值变亮)  范围 0-255
	//原理:
	//图像的rgb同时增加number的值
	[lightness](imgData,number){
		let rgbaData = imgData.data;

		for(var i=0,l=rgbaData.length/4;i<l;i++){
			var ii = i*4;

			let r = rgbaData[ii],
				g = rgbaData[ii+1],
				b = rgbaData[ii+2];

			r += number;
			g += number;
			b += number;

			r = (r<0)? 0 : (r>255)? 255 : r;
			g = (g<0)? 0 : (g>255)? 255 : g;
			b = (b<0)? 0 : (b>255)? 255 : b;

			rgbaData[ii] = r;
			rgbaData[ii+1] = g;
			rgbaData[ii+2] = b;
		}

		return imgData;
	}



};