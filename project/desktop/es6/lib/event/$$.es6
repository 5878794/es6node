

let TAS = require("./touchAndSlide"),
	eventFnCatch = new Map(),
	create = Symbol(),
	savefn = Symbol(),
	obj = Symbol(),
	idArray = Symbol();


let nowClickObj = [];


class $${
	constructor(dom){
		this[obj] = $(dom);
		this[idArray] = [];

		this[create]();
		this.addDefaultEvent();
	}

	static run(e,type){
		let that=e.myTarget,
			needPop = true;

		e.stopPop = function(){
			needPop = false;
		};

		let gonext = function(obj){
			var p_obj = obj.parentNode;
			handlerthis(p_obj);
		};

		let handlerthis = function(obj){
			if(!obj){ return;}
			if(obj.nodeName.toLowerCase() == "html"){ return;}

			var _eventid = obj.__bens_eventid__,
				objMap = eventFnCatch.get(_eventid);

			if(objMap){
				if(type == "myclickdown"){
					nowClickObj.push(obj);
				}
				if(type == "myclickup"){
					nowClickObj = [];
				}


				let objMapFn = objMap.get(type);
				if(objMapFn){
					objMapFn.call(obj,e);
				}
			}


			if(needPop){
				gonext(obj);
			}


		};

		handlerthis(that);
	}
	static runMove(x,y,type){
		nowClickObj.map(obj=>{
			var _eventid = obj.__bens_eventid__,
				objMap = eventFnCatch.get(_eventid);

			if(objMap){
				let objMapFn = objMap.get(type);
				if(objMapFn){
					objMapFn.call(obj,x,y);
				}
			}
		});
	}

	[create](){
		let _this = this;
		this[obj].each(function(){
			if(this.__bens_eventid__){
				_this[idArray].push(this.__bens_eventid__);
			}else{
				let id = Symbol();
				this.__bens_eventid__ = id;
				_this[idArray].push(id);
				eventFnCatch.set(id,new Map());
			}
		})
	}

	[savefn](fn,type){
		let data = this[idArray];

		for(let i= 0,l=data.length;i<l;i++){
			let id = data[i],
				obj = eventFnCatch.get(id);
			obj.set(type,fn);
		}
	}

	addDefaultEvent(){
		let data = this[idArray];

		for(let i= 0,l=data.length;i<l;i++){
			let id = data[i],
				obj = eventFnCatch.get(id);

			if(!obj.has("myclickdown")){
				this[savefn](
					function(e){
						e.stopPop();
						$(this).css({opacity:0.5});
					},
					"myclickdown"
				);
			}
			if(!obj.has("myclickup")){
				this[savefn](
					function(e){
						e.stopPop();
						$(this).css({opacity:1});
					},
					"myclickup",
				);
			}
		}
	}

	trigger(type){
		for(let i= 0,l=this[idArray].length;i<l;i++){
			let id = this[idArray][i],
				obj = eventFnCatch.get(id);

			if(obj){
				let fn = obj.get(type);
				if(fn){
					fn();
				}
			}
		}
		return this;
	}

	myclickok(fn){
		this[savefn](fn,"myclickok");
		return this;
	}

	myclickdown(fn){
		this[savefn](fn,"myclickdown");
		return this;
	}

	myclickup(fn){
		this[savefn](fn,"myclickup");
		return this;
	}

	mylongclick(fn){
		this[savefn](fn,"mylongclick");
		return this;
	}

	myslideleft(fn){
		this[savefn](fn,"myslideleft");
		return this;
	}

	myslideright(fn){
		this[savefn](fn,"myslideright");
		return this;
	}

	myslidedown(fn){
		this[savefn](fn,"myslidedown");
		return this;
	}

	myslideup(fn){
		this[savefn](fn,"myslideup");
		return this;
	}

	myend(fn){
		this[savefn](fn,"myend");
		return this;
	}

	mystart(fn){
		this[savefn](fn,"myclickdown");
		return this;
	}

	mymove(fn){
		this[savefn](fn,"mymove");
		return this;
	}

	unbind(type){
		let delAll = (!type || $.isBoolean(type))? true : type;


		this[obj].each(function(){
			let id = this.__bens_eventid__,
				obj = eventFnCatch.get(id);

			if(delAll){
				eventFnCatch.delete(id);
				delete this.__bens_eventid__;
			}else{
				obj.delete(type);

				if(obj.size == 0){
					eventFnCatch.delete(id);
					delete this.__bens_eventid__;
				}
			}
		});
	}
}



new TAS({
	myTouchDown:function(e){$$.run(e,"myclickdown")},
	myTouchUp:function(e){$$.run(e,"myclickup")},
	myTouch:function(e){$$.run(e,"myclickok")},
	myLongTouch:function(e){$$.run(e,"mylongclick")},
	mySlideLeft:function(e){$$.run(e,"myslideleft")},
	mySlideRight:function(e){$$.run(e,"myslideright")},
	mySlideUp:function(e){$$.run(e,"myslideup")},
	mySlideDown:function(e){$$.run(e,"myslidedown")},
	myMove:function(x,y){$$.runMove(x,y,"mymove")},
	canMoveLength:20,
	longClickTime:1000,
	slideMaxTime:500
});



module.exports = function(str){
	return new $$(str);
};