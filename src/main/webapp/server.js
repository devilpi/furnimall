let app = require('express')();
let http = require('http').Server(app);
let socketIO = require('socket.io')(http);

app.get('/', function(req, res){
    res.send('<h1>Welcome Realtime Server</h1>');
});

roomInfo = {};
sockets = {};

socketIO.on('connection',function(socket){
    var userName;
    console.log('a user connected'+roomInfo[4]);
    //监听新用户加入
    socket.on('join',function(obj){
        let user = obj.username;
        userName = obj.username;
        let roomID = obj.room;
        if (!roomInfo[roomID]) {
            roomInfo[roomID] = [];
        }
        roomInfo[roomID].push(user);
        socket.join(roomID);
        socketIO.to(roomID).emit('sys',{msg:user + '加入了房间',room:roomID});
        console.log(user + '加入了' + roomID);
    });
    socket.on('leave', function () {
        socket.emit('disconnect');
    });
    socket.on('disconnect', function (obj) {
        for(const key in roomInfo){
            let index = roomInfo[key].indexOf(userName);
            if (index !== -1) {
                roomInfo[key].splice(index, 1);
                socketIO.to(key).emit('sys',{msg:userName + '退出了房间',room:key});
                socket.leave(key,function () {});
            }
        }

    });
    //监听用户退出
    socket.on('quit', function(obj){
        let user = obj.username;
        let roomID = obj.room;

        let index = roomInfo[roomID].indexOf(user);
        if (index !== -1) {
            roomInfo[roomID].splice(index, 1);
        }

        socket.leave(roomID,function () {});
        socketIO.to(roomID).emit('sys', {msg:user + '退出了房间',room:roomID});
        console.log(user + '退出了' + roomID);
    });
    socket.on('message', function (obj) {
        let user = obj.username;
        let roomID = obj.room;
        let msg = obj.msgObj;
        console.log(obj);
        if (roomInfo[roomID].indexOf(user) === -1) {
            return false;
        }
        socketIO.to(roomID).emit('msg', obj);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});