"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("./user");
var local_storage_1 = require("./local.storage");
var message_1 = require("./message");
var SiteFormComponent = (function () {
    function SiteFormComponent() {
        this.ls = new local_storage_1.LocalStorage();
    }
    SiteFormComponent.prototype.updateSysMsg = function (obj, action) {
        this.date = new Date();
        this.messages[0] = this.messages[1];
        this.messages[1] = obj.msg + 'room' + obj.room;
        var message = obj.msg + '\n';
        this.msgs[obj.room].push(new message_1.Message(message, this.date.getHours() + " : " + this.date.getMinutes(), '', 'sys'));
        this.ls.setObject('msgs', this.msgs);
    };
    SiteFormComponent.prototype.ngOnInit = function () {
        this.date = new Date();
        this.content = 'try';
        this.addNum = 4;
        this.user = new user_1.User('test1', []);
        this.expanded = false;
        this.socket = io.connect('localhost:3000');
        this.messages = ['hello', ''];
        this.msgs = [];
        var o = this;
        //监听新用户登录
        this.socket.on('sys', function (obj) {
            o.updateSysMsg(obj, 'login');
        });
        //监听用户退出
        this.socket.on('logout', function (o) {
            o.updateSysMsg(o, 'logout');
        });
        //监听消息发送
        this.socket.on('msg', function (obj) {
            o.date = new Date();
            var userName = obj.username;
            var msg = obj.content;
            if (userName == o.user.name)
                o.msgs[obj.room].push(new message_1.Message(msg, o.date.getHours() + " : " + o.date.getMinutes(), userName, 'self'));
            else
                o.msgs[obj.room].push(new message_1.Message(msg, o.date.getHours() + " : " + o.date.getMinutes(), userName, ''));
            o.messages[0] = o.messages[1];
            o.messages[1] = obj.username;
            o.messages[1] += ' : ';
            o.messages[1] += obj.content;
            o.ls.setObject('msgs', o.msgs);
        });
        if (this.ls.get('name') == this.user.name) {
            this.user.rooms = this.ls.getObject('rooms');
            this.curRoom = this.user.rooms[0];
            this.msgs = this.ls.getObject('msgs');
        }
        else {
            this.ls.setObject('rooms', this.user.rooms);
            this.ls.set('name', this.user.name);
            this.ls.setObject('msgs', this.msgs);
        }
        this.user.rooms.forEach(function (value) {
            o.socket.emit('join', { username: o.user.name, room: value });
        });
    };
    SiteFormComponent.prototype.onComment = function (mess) {
        if (this.content == '')
            return;
        mess.scrollTop = mess.scrollHeight - mess.clientHeight;
        var obj = {
            username: this.user.name,
            content: this.content,
            room: this.curRoom
        };
        this.socket.emit('message', obj);
        this.content = '';
    };
    SiteFormComponent.prototype.expand = function () {
        this.expanded = true;
    };
    SiteFormComponent.prototype.changeCurRoom = function (room) {
        this.curRoom = room;
    };
    SiteFormComponent.prototype.unexpand = function () {
        this.expanded = false;
    };
    SiteFormComponent.prototype.addRoom = function () {
        if (this.addNum == null)
            return;
        var index = this.user.rooms.indexOf(this.addNum);
        if (index == -1) {
            this.user.rooms.push(this.addNum);
            this.socket.emit('join', { username: this.user.name, room: this.addNum });
            this.msgs[this.addNum] = [];
            this.changeCurRoom(this.addNum);
        }
        this.ls.setObject('rooms', this.user.rooms);
        this.addNum = null;
    };
    SiteFormComponent.prototype.leaveRoom = function () {
        var index = this.user.rooms.indexOf(this.curRoom);
        this.user.rooms.splice(index, 1);
        this.socket.emit('quit', { username: this.user.name, room: this.curRoom });
        this.changeCurRoom(this.user.rooms[0]);
        this.ls.setObject('rooms', this.user.rooms);
    };
    return SiteFormComponent;
}());
SiteFormComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/chatRoom.html'
    })
], SiteFormComponent);
exports.SiteFormComponent = SiteFormComponent;
//# sourceMappingURL=app.component.js.map