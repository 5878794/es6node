


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		offer = data.offer,
		from = socket._chatRoomNickName,
		toSocketId = catchData[to];

	if(!toSocketId){
		socket.send({
			type:'answer',
			data:{
				state:false,
				msg:'用户已下线'
			}
		});
		return;
	}


	allSocket[toSocketId].send({
		type:'offer',
		data:{
			state:true,
			from:from,
			offer:offer
		}
	})


};