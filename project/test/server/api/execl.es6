var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+'/aa.xls');
var excelObj=obj[0].data;
for(var key in obj[0]){
	console.log(key)
}

// var data = [];
// for(var i in excelObj){
// 	var arr=[];
// 	var value=excelObj[i];
// 	for(var j in value){
// 		arr.push(value[j]);
// 	}
// 	data.push(arr);
// }
//
// console.log(data)

// var buffer = xlsx.build([
// 	{
// 		name:'sheet1',
// 		data:data
// 	}
// ]);

//将文件内容插入新的文件中
// fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});