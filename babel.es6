//babel 编译es6 ->  js

let exec = require("./lib/fn/exec");


let cmds = [
	"babel ./lib/ -d ./lib/",
	"babel index.es6 -o index.js",
	"babel ./project/app_download/server/ -d ./project/app_download/server/",
	"babel ./project/book/server/ -d ./project/book/server/",
	"babel ./project/movie/server/ -d ./project/movie/server/",
	"babel ./project/root/server/ -d ./project/root/server/",
	"babel ./project/test/server/ -d ./project/test/server/",
];


let fn = async function(){
	for(let cmd of cmds){
		await exec(cmd);
	}
};


fn().catch(rs=>console.log(rs));



