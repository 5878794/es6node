


let ftp = require('ftp');


class myFtp extends ftp{
	constructor(opt){
		super(opt);

	}

	$cd(path){
		return new Promise((success,error)=>{
			this.cwd(path,function(err){
				if(err){
					error(err);
				}else{
					success();
				}
			})
		})
	}

	$ls(){
		return new Promise((success,error)=>{
			this.list(function(err,list){
				if(err){
					error(err);
				}else{
					success(list);
				}
			})
		})
	}

	$mkdir(dirName){
		return new Promise((success,error)=>{
			this.mkdir(dirName,function(err){
				if(err){
					error(err)
				}else{
					success();
				}
			})
		});
	}

	$rmdir(dirName,recursive=true){
		return new Promise((success,error)=>{
			this.rmdir(dirName,recursive,function(err){
				if(err){
					error(err)
				}else{
					success();
				}
			})
		});

	}

	$put(input,destPath){
		return new Promise((success,error)=>{
			this.put(input,destPath,function(err){
				if(err){
					error(err);
				}else{
					success();
				}
			})
		})
	}
}



module.exports = new myFtp();