import {Component} from '@angular/core';
import {NavController,ModalController} from 'ionic-angular';
import {ContentPage} from '../content/content';

@Component({
  templateUrl: 'build/pages/home/msg.html'
})
export class MsgPage {

    msg = 'system';
    sysItems = [
      {
        "imgurl":"./images/message_icom@2x.png",
        "title":"恭喜您成功注册皮肤医院APP。",
        "introduce":"恭喜您成功注册皮肤医院APP。",
        "datetime":"2016.05.20 13:30",
        "more":"查看全部>",
        "read":0
      },{
        "imgurl":"./images/message_icom@2x.png",
        "title":"恭喜您成功注册皮肤医院APP。jhahahahahahahjsdhfkasf",
        "introduce":"恭喜您成功注册皮肤医院APP。",
        "datetime":"2016.05.20 13:30",
        "more":"查看全部>",
        "read":1
      },{
        "imgurl":"./images/message_icom@2x.png",
        "title":"恭喜您成功注册皮肤医院APP。",
        "introduce":"恭喜您成功注册皮肤医院APP。",
        "datetime":"2016.05.20 13:30",
        "more":"查看全部>",
        "read":0
      }
    ]; 
    userItems = [
      {
        "imgurl":"./images/message_icom@2x.png",
        "title":"有人回复了您的帖子。",
        "introduce":"这个方法很好用。",
        "datetime":"2016.05.20 13:30",
        "more":"去看看>",
        "read":0
      },{
        "imgurl":"./images/message_icom@2x.png",
        "title":"有人回复了您的帖子。",
        "introduce":"这个方法很好用。",
        "datetime":"2016.05.20 13:30",
        "more":"去看看>",
        "read":1
      }
    ];
  	constructor(private navCtrl: NavController,private modalController : ModalController) {
  	}

    //删除系统消息
    delSys(item){
      this.sysItems.splice(item,1);
    }  
    //删除用户消息
    delUser(item){
      this.userItems.splice(item,1);
    }
    //跳转详情页
    content(item,i){
      //先将消息置为已读
      this.sysItems[i].read = 1;
      let modal = this.modalController.create(ContentPage,{
        title:item.title
      });
      modal.present();
    }
}