//获取checkbox的选中值
let getCheckboxVal = function(name){
	var objs = $("input[name='"+name+"']"),
		vals = [];

	objs.each(function(){
		if(this.checked){
			vals.push($(this).val());
		}
	});

	return vals;
};


module.exports = getCheckboxVal;