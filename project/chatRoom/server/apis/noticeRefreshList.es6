



//群发


module.exports = function(allSocket,catchData){
	//获取所有人用户列表
	let users = [];
	for(let key of Object.keys(catchData)){
		users.push(key);
	}

	//通知所有人最新用户列表
	for(let _socketId of Object.values(catchData)){

		if(allSocket[_socketId]){
			allSocket[_socketId].send({
				type:'userList',
				data:users
			})
		}
	}
};