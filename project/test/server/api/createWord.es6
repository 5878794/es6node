var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var docx = officegen ( 'docx' );
var async = require('async');


/**
  * 导出word
        eg:说明 用法
        https://github.com/Ziv-Barber/officegen
        eg:实列
        https://github.com/Ziv-Barber/officegen/blob/master/examples/make_docx.js
  */
// exports.exportWord = function(req, res) {
	console.log('exportWord-------------');
	docx.on ( 'finalize', function ( written ) {
		console.log ( 'Finish to create Word file.\nTotal bytes created: ' + written + '\n' );
	});


	docx.on ( 'error', function ( err ) {
		console.log ( err );
	});


	//添加页眉
	var header = docx.getHeader ().createP ();
	header.addText ( 'This is the header' );
	//添加页脚
	var footer = docx.getFooter ().createP ();
	footer.addText ( 'This is the footer' );


	var pObj = docx.createP ( { align: 'center' } );// 创建行 设置居中
	pObj.addText ( '血液透析（滤过）治疗知情同意书', { bold: true,font_face: 'Arial', font_size: 18 });// 添加文字 设置字体样式 加粗 大小


	var pObj = docx.createP ({indentLeft:400,align:'left'});
	pObj.addText ( '姓名' );
	pObj.addText ( ' with color', { color: '000088',underline:true,line:'000088',font_size:22 } );// 设置字体颜色
	pObj.addText ( '性别' );
	pObj.addText ( '', { color: '00ffff', back: '000088' } );
	pObj.addText ( '年龄' );
	pObj.addText ( '岁', { color: '000088' } );


	var pObj = docx.createP ();
	pObj.addText ( '门诊（住院）号' );
	pObj.addText ( ' with color', { color: '000088' } );
	pObj.addText ( '诊断' );
	pObj.addText ( '', { color: '000088'} );


	var pObj = docx.createP ();
	pObj.addText ( '一、血液透析（滤过）能有效清除身体内过多的水分合霉素，是治疗急性和慢性肾衰竭等疾病的有效方法。' );
	var pObj = docx.createP ();
	pObj.addText ( '二、血液透析（滤过）治疗时，首先需要将患者血液引到体外，然后通过透析或滤过等方法清除水分和霉素，经受理后的血液再回到患者体外。' );
	var pObj = docx.createP ();
	pObj.addText ( '三、为了有效引出血液，治疗前需要建立血管通路（动静脉内痿或深静脉插管）。' );
	var pObj = docx.createP ();
	pObj.addText ( '四、为防止血液在体外管路和透析器发生凝固，一般需要在透析前和透析过程中注射肝素等抗凝药物。' );
	var pObj = docx.createP ();
	pObj.addText ( '五、血透过程中和治疗期间存在下列医疗风险，可能造成严重后果，甚至危及生命：' );



	// var pObj = docx.createP ();
	//生成列表项
	var pObj = docx.createListOfDots ();
	pObj.addText ( '低血压，心力衰竭，心肌梗塞，心律失常，脑血管意外；' );
	var pObj = docx.createListOfDots ();
	// var pObj = docx.createP ();
	pObj.addText ( '空气球栓塞；' );
	var pObj = docx.createListOfDots ();
	// var pObj = docx.createP ();
	pObj.addText ( '过敏反应；' );






	//插入空行
	// var pObj = docx.createP ();
	//强制换行
	pObj.addLineBreak ();
	//强制换页
	docx.putPageBreak ();


	//添加横线
	var pObj = docx.createP ();
	pObj.addHorizontalLine ();



	//插入列表数字
	var pObj = docx.createListOfNumbers ();
	pObj.addText ( '低血压，心力衰竭，心肌梗塞，心律失常，脑血管意外；' );
	var pObj = docx.createListOfNumbers ();
	pObj.addText ( '空气球栓塞；' );
	var pObj = docx.createListOfNumbers ();
	pObj.addText ( '过敏反应；' );


	//添加背景颜色
	var pObj = docx.createP ({ backline: 'E0E0E0' });
	pObj.addText ( 'Backline text1' );
	pObj.addText ( ' text2' );


	//创建表格
	var table = [
		[{
			val: "No.",
			opts: {
				cellColWidth: 4261,
				b:true,
				sz: '48',
				shd: {
					fill: "7F7F7F",
					themeFill: "text1",
					"themeFillTint": "80"
				},
				fontFamily: "Avenir Book",
				align:'center',
				vAlign:'center'
			}
		},{
			val: "Title1",
			opts: {
				b:true,
				color: "A00000",
				align: "right",
				shd: {
					fill: "92CDDC",
					themeFill: "text1",
					"themeFillTint": "80"
				}
			}
		},{
			val: "Title2",
			opts: {
				align: "center",
				vAlign: "center",
				cellColWidth: 42,
				b:true,
				sz: '48',
				shd: {
					fill: "92CDDC",
					themeFill: "text1",
					"themeFillTint": "80"
				}
			}
		}],
		[1,'All grown-ups were once children',''],
		[2,'there is no harm in putting off a piece of work until another day.',''],
		[3,'But when it is a matter of baobabs, that always means a catastrophe.',''],
		[4,'You can include CR-LF inline\r\nfor multiple lines.',''],
		[5,['Or you can provide lines within', 'a cell in an array'],''],
		[6,'But when it is a matter of baobabs, that always means a catastrophe.',''],
		[7,'watch out for the baobabs!','END'],
	]

	var tableStyle = {
		tableColWidth: 4261,
		tableSize: 24,
		tableColor: "ada",
		tableAlign: "center",
		tableFontFamily: "Comic Sans MS",
		borders: true
	}

	docx.createTable (table, tableStyle);






	var out = fs.createWriteStream ( 'out.docx' );// 文件写入
	out.on ( 'error', function ( err ) {
		console.log ( err );
	});


	docx.generate (out);// 服务端生成word


	out.on('close', function () {
		console.log('Finished to create the PPTX file!');
	});



// 	res.writeHead ( 200, {
//
// // 注意这里的type设置，导出不同文件type值不同application/vnd.openxmlformats-officedocument.presentationml.presentation
// 		"Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//
// 		'Content-disposition': 'attachment; filename=out.docx'
//
// 	});
// 	docx.generate (res);// 客户端导出word




// }
