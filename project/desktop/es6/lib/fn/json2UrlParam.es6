//将json对象转换为地址栏参数形式

let parseParam = function(obj){
	var fn = function(param,key){
		var paramStr="";
		if(param instanceof String||param instanceof Number||param instanceof Boolean){
			paramStr+="&"+key+"="+encodeURIComponent(param);
		}else{
			$.each(param,function(i){
				var k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i);
				paramStr+='&'+fn(this, k);
			});
		}
		return paramStr.substr(1);
	};

	return fn(obj);
};


module.exports = parseParam;