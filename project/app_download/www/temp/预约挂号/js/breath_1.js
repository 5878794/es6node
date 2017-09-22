/**
 * Created by Administrator on 2016/8/17.
 */
//breath.html 医生列表
var urlData = PMZ_DEVICE.getAllParamFromUrl();
var PAGE = {
    init: function () {
        //获取医生列表
        WD.getToken(this.doctorApi);
        //修改title
        this.setTitle();
        this.sort();
    //    处理数据
    //     this.HandlerData();

       // console.log(urlData);
    },
    //可约点击事件
    clickOutpatientUrl: function (obj) {
        var _this = $(obj).parents(".Content_li");
     // console.log(_this.attr({}));
       // console.log(urlData);
       // alert(_this.attr());

       // console.log(urlData.deptName);

        WD.openUrl(SYS.localUrl + "Outpatient_1.html", {
            "hosName": urlData.hosName,//医院名称
            "doctorSn": $(_this).attr("doctorSn") || "",
            "hosDoctCode": $(_this).attr("hosDoctCode"),//医生代码
            "hosOrgCode": $(_this).attr("hosOrgCode"),//医院代码
            "hosDeptCode": urlData.hosDeptCode,//科室代码
            "doctIcon": $(_this).find(".doc_Name_img").attr("src"),//医生头像
            "doctSkill": $(_this).find(".diandian2").text(),//医生特长
            "doctName": $(_this).find(".doc_Head_name").text(),//医生名
            "doctTile": $(_this).find(".doc_Head_job").text(),//医生是否有职称
            'doctDesc':urlData.doctDesc,//医生简介
            "deptName": urlData.deptName,//科室名称
            'hospitalAdd':urlData.hospitalAdd,


            hospitalGrade: urlData.hospitalGrade || "", //医院等级
            hospitalIcon: ((urlData.hospitalIcon) ? urlData.hospitalIcon : "images/2160644_2.jpg"), //医院头像
            //  hospitalWeb: urlData.hospitalWeb //医院的地址
            hospitalWeb: urlData.hospitalWeb, //医院的网址
            hospltalTel:urlData.hospltalTel,//医院的电话
            hospltalBus:urlData.hospltalBus, //医院的公交线路
            hospitalDesc:urlData.hospitalDesc //医院简介
        });
    },
    doctorApi: function (token) {
        var stamp = getDate(new Date());
        //获取医生列表
        var data = {
            "msgHeader": {
                "sign": Md5(["hosDeptCode=" + urlData.hosDeptCode, "hosOrgCode=" + urlData.hosOrgCode, "timeStamp=" + stamp, "token=" + token].sort()),
                "timeStamp": stamp,
                "token": token
            },
            "param": {
                "hosOrgCode": urlData.hosOrgCode,
                "hosDeptCode": urlData.hosDeptCode,
                'doctDesc':urlData.doctDesc
            }
        };
       // console.log(data);
        AJAX.go1("getDoctorService", {paramString: JSON.stringify(data)}, function (data) {
            if (data.msgHeader.code == "0") {
                PAGE.doctorBind(data.result.doctorInfo);
                // PAGE.HandlerData(data.result.doctorInfo);
            } else {
                WD.alert("提示", "获取医生列表失败!");
            }
        });
    },
    doctorBind: function (data) {
       // alert(data.doctName);
       console.log(data);
        if (data.length <= 0) {//无科室列表
            $('#docList').append($("#notnull").find('.nodata').clone());
            return;
        }
        var obj={};
        var keys = [];
        for(var i=0,l=data.length;i<l;i++){
           // console.log(data[i].py);
            data[i].py=makePy(data[i].doctName)[0].substring(0,1);

            var key=data[i].py;
            if(!obj[key]){
                obj[key]=[];
            }
            if($.inArray(key,keys)==-1){
                keys.push(key);
            }
            obj[key].push(data[i]);
        }

        keys.sort();

        var obj1={};
        for(var i=0;i<keys.length;i++){

            obj1[keys[i]] = obj[keys[i]];
        }

        // console.log(obj1);
        $.each(obj1,function (index,val) {
           // console.log(index);  //这是键值。
            //console.log(index); //这是obj 数据。
            $('#docList').append('<div class="sort_letter" id="' + index + '">' + index + '</div>');
            for(var j=0;j<val.length;j++){
                    var doctor = $("#doctor").find('.Content_li').clone();
                    var dataT = val[j];

                    var demo = doctor;
                  //  console.log(dataT);
                    //alert(dataT.doctDesc);

                  //  console.log(dataT.doctDesc);
                    if (dataT.doctIcon) {//存在头像
                        demo.find('.doc_Name_img').attr("src", dataT.doctIcon);
                    }
                    if (dataT.doctTile !== null) {//医生是否有职称
                        demo.find('.doc_Head_job').html(dataT.doctTile);
                    }
                    if (dataT.isScheduling == "1") {//是否有预约
                        demo.attr({'doctDesc':dataT.doctDesc});
                        demo.attr({
                            "doctorSN": dataT.doctorSn,//医生SN
                            "hosDoctCode": dataT.hosDoctCode,//医生代码
                            "hosOrgCode": dataT.hosOrgCode,//医院代码
                            "hosDeptCode": dataT.hosDeptCode,//科室代码
                            "doctDesc":dataT.doctDesc,//医生简介
                            "hospitalAdd":dataT.hospitalAdd //医院地址
                        });
                        demo.find('.doc_Head_butt').click(function (event) {
                            PAGE.clickOutpatientUrl(this);//可约点击事件
                        });
                    } else {
                        demo.find('.doc_Head_butt').addClass('doc_Head_butt2').html("已满");
                    }
                    if (dataT.doctSkill === null) {
                        demo.find('.doc_Foot').remove();
                    } else {
                        demo.find('.diandian2').html("擅长：" + dataT.doctSkill);
                    }
                    demo.find('.doc_Head_name').html(dataT.doctName);//医生名称
                    demo.find('.doc_Head_object').html(urlData.deptName.replace(/(\w|\s)*-/g, ""));//科室名称

                   // console.log(demo);
                $("#docList").append(demo);
            }
        });

    },
    //修改title
    setTitle: function () {
        var text = urlData.hosName;
        $("title").text(text);
    },
    //字母排序
    sort: function () {
        var number_sort = $('.number_sort');
        number_sort.find('ul').append('<li>A</li><li>B</li><li>C</li><li>D</li><li>E</li><li>F</li><li>G</li><li>H</li><li>I</li><li>J</li><li>K</li><li>L</li><li>M</li><li>N</li><li>O</li><li>P</li><li>Q</li><li>R</li><li>S</li><li>T</li><li>U</li><li>V</li><li>W</li><li>X</li><li>Y</li><li>Z</li><li>#</li>');

        //点击滚动到相应位置
        $('.number_sort ul li').on('click', function () {
            var _this = $(this);
            var _index = _this.index();

            if (_index == 0) {
                $('html,body').animate({scrollTop: '0'}, 300);
            } else if (_index == 27) {
                var defaultTop = $('#default').position().top;
                $('html,body').animate({scrollTop: defaultTop + 'px'}, 300)
            } else {
                var letter = _this.text();
                if ($('#' + letter).length > 0) {
                    var letterTop = $('#' + letter).position().top;
                    $('html,body').animate({scrollTop: letterTop}, 300);
                }
            }

        });
        //计算
        var windowHeight = $(window).height();
        var initHeight = windowHeight;
        number_sort.height(initHeight);
        var liHeight = initHeight / 28;
        number_sort.find('li').height(liHeight);
    }
}
;