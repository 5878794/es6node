function Md5(parm) {
	var allString = "";
	for (var i = 0; i < parm.length; i++) {

		var key = parm[i].split('=')[0].toLowerCase();
		var keyLength = key.length;
		var value = parm[i].slice(keyLength, parm[i].length);
		allString += key + value + "&";

	}

	allString = allString.substr(0, allString.length - 1);
	//console.log(allString)
	var hash = hex_md5(Utf8Encode(allString));
	return hash;
}

function getDate(date) {
	var str = "";
	str += date.getFullYear(); //年
	if (date.getMonth() < 9) {
		str += "0" + (date.getMonth() + 1);
	} else {
		str += date.getMonth() + 1; //月 月比实际月份要少1
	}
	str += date.getDate(); //日
	str += date.getHours(); //HH
	str += date.getMinutes(); //MM
	if (date.getSeconds() <= 9) {
		str += "0" + date.getSeconds();
	} else {
		str += date.getSeconds(); //月 月比实际月份要少1
	}
	return str;
}

function data(obj) {
	
}
/**
 * 检验18位身份证号码（15位号码可以只检测生日是否正确即可）
 * @author wolfchen
 * @param cid 18为的身份证号码
 * @return Boolean 是否合法
 **/
function isCnNewID(cid) {
	var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子
	var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; //校验码
	if (/^\d{17}\d|x$/i.test(cid)) {
		var sum = 0,
			idx;
		for (var i = 0; i < cid.length - 1; i++) {
			// 对前17位数字与权值乘积求和
			sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
		}
		// 计算模（固定算法）
		idx = sum % 11;
		// 检验第18为是否与校验码相等
		return arrValid[idx] == cid.substr(17, 1).toUpperCase();
	} else {
		return false;
	}
}