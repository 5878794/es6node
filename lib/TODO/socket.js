/**
 * Created by beens on 16/12/1.
 */







var socket = require("socket.io"),
    io = socket.listen(8002);


// 或者是侦听一个服务,在主app里面修改
//var app = require("http").createServer();
//var io = socket_io.listen(app);
//app.listen(80);




io.sockets.on('connection', function (socket) {
    //获取连接的socket的id
    //console.log(socket.id)

    console.log("---------")
    //所有在线用户的socket对象，key为socket的id
    for(var key in io.sockets.sockets){
        if(io.sockets.sockets.hasOwnProperty(key)){
            console.log(key)
        }
    }
    console.log("----------")


    // 发送消息
    socket.emit('system', { msg: 'hello' });


    // 接收消息
    socket.on('private message', function (data) {
        //发送者的socket的id
        //console.log(socket.id);
        console.log(data);
    });

});