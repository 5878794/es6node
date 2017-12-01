


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		from = socket._chatRoomNickName,
		toSocketId = catchData[to];

	console.log('invite------------')
	console.log(toSocketId)

	if(!toSocketId){
		socket.send({
			type:'invite',
			data:{
				state:false,
				msg:'对方消失了'
			}
		});
		return;
	}

	allSocket[toSocketId].send({
		type:'invite',
		data:{
			state:true,
			from:from
		}
	});


};