/**
 * Created by Administrator on 2016/8/17.
 */
//register.html 获取医院列表
var PAGE = {
	data:null,
	hasGetDistanceData:false,
	//获取数据
	init: function() {
		WD.getToken(this.hospitalList);
		this.locSearch(); //搜索医院
		// this.hosArea_sort();//区域排序
		if(!myPhone || !myUserId || !openId){
			//console.log("get param;");
			var par = PMZ_DEVICE.getAllParamFromUrl();
			storage.setItem("myPhoness", (par.phone||""));
			storage.setItem("myUserIds", (par.userId||""));
			storage.setItem("myOpenId", (par.openId||""));
		}
		this.tabSwitch();//tab切换
        this.closeApply();
        this.openUrl();

		$("#mask").onclick(function(e){
			e.stopPropagation();
		})

	},
    //页面跳转
    openUrl:function () {
        $('.Footer').click(function () {
            WD.openUrl('My_reservation.html');
        })
    },
	//关闭应用
    closeApply:function () {
        YJH.H5NativeAppInfo.setNavBarLeftBtn(function(){
            YJH.H5NativeAppInfo.goToRootPage(0);
        },{});
    },
	//调取医院接口
	hospitalList: function(token) {
		var _timeStamp = getDate(new Date());
		var data = {
			"msgHeader": {
				"sign": Md5(["timeStamp=" + _timeStamp, "token=" + token].sort()),
				"timeStamp": _timeStamp,
				"token": token
			}
		};

		var _this = PAGE;
		AJAX.go1("getHospitalService", {
			paramString: JSON.stringify(data)
		}, function(data) {
			if(data.msgHeader.code == "0") {
				_this.data = data.hosOrgInfo;
				PAGE.hospitalBind(data.hosOrgInfo);
				// PAGE.leaveSort(data.hosOrgInfo);

				PAGE.hosArea_sort();//排序事件
			} else {
				WD.alert("提示", "获取数据失败");
			}
		});
	},
	//绑定医院数据
	hospitalBind: function(data) {

		$('.UL').html("");

		// console.log(data);
		if(!data) {
			$('.UL').append($("#notnull").find('.nodata').clone());
			return;
		}


		for(var i = 0; i < data.length; i++) {
			//console.log(data[i]);

			var hospital = $("#hospital").find('.hosptail_list').clone();
			var demo = hospital;
			// var leave=data[i].hospitalGrade.replace('')
			// demo.attr("keyword", data[i].hosName); //绑定关键词便于搜索

            demo.attr({
                'data-keyword':data[i].hosName,
                'data-hosCode':data[i].hosOrgCode,
                'data-area':data[i].hospitalArea,
                'data-hospitalGrade':data[i].hospitalGrade,
                'data-hospitalAdd':data[i].hospitalAdd,
                'data-hospitalIcon':((data[i].hospitalIcon) ? data[i].hospitalIcon : "images/2160644_2.jpg")

            });
            //
            // demo.attr('hosCode',data[i].hosOrgCode); // 绑定关键词便于排序
			// demo.attr('area',data[i].hospitalArea);//根据地区排序
			demo.find('img').attr("src", ((data[i].hospitalIcon) ? data[i].hospitalIcon : "images/2160644_2.jpg")); //医院头像
			demo.find(".hos_name").html(data[i].hosName); //医院名称

			//console.log(data[i].hospitalGrade);
			var leave=data[i].hospitalGrade;
			//console.log(leave);
				// console.log(leave);
            	if(leave==null || leave==undefined||leave=="" || (leave.indexOf("甲") == -1 && leave.indexOf("乙") == -1)){
                	demo.find('._add_leave').html('未定级');
            	}
				else if(leave.indexOf('甲')!=-1){

                    demo.find('._add_leave').html('甲级'); //医院等级
				}else if(leave.indexOf('乙')!=-1){
                    demo.find('._add_leave').html('乙级'); //医院等级
				}

			demo.find('.hos_rank').find('.hos_r_1').html(data[i].hospitalGrade);
			demo.find('.hos_a_1').html(data[i].hospitalArea);
			var this_distince = data[i].distince || "";
			if(this_distince){
				this_distince = this_distince.toFixed(1)+"km";
			}
            demo.find('.hos_a_2').html(this_distince);
           // console.log(demo);
          //  storage.setItem("hospitalDesc", data[i].hospitalDesc);
			demo.click(data[i], function(reset) {
				var reset = reset.data;

				// console.log(reset.hospitalAdd);

				WD.openUrl("hospital_home_1.html", {
					hosOrgCode: reset.hosOrgCode, //医院代码
					// hosDeptCode:reset.hosDeptCode,//医院科室代码
					hosName: reset.hosName, //医院名称
					hospitalGrade: reset.hospitalGrade || "", //医院等级
                    hospitalAdd:reset.hospitalAdd,//医院的地址
					hospitalIcon: ((reset.hospitalIcon) ? reset.hospitalIcon : "images/2160644_2.jpg"), //医院头像

                    // hospltalTel:reset.hospitalTel,//医院的电话
                    // hospltalBus:reset.trafficGuide, //医院的公交线路
                    // hospitalDesc:reset.hospitalDesc//医院简介
				});
			});
			$('.UL').append(demo);
		}

	},
	//本地搜索
	locSearch: function() {

	    $('#searchInput').focus(function () {
            $('.sort_tab span').attr('class','');
            $('.sort_list,.mask').hide();
        });
        $("#searchInput").blur(function(){
            $('.sort_tab span').attr('class','');
            $('.sort_list,.mask').hide();
        });

		$('#searchInput').on("input", function() {
			var thisVal = $(this).val();
			var listHospital = $(".UL li");
			if(listHospital.length <= 0) {
				// WD.alert("提示", "无搜索结果");
				return;
			}
			for(var i = 0; i < listHospital.length; i++) {
				var resVal = $(listHospital[i]).attr("data-keyword");

				if(resVal.indexOf(thisVal) > -1) {
					$(listHospital[i]).show(); //匹配到搜索的医院
				} else {
					$(listHospital[i]).hide(); //没有匹配到搜索的医院

				}
			}
		});



	},
	//tab切换
	tabSwitch:function () {
        var shop_click = $(".sort_tab span");
        var shop_tab = $(".sort_list_li");
        shop_click.each(function (i) {
            $(this).attr({
                "index": i
            });
        });
        shop_click.on('touchstart',function () {
        	$('.sort_list,.mask').show();
            shop_click.removeClass("on");
            $(this).addClass("on");
            shop_tab.css({
                "display": "none"
            });
            var obj = $(this).attr("index");
            shop_tab.eq(obj).css({
                "display": "block"
            });
        });


    },
	//获取具有距离的数据
	getDistanceSortData:function(callback){
		var _this = PAGE;

		if(this.hasGetDistanceData){
			callback();
			return;
		}

		YJH.H5LocationManager.getCurrentLocation(function(res){
			AJAX.goInfo("getHospitalListByDistance.do",{
				E:res.E,
				N:res.N,
				size:99
			},function(rs){
				_this.hasGetDistanceData = true;
				_this.data = _this.handlerData(rs);
				callback();
			});
		})
	},
	//处理数据格式
	handlerData:function(data){
		for(var i =0,l=data.length;i<l;i++){
			//处理医院等级 文字转数字等级
			var this_data = data[i],
				level = this_data.hospitalGrade,
				distince = this_data.distince,
				val1 = 0,
				val2 = 0,
				val = "";

			//等级10位数
			if(level.indexOf("特")>-1){
				val1 = 4;
			}else if(level.indexOf("三")>-1){
				val1 = 3;
			}else if(level.indexOf("二")>-1){
				val1 = 2;
			}else if(level.indexOf("一")>-1){
				val1 = 1;
			}

			//等级个位数
			if(level.indexOf("甲")>-1){
				val2 = 9;
			}else if(level.indexOf("乙")>-1){
				val2 = 8;
			}else if(level.indexOf("丙")>-1){
				val2 = 7;
			}

			val1 = (val1 == 0)? "" : val1.toString();
			val = parseInt(val1 + val2.toString());

			this_data.__level__ = val;

			//处理距离等级
			this_data.__distince__ = parseInt(distince/5)+1;


		}
		return data;
	},
	//排序数据获取
	sortData:{
		"default":function(){
			var data = PAGE.data,
				newData = {},
				newData1 = [],
				newData2 = [];

			//按5公里为单位进行分组
			for(var i=0,l=data.length;i<l;i++){
				var this_data = data[i],
					jb = this_data.__distince__;

				if(!newData[jb]){newData[jb]=[];}
				newData[jb].push(this_data);
			}

			//对象转数组
			for(var key in newData){
				if(newData.hasOwnProperty(key)){
					newData1.push(newData[key]);
				}
			}

			//二位数组排序
			newData1.sort(function(a,b){
				return (a[0].__distince__>b[0].__distince__)? 1 : -1;
			});

			//二位数组子数组排序并转一位数组
			for(var z=0,zl=newData1.length;z<zl;z++){
				var this_array = newData1[z];
				this_array.sort(function(a,b){
					return (a.__level__>b.__level__)? -1 : 1;
				});

				for(var j=0,jl=this_array.length;j<jl;j++){
					newData2.push(this_array[j]);
				}
			}

			PAGE.data = newData2;
			$('#sort_2').text('综合排序');
			$('.sort_tab span').attr('class','');
	        $('.sort_list,.mask').hide();
			return newData2;
		},
		//医院等级排序
		"leave":function(){
			var data = PAGE.data;

			data.sort(function(a,b){
				return  (a.__level__ > b.__level__)? -1 : 1;
			});

			PAGE.data = data;
			$('#sort_2').text('按医院等级排序');
			$('.sort_tab span').attr('class','');
			$('.sort_list,.mask').hide();
			return data;
		},
		//距离排序
		"distance":function(){
			var data = PAGE.data;

			data.sort(function(a,b){
				return  (a.distince > b.distince)? 1 : -1;
			});

			PAGE.data = data;
			$('#sort_2').text('按距离排序');
			$('.sort_tab span').attr('class','');
			$('.sort_list,.mask').hide();
			return data;
		}
	},
	//数据过滤
	filterData:function(type){
		var data = PAGE.data;
		if(!type){return data;}

		var newData = [];
		for(var i=0,l=data.length;i<l;i++){
			var this_dat = data[i],
				area = this_dat.hospitalArea;

			if(area == type){
				newData.push(this_dat);
			}
		}
		return newData;

	},
	//排序事件
	hosArea_sort:function () {
        $('.close').on('click',function () {
            // listHospital.show();
            $('.sort_tab span').attr('class','');
            $('.sort_list,.mask').hide();
        })
		var _this=this;
		//console.log(that_this);

		//排序按钮事件
		$('.sort_list_li').eq(1).find("li").on('click',function () {
			var thisDom = $(this);
			_this.getDistanceSortData(function(){
				thisDom.addClass('active').siblings().removeClass('active');
				var type = thisDom.attr('data-area'),
					newData = _this.sortData[type]();

				var area = $("#city_list").find(".active").text();
				area = (area == "全城")? "" : area;

				newData = _this.filterData(area);

				_this.hospitalBind(newData);
			});
		});

		//筛选按钮事件
		$('.sort_list_li').eq(0).find("li").on('click',function () {
			var thisDom = $(this);
			thisDom.addClass('active').siblings().removeClass('active');
			var type = thisDom.attr('data-area'),
				newData = _this.filterData(type);

			type = type || "全城";
			$('#sort_1').text(type);
			$('.sort_tab span').attr('class','');
			$('.sort_list,.mask').hide();

			_this.hospitalBind(newData);
		});



        // $('.sort_list_li li').on('click',function () {
			// $(this).addClass('active').siblings().removeClass('active');
			// var __this=$(this).attr('data-area');
			// //console.log(__this);
        //     var listHospital = $(".UL li");
        //     if(listHospital <= 0) {
        //         WD.alert("提示", "无搜索结果");
        //         return;
        //     }
        //     //根据区域排序
        //     if(__this=='all_city'){
        //         $('#sort_1').text('全城');
        //         $('.sort_tab span').attr('class','');
        //         $('.sort_list,.mask').hide();
        //         listHospital.show();
        //         // return;
        //     }else if(__this=='distance'){  //
        //         $('#sort_2').text('按距离排序');
			// 	 that_this.distanceSort();
			// }else if(__this=='default'){
        //         $('#sort_2').text('综合排序');
        //         $('.sort_tab span').attr('class','');
        //         $('.sort_list,.mask').hide();
        //         listHospital.show();
        //     }
        //     else if(__this=='leave') {
        //         $('#sort_2').text('按等级排序');
        //         $('.sort_tab span').attr('class', '');
        //         $('.sort_list,.mask').hide();
        //         var html_li = [];
        //         // var html_li2=[];
        //         var str = "三甲";
        //         // var str2="三甲";
        //         for (var k = 0; k < 6; k++) {
        //             if (k == 1) {
        //                 str = '三乙';
        //             }else if(k==2){
        //                 str='三丙'
        //             }
        //             else if(k==3){
        //                 str='二甲'
        //             }
        //             else if(k==4){
        //                 str='二乙'
        //             }
        //             else if (k == 5) {
        //                 str = "未定级";
        //             }
        //             for (var j = 0; j < listHospital.length; j++) {
        //                 if($(listHospital[j]).find('._add_leave').html().indexOf(str)){
        //                     html_li.push($(listHospital[j])[0].outerHTML);
        //                 }
        //
        //             }
        //         }
        //
        //
        //         $('.UL').empty();
        //         $('.UL').html(html_li.join(""));
        //
        //
        //         var listHospital_ul = $(".UL li");
        //          for(var n=0;n<listHospital_ul.length;n++){
        //              var item=listHospital_ul.eq(n);
        //             item.click(listHospital_ul[n],function (reset) {
        //                 var reset = reset.data;
        //                 WD.openUrl("hospital_home_1.html", {
        //                     hosOrgCode: $(reset).data('hoscode'), //医院代码
        //                     // hosDeptCode:reset.hosDeptCode,//医院科室代码
        //                     hosName: $(reset).data('keyword'), //医院名称
        //                     hospitalGrade: $(reset).data('hospitalgrade') || "", //医院等级
        //                     hospitalAdd:$(reset).data('hospitaladd'),//医院的地址
        //                     hospitalIcon: (($(reset).data('hospitalicon')) ? $(reset).data('hospitalicon') : "images/2160644_2.jpg"), //医院头像
        //
        //                 });
        //             })
        //          }
        //
        //     }
        //     else{
        //         for(var i = 0; i < listHospital.length; i++) {
        //             var resVal = $(listHospital[i]).attr("data-area");
        //             $('#sort_1').text(__this);
        //             if(resVal==__this) {
        //                 $('.sort_tab span').attr('class','');
        //                 $('.sort_list,.mask').hide();
        //                 $(listHospital[i]).show(); //匹配到搜索的医院
        //
        //             } else {
        //               //  $('#sort_1').text(__this);
        //                 $('.sort_tab span').attr('class','');
        //                 $('.sort_list,.mask').hide();
        //                 $(listHospital[i]).hide(); //没有匹配到搜索的医院
        //             }
        //         }
			// }
        //     //关闭选项
        // })
    }
	//获取距离排序
	// distanceSort:function () {
	//
     //    YJH.H5LocationManager.getCurrentLocation(function(res){
     //        $('.UL').html('');
     //        $('.sort_tab span').attr('class','');
     //        $('.sort_list,.mask').hide();
     //        JK.loading.show();
     //        $.ajax({
     //            type:'POST',
     //            url:'http://118.123.173.101:7001/api/getHospitalListByDistance.do?E='+res.E+'&N='+res.N+'&size=99',
     //            dataType:'json',
     //            success:function (data) {
     //                JK.loading.hide();
     //                var state=data.state;
     //                //  console.log(state);
     //                if(state==1){
     //                    data=data.data;
     //                  // console.log(data);
     //                    for(var i=0;i<data.length;i++){
     //                        var hospital = $("#hospital").find('.hosptail_list').clone();
     //                        var demo = hospital;
	//
     //                        demo.attr({
     //                            'data-keyword':data[i].hosName,
     //                            'data-hosCode':data[i].hosOrgCode,
     //                            'data-area':data[i].hospitalArea,
     //                            'data-hospitalGrade':data[i].hospitalGrade,
     //                            'data-hospitalAdd':data[i].hospitalAdd,
     //                            'data-hospitalIcon':((data[i].hospitalIcon) ? data[i].hospitalIcon : "images/2160644_2.jpg")
	//
     //                        });
     //                        demo.find('img').attr("src", ((data[i].hospitalIcon) ? data[i].hospitalIcon : "images/2160644_2.jpg")); //医院头像
     //                        demo.find(".hos_name").html(data[i].hosName); //医院名称
     //                        var leave=data[i].hospitalGrade;
     //                        //console.log(leave);
     //                        // console.log(leave);
     //                        //console.log(leave);
     //                        // console.log(leave);
     //                        if(leave==null || leave==undefined||leave=="" || (leave.indexOf("甲") == -1 && leave.indexOf("乙") == -1)){
     //                            demo.find('._add_leave').html('未定级');
     //                        }
     //                        else if(leave.indexOf('甲')!=-1){
	//
     //                            demo.find('._add_leave').html('甲级'); //医院等级
     //                        }else if(leave.indexOf('乙')!=-1){
     //                            demo.find('._add_leave').html('乙级'); //医院等级
     //                        }
	//
     //                        demo.find('.hos_rank').find('.hos_r_1').html(data[i].hospitalGrade);
     //                        demo.find('.hos_a_1').html(data[i].hospitalArea);
     //                        var distinceNum=Math.round(data[i].distince);
     //                        demo.find('.hos_a_2').html(distinceNum+'km');
     //                        demo.click(data[i], function(reset) {
     //                            var reset = reset.data;
     //                            //	console.log(reset);
     //                            WD.openUrl(SYS.localUrl + "hospital_home_1.html", {
     //                                hosOrgCode: reset.hosOrgCode, //医院代码
     //                                // hosDeptCode:reset.hosDeptCode,//医院科室代码
     //                                hosName: reset.hosName, //医院名称
     //                                hospitalGrade: reset.hospitalGrade || "", //医院等级
     //                                hospitalIcon: ((reset.hospitalIcon) ? reset.hospitalIcon : "images/2160644_2.jpg"), //医院头像
     //                                // hospitalWeb: reset.hospitalWeb, //医院的网址
     //                                hospitalAdd:reset.hospitalAdd,//医院的地址
     //                                // hospltalTel:reset.hospitalTel,//医院的电话
     //                                // hospltalBus:reset.trafficGuide, //医院的公交线路
     //                                // hospitalDesc:reset.hospitalDesc //医院简介
     //                            });
     //                        });
     //                        $('.UL').append(demo);
	//
     //                    }
     //                    PAGE.hosArea_sort();//区域排序
     //                }else{
     //                    WD.alert("提示", "获取数据失败");
     //                }
     //            },
     //            error:function (msg) {
	//
     //            }
     //        });
	//
     //    });
	//
	// }
};