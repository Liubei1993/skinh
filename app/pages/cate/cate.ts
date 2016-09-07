import {Component,EventEmitter,Output} from '@angular/core';
import {NavController,ModalController,ViewController} from 'ionic-angular';
import {DiseasePage} from '../disease/disease';

@Component({
  templateUrl: 'build/pages/cate/cate.html'
})
export class CatePage {
    type = 'cate';//父类型默认选中
    cateType = 'all';//子类型默认选中
    delIcon = false;//是否显示删除图标
    allItems = [
      {
        "imgurl":"./images/hot_pic1.png",
        "title":"水痘",
        "read":0
      },{
        "imgurl":"./images/hot_pic2.png",
        "title":"腮腺",
        "read":1
      }
    ];
    skinItems = [
        {
	        "imgurl":"./images/hot_pic1.png",
	        "title":"水痘",
	        "read":0
	    }
    ];
    atteItems = [
      {
        "imgurl":"./images/hot_pic2.png",
        "title":"青春痘",
        "read":0
      }
    ];
    subSegmentItems = [
      {
        "name":"全部",
        "value":"all"
      },{
        "name":"皮肤",
        "value":"1"
      },{
        "name":"青春痘",
        "value":"2"
      },{
        "name":"皮癣",
        "value":"3"
      },{
        "name":"粉刺",
        "value":"4"
      },{
        "name":"黑头",
        "value":"5"
      },{
        "name":"烫伤",
        "value":"6"
      },{
        "name":"烧伤",
        "value":"7"
      }
    ]
    constructor(private navCtrl: NavController,private modalController : ModalController,public viewCtrl:ViewController) {
    }

    //动态改变第二个segment的宽度
    segmentWidth(){
        // 计算第二个segment个数
        let segCount = this.subSegmentItems.length;
        let width = 20*segCount;
        if(width < 100){
          width = 100;
        }
        return width+'%';
    }

    //删除用户关注的疾病
    delAtte(item){
      this.atteItems.splice(item,1);
    }
    //跳转疾病详情页
    content(item,i){
      this.navCtrl.push(DiseasePage);
      // let modal = this.modalController.create(DiseasePage);
      // modal.present();
    }

    //用户长按展示删除按钮
    press(){
    	this.delIcon = true;
    }

    //手势滑动切换tab
    changeTab(event){
        this.cateType = '1';
    }
}
