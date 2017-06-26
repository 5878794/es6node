let exec = require('child_process').exec;

module.exports = function(cmdText){
	return new Promise(success=>{
		exec(cmdText,function(err,stdout,stderr){
			if(err) {
				success({
					state:0,
					msg:stderr
				});
			} else {
				success({
					state:1,
					data:stdout.toString()
				});
			}
		})
	})
};