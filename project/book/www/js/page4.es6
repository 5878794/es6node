
var PAGE4 = {
	from:"",
	async init(from){
		this.from = from;
		await this.refresh();
		await this.show();
		await this.bindEvent();
	},
	async search(){
		let inputVal = await this.checkInput();
		let data = await this.searchBQ(inputVal);
		
		this.bindData(data);
		this.cacheData(data);
		this.bindListEvent();

	},
	//显示
	show(){
		let dom = $("#page4"),
			win_width = window.innerWidth,
			_this = this;

		return new Promise(function(success,error){
			dom.css3({
				transform:"translateX("+win_width+"px)",
				display:"box"
			});

			dom.cssAnimate({
				transform:"translateX(0)"
			},500,function(){
				$("#"+_this.from).css({display:"none"});
				success();
			})
		});


	},
	//隐藏
	hide(){
		let dom = $("#page4"),
			win_width = window.innerWidth,
			_this = this;

		return new Promise(function(success,error){
			$("#"+_this.from).css3({display:"box"});
			dom.cssAnimate({
				transform:"translateX("+win_width+"px)"
			},500,function(){
				dom.css({display:"none"});
				success();
			})
		});
	},
	//重载页面
	refresh(){
		let back = $("#page4_back"),
			input = $("#page4_search"),
			search = $("#page4_search_btn"),
			body = $("#page4_body"),
			list = body.find(".page4_list");

		$$(list).unbind(true);
		$$(back).unbind(true);
		$$(search).unbind(true);
		input.val("");
		body.html("");

	},
	//事件绑定
	bindEvent(){
		let back = $("#page4_back"),
			search = $("#page4_search_btn"),
			_this = this;

		$$(back).myclickok(function(){
			_this.hide();
		});

		$$(search).myclickok(function(){
			_this.search().catch(function(msg){
				DEVICE.info.show(msg);
			});
		});
	},
	//检查输入框
	checkInput(){
		return new Promise(function(success,error){
			let input_val = $.trim($("#page4_search").val());

			if(input_val == ""){
				error("请输入要搜索的内容");
			}else{
				success(input_val);
			}
		})
	},
	//获取数据
	searchBQ(val){
		return new Promise(function(success,error){
			AJAX.go("./api/search",{val:val},function(rs){
				if(rs && rs.name){
					success(rs);
				}else{
					error("未找到该书籍");
				}
			},error)
		})
	},
	//数据绑定
	bindData(data){
		let body = $("#page4_body"),
			list = $("#page4_list");

		let oldList = body.find(".page4_list");
		$$(oldList).unbind(true);
		body.html("");


		let this_list = list.clone().css({display:"block"}).attr({id:""});

		this_list.find(".page4_list_name").text(data.name);
		this_list.data({url:data.url});
		this_list.find(".page4_list_worker").text(data.worker);
		this_list.find(".page4_list_info").text(data.info);

		body.append(this_list);
	},
	//缓存数据
	cacheData(data){
		let url = data.url,
			dir = data.dir;

		DATA.booksDir[url] = dir;
	},
	//列表事件绑定
	bindListEvent(){
		let body = $("#page4_body"),
			list = body.find(".page4_list"),
			_this = this;

		$$(list).myclickok(function(){
			let url = $(this).data("url"),
				name = $(this).find(".page4_list_name").text();

			PAGE2.init(url,name,"page4");

		})
	}
};