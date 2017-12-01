


module.exports = function(allSocket,socket,data,catchData){
	let to = data.to,
		socketId = catchData[to],
		from = socket._chatRoomNickName,
		candidate = data.candidate;

	console.log('-----------------------')
	console.log(data)
	console.log(socketId)

	if(!socketId){
		return;
	}



	allSocket[socketId].send({
		type:'candidate',
		data:{
			state:true,
			from:from,
			candidate:candidate
		}
	});


};