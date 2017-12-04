//使用Google的stun服务器
var iceServer = {
	"iceServers": [{
		"url": "stun:stun.l.google.com:19302"
	}]
};



//接收事件
//connect       //连接
//login         //登录
//userList      //用户列表
//offer         //接收offer
//answer        //接收answer

//发送事件
//login        //登录
//offer         //发送offer
//answer        //发送answer


$(document).ready(()=>{
	RTC.init();
	socket.init();
	page.init();

});



var page = {
	init(){
		this.addEvent();
	},
	myNickName:'',
	addEvent(){
		let input = $('#nickname'),
			btn = $('#login_btn');

		btn.click(function(){
			let val = $.trim(input.val());
			socket.sendMsg('login',{nickName:val});
		})
	},
	hideLogin(nickname){
		this.myNickName = nickname;
		$('#login').css({display:'none'});
		$('#list').css({display:'block'});
	},
	refreshUserList(data){
		let body = $('#list_main'),
			clone = $('#list_item');

		body.find('.list_item').unbind('click');
		body.html('');

		data.map(rs=>{
			if(rs!=this.myNickName){
				let thisItem = clone.clone().attr({id:''}).css({display:'block'});
				thisItem.text(rs).data({to:rs});
				body.append(thisItem);
			}
		});

		let _this = this;
		body.find('.list_item').click(function(){
			let to = $(this).data('to');
			_this.openVideo(to);
		});
	},
	openVideo(to){
		this.createVideoUi(to);
		this.createRemoteVideo();
		this.createLocalVideo().then(()=>{

			RTC.from = to;
			socket.sendMsg('invite',{
					to:to
			})
		});

	},
	answerOpenVideo(){
		this.createVideoUi('13123');
		this.createRemoteVideo();
		return this.createLocalVideo();
	},
	createVideoUi(to){
		let _this = this;

		let div = $('<div class="box center" id="video_main"></div>');
		div.css({
			position:'fixed',
			'z-index':1000,
			left:0,top:0,
			width:'100%',height:'100%',
			background:'#000',color:'#eee'
		});

		let zz = $('<div id="temp_ts" class="box center">正在连接:'+to+',请等待!</div>');
		zz.css({
			position:'absolute',
			left:0,top:0,
			width:'100%',height:'100%',
			background:'rgba(0,0,0,0.7)',
			color:'#eee',
			'z-index':1000
		});

		let close = $('<div>x</div>');
		close.css({
			position:'absolute',
			right:'10px',top:'10px',
			width:'30px',height:'30px',
			'line-height':'30px',
			border:'1px solid #eee',
			color:'#eee',
			'font-size':'20px',
			'text-align':'center',
			'border-radius':'30px',
			'-webkit-border-radius':'30px',
			'z-index':1001
		});

		close.click(function(){
			_this.closeVideo();
		});

		let my = $('<div id="my"></div>');
		my.css({
			position:'absolute',
			left:0,top:0,
			width:'120px',height:'200px',
			'z-index':1002,
			border:'1px solid #ccc'
		});

		div.append(zz).append(close).append(my);
		$('body').append(div);
	},
	createLocalVideo(){
		let video = document.createElement('video');
		$(video).css({
			width:'100%',
			height:'100%',
			display:'block',
			position:'absolute',
			left:0,top:0
		}).attr({
			playsinline:'',
			autoplay:'',
			muted:''
		});

		$('#my').append(video);


		let param = {
			audio:true,
			video:{
				facingMode:'user'      //后置：environment  前置：user
			}
		};

		return new Promise(success=>{
			navigator.mediaDevices.getUserMedia(param).then(stream=>{
				video.srcObject = stream;

				RTC.addStream(stream);
				success();
			})
		});
	},
	createRemoteVideo(){
		console.log('...remote....')
		let video = document.createElement('video');
		$(video).css({
			width:'100%',
			height:'100%',
			display:'block',
			position:'absolute',
			left:0,top:0
		}).attr({
			playsinline:'',
			autoplay:'',
			id:'remote'
		});

		$('#video_main').append(video);
		console.log(video)
	},
	closeVideo(){

	}
};


