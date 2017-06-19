

var _res = require("./../response"),
    ajax = require("./../ajax_get"),
    cheerio = require("cheerio");


var data = {
    movie:[],
    tv:[]
};


var getMovie = function(request,response){
    ajax(
        "http://movie.youku.com/",
        function(body){
            var $ = cheerio.load(body);
            var text = $("#m_86981").text();
            text = "["+text.split(/\[|\]/ig)[1]+"]";
            text = JSON.parse(text);
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
        "http://tv.youku.com/",
        function(body){
            var $ = cheerio.load(body);
            var text = $("#m_86804").text();

            var startStr = text.indexOf("["),
                endStr = text.lastIndexOf("]"),
                length = endStr - startStr + 1;
            text = text.substr(startStr,length);

            text = JSON.parse(text);
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