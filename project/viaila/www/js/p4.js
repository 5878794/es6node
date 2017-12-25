/**
 * Created by beens on 2017/12/9.
 */



var ProductDian = [0,940,1900,2700,3500,4500,5090];
var ProductClass = ['','','','','','',''];



var animate = [0,940,1900,2700,3500,4500,5090];
var animateType = [
	[
		{type:'up',val:100,time:500,detail:0},
		{type:'',val:'',time:500,detail:400},
		{type:'down',val:100,time:500,detail:400}
	],
	[
		{type:'',val:'',time:1000,detail:0},
		{type:'up',val:100,time:500,detail:0},
		{type:'down',val:100,time:500,detail:700}
	],
	[
		{type:'up',val:100,time:500,detail:0},
		{type:'',val:'',time:500,detail:400},
		{type:'right',val:100,time:500,detail:900},
		{type:'left',val:100,time:500,detail:1400}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'up',val:100,time:500,detail:400},
		{type:'down',val:100,time:500,detail:900},
		{type:'down',val:100,time:500,detail:900},
		{type:'down',val:100,time:500,detail:900}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'down',val:100,time:500,detail:400},
		{type:'',val:'',time:500,detail:800},
		{type:'left',val:100,time:500,detail:1300},
		{type:'right',val:100,time:500,detail:1300},
		{type:'down',val:100,time:500,detail:1300}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'up',val:100,time:500,detail:400},
		{type:'left',val:100,time:500,detail:900},
		{type:'right',val:100,time:500,detail:900}
	],
	[
		{type:'',val:100,time:500,detail:0},
	]
];