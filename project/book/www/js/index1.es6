$(document).ready(function(){

	DEVICE.mainfest();

	PAGE1.init()
		.then(function(val){console.log(val)})
		.catch(function(e){
			DEVICE.info.show("error");
		});

	$("#page3_body").scroll(function(){
		let scrollTop = $(this).scrollTop();
		DEVICE.localData.setItem("temp_scroll",scrollTop);
	})


});



var DATA  = {
	//书目录的地址
	books:[],
	//书已读的最后章节地址
	hasRead:{},
	//书目录
	booksDir:{},
};













