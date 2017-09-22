//hospital_home.html 获取医院详情
var urlData=PMZ_DEVICE.getAllParamFromUrl(); //获取url参数对象
console.log(urlData);
var PAGE = {
	
	init: function() {
		//this.setScroll();
		this.HosInfoData(); //医院详情
		WD.getToken(this.departmentApi); //调用科室列表API
		this.ksClick(); //科室点击跳转到医生列表
		
	},
	//医院详情
	HosInfoData: function() {
		console.log(urlData.hospitalAdd);

		$('#hos_img').attr("src", urlData.hospitalIcon);
		// var divHeight = $('#top_div').height();
		// var bg_div = $('<div></div>');
		// bg_div.css({
		// 	height: divHeight
		// });
		// $('#hos_Head_s').prepend(bg_div);
		$('#hos_name').text(urlData.hosName); //医院名称

		// var leavl=urlData.hospitalGrade.substring(2,5);
        var leave=urlData.hospitalGrade;
        //console.log(leave);
        // console.log(leave);
        if(leave==null || leave==undefined||leave=="" || (leave.indexOf("甲") == -1 && leave.indexOf("乙") == -1)){
            $('#hos_levelName').html('未定级');
        }
        else if(leave.indexOf('甲')!=-1){

            $('#hos_levelName').html('甲级'); //医院等级
        }else if(leave.indexOf('乙')!=-1){
            $('#hos_levelName').html('乙级'); //医院等级
        }



		//$('#hos_levelName').text(leavl); //医院等级
		//TODO 医院地址
		if(urlData.hospitalAdd=='null'){
            $('#hos_address').find('.hos_addr_em').text('暂无数据'); //医院地址
		}else{
            $('#hos_address').find('.hos_addr_em').text(urlData.hospitalAdd); //医院地址
		}


        //console.log(urlData.hospltalTel);
		$('.__hos').click(function () {

			//console.log(urlData.hospltalTel);
			WD.openUrl(SYS.localUrl+'hospital_info.html',{
                hosOrgCode: urlData.hosOrgCode, //医院代码
                // hosDeptCode:reset.hosDeptCode,//医院科室代码
                hosName: urlData.hosName, //医院名称
                hospitalGrade: urlData.hospitalGrade || "", //医院等级
                hospitalIcon: ((urlData.hospitalIcon) ? urlData.hospitalIcon : "images/2160644_2.jpg"), //医院头像
              //  hospitalWeb: urlData.hospitalWeb //医院的地址

			})
        });
	},
	departmentApi: function(token) {
		var _timeStamp = getDate(new Date());
		var data = {
			"msgHeader": {
				"sign": Md5(["hosOrgCode=" + urlData.hosOrgCode, "timeStamp=" + _timeStamp, "token=" + token]),
				"timeStamp": _timeStamp,
				"token": token
			},
			"param": {
				"hosOrgCode": urlData.hosOrgCode //医院代码
			}
		};
		AJAX.go1("getDepartmentService",{paramString:JSON.stringify(data)}, function(data) {
			if (data.msgHeader.code =="0") {
				PAGE.departmentBind(data.deptInfo);
			} else {
				WD.alert("提示","暂无科室信息,请稍后重试!");
			}
		});
	},
	//科室列表绑定数据
	departmentBind: function(res) {
		// console.log(res);
		if (res.length <= 0) {//无科室列表
			$('#allKs').append($("#notnull").find('.nodata').clone());
			return;
		}
		for (var i = 0; i < res.length; i++) {
			var data=res[i];
			var dom = "";
			if (i === 0) {
				dom = "<li class='diandian foot_active border_box' attr-type='" + data.deptName.replace(/(\w|\s)*-/g, "") + "' attr-DeptId='" + data.hosDeptCode + "'>" + data.deptName.replace(/(\w|\s)*-/g, "") + "</li>";
			} else {
				dom = "<li class='diandian border_box' attr-type='" + data.deptName.replace(/(\w|\s)*-/g, "") + "' attr-DeptId='" + data.hosDeptCode + "'>" + data.deptName.replace(/(\w|\s)*-/g, "") + "</li>";
			}
			$('#allKs').append(dom);

		}
		//this.reflash_scroll(); //重置isscroll
	},
	//科室点击事件
	ksClick: function() {
		$('#allKs').on("click", 'li', function() {
			var hosDeptCode = $(this).attr('attr-DeptId');//hosDeptCode//科室代码
			var deptName = $(this).attr("attr-type");//deptName//科室名称
			$('#allKs li').removeClass('foot_active');
			$(this).addClass('foot_active');
			//alert(urlData.hospitalAdd);

			// console.log(deptName);
			//console.log(urlData.hosName)
			WD.openUrl(SYS.localUrl+"breath_1.html", {
				hosOrgCode: urlData.hosOrgCode,//医院代码
				hosDeptCode: hosDeptCode,//科室代码
				deptName: deptName,//科室名称
				hosName:urlData.hosName,//医院名称
                hospitalAdd:urlData.hospitalAdd,
                // hosDeptCode:reset.hosDeptCode,//医院科室代码
                hospitalGrade: urlData.hospitalGrade || "", //医院等级
                hospitalIcon: ((urlData.hospitalIcon) ? urlData.hospitalIcon : "images/2160644_2.jpg"), //医院头像
                //  hospitalWeb: urlData.hospitalWeb //医院的地址
                hospitalWeb: urlData.hospitalWeb, //医院的网址
                hospltalTel:urlData.hospltalTel,//医院的电话
                hospltalBus:urlData.hospltalBus, //医院的公交线路
                hospitalDesc:urlData.hospitalDesc //医院简介
			});
		});
	}

};