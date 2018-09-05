


let ftp = require('ftp');

// 详见 https://www.npmjs.com/package/ftp

//注意 ftp.on('ready',function(){}) 注入的方法在ftp类销毁时 不会注销该事件
//                                 下次在监听该事件时会同时触发之间已经监听的事件的方法。。。。
//                                  注意完成一次ready时 用setTimeout将ready的方法设置成空函数。


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



module.exports = myFtp;