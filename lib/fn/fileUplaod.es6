//文件上传类，支持多个文件一起上传


// let savePath = path.join(__dirname,'../../www/upload/');
// new fileUpload({
// 	saveDirPath:savePath,           //文件保存的绝对地址
// 	success:function(rs){           //成功返回的rs为数组。需要单独判断其中每个文件对象上传是否成功
// 		success({
// 			state:1,
// 			data:rs
// 		});
// 	},
// 	error:function(msg){            //上传失败
// 		success({
// 			state:0,
// 			msg:msg
// 		});
// 	}
// },request)                       //request 提交的对象



let formidable = require('formidable'),
	util = require('util'),
	fs = require("fs");


class FileUpload{
	constructor(opt={},request){

		this.allowTypes = opt.allowType || ['image/jpeg','image/gif','image/jpg','image/png'];
		this.maxFileSize = opt.maxSize || 1024*1024*2;
		this.saveDirPath = opt.saveDirPath;
		this.maxMB = parseFloat(this.maxFileSize/1024/1024).toFixed(1);
		this.success = opt.success || function(){};
		this.error = opt.error || function(){};

		this.request = request;
		this.form = null;


		this.init();
	}

	init(){
		this.createFormObj();
		this.handlerForm();
	}

	//生成处理form的对象
	createFormObj(){
		this.form = new formidable.IncomingForm();

		this.form.encoding = 'utf-8';
		this.form.uploadDir = this.saveDirPath;
		this.form.keepExtensions = true;
		this.form.maxFields = 1000;
		this.form.multiples = true;
	}

	//处理表单
	handlerForm(){
		let _this = this;

		this.form.parse(this.request, function(err, fields, files) {
			//发生错误
			if(err){
				_this.error(err);
				return;
			}

			var req_files = files.file;
			req_files = (req_files.constructor === Array)? req_files : [req_files];


			//上传文件为空
			//为空时也会生成一个文件对象
			if(req_files.length == 1 && req_files[0].name == ""){
				//会生成空文件
				setTimeout(function(){
					fs.unlinkSync(req_files[0].path);
				},0);
				_this.error('上传文件为空');
				return;
			}

			_this.handlerFiles(req_files);

		});


	}

	//判断文件是否超出限制
	fileHasError(type,size){
		let errMsg = [];

		//检查文件类型、大小
		if(this.allowTypes.indexOf(type.toLocaleLowerCase()) == -1){
			errMsg.push("文件类型错误");
		}
		if(size > this.maxFileSize){
			errMsg.push("文件超出"+this.maxMB+"mb");
		}

		return errMsg;
	}

	//创建新的文件名
	createNewFileName(name){
		let isExist = true,
			new_file = "",
			type = "",
			new_path;

		if(name){
			type = name.split(".")[1] || "";
		}
		type = (type)? "."+type : type;



		do{
			new_file = 'file_'+new Date().getTime() + type;
			new_path = this.saveDirPath + new_file;

			isExist = fs.existsSync(new_path);
		}
		while(isExist);

		return {
			fileName:new_file,
			filePath:new_path
		};
	}

	//处理文件
	handlerFiles(files){
		let res_msg = [];

		//遍历文件
		for(var i = 0,l=files.length;i<l;i++){
			var this_file = files[i],
				this_name = this_file.name,
				this_type = this_file.type,
				this_path = this_file.path,
				this_size = this_file.size,
				has_error = this.fileHasError(this_type,this_size);

			//处理文件
			if(has_error.length != 0){
				//未通过
				res_msg.push({
					state:0,
					msg:{
						name:this_name,
						type:this_type,
						size:this_size,
						msg:has_error.join(",")
					}
				});
				//删除文件
				fs.unlinkSync(this_path);
			}else{
				//通过
				//重命名文件
				var {fileName,filePath} = this.createNewFileName(this_name);
				fs.renameSync(this_path,filePath);

				//生成报文
				res_msg.push({
					state:1,
					msg:{
						name:fileName,
						type:this_type,
						size:this_size,
						msg:'ok'
					}
				});
			}
		}

		this.success(res_msg);
	}

}


module.exports = FileUpload;