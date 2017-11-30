


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		from = socket._chatRoomNickName,
		toSocket = catchData.users[to],
		msg = data.msg;


	if(!toSocket){
		socket.send({
			type:'answer',
			data:{
				state:false,
				msg:'连接失败'
			}
		});
		return;
	}

	toSocket.socket.send({
		type:'answer',
		data:{
			state:true,
			from:from,
			msg:msg
		}
	});


};