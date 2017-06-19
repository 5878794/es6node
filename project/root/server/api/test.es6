

module.exports = function(request,response){
	return new Promise((success,error)=>{
			success({
				data:1,
				state:1
			});
	});
};