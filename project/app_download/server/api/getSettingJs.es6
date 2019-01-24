

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
		ver = parseInt(data.ver),
		obj = getObj(id);

	return new Promise(async (success,error)=>{
		if(!obj){
			error({
				state:0,
				msg:"获取应用不存在"
			})
		}

		let svnUrl = obj.svnUrl,
			settingJsUrl = svnUrl+'/js/setting.js',
			username = user.username,
			password = user.password,
			cmd = (ver)?
				"svn cat -r "+ver+" "+settingJsUrl+" --username "+username+" --password "+password :
				"svn cat "+settingJsUrl+" --username "+username+" --password "+password ;

		await exec(cmd).then(rs=>{
							console.log(rs);
							success({
								state:1,
								data:rs
							})
						}).catch(rs=>{
							error({
								state:0,
								msg:"获取失败"
							})
						}).catch(rs=>{error({state:0,msg:"获取设置失败"})});
	});

};
