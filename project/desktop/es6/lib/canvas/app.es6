
//创建游戏app

let device = require("./../device"),
	eachRun = Symbol(""),
	body = Symbol(""),
	isRunning = Symbol(""),
	scenes = Symbol(""),
	runner = Symbol(""),
	setBody = Symbol(""),
	isShow = true,
	runTime = 0,
	createTestFrame = Symbol(),
	testFrameDiv = Symbol(),
	getFrame = Symbol(),
	isShowFrame = false,
	frameTest = 0;


class app{
	constructor(opt = {}){
		//app容器
		this[body] = opt.body || $("body");
		//app是否运行中
		this[isRunning] = false;
		//app包含的场景
		this[scenes] = [];
		//动画函数运行器
		this[runner] = null;
		//显示1秒多少帧的容器
		this[testFrameDiv] = null;

		this[setBody]();
		this[createTestFrame]();
	}

	//设置容器样式
	[setBody](){
		if(!device.checkDomHasPosition(this[body])){
			this[body].css({
				position:"relative"
			})
		}
	}

	//添加场景
	append(scene){
		scene.parent = this[body];
		this[scenes].push(scene);

		return this;
	}

	//删除场景
	del(scene){
		let n = this[scenes].indexOf(scene);
		if(n>-1){
			this[scenes].splice(n,1);
		}
	}

	//渲染所有场景
	[eachRun](){
		this[scenes].map((scene)=>{

			scene.render();
		})
	}

	//开始运行
	run(){

		let fn = ()=> {

			//是否显示帧率
			if(isShowFrame){
				this[getFrame](new Date().getTime());
			}

			if(isShow && this[isRunning]){
				this[eachRun]();
			}

			this[runner] = requestAnimationFrame(fn);
		};

		this[isRunning] = true;
		fn();
	}

	//暂停
	pause(){
		this[isRunning] = false;
	}

	//恢复
	resume(){
		this[isRunning] = true;
	}

	//销毁
	destroy(){
		cancelAnimationFrame(this[runner]);
	}

	//创建显示帧率的容器
	[createTestFrame](){
		let div = $("<span></span>");
		div.css({
			position:"absolute",
			right:0,
			bottom:0,
			display:"none"
		});

		this[body].append(div);
		this[testFrameDiv] = div;
	}

	//计算帧率并写入div
	[getFrame](time){
		let t = time - runTime;
		runTime = time;

		frameTest++;
		if(frameTest%6 == 0){
			frameTest = 0;
			this[testFrameDiv].text(parseInt(1000/t));
		}
	}

	//显示帧率,开发时用
	showFrame() {
		this[testFrameDiv].css({display: "block"});
		isShowFrame = true;
	}

}



(function(){
	//监听浏览器窗口是否显示或在顶层
	window.addEventListener("focus",()=>{
		isShow = true;
	});
	window.addEventListener("blur",()=>{
		isShow = false;
	});
})();



module.exports = app;