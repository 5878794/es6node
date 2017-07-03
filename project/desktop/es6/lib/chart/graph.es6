


//生成曲线图

// a = new svg.Graph({
//    dom:$("#test"),       @param:jqobj 要插入的dom
//    //x轴要显示的坐标
//    x:["3-1","3-2","3-5","3-8","3-9","3-10","3-11","3-12","3-13","3-14","3-15","3-20","3-25","3-28","3-29","3-30"],
//    //y轴要显示的坐标
//    y:["4","5","6","7","9","11","13","15","18"],
//    //要显示的值  为空会跳过该点连接到下一点
//    val:[5.5,3,6,7,24,"",4,6,16,"",6.8,5.8,12.8,14.9],
//    //横向一个单元格显示几个数据点  注意：xNumber*x.length = val.length 否则后面会空
//    xNumber:3
// })


let svgObj = require("./../svg/svg");

var createTable = function(opt){
	this.dom = opt.dom || $("body");
	this.x = opt.x || [];
	this.y = opt.y || [];
	this.val = opt.val || [];
	this.xNumber = opt.xNumber || 1;    //x轴一个单元格显示几个点



	this.domWidth = parseInt(this.dom.width());
	this.domHeight = parseInt(this.dom.height());
	this.cellWidth = 0;
	this.cellHeight = 0;
	this.xPointNumber = this.x.length;
	this.yPointNumber = this.y.length;

	this.svg = null;
	this.arrowMarkerId = "__svg_arrow__";
	this.lineMarkerId = "__svg_line__";



	this.init();
};
createTable.prototype = {
	init:function(){
		this.refresh();
		this.createSVG();
		this.createTable();
		this.createMarkerArrow();
		this.createXyAxis();
		this.createXAxisInfo();
		this.createLineMarker();
		this.createLine();

		//修复ios8不显示动态插入tspan的问题
		this.dom.html(this.dom.html());

	},
	refresh:function(){
		this.cellWidth = parseInt(this.domWidth/(this.xPointNumber+1));
		this.cellHeight = parseInt(this.domHeight/(this.yPointNumber+1));
	},
	createSVG:function(){
		this.svg = new svgObj({
			container:this.dom,
			id:"__test__",
			viewBoxWidth:this.domWidth,
			viewBoxHeight:this.domHeight
		});
	},
	//点坐标变换成svg的坐标系统
	changePoint:function(x,y){
		y = this.domHeight - y;
		return x+","+y;
	},
	//创建中间的表格虚线
	createTable:function(){
		var line_width = this.xPointNumber * this.cellWidth,
			line_height = this.yPointNumber * this.cellHeight;

		//横线
		for(var x= 0,xl=this.yPointNumber;x<xl;x++){
			var s_x = this.cellWidth,
				s_y = this.cellHeight*(x+1),
				s_p = this.changePoint(s_x,s_y);

			var xLine = this.svg.createElement({
				tag:"path",
				attr:{
					d:"M "+s_p+" H "+line_width,
					fill:"none",
					stroke:"#ccc",
					"stroke-width":"1",
					"stroke-linecap": "round",
					"stroke-dasharray":"2 2"
				}
			});
			this.svg.svg.append(xLine);
		}

		//竖线
		for(var y= 0,yl=this.xPointNumber;y<yl;y++){
			var s_x1 = this.cellWidth*(y+1),
				s_y1 = this.yPointNumber*this.cellHeight,
				s_p1 = this.changePoint(s_x1,s_y1);

			var yLine = this.svg.createElement({
				tag:"path",
				attr:{
					d:"M "+s_p1+" V "+line_height,
					fill:"none",
					stroke:"#ccc",
					"stroke-width":"1",
					"stroke-linecap": "round",
					"stroke-dasharray":"2 2"
				}
			});
			this.svg.svg.append(yLine);
		}

	},
	//创建marker元素   箭头
	createMarkerArrow:function(){
		//创建模板区域
		var def = this.svg.createElement({
			tag:"defs"
		});

		//创建marker元素
		var marker = this.svg.createElement({
			tag:"marker",
			attr:{
				id:this.arrowMarkerId,
				markerWidth:9,  //marker区域的宽高
				markerHeight:6,
				refX:0,         //与图形的连接点坐标
				refY:3,
				orient:"auto",  //自动跟随线条的方向
				markerUnits:"strokeWidth"  //同线条的宽度进行缩放
			}
		});

		//创建箭头
		var arrow = this.svg.createElement({
			tag:"path",
			attr:{
				d:"M0 0 L 0 6 L 9 3 z",
				fill:"#000"
			}
		});

		$(marker).append(arrow);
		$(def).append(marker);
		this.svg.svg.append(def);
	},
	//创建xy坐标
	createXyAxis:function(){
		var s_x = this.cellWidth,
			s_y = this.cellHeight,
			e_x = this.cellWidth*this.xPointNumber+this.cellWidth/2,
			e_y = this.domHeight - this.cellHeight*this.yPointNumber - this.cellHeight/2,
			s_p = this.changePoint(s_x,s_y);

		var x = this.svg.createElement({
			tag:"path",
			attr:{
				d:"M "+s_p+" H "+e_x,
				fill:"none",
				stroke:"#000",
				"stroke-width":"1",
				"stroke-linecap": "round",
				"marker-end":"url('#"+this.arrowMarkerId+"')"
			}
		});
		var y = this.svg.createElement({
			tag:"path",
			attr:{
				d:"M "+s_p+" V "+e_y,
				fill:"none",
				stroke:"#000",
				"stroke-width":"1",
				"stroke-linecap": "round",
				"marker-end":"url('#"+this.arrowMarkerId+"')"
			}
		});

		this.svg.svg.append(x);
		this.svg.svg.append(y);
	},
	//创建xy轴的说明
	createXAxisInfo:function(){
		var text = this.svg.createElement({
			tag:"text",
			attr:{
				x:0,
				y:0,
				"font-size":"9px",
				width:this.domWidth,
				height:this.domHeight,
				overflow:"visible"
			}
		});

		var p_y = this.domHeight - this.cellHeight/ 2,
			p_x = this.cellWidth/2;
		for(var x= 0,xl=this.x.length;x<xl;x++){
			var this_val = this.x[x],
				this_x = this.cellWidth*(x+1);

			var tspan = "<tspan x='"+this_x+"' y='"+p_y+"'>"+this_val+"</tspan>";
			$(text).append(tspan);
		}
		for(var y= 0,yl=this.y.length;y<yl;y++){
			var that_val = this.y[y],
				this_y = this.domHeight - this.cellHeight*(y+1);

			var tspan1 = "<tspan text-anchor='end' x='"+p_x+"' y='"+this_y+"'>"+that_val+"</tspan>";
			$(text).append(tspan1);
		}

		this.svg.svg.append(text);
		$(text).html($(text).html());

	},
	//创建值的连接点
	createLineMarker:function(){
		var def = this.svg.createElement({
			tag:"defs"
		});

		//创建marker元素
		var marker = this.svg.createElement({
			tag:"marker",
			attr:{
				id:this.lineMarkerId,
				markerWidth:6,  //marker区域的宽高
				markerHeight:6,
				refX:3,         //与图形的连接点坐标
				refY:3,
				orient:"auto",  //自动跟随线条的方向
				markerUnits:"strokeWidth"  //同线条的宽度进行缩放
			}
		});

		//创建箭头
		var arrow = this.svg.createElement({
			tag:"circle",
			attr:{
				cx:3,
				cy:3,
				r:3
			}
		});

		$(marker).append(arrow);
		$(def).append(marker);
		this.svg.svg.append(def);
	},
	//创建线条
	createLine:function(){
		if(this.val.length == 0){return;}


		//拼接path路径
		var path = [];
		for(var i= 0,l=this.val.length;i<l;i++){
			var this_val = this.val[i],
				this_x = this.cellWidth + this.cellWidth/this.xNumber*i,
				this_y = this.getLineY(this_val);
			if(!this_val){
				continue;
			}
			path.push(" "+this_x+" "+this_y+" ");
		}
		path = "M "+path.join("L");

		var line = this.svg.createElement({
			tag:"path",
			attr:{
				d:path,
				fill:"none",
				stroke:"#f00",
				"stroke-width":"1",
				"stroke-linecap": "round",
				"marker-start":"url('#"+this.lineMarkerId+"')",
				"marker-end":"url('#"+this.lineMarkerId+"')",
				"marker-mid":"url('#"+this.lineMarkerId+"')"
			}
		});

		this.svg.svg.append(line);


	},
	//获取线条y的实际高度
	getLineY:function(val){
		var e = this.y.length;

		for(var i= 0,l=this.y.length;i<l;i++){
			var this_y = this.y[i];
			if(this_y>val){
				e = i;
				break;
			}
		}
		var s = e-1;
		s = (s<0)? 0 : s;

		//大于y坐标的最大值
		if(e == this.y.length){
			return this.domHeight - this.cellHeight*this.yPointNumber - this.cellHeight/2;
		}

		//小于y坐标的最小值
		if(s == e){
			return this.domHeight - this.cellHeight;
		}


		var s_val = this.y[s],
			e_val = this.y[e],
			diff = e_val - s_val,
			more_val = val - s_val,
			more_y = more_val/diff * this.cellHeight;

		return this.domHeight - this.cellHeight*(s+1) - more_y;
	}
};


module.exports = createTable;









//$(document).ready(function(){
//    a = new svg.Graph({
//        dom:$("#test"),
//        x:["3-1","3-2","3-5","3-8","3-9","3-10","3-11","3-12","3-13","3-14","3-15","3-20","3-25","3-28","3-29","3-30"],
//        y:["4","5","6","7","9","11","13","15","18"],
//        val:[5.5,3,6,7,24,"",4,6,16,"",6.8,5.8,12.8,14.9],
//        xNumber:3
//    })
//});