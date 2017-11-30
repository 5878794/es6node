


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		msg = data.msg,
		from = socket._chatRoomNickName,
		toSocket = catchData.users[to];

	if(!toSocket){
		socket.send({
			type:'answer',
			data:{
				state:false,
				msg:'用户已下线'
			}
		});
		return;
	}


	toSocket.socket.send({
		type:'offer',
		data:{
			state:true,
			from:from,
			msg:msg
		}
	})


};