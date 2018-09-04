let exec = require("./../../../../lib/fn/exec"),
	list = require("./../svnList"),
	svnUser = require('./../svnList'),
	getData = require("./../../../../lib/fn/getRequestData"),
	path = require("path");



module.exports = function(request){
	return new Promise((success,error)=>{
		let backData = [];
		list.map(rs=>{
			backData.push({
				id:rs.id,
				name:rs.name
			})
		});
		success({
			state:1,
			data:backData
		});
	});

};