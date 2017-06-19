

var ajax = require("./../../../../lib/fn/ajaxs"),
    cheerio = require("cheerio");
ajax = new ajax();





var getMovie = function(body){
    var $ = cheerio.load(body);
    var text = $("#block-AT").find(".focus_img_list").find("li");
    var _data = [];

    text.each(function(){
        var img_src = $(this).css("background-image");
        img_src = img_src.substr(4,img_src.length-5);

        _data.push({
            title:$(this).find("a").data("indexfocus-currenttitleelem"),
            img:img_src,
            url:$(this).find("a").attr("href")
        })
    });

    return _data;
};

var getTV = function(body){
    var $ = cheerio.load(body);
    var _data = [],
        list = $("#block-AT").find(".focus_img_list").find("li");

    list.each(function(i){
        var img_src = $(this).css("background-image");
        img_src = img_src.substr(4,img_src.length-5);

        _data.push({
            title:$(this).find("a").data("indexfocus-currenttitleelem"),
            img:img_src,
            url:$(this).find("a").attr("href")
        })
    });

    return _data;
};

var complete = function(rs,success){
    let hasError = false,
        errorMsg = "";
    rs.map(data=>{
        if(data.state == 0){
            hasError = true;
            errorMsg = data.msg;
        }
    });

    if(hasError){
        success({
            state:0,
            msg:errorMsg
        })
    }else{
        let [movie,tv] = rs;
        movie = movie.data;
        tv = tv.data;


        success({
            state:1,
            data:{
                movie:getMovie(movie),
                tv:getTV(tv)
            }
        })
    }
};



module.exports = function(){
    return new Promise((success,error)=>{
        Promise.all([
            ajax.send({url:"http://www.iqiyi.com/dianying/"}),
            ajax.send({url:"http://www.iqiyi.com/dianshiju/"})
        ]).then(rs=>{
            complete(rs,success)
        }).catch(rs=>{
            success({
                state:0,
                msg:rs
            })
        })
    });

};