var socket = {
	socket:null,
	state:false,
	init(){
		this.socket = io.connect();

		this.addEvent();
	},
	//收到的事件监听器
	addEvent(){
		this.socket.on('message',(rs)=>{
			let type = rs.type,
				data = rs.data;

			console.log('socket event : '+ type)

			if(this[type]){
				this[type](data);
			}else{
				throw 'event:'+type+' not exist!!!!';
			}
		});

		this.socket.on('error',(rs)=>{
			console.log('error')
		});
	},
	//发送信息
	sendMsg(type,data){
		this.socket.send(type,data)
	},
	//连接成功
	connect(){
		console.log('socket连接成功');
		this.state = true;

		//已登录过,自动登录
		if(page.myNickName){
			socket.sendMsg('login',{nickName:page.myNickName});
		}
	},
	//断开连接
	disconnect(){
		console.log('socket连接断开');
		this.state = false;
	},
	//登录成功
	login(data){
		console.log(data)
		if(data.state){
			page.hideLogin(data.nickName);
		}else{
			alert('昵称已存在,请更换一个名字');
		}

		// console.log(data);
	},
	userList(data){
		page.refreshUserList(data);
		// console.log(data);
	},
	offer(data){
		if(!data.state){return;}

		let from = data.from,
			offer = data.offer;

		RTC.receiveOffer(from,offer).then().catch(rs=>console.log(rs));
	},
	answer(data){
		if(!data.state){return;}

		let form = data.from,
			offer = data.offer;

		RTC.receiveAnswer(form,offer).then().catch(rs=>console.log(rs));
	},
	candidate(data){
		if(!data.state){return;}

		let from = data.from,
			candidate = data.candidate;

		RTC.receiveCandidate(from,candidate).then().catch(rs=>console.log(rs));
	},
	invite(data){
		if(!data.state){
			alert(data.msg);
			return;
		}

		if(confirm('有人找')){
			RTC.from = data.from;
			page.answerOpenVideo().then(()=>{
				RTC.sendOffer(RTC.from).then().catch(rs=>console.log(rs));
			});
		}
	}

};


var RTC = {
	pc:null,
	dc:null,
	from:null,
	init(){
		let iceServer = {
			"iceServers": [{
				"url": "stun:stun.l.google.com:19302"
			}]
		};
		this.pc = new RTCPeerConnection(iceServer);
		// this.dc = this.pc.createDataChannel('bens',null);

		this.addEvent();
	},
	addStream(stream){
		this.pc.addStream(stream);
	},
	addEvent(){
		let _this = this;
		//发送ice到其它客户端
		this.pc.onicecandidate = function(event){
			console.log('event onicecandidate...........')
			console.log(_this.from)
			// event.candidate
			if(event.candidate){
				socket.sendMsg('iceCandidate',{
					to:_this.from,
					candidate:event.candidate
				});
			}
		};

		this.pc.oniceconnectionstatechange = function(){
			console.log(_this.pc.iceConnectionState)
		};

		//流媒体来了
		this.pc.onaddstream = function(event){
			// event.stream
			document.getElementById('remote').srcObject = event.stream;
			$('#temp_ts').remove();
			console.log(event.stream)
		};
	},
	async sendOffer(to){

		let offer = await this.pc.createOffer();
		this.pc.setLocalDescription(offer);

		console.log('------------------')
		console.log('send offer')
		console.log(to)
		console.log(offer)

		socket.sendMsg('offer',{
			offer:offer,
			to:to
		});
	},
	async receiveOffer(from,offer){
		this.pc.setRemoteDescription(new RTCSessionDescription(offer));
		let answer = await this.pc.createAnswer();
		this.pc.setLocalDescription(answer);
		console.log('------------------')
		console.log('receive offer')
		console.log(from)
		console.log(answer)

		socket.sendMsg('answer',{
			offer:answer,
			to:from
		})
	},
	async receiveAnswer(from,offer){

		console.log('------------------')
		console.log('receive answer')
		console.log(from)
		console.log(offer)
		this.pc.setRemoteDescription(new RTCSessionDescription(offer));
	},
	async receiveCandidate(from,candidate){
		console.log('-------------')
		console.log('receiveCandidate')
		console.log(from)
		console.log(candidate)


		this.pc.addIceCandidate(new RTCIceCandidate(candidate));
	}

};





