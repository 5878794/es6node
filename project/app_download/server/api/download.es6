

let exec = require("./../../../../lib/fn/exec"),
	list = require("./../svnList"),
	getData = require("./../../../../lib/fn/getRequestData"),
	path = require("path"),
	user = require("./../setting");


let getObj = function(id){
	let obj;
	list.map(rs=>{
		if(rs.id == id){
			obj = rs;
		}
	});
	return obj;
};


module.exports = async function(request){
	let data = await getData(request);
	data = data.getData;

	let	id = data.id,
		ver = data.ver,
		obj = getObj(id);

	return new Promise(async (success,error)=>{
		if(!obj){
			error({
				state:0,
				msg:"获取应用不存在"
			})
		}

		let svnUrl = obj.svnUrl,
			name = obj.name,
			delTempUrl = path.join(__dirname,"../../www/temp/"),
			saveUrl = delTempUrl+name,
			zipUrl = path.join(__dirname,"../../www/zip/"),
			username = user.username,
			password = user.password,
			cmd = "svn checkout -r "+ver+" "+svnUrl+" "+saveUrl+" --username "+username+" --password "+password,
			stamp = new Date().getTime(),
			fileName = name+"_ver_"+ver+"____"+stamp+".zip",
			cmd1 = "cd "+saveUrl+" ; zip -r "+zipUrl+fileName+" ./*",
			cmd2 = "rm -r "+delTempUrl+"*; rm -rf "+zipUrl+"*";

		await exec(cmd2).catch(rs=>{error({state:0,msg:"系统错误"})});
		await exec(cmd).catch(rs=>{error({state:0,msg:"检出版本失败"})});
		await exec(cmd1).then(rs=>{
							let url = "/app_download/zip/"+fileName;
							success({
								state:1,
								data:url
							})
						}).catch(rs=>{
							error({
								state:0,
								msg:"打包失败"
							})
						})
	});

};
