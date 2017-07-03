

//背景图片固定不动,不跟随滚动条滚动
//eg:  a = new bodyFixedBackground();
// a.url = "图片地址";



let createStyle = Symbol(),
	createTag = Symbol(),
	styleTag = Symbol(),
	backgroundSrc = Symbol();


class bodyFixedBackground{
	constructor(){
		this[backgroundSrc] = null;
		this[styleTag] = null;
		this[createTag]();
	}

	[createTag](){
		let tag = $("<style></style>");
		$("head").append(tag);

		this[styleTag] = tag;
	}

	[createStyle](){
		return  "body:before{" +
				"content:'';"+
				"position:fixed;z-index:-1;" +
				"left:0,top:0;width:100%;height:100%;" +
				"background-image:url("+this[backgroundSrc]+");" +
				"background-size:cover;-webkit-background-size:cover;"
	}

	set url(url){
		this[backgroundSrc] = url;
		let style = this[createStyle]();
		this[styleTag].html(style);
	}

	get url(){
		return this[backgroundSrc];
	}
}




module.exports = bodyFixedBackground;