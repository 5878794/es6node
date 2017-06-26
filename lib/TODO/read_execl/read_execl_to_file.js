/**
 * Created by bens on 16-1-25.
 */


//sudo npm install node-xlsx


var xls = require("node-xlsx"),
	fs = require("fs"),
	filePath = "./test1.xlsx",
	n = new Date().getTime();


var list = xls.parse(filePath)[0].data;
console.log(list)


//fs.writeFile("./" + n + ".js", JSON.stringify(list));





