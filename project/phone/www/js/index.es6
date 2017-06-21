$(document).ready(()=>{
	PAGE.init().catch(e=>console.log(e));
});


var PAGE = {
	az:[],
	async init(){
		await this.createPY();
		await this.createAZ();
		await this.bindEvent();
		await this.createListType();
		await this.createListItem();
		await this.addListEvent();
	},

	createPY(){
		let az = {};

		for(let obj of DATA){
			let name = obj.name,
				jp = DEVICE.pingying.getJP(name),
				qp = DEVICE.pingying.getQP(name),
				sp = jp.substr(0,1);

			obj.jp = jp;
			obj.qp = qp;

			az[sp] = true;
		}

		var newAZ = [];
		for(let key in az){
			if(az.hasOwnProperty(key)){
				newAZ.push(key);
			}
		}
		newAZ.sort();

		this.az = newAZ;
	},

	createAZ(){
		let list = $('<span class="center boxflex1"></span>'),
			body = $("#az");

		for(let az of this.az){
			let this_list = list.clone();

			this_list.text(az.toUpperCase());

			body.append(this_list);
		}
	},

	createListType(){
		let body = $("#main"),
			list = $("#type");

		for(let az of this.az){
			let this_list = list.clone().attr({id:""}).css({display:"block"});

			this_list.attr({id:az});
			this_list.find("p").text(az.toUpperCase());

			body.append(this_list);
		}
	},

	createListItem(){
		for(let key in DATA){
			if(DATA.hasOwnProperty(key)){
				let this_data = DATA[key],
					this_first_p = this_data.jp.substr(0,1),
					this_body = $("#"+this_first_p),
					this_list = $('<span></span>');

				this_list.data({
					phone:this_data.phone,
					qp:this_data.qp,
					jp:this_data.jp
				});
				this_list.text(this_data.name);

				this_body.append(this_list);
			}
		}
	},

	addListEvent(){
		let item = $("#main").find("span");

		$$(item).myclickok(function(){
			let phone = $(this).data("phone");
			DEVICE.tel(phone);
		})
	},

	bindEvent(){
		let search = $("#search"),
			az = $("#az").find("span"),
			_this = this;

		$$(az).myclickok(function(){
			let az = $(this).text() || "";
			az = az.toLowerCase();

			_this.scrollToDom(az);
		});


		search.get(0).addEventListener("input",function(){
			let text = $(this).val();
			text = $.trim(text);
			_this.search(text);
		},false)

	},


	scrollToDom(str){
		let obj = $("#"+str),
			top = obj.offset().top - 40;

		$("body").animate({scrollTop:top+"px"});

	},

	search(text){
		text = text.toLowerCase();

		let body = $("#main"),
			az = $("#az");

		if(!text){
			body.find("p").css({display:"block"});
			body.find("span").css({display:"block"});
			az.css3({display:"box"});

			return;
		}

		az.css({display:"none"});
		body.find("p").css({display:"none"});

		body.find("span").each(function(){
			let name = $(this).text(),
				phone = $(this).data("phone"),
				qp = $(this).data("qp"),
				jp = $(this).data("jp");


			if(
				jp.indexOf(text) > -1 ||
				qp.indexOf(text) > -1 ||
				name.indexOf(text) > -1	||
				phone.indexOf(text) > -1
			){
				$(this).css({display:"block"})
			}else{
				$(this).css({display:"none"})
			}

		});


	}

};