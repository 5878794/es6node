var urlData = PMZ_DEVICE.getAllParamFromUrl();
var PAGE = {
    init: function () {
        //初始医生信息 信息来源URL参数
        this.closeApply();
        this.doctorInfo();

        // //锁定挂号
        this.clickCardOrder();
        //初始化就诊人信息

        this.golocHerftoin();

        WD.getToken(this.getCardList);
        //规则
        this.showRule();

    },
    closeApply:function () {
        YJH.H5NativeAppInfo.setNavBarLeftBtn(function(){
            var key = "kData_"+urlData.hosOrgCode;
            JK.goBack();
            YJH.H5ModuleManager.setValueForKey(null,null,"key",'');
        },{});
    },
    //初始医院挂号信息
    doctorInfo: function () {
        urlData.id='';
        DEVICE.windowShowRun(function () {
            // window.location.href=window.location.href+'?id='+10000*Math.random();
           // console.log('1111');
            window.location.reload();

        });
        var key = "kData_"+urlData.hosOrgCode;
        YJH.H5ModuleManager.getValue(function(res){



          //  console.log(res);

            var obj=res.result;


            urlData.id=obj.id+'';
            $('#getPatintCard').find('b').text(obj.name);

            if(!urlData.id){
                $('.card_style').text('未选卡');
            }else{
                $('.card_style').text('就诊卡');
            }


            if(urlData.id=='undefined'){

                $('.card_style').text('');
            }
            // urlData.id=

        },null,"key");
        $(".doc_Head_name").text(urlData.doctName).next(".doc_Head_job").text(urlData.doctTile); //医生名字-主任医生
        $('.doc_Head_book').text(urlData.deptName);//科室
        $('.doc_Head_hos').text(urlData.hosName);
        $('.doc_Head_job').text(urlData.doctTile);
        $(".Out_head_img").attr("src", urlData.photoUri); //医生头像
        $(".prompt").text(urlData.skill); //医生简介或者描述
        // $('#getPatintCard').find('b').text(jsonObj.name);
        // $(".book_ul1").find(".book_right:eq(0)").text(urlData.hosName); //医院名称
        $(".book_ul1").find(".book_right:eq(1)").text(urlData.deptName); //科室
        if(urlData.hospitalAdd=='null'){
            $('#hos_adress').text('暂无数据');
        }else{
            $('#hos_adress').text(urlData.hospitalAdd);
        }

        $('#hos_name').text(urlData.hosName);
        var DayArr = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        var GetDay = new Date(urlData.scheduleDate.substring(0, 10)).getDay();
        $(".book_right.Color").text(urlData.scheduleDate + (urlData.timeRange == 1 ? "上午" : (urlData.timeRange == 2 ? "下午" : "晚上")) + "(" + DayArr[GetDay] + ") 剩余" + (urlData.reserveOrderNum - urlData.orderedNum)); // + " 第" + urlData.orderedNum + "号"
        // $(".book_ul1 li").last().find(".book_right").find('.price').text(urlData.visitCost + "元");
        $('.price').text(urlData.visitCost + "元");

    },

    golocHerftoin: function () {
        console.log(urlData);
        var search = decodeURI(window.location.search);
        //  alert('1');
        $('#getPatintCard').on('click', function () {
            // WD.openUrl(SYS.localUrl+'identity_1.html'+search);
            WD.openUrl(SYS.localUrl + "Medical_card_list.html", {
                // mingc"hospitalAdd":urlData.hospitalAdd,//医院
                'id': urlData.id,
                "hosName": urlData.hosName,//医院名称
                "hosDoctCode": urlData.hosDoctCode,//医生代码
                // "hosOrgCode": urlData.hosOrgCode,//医院代码
                "hosDeptCode": urlData.hosDeptCode,//科室代码
                "doctIcon": $(this).find(".doc_Name_img").attr("src"),//医生头像

                'photoUri': urlData.photoUri,
                'deptName': urlData.deptName,//医院科室
                'hospitalAdd': urlData.hospitalAdd,//医院地址
                'doctName': urlData.doctName,//医生名称

                'hosOrgCode': urlData.hosOrgCode,//医院代码
                'scheduleId': urlData.scheduleId,//排班Id
                'timeRange': urlData.timeRange,//就诊时段
                'visitCost': urlData.visitCost,//出诊费用
                'visitLevel': urlData.visitLevel,//出诊级别
                'reserveOrderNum': urlData.reserveOrderNum,//可预约总数
                'orderedNum': urlData.orderedNum,//已预约数
                'visitLevelCode': urlData.visitLevelCode,//出诊级别编码
                'scheduleDate': urlData.scheduleDate,//排班日期
                // 'photoUri': urlData.doctIcon,//医生头像
                'doctTile': urlData.doctTile,//医生职称
                'isMust': urlData.isMust || "",//是否需要就诊卡


                // hosDeptCode:reset.hosDeptCode,//医院科室代码

            });
        });
        // var search = decodeURI(window.location.search);
        // // alert(search);
        // WD.openUrl(SYS.localUrl + "identity_1.html" + search);
    },

    clickCardOrder: function () {
        // console.log(urlData);
        var ide_butt = $(".ide_butt");
        var checkbox = $('#cr');
        if(urlData.id){
            checkbox.attr('checked','checked');
            ide_butt.attr('disabled', true);
            ide_butt.css('background', '#007DF2');
        }
        checkbox.on('click', function () {
            if (checkbox.is(':checked')) {
                ide_butt.attr('disabled', true);
                ide_butt.css('background', '#007DF2');
                ide_butt.on('touchstart', function () {
                    WD.getToken(PAGE.LockOrder);
                });

            }
            else {
                ide_butt.attr('disabled', false);
                ide_butt.css('background', '#ccc');
                ide_butt.unbind();
            }
        });
    },
    //挂号锁定
    LockOrder: function (token) {

        var ide_butt = $(".ide_butt");
        ide_butt.attr('disabled', false);

        WD.user.getInfo(function (res) {
            if (!res.token) {
                JK.reLogin();
                return;
            }
            if(!urlData.id){
                WD.alert('提示','请选择就诊信息');
                return;
            }

            var data = {
                // 990100002629619
                'token': token,
                'userToken': res.token, //userToken
                'hosOrgCode': urlData.hosOrgCode, //医院代码
                'hosName': urlData.hosName,//医院名称
                'scheduleId': urlData.scheduleId,
                'cardId': urlData.id,
                'hosDeptCode': urlData.hosDeptCode,//科室编码
                'deptName': urlData.deptName,//科室名称
                'hosDoctCode': urlData.hosDoctCode,//医生代码
                'doctName': urlData.doctName,//医生名称
                'orderTime': urlData.scheduleDate,//预约时间
                'visitLevelCode': urlData.visitLevelCode,
                'visitLevel': urlData.visitLevel,
                'visitCost': urlData.visitCost,
                'timeRange': urlData.timeRange

            };
            if(data.cardId=='undefined' || data.cardId==''){
                WD.alert('提示','请选择就诊信息');
                return;
            }
            JK.loading.show();
            $.ajax({
                type: "post",
                cache: false,
                url: otherUrl + 'register/lockOrderNum.do',
                data: data,
                //contentType:"application/json",
                dataType: "json",
                timeout: 60000,
                success: function (rs) {
                    JK.loading.hide();

                    var ide_butt = $(".ide_butt");
                    ide_butt.attr('disabled', true);

                    if (SYS.isApp) {
                        JK.loading.hide();
                    } else {
                        a.hide();
                        a.destroy();
                    }
                    if (rs.state == "1") {
                        data = rs.data;
                        WD.alert("提示", "预约成功", function () {
                            WD.openUrl(SYS.localUrl + "My_reservation.html");
                        });
                    } else {
                        WD.alert("提示", rs.msg,function () {
                            WD.openUrl(SYS.localUrl + "failure.html", {
                                hosOrgCode: urlData.hosOrgCode, //医院代码
                                // hosDeptCode:reset.hosDeptCode,//医院科室代码
                                hosName: urlData.hosName, //医院名称
                                hospitalGrade: urlData.hospitalGrade || "", //医院等级
                                hospitalIcon: ((urlData.hospitalIcon) ? urlData.hospitalIcon : "images/2160644_2.jpg"), //医院头像
                                hospitalAdd:urlData.hospitalAdd
                            });
                        });
                    }
                },
                error: function () {
                    if (SYS.isApp) {
                        JK.loading.hide();
                    } else {
                        a.hide();
                        a.destroy();
                    }
                    WD.alert("提示", "网络错误!");
                }
            });


        });

    },


    //获取就诊卡列表

    getCardList: function (token) {
        WD.user.getInfo(function (res) {
            if (!res.token) {
                Jk.reLogin();
                return;
            }
            var data = {
                'hosCode': urlData.hosOrgCode, //医院代码
                'token': token, //token
                'userToken': res.token //userToken


            };
            if(urlData.isMust=='1'){
                data.type=1;
            }else{
                data.type=2;
            }


            AJAX.goInfo("register/getMediCardListService.do", data, function (data) {

                //获取就诊卡列表  默认选中第一个就诊卡
                if (data.length == [] || data.length == "") {
                    $('#getPatintCard').find('b').text('添加就诊信息');
                    $('.card_style').text('');
                } else {
                   // $('#getPatintCard').find('b').text(data[0].name);
                  // //  $('.card_style').text('就诊卡');
                  //   $('.ul2_right').attr('id', data[0].id);
                }
            })
        })
    },
    //TODO 预约挂号 规则
    showRule: function () {
        $('.agree span').click(function () {
            $('.rule_show,.rule_mask').show();
        });
        $('.Bottombutt2 button').click(function () {
            $('.rule_show,.rule_mask').hide();
        })
    },
    //
};