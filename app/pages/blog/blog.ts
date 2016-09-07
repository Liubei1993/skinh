import {Component,ViewChild} from '@angular/core';
import {NavController,Slides,ModalController,Nav} from 'ionic-angular';
import {ContentPage} from '../content/content';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/blog/blog.html'
})
export class BlogPage {

	//轮播参数
	mySlideOptions = {
    	loop: true,//循环播放
    	pager:true,//控制点
      	autoplay:3000,//自动播放时间
      	autoplayDisableOnInteraction:false//用户滑动之后自动播放
  	};

     //话题列表
     topicItems = [
       {
           "title":"医疗行业已迎来新的时代",
           "imgurl":"./images/conversation.png",
           "hot":999,
           "introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。"
       },{
           "title":"医疗环境有较大改善",
           "imgurl":"./images/conversation2.png",
           "hot":8641,
           "introduce":"近几年，国家对医疗环境也加强了建设"
       },{
           "title":"国家对药品的监督加大",
           "imgurl":"./images/conversation3.png",
           "hot":4513,
           "introduce":"近期，国家加强了对药品的监督"
       }
     ];

    //帖子列表
  	blogItems = [
  		{
  			"title":"我的青春痘终于有所好转了",
  			"introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。",
  			"nickname":"阿良",
  			"datetime":"2016.05.20 13:30",
  			"imgItems":[
	    		{
	  				"imgurl":"./images/pic7.png"
	  			},{
	  				"imgurl":"./images/home_mes_pic.png"
	  			},{
					"imgurl":"./images/hot_pic1.png"
	  			}
    		],
    		"replyItems":[
    			{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":1,
    			},{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":2,
    				"keyname":"刘组"
    			},
    		]
  		},{
  			"title":"我的青春痘终于有所好转了",
  			"introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。",
  			"nickname":"阿良",
  			"datetime":"2016.05.20 13:30",
  			"imgItems":[
	    		{
	  				"imgurl":"./images/pic7.png"
	  			},{
	  				"imgurl":"./images/home_mes_pic.png"
	  			},{
					"imgurl":"./images/hot_pic1.png"
	  			}
    		],
    		"replyItems":[
    			{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":1,
    			},{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":2,
    				"keyname":"刘组"
    			},
    		]
  		},{
  			"title":"我的青春痘终于有所好转了",
  			"introduce":"国家对医疗行业的重视日益明显，一大批先进技术已投入大规模的使用。",
  			"nickname":"阿良",
  			"datetime":"2016.05.20 13:30",
  			"imgItems":[
	    		{
	  				"imgurl":"./images/pic7.png"
	  			},{
	  				"imgurl":"./images/home_mes_pic.png"
	  			},{
					"imgurl":"./images/hot_pic1.png"
	  			}
    		],
    		"replyItems":[
    			{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":1,
    			},{
    				"nickname":"阿良",
    				"content":"效果真的很好吗?",
    				"keytype":2,
    				"keyname":"刘组"
    			},
    		]
  		}
  	];
  	constructor(private navCtrl: NavController,private modalController : ModalController) {
  	}

    //帖子详情
    blogContent(item){
      let modal = this.modalController.create(ContentPage,{
        title:item.title
      });
      modal.present();
    }

  	//上拉加载
  	doInfinite(infiniteScroll) {
	    setTimeout(() => {
	    	this.blogItems = this.blogItems.concat(this.blogItems);
	    	infiniteScroll.complete();
	    }, 5000);
  	}

    //回复，增加回复数
    reply(i){
    }

    //点赞，增加点赞数
    like(i){
    }
}