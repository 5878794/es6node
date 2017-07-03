
//支持ie10+，chrome等
//不支持手机webkit
//canvas下载并保存为图片

// downloadCanvasToFile(
// 	canvasId,               //canvas的id
// 	downloadDomId,          //download标签的id，绑定下载事件
// 	downloadFileName        //要生成的文件名，不带后缀.
// );


var downloadCanvasToFile = function(canvasId,downloadDomId,downloadFileName){
	var dataURLtoBlob = function (dataurl) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {type:mime});
	};

	var canvas = document.getElementById(canvasId),
		base64 = canvas.toDataURL("image/png"),
		blob = dataURLtoBlob(base64),
		src= window.URL.createObjectURL(blob),
		downloadDom = document.getElementById(downloadDomId);


	if(window.navigator.msSaveBlob){
		downloadDom.onclick = function(){
			window.navigator.msSaveBlob(blob, downloadFileName+".png");
		};
	}else{
		downloadDom.download = downloadFileName+".png";
		downloadDom.href = src;
	}
};


module.exports = downloadCanvasToFile;