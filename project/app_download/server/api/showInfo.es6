/**
 * Created by beens on 2017/3/8.
 */



var exec = require("./../../../../lib/fn/exec"),
	getData = require("./../../../../lib/fn/getRequestData"),
	list = require("../svnList");

let getObj = function(id){
	let obj;
	list.map(rs=>{
		if(rs.id == id){
			obj = rs;
		}
	});
	return obj;
};


module.exports = function(request){
	//固定返回promise对象
	return new Promise(async (success,error)=>{
		let data = await getData(request);
		data = data.getData;

		let	id = data.id,
			obj = getObj(id),
			cmd = "svn log "+obj.svnUrl;

		await exec(cmd).then(rs=>{
			success({
				state:1,
				data:rs
			})
		}).catch(rs=>{
			error({
				state:0,
				msg:rs
			})
		})

	})
};



