/**
 * Created by beens on 16/11/29.
 */



var formidable = require('formidable'),
    util = require('util'),
    setting = require("../setting"),
    back = require("../response/json"),
    fs = require("fs");



var createNewFileName = function(fileName){
    var isExist = true,
        g = 0,
        new_file = "",
        type = "";

    if(fileName){
        type = fileName.split(".")[1] || "";
    }
    type = (type)? "."+type : type;



    do{
        new_file = setting.fileUpload.saveUrl + new Date().getTime()+"_000" + g + type;
        isExist = fs.existsSync(new_file);
    }
    while(isExist);

    return new_file;
};


var getFileHttpUrl = function(request,filePath){
    var server_url = "http://"+request.headers.host+"/",
        www_dir = setting.wwwDir;

    return filePath.replace(www_dir,server_url);
};



module.exports = function(req,res){
    var form = new formidable.IncomingForm(),
        allowTypes = setting.fileUpload.allowType,
        maxFileSize = setting.fileUpload.maxSize,
        maxMB = parseFloat(maxFileSize/1024/1024).toFixed(1);

    form.encoding = 'utf-8';
    form.uploadDir = setting.fileUpload.saveUrl;
    form.keepExtensions = true;
    form.maxFields = 1000;
    form.multiples = true;


    //处理表单
    form.parse(req, function(err, fields, files) {
        //发生错误
        if(err){
            back("error",err,res);
            return;
        }

        var req_files = files.upload,
            res_msg = [];
        req_files = (req_files.constructor === Array)? req_files : [req_files];


        //上传文件为空
        //为空时也会生成一个文件对象
        if(req_files.length == 1 && req_files[0].name == ""){
            //会生成空文件
            setTimeout(function(){
                fs.unlinkSync(req_files[0].path);
            },0);
            back("error","上传文件为空",res);
            return;
        }


        //遍历文件
        for(var i = 0,l=req_files.length;i<l;i++){
            var this_file = req_files[i],
                this_name = this_file.name,
                this_type = this_file.type,
                this_path = this_file.path,
                this_size = this_file.size,
                has_error = [];

            //检查文件类型、大小
            if(allowTypes.indexOf(this_type) == -1){
                has_error.push("文件类型错误");
            }
            if(this_size > maxFileSize){
                has_error.push("文件超出"+maxMB+"mb");
            }


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
                var new_file_path = createNewFileName(this_name);
                fs.renameSync(this_path,new_file_path);

                //生成图片的访问地址
                var http_url = getFileHttpUrl(req,new_file_path);

                //生成报文
                res_msg.push({
                    state:1,
                    msg:{
                        name:this_name,
                        type:this_type,
                        size:this_size,
                        msg:http_url
                    }
                });
            }
        }

        back("success",res_msg,res);


        //res.writeHead(200, {'content-type': 'text/plain'});
        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));
    });
};

