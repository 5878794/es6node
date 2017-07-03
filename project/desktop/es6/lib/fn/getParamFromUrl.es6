//获取地址栏参数
let getParamFromUrl = function(){
	var data = {};

	var search = window.location.search;
	search = search.substr(1);
	var searchs = search.split("&");

	for( var i= 0,l=searchs.length;i<l;i++){
		var this_val =  searchs[i],
			this_keys = this_val.split("="),
			this_key = this_keys[0];

		data[this_key] = decodeURI(this_keys[1]);
	}

	return data;
};


module.exports = getParamFromUrl;