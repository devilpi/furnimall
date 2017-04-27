import { Component,OnInit } from '@angular/core';
import { User }    from './user';
import { LocalStorage } from './local.storage'
import {Message} from './message'
@Component({
    selector: 'my-app',
    templateUrl: './app/chatRoom.html'
})
export class SiteFormComponent implements OnInit{
    content;
    addNum;
    user;
    expanded;
    curRoom;
    socket;
    messages;
    msgs;
    date;
    ls = new LocalStorage();
    updateSysMsg(obj,action):void{
        this.date = new Date();
        this.messages[0] = this.messages[1];
        this.messages[1] = obj.msg+'room'+obj.room;
        let message = obj.msg+'\n';
        this.msgs[obj.room].push(new Message(message,this.date.getHours()+" : "+this.date.getMinutes(),'','sys'));
        this.ls.setObject('msgs',this.msgs);
    }
    ngOnInit():void{
        this.date = new Date();
        this.content = 'try';
        this.addNum = 4;
        this.user = new User('test1',[]);
        this.expanded = false;
        this.socket = io.connect('localhost:3000');
        this.messages = ['hello',''];
        this.msgs = [];
        let o = this;

        //监听新用户登录
        this.socket.on('sys', function(obj){
            o.updateSysMsg(obj, 'login');
        });

        //监听用户退出
        this.socket.on('logout', function(o){
            o.updateSysMsg(o, 'logout');
        });

        //监听消息发送
        this.socket.on('msg', function(obj){

            o.date = new Date();
            let userName = obj.username;
            let msg = obj.content;
            if (userName == o.user.name)
                o.msgs[obj.room].push(new Message(msg,o.date.getHours()+" : "+o.date.getMinutes(),userName,'self'));
            else
                o.msgs[obj.room].push(new Message(msg,o.date.getHours()+" : "+o.date.getMinutes(),userName,''));
            o.messages[0] = o.messages[1];
            o.messages[1] = obj.username;
            o.messages[1] += ' : ';
            o.messages[1] += obj.content;
            o.ls.setObject('msgs',o.msgs);
        });

        if(this.ls.get('name') == this.user.name){
            this.user.rooms = this.ls.getObject('rooms');
            this.curRoom = this.user.rooms[0];
            this.msgs = this.ls.getObject('msgs');
        }else {
            this.ls.setObject('rooms',this.user.rooms);
            this.ls.set('name',this.user.name);
            this.ls.setObject('msgs',this.msgs);
        }
        this.user.rooms.forEach(function (value:number) {
            o.socket.emit('join', { username:o.user.name,room:value});
        })
    }



    onComment(mess){

        if (this.content=='')
            return;
        mess.scrollTop=mess.scrollHeight - mess.clientHeight;
        let obj = {
            username: this.user.name,
            content: this.content,
            room:this.curRoom
        };
        this.socket.emit('message', obj);
        this.content = '';
    }
    expand(){
        this.expanded = true;
    }
    changeCurRoom(room){
        this.curRoom = room;
    }
    unexpand(){
        this.expanded = false;
    }
    addRoom(){
        if (this.addNum==null)
            return;
        let index = this.user.rooms.indexOf(this.addNum);
        if (index == -1) {
            this.user.rooms.push(this.addNum);
            this.socket.emit('join', { username:this.user.name,room:this.addNum});
            this.msgs[this.addNum]=[];
            this.changeCurRoom(this.addNum);
        }
        this.ls.setObject('rooms',this.user.rooms);
        this.addNum = null;

    }
    leaveRoom(){
        let index = this.user.rooms.indexOf(this.curRoom);
        this.user.rooms.splice(index, 1);
        this.socket.emit('quit', { username:this.user.name,room:this.curRoom});
        this.changeCurRoom( this.user.rooms[0]);
        this.ls.setObject('rooms',this.user.rooms);
    }
}