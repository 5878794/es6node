

let exec = require("./../../../../lib/fn/exec"),
	list = require("./../svnList"),
	getData = require("./../../../../lib/fn/getRequestData"),
	path = require("path"),
	fs = require('fs'),
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


let writeFile = function(fileUrl,fileText){
	fileText = decodeURI(fileText);
	return new Promise((success,error)=>{
		fs.writeFile(fileUrl, fileText, 'utf8', (err) => {
			if (err) {
				error(err);
				throw err;
			}
			success();
		});

	})
};

let createTempDir = function(dir1,dir2){
	dir1 = dir1.substr(0,dir1.length-1);
	dir2 = dir2.substr(0,dir2.length-1);
	return new Promise((success,error)=>{
		if(!fs.existsSync(dir1)){
			fs.mkdirSync(dir1);
		}

		if(!fs.existsSync(dir2)){
			fs.mkdirSync(dir2);
		}

		success();
	});
};



module.exports = async function(request){
	let data = await getData(request);
	data = data.postData;

	let	id = data.id,
		ver = parseInt(data.ver),
		settingText = data.setting,
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
			settingJsUrl = path.join(saveUrl,'/js/setting.js'),
			zipUrl = path.join(__dirname,"../../www/zip/"),
			username = user.username,
			password = user.password,
			cmd = (ver)?
				"svn checkout -r "+ver+" "+svnUrl+" "+saveUrl+" --username "+username+" --password "+password :
				"svn checkout "+svnUrl+" "+saveUrl+" --username "+username+" --password "+password ,
			stamp = new Date().getTime(),
			fileName = name+"_ver_"+ver+"____"+stamp+".zip",
			cmd1 = "cd "+saveUrl+" ; zip -r "+zipUrl+fileName+" ./*",
			cmd2 = "rm -r "+delTempUrl+"*; rm -rf "+zipUrl+"*",
			cmd3 = "";

		await createTempDir(zipUrl,delTempUrl).catch(rs=>{error({state:0,msg:"生成临时文件夹出错"})});
		await exec(cmd2).catch(rs=>{error({state:0,msg:"系统错误"})});
		await exec(cmd).catch(rs=>{error({state:0,msg:"检出版本失败"})});
		await writeFile(settingJsUrl,settingText).catch(rs=>{error({state:0,msg:"生成配置文件出错"})});
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
