//图片处理类


let getImageData = Symbol(),
	loadImage = Symbol(),
	createCanvas = Symbol(),
	imageDataToBase64 = Symbol(),
	gray = Symbol.for('gray'),
	BlackAndWhite = Symbol.for('BlackAndWhite'),
	lightness = Symbol.for('lightness'),
	scaleByNear = Symbol.for('scaleByNear'),
	scaleByDoubleLine = Symbol.for('scaleByDoubleLine');



let handleImage = {
	async test(){
		let src = document.getElementById('aaa').src;
			data = await this[getImageData](src);
		data1 = data;

		let scale = 0.8;

		//处理1
		let newData = this[scaleByDoubleLine](data,scale),
			newSrc = this[imageDataToBase64](newData);

		let img = new Image();
		img.src = newSrc;
		document.body.appendChild(img);


		//处理2
		let newData1 = this[scaleByNear](data,scale),
			newSrc1 = this[imageDataToBase64](newData1);

		let img1 = new Image();
		img1.src = newSrc1;
		document.body.appendChild(img1);


		//系统效果
		let {canvas,ctx} = this[createCanvas]();
		canvas.width = data.width;
		canvas.height = data.height;
		ctx.putImageData(data,0,0);
		let src2 = canvas.toDataURL();
		let img3 = new Image();
		img3.src = src2;
		img3.width = data.width*scale;
		document.body.appendChild(img3);
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
	},


	//图片缩放  (速度快,有锯齿)
	//临近插值法
	//
	[scaleByNear](imgData,scale){
		let rgbaData = imgData.data,
			_width =  imgData.width,
			width = Math.round(imgData.width*scale),
			height = Math.round(imgData.height*scale),
			newRgbaData = new ImageData(width,height);

		for(let y=0,yl=height;y<yl;y++){
			let _y = Math.round(y/scale);

			for(let x=0,xl=width;x<xl;x++){
				let _x = Math.round(x/scale),
					_n = (_y*_width+_x)*4,
					n = (y*width+x)*4;

				newRgbaData.data[n] = rgbaData[_n];
				newRgbaData.data[n+1] = rgbaData[_n+1];
				newRgbaData.data[n+2] = rgbaData[_n+2];
				newRgbaData.data[n+3] = rgbaData[_n+3];
			}
		}

		return newRgbaData;
	},


	//图片缩放  （速度中等，效果中等）
	//双线行插值法
	//https://zh.wikipedia.org/wiki/%E5%8F%8C%E7%BA%BF%E6%80%A7%E6%8F%92%E5%80%BC
	[scaleByDoubleLine](imgData,scale){
		let rgbaData = imgData.data,
			_width = imgData.width,
			_height = imgData.height,
			width = Math.round(imgData.width*scale),
			height = Math.round(imgData.height*scale),
			newRgbaData = new ImageData(width,height);

		for(let y=0,yl=height;y<yl;y++){
			let _y = y/scale,
				y1 = parseInt(_y),
				perY = _y - y1,
				y2 = y1+1;
			y2 = (y2>_height)? _height : y2;

			for(let x=0,xl=width;x<xl;x++){
				let _x = x/scale,
					x1 = parseInt(_x),
					perX = _x - x1,
					x2 = x1 + 1,
					n = (y*width+x)*4;
				x2 = (x2>_width)? _width : x2;

				//获取周围4个点的n值
				let p11 = (y1*_width+x1)*4,
					p21 = (y1*_width+x2)*4,
					p12 = (y2*_width+x1)*4,
					p22 = (y2*_width+x2)*4;

				let r = (rgbaData[p21]*perX + rgbaData[p11]*(1-perX))*(1-perY) +
						(rgbaData[p22]*perX + rgbaData[p12]*(1-perX))*perY;
				let g = (rgbaData[p21+1]*perX + rgbaData[p11+1]*(1-perX))*(1-perY) +
						(rgbaData[p22+1]*perX + rgbaData[p12+1]*(1-perX))*perY;
				let b = (rgbaData[p21+2]*perX + rgbaData[p11+2]*(1-perX))*(1-perY) +
						(rgbaData[p22+2]*perX + rgbaData[p12+2]*(1-perX))*perY;
				let a = (rgbaData[p21+3]*perX + rgbaData[p11+3]*(1-perX))*(1-perY) +
						(rgbaData[p22+3]*perX + rgbaData[p12+3]*(1-perX))*perY;


				newRgbaData.data[n] = r;
				newRgbaData.data[n+1] = g;
				newRgbaData.data[n+2] = b;
				newRgbaData.data[n+3] = a;
			}
		}

		return newRgbaData;
	}


};