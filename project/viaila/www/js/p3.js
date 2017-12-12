/**
 * Created by beens on 2017/12/9.
 */



var ProductDian = [0,950,1720,2600];
var ProductClass = ['','','',''];



var animate = [0,950,1720,2600];
var animateType = [
	[
		{type:'up',val:100,time:500,detail:0},
		{type:'',val:'',time:500,detail:400}
	],
	[
		{type:'',val:'',time:1000,detail:0},
		{type:'up',val:100,time:500,detail:0},
		{type:'down',val:100,time:500,detail:400},
		{type:'down',val:100,time:500,detail:900}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'left',val:100,time:500,detail:400},
		{type:'right',val:100,time:500,detail:900},
		{type:'left',val:100,time:500,detail:1400},
		{type:'right',val:100,time:500,detail:1900},
		{type:'left',val:100,time:500,detail:2400},
		{type:'right',val:100,time:500,detail:2900},
		{type:'down',val:100,time:500,detail:3400}
	],
	[
		{type:'',val:100,time:500,detail:0},
		{type:'up',val:100,time:500,detail:400},
		{type:'down',val:100,time:500,detail:900}
	]
];