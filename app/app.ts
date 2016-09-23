import {Component,ViewChild} from '@angular/core';
import {Platform, ionicBootstrap,NavController,Storage, LocalStorage,ToastController} from 'ionic-angular';
import {Splashscreen, StatusBar } from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Config} from './config';
import {Chat} from './providers/chat/chat';
import {Serve} from './providers/serve/serve';
import { TutorialPage } from './pages/tutorial/tutorial';
import { NativeStorage } from 'ionic-native';//appu原生存储
import * as io from "socket.io-client";//socket.io

@Component({
  template: '<ion-nav #navRoot [root]="rootPage"></ion-nav>'
})

export class MyApp {

  @ViewChild('navRoot') nav: NavController;
  private rootPage: any;
  private local:any;
  private socket:any;

  constructor(private platform: Platform,private serve:Serve,private chat:Chat,private config:Config,private toastCtrl:ToastController) {
    this.local = new Storage(LocalStorage);
    platform.ready().then(() => {
        StatusBar.styleDefault();
        Splashscreen.hide();

        //请求初始化接口
        let params = {lastloginversion:'1.0.0'};
        let url = this.config.sys_root+'index.php/webservice/index/init';
        this.serve.load(url,params).then(data=>{
            this.config.sys_web_service = data[0].sys_web_service;
            this.config.sys_plugins = data[0].sys_plugins;
            this.config.android_last_version = data[0].android_last_version;
            this.config.iphone_last_version = data[0].iphone_last_version;
            this.config.sys_chat_ip = data[0].sys_chat_ip;
            this.config.sys_chat_port = data[0].sys_chat_port;
            this.config.android_update_url = data[0].android_update_url;
            this.config.iphone_update_url = data[0].iphone_update_url;
                //判断用户是否第一次进入app
            NativeStorage.getItem('entered')
              .then(
                  data => {
                    this.rootPage = TabsPage;
                  },
              error => {
                  //没有进入过
               this.rootPage = TutorialPage;
               }
            );
        });
        /*
        //初始化极光推送
        try {
          (<any>window).plugins.jPushPlugin.init();
          if (this.platform.is('ios')) {
              (<any>window).plugins.jPushPlugin.setDebugModeFromIos();
              (<any>window).plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
          } else {
              (<any>window).plugins.jPushPlugin.setDebugMode(true);
              (<any>window).plugins.jPushPlugin.setStatisticsOpen(true);
              //点击通知进入app时执行下面方法
              (<any>window).plugins.jPushPlugin.openNotificationInAndroidCallback = function (data) {
                  try {
                    data = JSON.stringify(data)
                    console.log('JPushPlugin:openNotificationInAndroidCallback: ' + data)
                  } catch(exception) {
                    console.log(exception)
                  }
                }; 
               //收到通知时执行下面方法
              (<any>window).plugins.jPushPlugin.receiveNotificationInAndroidCallback = function (data) {
                  try {
                    data = JSON.stringify(data)
                    console.log('JPushPlugin:receiveNotificationInAndroidCallback: ' + data)
                  } catch(exception) {
                    console.log(exception)
                  }
                }; 
              //获取自定义消息推送的内容
              (<any>window).plugins.jPushPlugin.receiveMessageInAndroidCallback = function (data) {
                  try {
                    data = JSON.stringify(data)
                    console.log('JPushPlugin:receiveMessageInAndroidCallback: ' + data)
                  } catch(exception) {
                    console.log('JPushPlugin:pushCallback ' + exception)
                  }
                };
          }
        } catch (exception) {
            console.log(exception);
        }

        //使用插件连接聊天服务器
        this.chat.connect().then(
            data=>{
              return data;
            }
        ).then(
            //监听接收事件
            data=>{
                document.addEventListener(this.chat.socket.receiveHookName, function (ev) {
                    console.log();
                });
            }
        )

        //使用socket.io连接聊天服务器
        //问题：会不断的重连，发送的数据包含头部信息，目前未解决
        this.socket = io("192.168.1.28:1241");
        this.socket.on('connect', function () {
            this.socket.emit('news', { hello: 'world' });
        });
        this.socket.on("message", function (data) {
             console.log(data);
             this.socket.send("消息已接受到.")
         });
        this.socket.on("disconnect", function () {
             console.log("服务器端断开连接.");
         });
        */
    });



    //修改android/win上的返回键
    let obj = this;
    platform.registerBackButtonAction(function(){
        let page = obj.nav.getActive().instance; //当前页面

        //如果当前不是tabs
        if(!(page instanceof TabsPage)){
          if(!obj.nav.canGoBack()){
            exitApp();
          }
          return obj.nav.pop();
        }
        //获取tabs对象
        let tabs = page.tabs;
        var activeNav = tabs.getSelected();

        if(!activeNav.canGoBack()){
          exitApp();
        }
        return activeNav.pop();
    }, 100);

    function exitApp(){
      //先判断用户是否已点击过一次返回，如果没有则toast提示用户再点击退出，如果有则直接退出
      obj.local.get('exitClicked')
        .then((data)=>{
          if(data == 'true'){
            obj.local.set('exitClicked',false).then(()=>{});
            return platform.exitApp();
          }else{
            let toast = obj.toastCtrl.create({
                message: '再点击一次将退出应用',
                duration: 3000
              });

              toast.present();
              obj.local.set('exitClicked',true).then(()=>{

                //三秒之后设置为false
                setTimeout(()=>{
                  obj.local.set('exitClicked',false).then(()=>{});
                },3000);
              });
          }
      }).catch(
        (error)=>{
          alert(JSON.stringify(error));
        }
      );
  }
  }
}



ionicBootstrap(MyApp,[Chat,Serve,Config],{
  tabbarPlacement: 'bottom',
  tabsHideOnSubPages:true,
  iconMode: 'ios',
  backButtonText:''  
});