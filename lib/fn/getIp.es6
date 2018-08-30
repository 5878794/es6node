let os = require("os");

let IPv4 = [];

let networkInterfaces = os.networkInterfaces();

for(let [key,vals] of Object.entries(networkInterfaces)){
	vals.map(rs=>{
		if(rs.family == 'IPv4' && rs.address != '127.0.0.1'){
			IPv4.push(rs.address)
		}
	})
}


// if(networkInterfaces.en0){
// 	//mac
// 	networkInterfaces = networkInterfaces.en0;
// }else if(networkInterfaces.eth0){
// 	//ubuntu
// 	networkInterfaces = networkInterfaces.eth0;
// }else{
// 	networkInterfaces = [];
// }
//
// for(let i=0;i<networkInterfaces.length;i++){
// 	if(networkInterfaces[i].family=='IPv4'){
// 		IPv4=networkInterfaces[i].address;
// 	}
// }



module.exports = IPv4;