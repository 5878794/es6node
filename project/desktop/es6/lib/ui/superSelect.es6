
//单选 多选ui   手机用
//只有弹出层部分，没有select控件本身

// new superSelect({
// 	data:[{code:1,value:"aa"}],
// 	selected: [1,2],
// 	type: "single"    //single单选  填其他多选
// }).then(rs=> {
//          rs.codes     返回code的数组。没选返回空数组
//          rs.values    返回value的数组。没选返回空数组
// }).catch(rs=> {
// 	console.log(rs)   取消，报错执行，默认不需要
// });




let init = Symbol(),
	createDom = Symbol(),
	mainDom = Symbol(),
	listDom = Symbol(),
	createList = Symbol(),
	listClone = Symbol(),
	selectedText = Symbol(),
	bindEvent = Symbol(),
	singleListClick = Symbol(),
	multipleListClick = Symbol(),
	allListDom = Symbol(),
	cancelBtn = Symbol(),
	submitBtn = Symbol(),
	submit = Symbol(),
	show = Symbol(),
	bodyDom = Symbol(),
	tempFn = Symbol();


let $$ = require("../event/$$");
require("../jq/cssAnimate");


class superSelect{
	constructor(opt={}){
		this.data = opt.data || [];
		this.selected = opt.selected || [];
		this.type = opt.type || "single";   //single 单选  其他值多选
		this.titleHeight = 40;
		this.fontSize = "0.24rem";

		//显示层
		this[mainDom] = null;
		//列表容器
		this[listDom] = null;
		//列表项克隆对象
		this[listClone] = null;
		//选中的字符
		this[selectedText] = "✓";
		//所有多列表对象
		this[allListDom] = null;
		//非背景层之外的dom
		this[bodyDom] = null;


		return this[init]();
	}
	[init](){
		return new Promise((success,error)=>{
			this[createDom]();
			this[createList]();
			this[allListDom] = this[listDom].find("div");
			this[bindEvent](success,error);
			this[show]();
		})
	}
	//创建容器
	[createDom](){
		//遮罩层
		let zz = $("<div></div>");
		zz.css({
			position:"fixed",
			left:0,top:0,width:"100%",height:"100%",
			background:"rgba(0,0,0,0)"
		});


		//主容器
		let body = $("<div></div>");
		body.css3({
			position:"fixed",
			left:0,bottom:0,width:"100%",height:"50%",
			"font-size":this.fontSize,
			background:"#fff",
			transform:"translateY(100%)"
		});
		//标题
		let title = $("<div></div>");
		title.css({
			width:"100%",height:this.titleHeight+"px",
			background:"#fff",
			"border-bottom":"1px solid #ccc",
			"line-height":this.titleHeight+"px",
			position:"relative"
		});
		//列表容器
		let main = $("<div></div>");
		main.css({
			width:"100%",
			height:window.innerHeight/2 - this.titleHeight + "px",
			"overflow-x":"hidden",
			"overflow-y":"scroll",
			"-webkit-overflow-scrolling":"touch"
		});
		body.append(title).append(main);
		zz.append(body);


		//列表克隆对象
		let clone = $("<div></div>");
		clone.css3({
			width:"100%", height:this.titleHeight+"px",
			padding:"0 "+this.titleHeight/2+"px",
			"box-sizing":"border-box",
			display:"box",
			"flex-direction":"row",
			"line-height":this.titleHeight+"px",
			"border-bottom":"1px solid #eee"
		});
		let clone_span = $("<span></span>");
		clone_span.css({
			display:"block",
			width:this.titleHeight+"px",
			height:this.titleHeight+"px",
			"text-align":"center"
		});
		let clone_p = $("<p></p>");
		clone_p.css3({
			flex:1,height:this.titleHeight+"px",
			overflow:"hidden",
			"text-overflow":"ellipsis",
			"white-space":"nowrap"
		});
		clone.append(clone_span).append(clone_p);


		//确定，取消按钮
		let cancel = $("<div>取消</div>"),
			submit = $("<div>确定</div>");
		cancel.css({
			position:"absolute",left:0,top:0,
			width:this.titleHeight*2 +"px",
			height:this.titleHeight+"px",
			"text-align":"center",
			color:"#aaa"
		});
		submit.css({
			position:"absolute",right:0,top:0,
			width:this.titleHeight*2 +"px",
			height:this.titleHeight+"px",
			"text-align":"center",
			color:"#5756d5"
		});
		title.append(cancel).append(submit);

		this[bodyDom] = body;
		this[cancelBtn] = cancel;
		this[submitBtn] = submit;
		this[listClone] = clone;
		this[mainDom] = zz;
		this[listDom] = main;
	}
	//创建列表
	[createList](){
		this.data.map(rs=>{
			let list = this[listClone].clone();
			list.attr({_id:rs.code});
			list.find("p").text(rs.value);

			if(this.selected.indexOf(rs.code)>-1){
				list.find("span").text(this[selectedText]);
				list.css({color:"#5756d5"});
			}

			this[listDom].append(list);
		})
	}
	//事件绑定
	[bindEvent](success,error){
		let lists = this[allListDom],
			_this = this;

		$$(lists).myclickok(function(){
			if(_this.type == "single"){
				_this[singleListClick](this);
			}else{
				_this[multipleListClick](this);
			}
			//修正android不刷新ui的bug
			$("body").append("<div></div>");
		});


		$$(this[cancelBtn]).myclickok(function(){
			_this.destroy(error);
		});
		$$(this[submitBtn]).myclickok(function(){
			_this[submit](success);
		});

		// window.addEventListener("touchstart",this[tempFn]=function(e){
		// 	e.preventDefault();
		// },false)
	}
	//列表点击处理(单选)
	[singleListClick](dom){
		this[allListDom].find("span").text("");
		$(dom).find("span").text(this[selectedText]);

		this[allListDom].css({color:"#000"});
		$(dom).css({color:"#5756d5"});

	}
	//列表点击处理(多选)
	[multipleListClick](dom){
		let text = $(dom).find("span").text();
		text = (text)? "" : this[selectedText];

		let color = (text)? "#5756d5" : "#000";
		$(dom).find("span").text(text);
		$(dom).css({color:color});
	}
	//显示
	[show](){
		$("body").append(this[mainDom]);
		var _this = this;

		_this[mainDom].cssAnimate({
			"background-color":"rgba(0,0,0,0.5)"
		},500,function(){
			_this[bodyDom].cssAnimate({
				transform:"translateY(0%)"
			},500)
		})

	}
	//点击确定按钮
	[submit](success){
		let selects = [],
			values = [];
		this[allListDom].each(function(){
			let text = $(this).find("span").text(),
				id = $(this).attr("_id"),
				value = $(this).find("p").text();
			if(text){
				selects.push(id);
				values.push(value);
			}
		});
		this.destroy();
		success({codes:selects,values:values});
	}
	//销毁
	destroy(error){
		error = error || function(){};
		$$(this[submitBtn]).unbind(true);
		$$(this[cancelBtn]).unbind(true);
		$$(this[allListDom]).unbind(true);
		// window.removeEventListener("touchstart",this[tempFn],false);
		this[mainDom].remove();
		error();
	}




}



module.exports = superSelect;