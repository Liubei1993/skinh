import {Component,ViewChild} from '@angular/core';
import {NavController,Slides,ModalController,Nav} from 'ionic-angular';
import {MsgPage} from './msg';
import {ContentPage} from '../content/content';
import {TabsPage} from '../tabs/tabs';
import {MyApp} from '../../app';
import {Serve} from '../../providers/serve/serve';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  bannerList = [];
	//轮播参数
	mySlideOptions = {
    	loop: true,//循环播放
    	pager:true,//控制点
      autoplay:3000,//自动播放时间
      autoplayDisableOnInteraction:false//用户滑动之后自动播放
  	};

     //知识列表
     knowLItems = [
       {
           "title":"常用外用药",
           "imgurl":"./images/pic5.png"
       },{
           "title":"中医美容",
           "imgurl":"./images/pic2.png"
       },{
           "title":"其他",
           "imgurl":"./images/pic1.png"
       },{
           "title":"其他",
           "imgurl":"./images/pic4.png"
       }
     ];
     knowRItems = [
       {
         "title":"中药介绍",
         "imgurl":"./images/pic3.png"
       },{
         "title":"中外医典对照",
         "imgurl":"./images/pic6.png"
       }
     ]

    //资讯列表
  	items = [
  		{
  			"imgurl":"./images/pic7.png",
  			"introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。",
  			"datetime":"2016.05.20 13:30",
  			"like_num":95480,
  			"reply_num":2345
  		},{
  			"imgurl":"./images/home_mes_pic.png",
  			"introduce":"国家近几年加大了对药品的监管力度，严打假品假药。",
  			"datetime":"2016.05.20 13:30",
  			"like_num":9580,
  			"reply_num":245
  		},{
  			"imgurl":"./images/hot_pic1.png",
  			"introduce":"医疗环境有较大改善",
  			"datetime":"2016.05.20 13:30",
  			"like_num":9580,
  			"reply_num":245
  		}
  	];
  	constructor(private navCtrl: NavController,private modalController : ModalController,private serve:Serve) {
        this.getHomeBanner();
  	}

    //请求轮播图接口
    getHomeBanner(){
        let params = {keytype:1};
        this.serve.load('banner_list',params).then(
            (data)=>{
              this.bannerList = data['listItems'];
            }
         )
    }

  	//消息页面
  	showMsg(){
      this.navCtrl.push(MsgPage);
      // let modal = this.modalController.create(MsgPage);
      // modal.present();
  	}

    //医疗知识详情
    knowContent(item){
      let modal = this.modalController.create(ContentPage,{
        title:item.title
      });
      modal.present();
    }

  	//上拉加载
  	doInfinite(infiniteScroll) {
	    setTimeout(() => {
	    	this.items = this.items.concat(this.items);
	    	infiniteScroll.complete();
	    }, 5000);
  	}

    //下拉刷新
    doRefresh(refresher){
        setTimeout(() => {
          this.items = this.items.concat(this.items);
          refresher.complete();
        }, 5000);
    }

    //资讯详情
    infoContent(item){ 
      let modal = this.modalController.create(ContentPage,{
        title:item.introduce
      });
      modal.present();
    }

    //回复，增加回复数
    reply(i){
      this.items[i].reply_num += 1;
    }

    //点赞，增加点赞数
    like(i){
      this.items[i].like_num += 1;
    }

    //滑动改变tab
    pageChange(){
      this.navCtrl['rootNav'].push(TabsPage, {tabIndex: 1});
    }

    pinch(){
      alert('pinck')
    }
}