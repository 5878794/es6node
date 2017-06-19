

var _res = require("./../response"),
    ajax = require("./../ajax_get"),
    cheerio = require("cheerio");


var data = {
    movie:[],
    tv:[]
};


var getMovie = function(request,response){
    ajax(
        "http://movie.tudou.com/",
        function(body){
            var $ = cheerio.load(body);
            var text = $("#m378").find(".pics").find("li"),
                names = $("#m378").find(".txts").find("h3").find("a"),
                _data = [];

            text.each(function(i){
                _data.push({
                    title:names.eq(i).text(),
                    img:$(this).find("img").attr("alt"),
                    url:$(this).find("a").attr("href")
                });
            });

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
        "http://tv.tudou.com/",
        function(body){
            var $ = cheerio.load(body);
            var text = $("#m333").find(".pics").find("li");
            var _data = [];

            text.each(function(){
                _data.push({
                    title:$(this).find(".t").find("h3").text(),
                    img:$(this).find("img").attr("alt"),
                    url:$(this).find("a").attr("href")
                });
            });


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