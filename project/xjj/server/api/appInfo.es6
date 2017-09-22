let path = require("path"),
	exec = require("./../../../../lib/fn/exec"),
	getData = require("./../../../../lib/fn/getRequestData"),
	list = require("../../../app_download/server/svnList");


let getObj = function(id){
	let obj;
	list.map(rs=>{
		if(rs.id == id){
			obj = rs;
		}
	});
	return obj;
};
module.exports = function(data,request,socket,catchData){

	return new Promise(async (success,error)=>{
		let	id = data.appId,
			obj = getObj(id),
			cmd = "svn log "+obj.svnUrl;

		await exec(cmd).then(rs=>{
			socket.send({
				type:"appInfo",
				data:rs
			})
		}).catch(rs=>{
			console.log(rs);
			error(rs);
		})
	})
};