let path = require("path"),
	applist = require("../../../app_download/server/api/getList");


module.exports = function(data,request,socket,catchData){

	return new Promise((success,error)=>{
		applist().then(rs=>{
			socket.send({
				type:"appList",
				data:rs
			})
			success();
		}).catch(e=>{
			console.log(e);
			error(e.toString());
		})
	})
};