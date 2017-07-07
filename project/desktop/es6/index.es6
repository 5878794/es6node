let device = require("device"),
	Icon = require("./lib/desktop/icon"),
	Window = require("./lib/desktop/windows");


$(document).ready(function(){
	new Icon({
		icons:[
			{
				icon:"tempImg/icon.png",
				name:"test1",
				openUrl:"http://www.baidu.com",
				id:1
			},
			{
				icon:"tempImg/icon.png",
				name:"test2",
				openUrl:"http://www.qq.com",
				id:2
			},
			{
				icon:"tempImg/icon.png",
				name:"test3",
				openUrl:"http://www.163.com",
				id:3
			},
			{
				icon:"tempImg/icon.png",
				name:"test4",
				openUrl:"http://www.sina.com.cn",
				id:4
			}
		],
		body:$("#desktop"),
		clickFn:function(data){
			new Window(data);


		}
	})
});