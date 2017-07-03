let device = require("device"),
	Icon = require("./lib/desktop/icon");


$(document).ready(function(){
	new Icon({
		icons:[
			{
				icon:"tempImg/icon.png",
				name:"test1",
				openUrl:"index.html#1",
				id:1
			},
			{
				icon:"tempImg/icon.png",
				name:"test2",
				openUrl:"index.html#2",
				id:2
			},
			{
				icon:"tempImg/icon.png",
				name:"test3",
				openUrl:"index.html#3",
				id:3
			},
			{
				icon:"tempImg/icon.png",
				name:"test4",
				openUrl:"index.html#4",
				id:4
			}
		],
		body:$("#desktop")
	})
});