var PAGE1 = {

	//初始执行
	async init(){
		await this.bindEvent();
		let userData =  await this.getLocalUserData();
		DATA.books = userData.books;
		DATA.hasRead = userData.hasRead;
		let bookDir = await this.getLocalBookDirData();
		DATA.booksDir = bookDir;

		await this.createList();
		await this.checkAbnormalClose();
	},

	//更新按钮触发
	async getNewData(){
		let newBookDir =    await this.getNewBookDirData();
		newBookDir =        await this.reCreateNewBookDirData(newBookDir);
		let oldBookDir =    await this.getLocalBookDirData();
		await this.saveNewBookDirData(oldBookDir,newBookDir);

		DEVICE.info.show("更新成功!",true);

		setTimeout(function(){
			window.location.reload();
		},1000);

		// return newBookDir;
	},

	//获取本地书地址和已读数据
	getLocalUserData(){
		return new Promise(function(success,error){
			let tempData = [
				// {name:"aa",url:"http://www.biquge.tw/0_4/"},
				// {name:"bb",url:"http://www.biquge.tw/9_9080/"}
			];


			let data = JSON.parse(DEVICE.localData.getItem("cache") || '{}'),
				books = data.books || tempData,
				hasRead = data.hasRead || {};

			success({books,hasRead});
		})
	},

	//获取本地收藏的书的目录
	getLocalBookDirData(){
		return new Promise(function(success,error){
			let bookDir = JSON.parse(DEVICE.localData.getItem("bookDir") || '{}');
			success(bookDir)
		});
	},

	//获取最新的书的目录
	getNewBookDirData(){
		let data = [],
			hasRead = {};
		for(let i=0,l=DATA.books.length;i<l;i++){
			let bookUrl = DATA.books[i].url;
			data.push(bookUrl);

			let bookDir = DATA.booksDir[bookUrl] || [],
				bookLength = bookDir.length - 1,
				lastPage = bookDir[bookLength] || {};

			hasRead[bookUrl] = lastPage.url
		}

		return new Promise(function(success,error){
			AJAX.go("./api/",{books:data,hasRead:hasRead},success,error)
		});
	},


	//与本地数据合成新的数据
	reCreateNewBookDirData(data){
		let oldData = DATA.booksDir;

		return new Promise(function(success,error){
			for(var key in data){
				if(data.hasOwnProperty(key)){
					oldData[key].push.apply(oldData[key],data[key]);
				}
			}

			success(oldData);
		});
	},

	//保存新的书籍的目录数据
	saveNewBookDirData(oldData,data){
		return new Promise(function(success,error){
			let newData = {};
			for(var key in oldData){
				if(oldData.hasOwnProperty(key)){
					newData[key] = data[key];
				}
			}


			DEVICE.localData.setItem("bookDir",JSON.stringify(newData));
			success();
		});
	},


	//生成本地书本列表
	createList(){
		let data = DATA.books,
			body = $("#page1_body"),
			list = $("#page1_list");

		let old_list = body.find(".page1_list"),
			dels = old_list.find(".page1_list_del");
		$$(old_list).unbind(true);
		$$(dels).unbind(true);
		$$$(old_list).unbind(true);
		body.html("");


		for(let i=0,l=data.length;i<l;i++){
			let this_list = list.clone().css3({display:"box"}).attr({id:""}),
				this_data = data[i],
				number = this.getBooksNewDirsNumber(this_data.url);

			this_list.find(".page1_list_name").text(this_data.name);
			this_list.find(".page1_list_number").text(number);
			this_list.data({url:this_data.url}).attr({_id:this_data.url});

			body.append(this_list);
			this.dirClickEventBind(this_list);
		}

	},

	//获取书的未读章节数量
	getBooksNewDirsNumber(id){
		let bookDir = DATA.booksDir[id] || [],
			hasRead = DATA.hasRead[id],
			n = 0;

		if(!hasRead){
			return bookDir.length;
		}


		for(let i=0,l=bookDir.length;i<l;i++){
			let this_url = bookDir[i].url;
			if(this_url == hasRead){
				n = i;
				break;
			}
		}

		return bookDir.length - 1 - n;
	},


	//目录事件绑定
	dirClickEventBind(bookList){
		$$(bookList).myclickok(function(){
			let url = $(this).data("url"),
				name = $(this).find(".page1_list_name").text();

			PAGE2.init(url,name,"page1");
		});

		$$$(bookList).myslideleft(function(){
			$(this).cssAnimate({
				transform:"translateX(-60px)"
			},300)
		});
		$$$(bookList).myslideright(function(){
			$(this).cssAnimate({
				transform:"translateX(0)"
			},300)
		});

		let del = bookList.find(".page1_list_del"),
			_this = this;
		$$(del).myclickok(function(){
			let url = $(this).parent().data("url");
			_this.delBook(url,$(this).parent());
		})
	},

	//事件绑定
	bindEvent(){
		let search = $("#page1_search"),
			refresh = $("#page1_refresh"),
			_this = this;

		$$(search).myclickok(function(){
			_this.openSearchPage();
		});


		$$(refresh).myclickok(function(){
			_this.getNewData().catch(()=>{
				DEVICE.info.show("更新失败!");
			});
		});
	},


	//打开搜索页面
	openSearchPage(){
		PAGE4.init("page1");
	},

	//更改未读条数
	refreshNotReadNumber(id,number){
		$("#page1_body").find(".page1_list_main[_id='"+id+"']").find(".page1_list_number").text(number);
	},

	//刷新目录
	async refreshDir(){
		let userData =  await this.getLocalUserData();
		DATA.books = userData.books;
		DATA.hasRead = userData.hasRead;

		await this.createList();
	},
	async delBook(url,obj){
		let userData =  await this.getLocalUserData();
		let bookDir = await this.getLocalBookDirData();

		let books = userData.books,
			hasRead = userData.hasRead;

		let newBooks = [];
		for(let i=0,l=books.length;i<l;i++){
			let this_url = books[i].url;
			if(this_url != url){
				newBooks.push(books[i]);
			}
		}

		delete bookDir[url];

		await this.saveNewBookDirData(bookDir,bookDir);
		DEVICE.localData.setItem("cache",JSON.stringify({
			books:newBooks,
			hasRead:hasRead
		}));


		DATA.books = newBooks;
		DATA.hasRead = hasRead;
		DATA.booksDir = bookDir;

		obj.remove();

		DEVICE.info.show("删除成功!",true);
	},
	//检查是否异常关闭
	checkAbnormalClose(){
		let temp = JSON.parse(DEVICE.localData.getItem("temp") || '{}'),
			scrollTop = DEVICE.localData.getItem("temp_scroll");

		//判断是否异常关闭
		if(!temp.title){return;}

		//判断本地缓存中书的详细目录中是否有这个书的地址
		if(!DATA.booksDir[temp.bookUrl]){return;}

		PAGE2.init(temp.bookUrl,temp.title,"page1")
			 .then(function(){
				PAGE3.init1(
					temp.bookUrl,
					temp.infoUrl,
					temp.title,
					"page2",
					temp.n,
					temp.text,
					scrollTop
				);
			 })
	}
};