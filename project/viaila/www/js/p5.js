/**
 * Created by beens on 2017/12/9.
 */



var ProductDian = [0,700,1460,2200,3100];
var ProductClass = ['','','','',''];



var animate = [0,700,1460,2200,3100];
var animateType = [
	[
		{type:'',val:'',time:500,detail:0},
		{type:'up',val:100,time:500,detail:500}
	],
	[
		{type:'',val:'',time:1000,detail:0},
		{type:'up',val:100,time:500,detail:0},
		{type:'',val:100,time:500,detail:700}
	],
	[
		{type:'up',val:100,time:500,detail:0},
		{type:'',val:'',time:500,detail:400},
		{type:'down',val:100,time:500,detail:900}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'up',val:100,time:500,detail:400},
		{type:'left',val:100,time:500,detail:900},
		{type:'down',val:100,time:500,detail:900}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'down',val:100,time:500,detail:400},
		{type:'up',val:100,time:500,detail:800},
		{type:'down',val:100,time:500,detail:1300},
		{type:'',val:'',time:500,detail:1800}
	]
];