module.exports = function(endTag){
	var type=null;
	switch(endTag){
		case '' :
			type = '';
			break;
		case 'html' :
			type = 'text/html; charset=UTF-8';
			break;
		case 'htm' :
			type = 'text/html; charset=UTF-8';
			break;
		case 'manifest':
			type = 'text/cache-manifest; charset=UTF-8';
			break;
		case 'js' :
			type = 'application/javascript; charset="UTF-8"';
			break;
		case 'css' :
			type = 'text/css; charset="UTF-8"';
			break;
		case 'jpg' :
			type = 'image/jpeg; charset="UTF-8"';
			break;
		case 'jpeg' :
			type = 'image/jpeg; charset="UTF-8"';
			break;
		case 'png' :
			type = 'image/png; charset="UTF-8"';
			break;
		case 'pdf' :
			type = 'application/pdf; charset="UTF-8"';
			break;
		case 'mp3':
			type = 'audio/mpeg;charset="UTF-8"';
			break;
		case 'txt' :
			type = 'text/plain; charset="UTF-8"';
			break;
		case 'zip' :
			type = 'application/zip;charset="UTF-8"';
			break;
		default :
			type = 'application/octet-stream';
			break;
	}
	return type;
};