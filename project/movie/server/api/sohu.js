

var _res = require("./../response"),
    ajax = require("./../ajax_get"),
    // Iconv = require("iconv").Iconv,
    cheerio = require("cheerio");


var data = {
    movie:[],
    tv:[]
};


var getMovie = function(request,response){
    ajax(
        "http://tv.sohu.com/movie/",
        function(body){
            //gbk编码转换
            var gbk_to_utf8 = new Iconv('GBK', 'UTF-8');
            var buffer = gbk_to_utf8.convert(body);
            body = buffer.toString();

            var $ = cheerio.load(body);
            var text = $(".bodyer").find("script").eq(1).text();
            text = "["+text.split(/\[|\]/ig)[1]+"]";
            text = text.replace(/\s/ig,"");
            text = text.replace(/\/\//ig,"http://");
            text = text.replace(/\'/ig,"\"");
            text = eval("("+text+")");

            var _data = [];
            for(var key in text){
                _data.push({
                    title:text[key].t,
                    img:text[key].p,
                    url:text[key].l
                })
            }

            data.movie = _data;
            getTV(request,response);
        },
        function(err){
            data.movie = err;
            getTV(request,response);
        }
    );
};

var getTV = function(request,response){
    ajax(
        "http://tv.sohu.com/drama/",
        function(body){
            //gbk编码转换
            var gbk_to_utf8 = new Iconv('GBK', 'UTF-8');
            var buffer = gbk_to_utf8.convert(body);
            body = buffer.toString();

            var $ = cheerio.load(body);
            var text = $("body").find("script").eq(8).text();
            text = "["+text.split(/\[|\]/ig)[1]+"]";
            text = text.replace(/\s/ig,"");
            text = text.replace(/\/\//ig,"http://");
            text = text.replace(/\'/ig,"\"");
            text = eval("("+text+")");

            var _data = [];
            for(var key in text){
                _data.push({
                    title:text[key].t,
                    img:text[key].p,
                    url:text[key].l
                })
            }

            data.tv = _data;
            end(request,response);

        },
        function(err){
            data.tv = err;
            end(request,response);
        }
    );
};



var end = function(request,response){
    var text = JSON.stringify(data);
    _res(text,response);
};



module.exports = function(request,response){
    getMovie(request,response);


};