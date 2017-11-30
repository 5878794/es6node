

let catchData = {},
	noticeRefreshList = require('./apis/noticeRefreshList');

let api = {
	login:require('./apis/login'),
	offer:require('./apis/webrtcOffer'),
	answer:require('./apis/webrtcAnswer'),
	iceCandidate:require('./apis/webrtcIceCandidate')
};





module.exports = function(allSocket,socket){
	//allSocket以id为key
	// allSocket 通过 socket.handshake.headers.referer 来区分来源(来源为第一级的子目录名字)

	console.log(socket.id+"已连接");

	//连接成功，通知客户端
	socket.send({
		type:"connect",
		data:{
			state:true,
			id:socket.id
		}
	});



	//收到的请求处理
	socket.on("message",function(type,data){

		console.log('--------socket------');
		console.log('type:'+type+'    data:'+JSON.stringify(data));


		if(api[type]){
			api[type](allSocket,socket,data,catchData);
		}
	});



	//客户端关闭浏览器
	socket.on('disconnect',function(){
		let nickName = socket._chatRoomNickName;
		delete catchData[nickName];

		console.log(socket.id+' nickname:'+nickName+'  已经断开');
		noticeRefreshList(allSocket,catchData);
	});


};
