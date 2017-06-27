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
                div = $("" +
                    "<div class='div' style='border-bottom:1px solid #ccc; padding: 20px 0' id='"+_data.id+"' ver='"+_data.ver+"'>" +
                    "   <span style='padding-left: 30px;'>"+_data.name+" </span>   " +
                    "   版本:<input style='width: 60px;' type='text' value='"+_data.ver+"'/>" +
                    "   <span class='download_app' style='padding: 0 10px; background: #000; color: #fff;'>下载</span>" +
                    "   <span class='info_app' style='padding: 0 10px; background: #000; color: #fff;'>查看提交日志</span>"+
                    "</div>");

            div.find(".download_app").click(function(){
                var id = $(this).parent().attr("id"),
                    ver = $(this).parent().find("input").val();
                download(id,ver)
            });
            div.find(".info_app").click(function(){
                var id = $(this).parent().attr("id");
                showInfo(id);
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

var showInfo = function(id){
    ajax("/app_download/api/showInfo",{id:id},function(rs){
        rs = rs.data;
        rs = rs.replace(/-{10,}/ig,function(str){
            return "<br/>"+str+"<br/>"
        });
        rs = rs.replace(/\sline\s/ig,function(str){
            return str+"<br/>"
        });
        var text = '<html lang="en"><head><meta charset="UTF-8"></head><body>'+rs+'</body></html>';
        // rs = rs.data;
        var blob = new Blob([text],{"type":"text/html"});
        var src= window.URL.createObjectURL(blob);
        window.open(src);
    },function(){
        alert("获取失败");
    });
};


