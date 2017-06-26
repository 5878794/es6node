/**
 * Created by beens on 2017/3/8.
 */



var exec = require("./../../../../lib/fn/exec"),
	list = require("../svnList");




module.exports = function(request){
	//固定返回promise对象
	return new Promise(async (success,error)=>{
		//并发获取版本号
		let all = await Promise.all(list.map(async rs=>{
			let url = rs.svnUrl,
				cmd = "svn info "+url;
			//exec() 返回promise对象
			return exec(cmd);
		}));

		//处理返回数据
		let backData = [];
		for(var i=0,l=list.length;i<l;i++){
			let ver = "获取失败";
			if(all[i].state == 1){
				//获取成功的
				ver = all[i].data;
				ver = ver.split("Revision:")[1];
				ver = parseInt(ver);
			}

			backData.push({
				ver:ver,
				name:list[i].name,
				id:list[i].id
			});
		}

		success({
			state:1,
			data:backData
		});

	})
};



