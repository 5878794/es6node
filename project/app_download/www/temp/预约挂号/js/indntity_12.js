/**
 * Created by Administrator on 2016/8/17.
 */
//indentity,html 获取就诊人信息
var urlData=PMZ_DEVICE.getAllParamFromUrl(); //获取url参数对象
var PAGE = {
    init: function() {
       // this.submit_btn();
       // this.tabSwitch();
      //  this.getMessage();


        //绑卡
        this.click_btn();
       // this.setVal();
        WD.getToken(this.getPersonalInfo);

       // WD.getToken(this.getCardList);

    //   获取就诊人WD.getToken(this.getPeoInfo);

        //获取就诊卡列表
       // WD.getToken(this.savePersonInfo);
        this.addHealth();
    },
    //提交按钮事件
    // savaInfo: function() {
    //
    //
    //
    //     var name = $('#name').val(); //姓名
    //     var papers = $('#papers'); //大陆身份证
    //     var papersNum = $('#papersNum').val(); //身份证号码
    //     var birthDay = $('#birthDay'); //生日
    //     var address = $('#address'); //地址
    //     var phoneNum_input = $('#phoneNum'); //手机号
    //     var E_mail = $('#E_mail').val(); //邮箱
    //     var sexS = $('#sex').find('b').text(); //性别
    //     var regs = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    //     if (!name) {
    //         WD.alert("提示","请输入姓名");
    //         return;
    //     }
    //     if (!papersNum) {
    //         WD.alert("提示","请输入证件号");
    //         return;
    //     }
    //     if (!isCnNewID(papersNum)) {
    //         WD.alert("提示","请输入正确的身份证号码");
    //         return;
    //     }
    //
    //     if (birthDay.find('b').text() == "必填") {
    //         WD.alert("提示","请选择生日");
    //         return;
    //     }
    //     if (!phoneNum_input.val()) {
    //         WD.alert("提示","请输入手机号");
    //         return;
    //     }
    //     if (!regs.test(phoneNum_input.val())) {
    //         WD.alert("提示","请输入正确的手机号");
    //         return;
    //     }
    //     //获取医生列表
    //     WD.getToken(PAGE.uploadInfo);
    // },
    // getUserInfo: function() {
    //     var addData = {};
    //     addData.name = $('#name').val();
    //     addData.papers = $('#papers').find('b').text();
    //     addData.papersNum = $('#papersNum').val();
    //     addData.sex = $('#sex').find('b').text();
    //     addData.birthDay = $('#birthDay').find('b').text();
    //     addData.phoneNum = $('#phoneNum').val();
    //     addData.E_mail = $('#E_mail').val();
    //     return addData;
    // },
    // submit_btn: function() {
    //     //提交事件
    //     $('.ide_butt').click(function() {
    //         PAGE.savaInfo();
    //     });

    //     //身份输入验证
    //     $('#papersNum').on("input", function() {
    //         if (isCnNewID($(this).val())) {
    //             var all = $(this).val().substr(6, 8);
    //             var birthy = all.substr(0, 4) + "-" + all.substr(4, 2) + "-" + all.substr(6, 2);
    //             $('#birthDay').find('b').text(birthy);
    //         } else {
    //             $('#birthDay').find('b').text("必填");
    //         }
    //     });
    // },
    // uploadInfo:function(token) {
    //     WD.user.getInfo(function(res) {
    //         if (!res.token) {
    //             JK.reLogin();
    //             return;
    //         }
    //         PAGE.upInfo(token, res.userId);
    //         // console.log(token);
    //     });
    // },
    // upInfo: function(token, userId) {
    //     var info_A = PAGE.getUserInfo();
    //     if (info_A.sex == "女") {
    //         info_A.sex = "2";
    //     } else {
    //         info_A.sex = "1";
    //     }
    //     var dates = getDate(new Date());
    //     var data = {
    //         "msgHeader": {
    //             "sign": Md5(["timeStamp=" + dates,
    //                 "token=" + token,
    //                 "userId=" + String(userId),
    //                 "patientName=" + pcKg(info_A.name),
    //                 "patientCardType=01",
    //                 "patientCardId=" + pcKg(info_A.papersNum),
    //                 "patientPhone=" + pcKg(info_A.phoneNum),
    //                 "patientSex=" + pcKg(info_A.sex),
    //                 "patientBD=" + pcKg(info_A.birthDay)
    //             ].sort()),
    //             "timeStamp": dates,
    //             "token": token
    //         },
    //         "param": {
    //             "patientInfo": {
    //                 "patientName": pcKg(info_A.name),
    //                 "patientCardType": "01",
    //                 "patientCardId": pcKg(info_A.papersNum),
    //                 "patientPhone": pcKg(info_A.phoneNum),
    //                 "patientSex": pcKg(info_A.sex),
    //                 "patientBD": pcKg(info_A.birthDay)
    //             },
    //             "userId": String(userId)
    //         }
    //     };
    //     AJAX.go1("saveOrUpdatePatientService", {
    //         paramString: JSON.stringify(data)
    //     }, function(data) {
    //         if (data.msgHeader.code == "0") {
    //             WD.alert("提示","添加就诊人成功",function(){
    //                 // var search =decodeURI(window.location.search);
    //             // WD.openUrl(SYS.localUrl+"Booking_info_1.html" + search + PAGE.getdomVal() + "&aPMZ_id=" + data.result.patientId);
    //         });
    //         } else {
    //             WD.alert("提示","添加就诊人失败");
    //         }
    //     });
    // },
    // getdomVal: function() {
    //     var string = "";
    //     var phone = $('#phoneNum').val();
    //     var name = $('#name').val();
    //     var sex = $('#sex').find('b').text();
    //     var idCard = $('#papersNum').val();
    //     string = "&rnmPhone=" + phone + "&rnmName=" + name + "&sex=" + sex + "&rnmsfz=" + idCard;
    //     return string;
    // },
    //tab切换
    tabSwitch:function () {
        var shop_click = $(".card_tab span");
        var shop_tab = $(".card_list");
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


    //提交按钮事件



    click_btn: function() {

        $("#sex").on("click", function() {
            var datapush=[{key:"男",val:"男"},{key:"女",val:"女"}];
            WD.select("取消", "", datapush);
        });
        $('#papersNum').on("input", function() {
            if (isCnNewID($(this).val())) {
                var all = $(this).val().substr(6, 8);
                var birthy = all.substr(0, 4) + "-" + all.substr(4, 2) + "-" + all.substr(6, 2);
                $('#birthDay').find('b').text(birthy);
            } else {
                $('#birthDay').find('b').text("必填");
            }
        });
        $('.ide_butt').click(function() {


            var name = $('#name').val(); //姓名
            var papersNum = $('#papersNum').val(); //身份证号码
            var birthDay = $('#birthDay'); //生日
            var address = $('#address'); //地址
            var phoneNum_input = $('#phoneNum'); //手机号
            var sexS = $('#sex').find('b').text(); //性别
            var regs = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
            if (!name) {
                WD.alert("提示","请填写姓名");
                return;
            }
            if(!papersNum){
                WD.alert("提示","请填写身份证");
                return;
            }
            if (!isCnNewID(papersNum)) {
                WD.alert("提示","请输入正确的身份证号码");
                return;
            }
            if (!phoneNum_input.val()) {
                WD.alert("提示","请输入手机号");
                return;
            }
            if (!regs.test(phoneNum_input.val())) {
                WD.alert("提示","请输入正确的手机号");
                return;
            }
            else{
                     //获取token
                console.log('1');
               WD.getToken(PAGE.subPersonInfo);
              //   PAGE.pmz_upload_k;


            }
        });
    },
    subPersonInfo: function(token) {
       // console.log(token);
        var name = $('#name').val(); //姓名
        var phone=$('#phoneNum').val();//手机号
        var idCard=$('#papersNum').val();//身份证
        var cardNo=$('#card_input').find('.ide_inputs').val();//就诊卡号
        var birthDay=$('#birthDay').find('b').text();//生日
        var sex=$('#sex').find('b').text();
        WD.user.getInfo(function(res) {
            //console.log(res);
            if(!res.token) {
                JK.reLogin();
                return;
            }

            var data={
                'hosCode':urlData.hosOrgCode, //医院代码
                'token':token,  //token
                'userToken':'test', //userToken
                'birthday':birthDay, //生日
                'name':name,  //姓名
                'idCard':idCard,  //身份证
                'sex':sex,// 性别
                'phone':phone //手机号
            };
            //console.log(data);
            AJAX.goInfo("register/savePersonInfo.do", data, function(data) {
                console.log(data);

            })
        });
    },
    //新增绑定就诊卡
    addHealth:function () {
      var card_btn= $('.add_Card').find('button');
        card_btn.on('click',function () {
            alert('1');
            $(this).parent().css('display','none');
            $('.choose_card_main').css({'display':'block'});
        })
    },

    //调用API 获取就诊人信息
    getPersonalInfo:function (token) {
       // alert('1');
        WD.user.getInfo(function(res) {
            if (!res.token) {
                Jk.reLogin();
                return;
            }
            var data={
                'hosCode':urlData.hosOrgCode, //医院代码
                'token':token, //token
                'userToken':'test' //userToken

            };
            AJAX.goInfo("register/getPersonInfo.do", data,function(data) {
                if(data==[]){
                    console.log('无数据')
                }
            })
        })
    }
};