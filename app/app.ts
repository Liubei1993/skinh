import {Component,ViewChild} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Config} from './config';
import {Chat} from './providers/chat/chat';
import {Serve} from './providers/serve/serve';
import { TutorialPage } from './pages/tutorial/tutorial';
import { NativeStorage } from 'ionic-native';//appu原生存储

@Component({
  template: '<ion-nav #navRoot [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;
  constructor(private platform: Platform,private serve:Serve,private chat:Chat,private config:Config) {


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
            // NativeStorage.getItem('entered')
            //   .then(
            //       data => {
                    this.rootPage = TabsPage;
            //       },
            //   error => {
            //       //没有进入过
            //    this.rootPage = TutorialPage;
            //    }
            // );
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

        //连接聊天服务器
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
        */
    });
  }
}

ionicBootstrap(MyApp,[Chat,Serve,Config],{
  tabbarPlacement: 'bottom',
  tabsHideOnSubPages:true,
  iconMode: 'ios',
  backButtonText:''  
});