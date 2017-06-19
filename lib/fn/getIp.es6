let os = require("os");

let IPv4;

let networkInterfaces = os.networkInterfaces();
if(networkInterfaces.en0){
	//mac
	networkInterfaces = networkInterfaces.en0;
}else if(networkInterfaces.eth0){
	//ubuntu
	networkInterfaces = networkInterfaces.eth0;
}else{
	networkInterfaces = [];
}

for(let i=0;i<networkInterfaces.length;i++){
	if(networkInterfaces[i].family=='IPv4'){
		IPv4=networkInterfaces[i].address;
	}
}



module.exports = IPv4;