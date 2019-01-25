var loading;
var ajax = function(url,data,success,error){
    loading.show("loading");

    var type = "get";
    if(url=='/app_download/api/download'){
        type = "post";
    }

    $.ajax({
        type:type,
        cache:false,
        url:url,
        data:data,
           contentType:"application/json",
        // contentType:"application/x-www-form-urlencoded",
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
                getSet(id,ver);
                // download(id,ver)
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

var getSettingData = '';
var getSet = function(id,ver){
    ajax("/app_download/api/getSettingJs",{id:id,ver:ver},function(rs){
        rs = rs.data;
        rs = rs.split(/SETTING\s*=\s*\{|\}/)[1];
        rs = '{'+rs+'}';

        var bRs = eval('('+rs+')');
        getSettingData = bRs;

        rs = rs.split(/\n/);
        var tempData = [];
        for(var i=0,l=rs.length;i<l;i++){
            var thisData = rs[i];
            if(thisData){
                if(/^\s*\/\//.test(thisData)){
                    tempData.push(thisData.replace(/^\s*\/\//,''));
                }
            }
        }

        var j=0;
        var backData = [];
        for(var key in bRs){
            if(bRs.hasOwnProperty(key)){
                var type = typeof bRs[key];
                if(type == 'string' || type=='boolean' || type=='number'){
                    backData.push({
                        info:tempData[j],
                        val:bRs[key],
                        key:key,
                        type:type
                    });
                }
                j++;
            }
        }



        openSet(id,ver,backData);
    },function(){
        alert("获取配置文件出错");
    });
};


var openSet = function(id,ver,rs){
    var zz = $('<div></div>'),
        main = $('<div></div>'),
        title = $('<div>参数设置</div>'),
        list = $('<div></div>'),
        item = $('<div class="__list__"></div>'),
        btn = $('<div>确认下载代码包</div>');

    zz.css({
        width:'100%',height:'100%','z-index':'100',background:'rgba(0,0,0,0.5)',
        position:'fixed',left:0,top:0
    });
    main.css({
       width:'600px','max-height':'80%',position:'absolute',left:0,top:0,right:0,bottom:0,background:'#fff',
        margin: 'auto',overflow: 'auto',
        padding:'20px'
    });
    title.css({
       'font-size':'24px','line-height':'40px','text-align':'center'
    });
    btn.css({
        width:'200px',height:'40px','text-align':'center',
        'line-height':'40px',background:'#000',color:'#fff',
        margin:'0 auto',cursor:'pointer'
    });
    item.css({
       'padding-bottom':'10px'
    });

    main.append(title).append(list).append(btn);
    zz.append(main);

    for(var i=0,l=rs.length;i<l;i++){
        var thisItem = item.clone(),
            thisData = rs[i];

        thisItem
            .attr({dataKey:thisData.key,dataType:thisData.type})
            .append('<p>'+thisData.key+'</p>')
            .append('<p style="color:#ccc;">'+thisData.info+'</p>')
            .append('<input style="width:100%;height:30px;text-indent:0.5em;" type="text" value="'+thisData.val+'"/>')

        list.append(thisItem);
    }


    $('body').append(zz);


    btn.click(function(){
        download(id,ver,zz);
    });
};


var download = function(id,ver,zz){
    //获取表单数据
    zz.find('.__list__').each(function(){
        var key = $(this).attr('dataKey'),
            type = $(this).attr('dataType'),
            val = $(this).find('input').val();

        if(type=='boolean'){
            val = (val=='true');
        }
        getSettingData[key] = val;
    });

    var text;
    text = JSON.stringify(getSettingData);
    text = 'var SETTING = ' + text;


    ajax("/app_download/api/download",{id:id,ver:ver,setting:text},function(rs){
        window.open(rs);
        window.location.reload();
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


