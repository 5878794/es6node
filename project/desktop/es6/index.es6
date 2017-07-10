let device = require("device"),
	Icon = require("./lib/desktop/icon"),
	Window = require("./lib/desktop/windows");

window.device= device;

$(document).ready(function(){
	new Icon({
		icons:[
			{
				icon:"tempImg/icon.png",
				name:"test1",
				openUrl:"page1.html",
				id:1
			},
			{
				icon:"tempImg/icon.png",
				name:"test2",
				openUrl:"page2.com",
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
				openUrl:"http://www.baidu.com",
				id:4
			}
		],
		body:$("#desktop"),
		clickFn:function(data){
			data.body = $("#desktop");
			new Window(data);


		}
	})
});