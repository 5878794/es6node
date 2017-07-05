
let init = Symbol(),
	getParam = Symbol(),
	bodyWidth = Symbol(),
	bodyHeight = Symbol(),
	createWindow = Symbol(),
	frameAutoSize = Symbol();


require("../jq/extend");



class _window{
	constructor(opt){
		this.icon = opt.icon;
		this.name = opt.name;
		this.openUrl = opt.openUrl;
		this.id = opt.id;
		this.body = opt.body || $("body");
		this.width = opt.width || 600;
		this.height = opt.height || 300;
		this.left = 100;
		this.top = 100;
		this.zIndex = 500;

		this[bodyWidth] = null;
		this[bodyHeight] = null;

		this[init]();
	}

	[init](){
		this[getParam]();
		this[createWindow]();
	}

	//获取参数
	[getParam](){
		this[bodyWidth] = parseInt(this.body.width());
		this[bodyHeight] = parseInt(this.body.height());
	}

	//创建窗口
	[createWindow](){
		let main = $("<div id='aaa'></div>");
		main.css3({
			width:this.width+"px",
			height:this.height+40+"px",
			position:"absolute",
			"border-radius":"10px",
			left:this.left+"px",
			top:this.top+"px",
			"box-sizing":"border-box",
			border:"1px solid #ccc",
			overflow:"hidden",
			"z-index":this.zIndex,
			"box-shadow":"10px 10px 20px 3px #ddd"
		});

		let title = $("<div>"+this.name+"</div>");
		title.css3({
			width:"100%",
			height:"40px",
			"line-height":"40px",
			position:"relative",
			"text-align":"center",
			background:"linear-gradient(rgb(235,237,235) 0%,rgb(215,213,215) 100%)"
		});

		let btns = $("<div></div>");
		btns.css({
			position:"absolute",
			width:"100px",
			height:"40px",
			left:"10px",top:0
		});

		let btn = $("<div></div>");
		btn.css({
			width:"14px",height:"14px",
			"font-size":"9px",
			"line-height":"14px",
			"text-align":"center",
			"border-radius":"14px",
			margin:"13px 4px",
			background:"red",
			float:"left"
		});
		let close = btn.clone().text("x").css({
			background:"rgb(252,98,93)",
			"line-height":"13px"
		});
		let min = btn.clone().text("－").css({
			background:"rgb(253,188,64)"
		});
		let max = btn.clone().text("↕").css3({
			background:"rgb(53,204,74)",
			transform:"rotate(45deg)",
			"line-height":"13px"
		});
		btns.append(close).append(min).append(max);
		title.append(btns);

		let frame = $("<div></div>");
		frame.css({
			left:0,right:0,bottom:0,top:"40px",
			position:"absolute",
			background:"#fff"
		});

		let iframeId = "__iframe_"+this.id;
		let iframe = $("<iframe id='"+iframeId+"' src='"+this.openUrl+"' scrolling='no' marginheight='0' marginwidth='0' frameborder='none'  />");
		frame.append(iframe);
		this[frameAutoSize](main,frame,iframe);


		main.append(title).append(frame);


		this.body.append(main);
	}

	//iframe窗口自适应
	[frameAutoSize](body,main,iframe){
		let setWH = function(){
			iframe.get(0).width = main.get(0).clientWidth;
			iframe.get(0).height = main.get(0).clientHeight;
		};

		// let style = body.style;
		// style = new Proxy(style,{
		// 	set:function(t,k,v,r){
		// 		console.log(1111111);
		// 		return Reflect.set(t,k,v,r);
		// 	}
		// });
		// body.style = style;

		iframe.load(function(){
			setWH();
		});
	}
}


module.exports = _window;