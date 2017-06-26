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
                div = $("<div class='div' id='"+_data.id+"' ver='"+_data.ver+"'>"+"下载  "+_data.name+"    版本:"+_data.ver+"</div>");

            div.click(function(){
                var id = $(this).attr("id"),
                    ver = $(this).attr("ver");
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
