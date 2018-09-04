let ftp = require('../../../lib/fn/ftpLib'),
	fs = require('fs'),
	path = require('path'),
	localDir;


let createDir = function(dir,projectPath,project){
	dir = dir.map(rs=>{
		return project+rs.replace(projectPath,'');
	});




	return dir;
};
let uploadFiles = function(dir,files,projectPath,project){

	return new Promise(success=>{
		ftp.on('ready',async function(){
			let ls = await ftp.$ls();

			//判断是否存在目录
			let needDel = false;
			ls.map(rs=>{
				if(rs.type == 'd' && rs.name==project){
					needDel = true;
				}
			});
			if(needDel){
				await ftp.$rmdir(project);
			}


			await ftp.$mkdir(project);


			for(let i=0,l=dir.length;i<l;i++){
				await ftp.$mkdir(dir[i]).catch(rs=>{});
			}


			for(let i=0,l=files.length;i<l;i++){
				let localFile = files[i],
					remoteFile = project+localFile.replace(projectPath,'');

				await ftp.$put(localFile,remoteFile);
			}
			ftp.end();
			success();
		});



		ftp.connect({
			host:'172.16.1.35',
			// port:'21',
			user:'care4u',
			password:'care4u',
			connTimeout:'10000'
		});
	})

};


let getProjectDir = function(search_path,allDir=[],allFiles=[],canSuccess=true){
	return new Promise(success=>{
		let files = fs.readdirSync(search_path);
		files.map(rs=>{
			let thisPath = path.join(search_path,rs);
			//改文件或目录状态
			let fileState = fs.statSync(thisPath);

			//判断是否是目录
			if(!fileState.isDirectory()){
				allFiles.push(thisPath);
			}else{
				allDir.push(thisPath);
				getProjectDir(thisPath,allDir,allFiles,false);
			}
		});

		if(canSuccess){
			success({
				dir:allDir,
				file:allFiles
			});
		}
	});
};




module.exports = async function(project,projectPath){
	let {dir,file} = await getProjectDir(projectPath);
	dir = createDir(dir,projectPath,project);
	await uploadFiles(dir,file,projectPath,project);

	console.log('ftp上传成功');
	let url = 'http://172.16.1.35:8090/H5/'+project+'/';
	console.log(url);

	return url;
};