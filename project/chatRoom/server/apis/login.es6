
let noticeRefreshList = require('./noticeRefreshList');


module.exports = function(allSocket,socket,data,catchData){
	let nickName =  data.nickName ||
					'user'+new Date().getTime()+parseInt(Math.random()*100);

	//判断是否有人已使用该昵称
	//昵称=id
	console.log('-----------login----------');
	console.log('socketid:'+socket.id+'    username:'+nickName);

	let saveSocketId = catchData[nickName];
	if(saveSocketId && socket.id != saveSocketId){
		//判断是不是同一个人
		socket.send({
			type:'login',
			data:{
				state:false,
				msg:'昵称已存在'
			}
		});
		return;
	}

	socket._chatRoomNickName =  nickName;


	//记录登录的昵称
	catchData[nickName] = socket.id;

	//通知登录成功
	socket.send({
		type:'login',
		data:{
			state:true,
			nickName:nickName
		}
	});


	//群发更新列表
	noticeRefreshList(allSocket,catchData);

};