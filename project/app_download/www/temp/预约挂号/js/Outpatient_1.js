var urlData = PMZ_DEVICE.getAllParamFromUrl();
var startTime, endTime;
var PAGE = {
    init: function () {

        if (!openId) {
            console.log("get param;");
            var par = PMZ_DEVICE.getAllParamFromUrl();
            myPhone = par.phone || "";
            myUserId = par.userId || "";
            openId = par.openId || "";

            storage.setItem("myPhoness", myPhone);
            storage.setItem("myUserIds", myUserId);
            storage.setItem("myOpenId", openId);

        }

        //获取doctr基本信息来源Url-JSON
        this.doctorInfo();
        //生成2周的日历
        this.dateCalendar(".Footer_ul1");
        //查询排班数据
        WD.getToken(this.getArrangeWater);
        //点击可约执行事件
        //this.clickOutpatent();

        //规则
        this.showRule();
    },
    doctorInfo: function () {
      //  console.log(urlData);

        $(".doc_Head_name").text(urlData.doctName).next(".doc_Head_job").text(urlData.doctTile); //医生名,医生职称
        $(".Out_head_img").attr("src", urlData.doctIcon); //医生头像
       // alert(urlData.deptDesc);
        if(urlData.doctDesc=="undefined" || urlData.doctDesc=="null" || urlData.doctDesc==""){
            $('.__doc_txt').text('暂无简介');
        }
        else{
            $('.__doc_txt').text(urlData.doctDesc);
        }
        if (urlData.doctSkill == "") {
            $(".prompt").remove(); //医生无特长
        } else {
            $(".prompt").text(urlData.doctSkill); //医生特长
        }
        $(".out_left").find(".hos_name").find('em').text(urlData.hosName);//医院名称,
        // $(".out_left").find(".hos_obj").text(urlData.deptName);//科室名称
    },
    dateCalendar: function (className) {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        //生成日历
        var date = new Date();
        var getFullYear = date.getFullYear(); //年
        var getMonth = date.getMonth(); //月份
        var getDate = date.getDate(); //当前日
        var getDay = date.getDay(); //星期几
        var DayArr = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        var dateFooter_ul = $(className).eq(0);
        var dateFooter_ul1 = $(className).eq(1);
        for (var i = 0; i < 14; i++) {
            if ((getDate + 1) > this.countDays(getFullYear, getMonth) && getMonth < 12) {
                getMonth += 1, getDate = 0;
                if (getMonth > 12) {
                    getMonth = 1, getFullYear += 1;
                }
            }
            var dateDay = new Date(getFullYear + "/" + (getMonth + 1) + "/" + (getDate += 1));
           // console.log(dateDay);
            $('.__time_year').text(getFullYear+'年');
            if (i == 0) {
                startTime = dateDay.getFullYear() + "-" + this.tmpNumber(dateDay.getMonth() + 1) + "-" + this.tmpNumber(dateDay.getDate());

                newStartTime=this.tmpNumber(dateDay.getMonth() + 1) + "月" + this.tmpNumber(dateDay.getDate()+'日');

                $('.start_time').text(newStartTime);
            } else if (i == 13) {

                endTime = dateDay.getFullYear() + "-" + this.tmpNumber(dateDay.getMonth() + 1) + "-" + this.tmpNumber(dateDay.getDate());
                newEndTime=this.tmpNumber(dateDay.getMonth() + 1) + "月" + this.tmpNumber(dateDay.getDate()+'日');
                $('.end_time').text(newEndTime);
              //  console.log(endTime);
            }
            if (i >= 7)
                dateFooter_ul1.append('<li class="Conmmon  Foot_li1 "><span>' + DayArr[dateDay.getDay()]+'</span>'+'<span class="span_time">' + this.tmpNumber(dateDay.getMonth() + 1) + "-" + this.tmpNumber(dateDay.getDate()) + '</span></li>');
            else
                dateFooter_ul.append('<li class="Conmmon  Foot_li1"><span>' + DayArr[dateDay.getDay()]+'</span>'+'<span class="span_time">' + this.tmpNumber(dateDay.getMonth() + 1) + "-" + this.tmpNumber(dateDay.getDate()) + '</span></li>')
        }
    },
    //根据参数一跟参数二的年月计算该月有多少天,返回就是该月的天数,一月份对0,二月份对应1,如此类推,是从0开始
    countDays: function (year, month) {
        var days_in_months = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //定义月份的数组，函数运行可以直接返回一个数值.
        if (1 == month) return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
        else return days_in_months[month];
    },
    tmpNumber: function (day) {
        if (day <= 9)
            return "0" + day;
        else
            return day;
    },
    //查询排班数据
    getArrangeWater: function (token) {
        if (urlData.doctorSn) {
            urlData.hosDoctCode = urlData.doctorSn;
        }
        var _timeStamp = getDate(new Date());
        var word = ["timeStamp=" + _timeStamp, "token=" + token, "startTime=" + startTime, "endTime=" + endTime, "hosOrgCode=" + urlData.hosOrgCode, "hosDeptCode=" + urlData.hosDeptCode, "hosDoctCode=" + urlData.hosDoctCode]
        var data = {
            "msgHeader": {
                "sign": Md5(word.sort()),
                "timeStamp": _timeStamp,
                "token": token
            },
            "param": {
                "startTime": startTime,
                "endTime": endTime,
                "hosOrgCode": urlData.hosOrgCode,
                "hosDeptCode": urlData.hosDeptCode,
                "hosDoctCode": urlData.hosDoctCode
            }
        };

        AJAX.go1("getOrderNumService", {
            paramString: JSON.stringify(data)
        }, function (res) {
            if (res.msgHeader.code == "0" && res.msgHeader.count != "0") {
                PAGE.planInfo(res.list);
            } else {
                WD.alert("提示", "没有获取到排班信息,请稍后重试!");
            }
        })
    },
    planInfo: function (res) {
        var dateFooter_ul2 = $(".Footer_ul2 li"); //上午
        var dateFooter_ul3 = $(".Footer_ul3 li"); //下午
        var dateFooter_ul4 = $(".Footer_ul4 li"); //晚上
        var timeRange, dateFooter;
        var t2 = new Date();
        for (var i = 0; i < res.length; i++) {
            var resT = res[i];
            timeRange = resT.timeRange;
            var t1 = new Date(resT.scheduleDate);//排班日期
            var betweenDay = ((t1 - t2) / 86400000).toFixed() - 1;//相差天数
            if (timeRange == 1) {//上午
                dateFooter = dateFooter_ul2;
            } else if (timeRange == 2) {//下午
                dateFooter = dateFooter_ul3;
            } else if (timeRange == 3) {
                dateFooter = dateFooter_ul4;
            }
            dateFooter.next("li").eq(betweenDay).on("click", resT, function (data) {
                PAGE.clickOutpatent(data.data);
            }).addClass("Foot_active").text("可约");
        }
    },
    clickOutpatent: function (data) {
        var _this = this;
        if(!SYS.isApp){
        	if(openId && myUserId){

        	}else{
        		FastReg.init(function(){
        			_this.clickOutpatent(data);
        		});
        		return;
        	}
        }


        WD.openUrl(SYS.localUrl + "Booking_info_1.html", {
            deptName: urlData.deptName,//医院科室
            hospitalAdd: urlData.hospitalAdd,//医院地址
            doctName: urlData.doctName,//医生名称
            hosDeptCode: urlData.hosDeptCode,//科室编码
            hosDoctCode: urlData.hosDoctCode,//医生代码
            hosOrgCode: urlData.hosOrgCode,//医院代码
            scheduleId: data.scheduleId,//排班Id
            timeRange: data.timeRange,//就诊时段
            visitCost: data.visitCost,//出诊费用
            visitLevel: data.visitLevel,//出诊级别
            reserveOrderNum: data.reserveOrderNum,//可预约总数
            orderedNum: data.orderedNum,//已预约数
            visitLevelCode: data.visitLevelCode,//出诊级别编码
            scheduleDate: data.scheduleDate,//排班日期
            hosName: urlData.hosName,//医院名称
            photoUri: urlData.doctIcon,//医生头像
            doctTile: urlData.doctTile,//医生职称
            isMust: data.isMust || "",//是否需要就诊卡
            // hospitalAdd:urlData.hospitalAdd //医院地址

            // hosDeptCode:reset.hosDeptCode,//医院科室代码
            hospitalGrade: urlData.hospitalGrade || "", //医院等级
            hospitalIcon: ((urlData.hospitalIcon) ? urlData.hospitalIcon : "images/2160644_2.jpg"), //医院头像
            //  hospitalWeb: urlData.hospitalWeb //医院的地址
            hospitalWeb: urlData.hospitalWeb, //医院的网址
            hospltalTel:urlData.hospltalTel,//医院的电话
            hospltalBus:urlData.hospltalBus, //医院的公交线路
            hospitalDesc:urlData.hospitalDesc //医院简介

        });
    },
    //TODO 预约挂号 规则
    showRule: function () {
        $('.rule_info').click(function () {
            $('.rule_show,.rule_mask').show();
        })
        $('.Bottombutt2 button').click(function () {
            $('.rule_show,.rule_mask').hide();
        })
    }
};