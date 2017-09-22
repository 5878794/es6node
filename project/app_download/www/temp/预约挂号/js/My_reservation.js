/**
 * Created by Adminzjs1 on 2016/7/6.
 */
var nullBool = true;
var PAGE = {
    init: function() {
        WD.getToken(PAGE.getMakeInfo);
        //this.goBack();
    },

    //goback
    // goBack:function () {
    //     YJH.H5NativeAppInfo.setNavBarLeftBtn(function(){window.history.back()},{});
    // },
    getMakeInfo: function(token) { //健康成都
        var _timeStamp = getDate(new Date());
       WD.user.getInfo(function(res) {
            var data = {
                "msgHeader": {
                    "sign": Md5(["userid=" + res.userId, "timestamp=" + _timeStamp, "token=" + token].sort()),
                    "timeStamp": _timeStamp,
                    "token": token
                },
                "param": {
                    "userId": String(res.userId)
                }
            };
            AJAX.go1("getOrderListService", { //健康成都
                paramString: JSON.stringify(data)
            }, function(data) {
                PAGE.getMakeData(data.orderInfo,token);
            });
        });
    },
    getMakeData: function(result,token) {
        var dataT = result;
        if (nullBool && dataT.length <= 0) {
            nullBool = false;
            $('body').append($("#notnull").find('.nodata').clone());
            //JK.noListShow.reservation(); //无内容
            return;
        };
        for (var i = 0; i < dataT.length; i++) {
            var dataStr = dataT[i];
            var obj = $("#reseraton").find(".Myre_cont").clone();
            obj.find("img").attr("src", (dataStr.doctIcon ?dataStr.doctIcon  :"images/defalutDoctor.png"));
            var label = obj.find("span.Myre_right");
            obj.find(".Bottom").find("span:eq(1)").html(dataStr.orderTime + " " + (dataStr.timeRange == 1 ? '上午' : dataStr.timeRange == 2 ? '下午' : '晚上'));
            //1.预约成功 2.个人取消,3.系统取消
            if (dataStr.orderStatus == 1||dataStr.orderStatus == 2) {
                label.html("预约成功");
                obj.find(".Myre_time").append("<span class='time2'>取消预约</span>");
            } else if (dataStr.orderStatus == 3) {
                label.html("已取消");
            }
            // $(".reseration_pList", obj).on("click", function() { //预约详情
            //     //健康成都详情
            //     JK.openUrl(SYS.localUrl + "reservation_detail_1.html?id=" + dataStr.id + "&orderId=" + dataStr.orderId + "&tel=" + dataStr.tel + "&photoUri=" + dataStr.photoUri + "&doctorSn=" + dataStr.doctorSn + "&hosDeptName=" + dataStr.hosDeptName + "&createTime=" + dataStr.createTime + "&registerDate=" + dataStr.registerDate + "&timeId=" + dataStr.timeId + "&patientName=" + dataStr.patientName + "&state=" + dataStr.state + "&doctorName=" + dataStr.doctorName)
            // });

            //取消预约挂号
            obj.find(".Myre_time>.time2").on("click", dataStr,function(data) {
            	JK.confirm("提示","确定要取消挂号吗?",function(){
            		PAGE.canceJKSJ(data.data.id, token);
            	})
            });


            obj.find("span.Myre_left").html(dataStr.orgName); //医院名字
            obj.find("span.Myre_right").html(label.html());
            obj.find(".Top span:eq(0)").html(dataStr.doctName + "医生"); //以上姓名
            obj.find(".Top span:eq(1)").html(dataStr.deptName); //预约科室
            obj.find(".Top span:eq(2)").html(dataStr.visitLevel);//医生级别
            obj.find(".time1").html(dataStr.createTime);//下单时间

        
            $("body").append(obj);
        }
    },
    canceJKSJ: function(orderId, token) { //健康成都平台
        var _timeStamp = getDate(new Date());
        var data = {
            "msgHeader": {
                "sign": Md5(["timestamp=" + _timeStamp, "token=" + token, "cancelDesc=不想挂号了", "cancelReason=0", "id=" + String(orderId)].sort()),
                "timeStamp": _timeStamp,
                "token": token
            },
            "param": {
                "cancelDesc": "不想挂号了",
                "cancelReason": "0",
                "id": String(orderId)
            }
        };
        AJAX.go1("getOrderCancelService", {paramString:JSON.stringify(data)}, function(data) { //取消预约
            if (data.msgHeader.code == "0") {
                WD.alert("提示","取消预约成功!", function() {
                    window.location.reload();
                });
            } else {
                WD.alert("提示","取消失败!");
            }
        })
    }

}