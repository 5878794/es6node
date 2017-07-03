


//sessionStorage



module.exports = {
	get(id){
		return window.sessionStorage.getItem(id);
	},
	save(id,val){
		window.sessionStorage.setItem(id,val);
	}
};