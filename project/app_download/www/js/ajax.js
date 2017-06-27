var loading;
var ajax = function(url,data,success,error){
    loading.show("loading");
    $.ajax({
        type:"get",
        cache:false,
        url:url,
        data:data,
//            contentType:"application/json",
        contentType:"application/x-www-form-urlencoded",
//            dataType:"json",
        dataType:"json",
        timeout:900000,
        success:function(rs){
            loading.hide();
            if(rs.state==1){
                success(rs.data);
            }else{
                alert(rs.msg);
            }

        },
        error:function(e){
            loading.hide();
            error();

        }
    });
};



$(document).ready(function(){
    loading = new DEVICE.loading();
    getList();
});


var getList = function(){
    ajax("/app_download/api/getList",{},function(rs){
        var data = rs;
        for(var i=0,l=data.length;i<l;i++){
            var _data = data[i],
                div = $("<div class='div' style='border-bottom:1px solid #ccc; padding: 20px 0' id='"+_data.id+"' ver='"+_data.ver+"'><span style='padding-left: 30px;'>"+_data.name+" </span>   版本:<input style='width: 60px;' type='text' value='"+_data.ver+"'/><span class='download_app' style='padding: 0 10px;'>下载</span></div>");

            div.find(".download_app").click(function(){
                var id = $(this).parent().attr("id"),
                    ver = $(this).parent().find("input").val();
                download(id,ver)
            });
            $("body").append(div);
        }
    },function(){
        $("body").html("获取列表失败");
    });
};



var download = function(id,ver){
    ajax("/app_download/api/download",{id:id,ver:ver},function(rs){
        window.open(rs);
    },function(){
        alert("下载失败");
    });
};
