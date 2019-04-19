let exec = require("./../../../../lib/fn/exec"),
	list = require("./../svnList"),
	svnUser = require('./../setting'),
	getDataFn = require("./../../../../lib/fn/getRequestData"),
	path = require("path"),
	ftpUpload = require('./../ftpUpload'),
	fs = require('fs'),
	getProjectUrl = function(id){
		let backUrl;
		list.map(rs=>{
			if(rs.id == id){
				backUrl = rs.svnUrl;
			}
		});

		return backUrl;
	};



module.exports =async function(request){
	let {getData} = await getDataFn(request),
		id = getData.id,
		ver = getData.ver,
		url = getProjectUrl(id),
		project = url.substr(url.lastIndexOf('/')+1),
		saveUrl = path.join(__dirname,'../tempSaveCode'),
		delSvnUrl = path.join(saveUrl,'./.svn'),
		cmd1 = 'rm -rf '+delSvnUrl,
		cmd = "svn checkout -r "+ver+" "+url+" "+saveUrl+" --username "+svnUser.username+" --password "+svnUser.password;

	//清空下载的临时文件夹
	if(fs.existsSync(saveUrl)){
		await exec('rm -r '+saveUrl)
	}
	fs.mkdirSync(saveUrl);

	console.log('清除本地临时文件夹');

	//执行下载
	await exec(cmd);

	console.log('svn下载完成')

	//删除.svn文件夹
	console.log(cmd1)
	await exec(cmd1);


	//执行上传ftp服务器
	let backUrl = await ftpUpload(project,saveUrl);

	console.log('ftp上传完成');



	return {
		state:1,
		data:backUrl
	};
};