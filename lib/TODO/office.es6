
//生成word execl ppt
//可以不生成文件，直接输出流
//api 详见： https://github.com/Ziv-Barber/officegen#a1

let officegen = require('officegen');
let fs = require('fs');

var docx = officegen ( 'docx' );

docx.on ( 'finalize', function ( written ) {
	console.log ( 'Finish to create a PowerPoint file.\nTotal bytes created: ' + written + '\n' );
});

docx.on ( 'error', function ( err ) {
	console.log ( err );
});


var pObj = docx.createP ();

pObj.addText ( 'Simple' );
pObj.addText ( ' with color', { color: '000088' } );
pObj.addText ( ' and back color.', { color: '00ffff', back: '000088' } );

var pObj = docx.createP ();

pObj.addText ( 'Since ' );
pObj.addText ( 'officegen 0.2.12', { back: '00ffff', shdType: 'pct12', shdColor: 'ff0000' } ); // Use pattern in the background.
pObj.addText ( ' you can do ' );
pObj.addText ( 'more cool ', { highlight: true } ); // Highlight!
pObj.addText ( 'stuff!', { highlight: 'darkGreen' } ); // Different highlight color.

var pObj = docx.createP ();

pObj.addText ('Even add ');
pObj.addText ('external link', { link: 'https://github.com' });
pObj.addText ('!');

var pObj = docx.createP ();

pObj.addText ( 'Bold + underline', { bold: true, underline: true } );

var pObj = docx.createP ( { align: 'center' } );

pObj.addText ( 'Center this text', { border: 'dotted', borderSize: 12, borderColor: '88CCFF' } );

var pObj = docx.createP ();
pObj.options.align = 'right';

pObj.addText ( 'Align this text to the right.' );

var pObj = docx.createP ();

pObj.addText ( 'Those two lines are in the same paragraph,' );
pObj.addLineBreak ();
pObj.addText ( 'but they are separated by a line break.' );

docx.putPageBreak ();

var pObj = docx.createP ();

pObj.addText ( 'Fonts face only.', { font_face: 'Arial' } );
pObj.addText ( ' Fonts face and size.', { font_face: 'Arial', font_size: 40 } );

docx.putPageBreak ();


var pObj = docx.createListOfNumbers ();

pObj.addText ( 'Option 1' );

var pObj = docx.createListOfNumbers ();

pObj.addText ( 'Option 2' );

pObj.addHorizontalLine ();

var pObj = docx.createP ({ backline: 'E0E0E0' });

pObj.addText ( 'Backline text1' );

pObj.addText ( ' text2' );

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
			fontFamily: "Avenir Book"
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
	[4,'watch out for the baobabs!','END'],
]

var tableStyle = {
	tableColWidth: 4261,
	tableSize: 24,
	tableColor: "ada",
	tableAlign: "left",
	tableFontFamily: "Comic Sans MS"
}

var pObj = docx.createTable (table, tableStyle);






//
// var aaa = docx.createP ();
//
// aaa.options.align = 'center'; // Also 'right' or 'jestify'.
//
// aaa.addText ( 'Simple' );
//
//
//
//
// var pObj = docx.createListOfNumbers ();
// pObj.addText ( ' with color', { color: '000088' } );
// var pObj = docx.createListOfNumbers ();
// pObj.addText ( ' with 123', { color: '000088' } );
//
//
//
//
// var pObj = docx.createP ();
// pObj.addHorizontalLine ();
// docx.putPageBreak ();
// var pObj = docx.createListOfNumbers ();
// pObj.addText ( ' with 123', { color: '000088' } );
// var pObj = docx.createP ({ backline: 'E0E0E0' });
// pObj.addText ( 'Backline text1' );
// pObj.addText ( ' text2' );
//
//
// var pObj = docx.createP ();
// pObj.addText ( '1111aaaa' );
// var pObj = docx.createListOfNumbers ();
// pObj.addText ( ' with color', { color: '000088' } );
// var pObj = docx.createListOfNumbers ();
// pObj.addText ( ' with 123', { color: '000088' } );
//
//
// var aaa = docx.createP ();
//
// aaa.options.align = 'center'; // Also 'right' or 'jestify'.
//
// aaa.addText ( 'Simple' );
//
//
// var table = [
// 	[{
// 		val: "No.",
// 		opts: {
// 			cellColWidth: 4261,
// 			b:true,
// 			sz: '48',
// 			shd: {
// 				fill: "7F7F7F",
// 				themeFill: "text1",
// 				"themeFillTint": "80"
// 			},
// 			fontFamily: "Avenir Book"
// 		}
// 	},{
// 		val: "Title1",
// 		opts: {
// 			b:true,
// 			color: "A00000",
// 			align: "right",
// 			shd: {
// 				fill: "92CDDC",
// 				themeFill: "text1",
// 				"themeFillTint": "80"
// 			}
// 		}
// 	},{
// 		val: "Title2",
// 		opts: {
// 			align: "center",
// 			vAlign: "center",
// 			cellColWidth: 42,
// 			b:true,
// 			sz: '48',
// 			shd: {
// 				fill: "92CDDC",
// 				themeFill: "text1",
// 				"themeFillTint": "80"
// 			}
// 		}
// 	}],
// 	[1,'All grown-ups were once children',''],
// 	[2,'there is no harm in putting off a piece of work until another day.',''],
// 	[3,'But when it is a matter of baobabs, that always means a catastrophe.',''],
// 	[4,'watch out for the baobabs!','END'],
// ]
//
// var tableStyle = {
// 	tableColWidth: 4261,
// 	tableSize: 24,
// 	tableColor: "ada",
// 	tableAlign: "left",
// 	tableFontFamily: "Comic Sans MS",
// 	borders: true
// }
//
// docx.createTable (table, tableStyle);


var header = docx.getHeader ().createP ();
header.addText ( 'This is the header' );




var out = fs.createWriteStream ( 'out.docx' );// 文件写入
out.on ( 'error', function ( err ) {
	console.log ( err );
});





docx.generate (out);// 服务端生成word