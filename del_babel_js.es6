//删除babel编译生成的 js

let exec = require("./lib/fn/exec");


let cmds = [
	'find ./lib -name "*.js" -exec rm {} \\;',
	'find ./project/*/server -name "*.js" -exec rm {} \\;',
	"rm index.js",
];


let fn = async function(){
	for(let cmd of cmds){
		await exec(cmd);
	}
};


fn().catch(rs=>console.log(rs));



