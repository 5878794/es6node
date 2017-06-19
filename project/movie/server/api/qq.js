

var _res = require("./../response"),
    ajax = require("./../ajax_get"),
    cheerio = require("cheerio");


var data = {
    movie:[],
    tv:[]
};


var getMovie = function(request,response){
    ajax(
        "http://v.qq.com/movie/",
        function(body){
            var $ = cheerio.load(body);
            var text = [];
            var list = $("#new_vs_focus").find(".slider_nav").find("a");
            list.each(function(){
                text.push({
                    title:$(this).text(),
                    img:$(this).attr("data-bgimage"),
                    url:$(this).attr("href")
                })
            });

            data.movie = text;
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
        "https://v.qq.com/tv/",
        function(body){
            var $ = cheerio.load(body);
            var text = [];
            var list = $("#new_vs_focus").find(".slider_nav").find("a");
            list.each(function(){
                text.push({
                    title:$(this).text(),
                    img:$(this).attr("data-bgimage"),
                    url:$(this).attr("href")
                })
            });

            data.tv = text;
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