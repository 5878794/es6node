let fileUpload = require('../../../../lib/fn/fileUplaod'),
	path = require('path');


let savePath = path.join(__dirname,'../../www/upload/');



module.exports = function(request){
	return new Promise((success)=>{
		new fileUpload({
			saveDirPath:savePath,
			success:function(rs){
				success({
					state:1,
					data:rs
				});
			},
			error:function(msg){
				success({
					state:0,
					msg:msg
				});
			}
		},request)
	})
};