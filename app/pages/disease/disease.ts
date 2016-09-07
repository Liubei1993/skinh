import { Component} from '@angular/core';
import { NavController,ModalController,ViewController,NavParams } from 'ionic-angular';
import {ContentPage} from '../content/content';
import {PayPage} from '../pay/pay';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/disease/disease.html',
})

export class DiseasePage {
    rootPage:any;
    type = 'disease';//tab标签页默认选中
    ordertime=false;//是否按时间排序
    orderlike=false;//是否按点赞排序
    diseaseInfo = {
    	"imgurl":"./images/pic7.png",
    	"title":"疾病名称",
    	"atte_num":9999,
    	"atte":0,
    	"imgItems":[
    		{
  				"imgurl":"./images/pic7.png"
  			},{
  				"imgurl":"./images/home_mes_pic.png"
  			},{
				"imgurl":"./images/hot_pic1.png"
  			}
    	],
    	"introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。",
    	"drugItems":[
    		{
    			"imgurl":"./images/introduction_pic1.png",
    			"title":"枸杞",
    			"introduce":"促进免疫抗衰老，抗肿瘤，抗疲劳。"
    		},{
    			"imgurl":"./images/introduction_icon.png",
    			"title":"金银花",
    			"introduce":"用于各种慢性病，清热解毒"
    		}
    	],
    	"methItems":[
    		{
    			"imgurl":"./images/medicine.png",
    			"title":"口服抗生素",
    			"introduce":"促进免疫抗衰老，抗肿瘤，抗疲劳。",
    			"price":10.00,
    			"buy":0,
    			"content":"这是我刚刚购买的内容"
    		},{
    			"imgurl":"./images/medicine.png",
    			"title":"巨冰治疗",
    			"introduce":"促进免疫抗衰老，抗肿瘤，抗疲劳。",
    			"price":10.00,
    			"buy":0,
    			"content":"这是我购买的内容"
    		}
    	],
    	"docItems":[
    		{
    			"imgurl":"./images/usericon@2x.png",
    			"title":"赵医生",
    			"introduce":"北大副教授"
    		},{
    			"imgurl":"./images/usericon@2x.png",
    			"title":"刘医生",
    			"introduce":"清华副教授"
    		}
    	]
    };

    //评论列表
    replyItems = [
      {
        "imgurl":"./images/pic7.png",
        "nickname":"阿良",
        "datetime":"2016.05.20 13:30",
        "content":"这是一条神奇的评论"
      },{
        "imgurl":"./images/pic7.png",
        "nickname":"阿良",
        "datetime":"2016.05.20 13:30",
        "content":"这是一条神奇的评论",
        "imgItems":[
          {
            "imgurl":"./images/pic7.png"
          },{
            "imgurl":"./images/home_mes_pic.png"
          },{
          "imgurl":"./images/hot_pic1.png"
          }
        ],
      },
    ]

    //资讯列表
  	infoItems = [
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

  	eduIntroduce = "疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！疾病再教育是我们医院的特色模块！";
	//再教育列表
  	eduItems = [
  		{
  			"imgurl":"./images/pic7.png",
  			"title":"脓包",
  			"introduce":"皮肤软组织感染化脓后",
  			"price":99.99,
  			"buy":0
  		},{
  			"imgurl":"./images/home_mes_pic.png",
  			"title":"结节",
  			"introduce":"国家近几年加大了对药品的监管力度，严打假品假药。",
  			"price":99.99,
  			"buy":1
  		}
  	];

    //待支付id
    private payId: number;
    //支付回调
    payCallback = (params) => {
         return new Promise((resolve, reject) => {
             if(params.flag){
               this.diseaseInfo.methItems[this.payId].buy = 1;
             }
             resolve();
         });
    }
  	constructor(private navCtrl: NavController,private modalController : ModalController,public viewCtrl:ViewController,private params:NavParams) {
  	    this.rootPage = TabsPage;
    }

  	//查找
  	search(){
  		console.log('search');
  	}
 //===================疾病相关====================
 	//用户关注
	attention(){
		this.diseaseInfo.atte_num += 1;
		console.log("attention");
	}

	//买良方
 	buyMethod(item,i){
      this.payId = i;
      this.navCtrl.push(PayPage, {
          callback: this.payCallback,
          title:item.title
      });
 	}
   //上拉加载
  replyDoInfinite(infiniteScroll) {
      setTimeout(() => {
        this.replyItems = this.replyItems.concat(this.replyItems);
        infiniteScroll.complete();
      }, 5000);
  }
 //===================资讯相关====================
 	//按时间排序
 	orderTime(){
 		// 改变样式
 		this.ordertime = true;
 		this.orderlike = false;
 		//模拟排序
 		this.infoItems = order(this.infoItems);
 	};
 	//按点赞排序
 	orderLike(){
 		// 改变样式
 		this.ordertime = false;
 		this.orderlike = true;
 		//模拟排序
 		this.infoItems = order(this.infoItems);
 	}
  	//上拉加载
  	inforDoInfinite(infiniteScroll) {
	    setTimeout(() => {
	    	this.infoItems = this.infoItems.concat(this.infoItems);
	    	infiniteScroll.complete();
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
      this.infoItems[i].reply_num += 1;
    }

    //点赞，增加点赞数
    like(i){
      this.infoItems[i].like_num += 1;
    }

 	//===================再教育相关====================
 	buyEdu(item,i){
 		this.eduItems[i].buy = 1;
 	}

 	//再教育详情
    eduContent(item){
      let modal = this.modalController.create(ContentPage,{
        title:item.introduce
      });
      modal.present();
    }
}

function order(arr){
	    arr.sort(function(){ return 0.5 - Math.random() });
   	 	arr.join();
   	 	return arr;
}