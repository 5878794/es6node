``//手机不支持

//base64转blob对象
let fromBase64 = function(base64){
	var arr = base64.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new Blob([u8arr], {type:mime});
};

//blob对象转uri 访问显示
let toURI = function(blob){
	return window.URL.createObjectURL(blob);
};


//text转blob对象
let fromText = function(text){
	return new Blob([text]);

};


//在新窗口打开blob文件
let openInNewWindow = function(blob){
	var src= toURI(blob);
	window.open(src);
};


module.exports = {fromBase64,toURI,fromText,openInNewWindow};