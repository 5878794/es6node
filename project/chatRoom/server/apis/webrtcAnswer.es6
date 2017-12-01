


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		from = socket._chatRoomNickName,
		toSocketId = catchData[to],
		offer = data.offer;


	if(!toSocketId){
		socket.send({
			type:'answer',
			data:{
				state:false,
				msg:'连接失败'
			}
		});
		return;
	}

	allSocket[toSocketId].send({
		type:'answer',
		data:{
			state:true,
			from:from,
			offer:offer
		}
	});


};