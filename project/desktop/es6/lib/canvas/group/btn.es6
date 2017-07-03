

//btn组合对象
//返回的是spriteGroup对象;

//事件要在加入的场景启用事件监听
//scene.addEvent();



let canvas = require("./../canvas"),
	create = Symbol(),
	addEvent = Symbol();

class btn{
	constructor(opt){
		this.text = opt.text || "";
		this.color = opt.color || "#000";
		this.clickColor = opt.clickColor || this.color;
		this.fontSize = opt.fontSize || 20;
		this.width = opt.width || 300;
		this.height = opt.height || 40;
		this.x = opt.x || 0;
		this.y = opt.y || 0;
		this.bg = opt.bg || "rgba(0,0,0,0)";
		this.clickBg = opt.clickBg || this.bg;
		this.clickBgRess = opt.clickBgRess || [];
		this.myclickok = opt.clickFn || function(){};


		this.btn = null;
		this[create]();
		this[addEvent]();

		return this.btn;
	}

	[create](){
		let bg = new canvas.sprite({
			width:this.width,
			height:this.height,
			res:this.bg,
			x:0,
			y:0
		});

		let text = new canvas.text({
			width:this.width,
			height:this.height,
			text:this.text,
			fontSize:this.fontSize,
			x:0,
			y:0,
			color:this.color,
			textAlign:"center",
			lineHeight:this.height
		});

		let btn = new canvas.group({
			width:this.width,
			height:this.height,
			x:this.x,
			y:this.y
		});

		btn.append("bg",bg).append("text",text);

		this.btn = btn;
	}

	[addEvent](){
		this.btn.myclickdown(()=>{
			this.btn.children("bg").res = this.clickBg;
			this.btn.children("text").color = this.clickColor;
			this.btn.children("text").refresh();
		}).myclickup(()=>{
			this.btn.children("bg").res = this.bg;
			this.btn.children("text").color = this.color;
			this.btn.children("text").refresh();
		}).myclickok(()=>{
			if(this.clickBgRess.length != 0){
				this.btn.children("bg").setResAnimateList({
					resList:this.clickBgRess,
					frame:5
				});
				this.btn.children("bg").resAnimatePlay();
			}

			this.myclickok.call(this.btn)
		});
	}
}


module.exports = btn;