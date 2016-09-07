#README
#By ionic@beta 37
###说明：<br>
* 页面内所有数据均为静态的(调接口方法已写)，开发中遇到的各种坑请往下看。<br>
* 无支付功能，插件在下面，可自行研究。
* 本项目还有各种不足，仅供参考。<br>
* 本项目只在安卓上测试过。<br>

###项目：<br>
* 极光推送集成在app.ts且测试通过。插件地址：https://github.com/jpush/jpush-phonegap-plugin<br>
* 聊天功能仅实现了socket连接，接收数据，发送数据。具体的聊天页面没有做。插件地址:https://github.com/Tlantic/cdv-socket-plugin<br>
* 在个人中心页面，登录的账号密码随便填。<br>
* 登录状态下，点击“账户管理”，里面有很多native，都已经过测试，需安装相应插件。插件地址：http://ionicframework.com/docs/v2/native/<br>
* 支付页面，前两个是支付成功状态，最后一个是支付失败状态。<br>

###启动：<br>
* 下载项目
* 在根目录下执行`npm install`
* 安装 ionic CLI `npm install -g ionic@beta`
* 根目录下执行`ionic serve`
* 若在安卓上运行，执行`ionic platform add android` `ionic run android`;

###常见问题：<br>
* 如果在app.ts中设置tabsHideOnSubPages:false,在push页面里将展示底部导航条，modal及在menu里push的页面都不会展示
* ionicBootstrap第二个参数是自定义的providers，在此注入，所有页面只要import就可以直接使用
* 嵌套在```<ion-scroll></ion-scroll>```内可滑动，但宽度、高度要自己设置。默认有滚动条，下面代码消除滚动条:<br>
```
  ::-webkit-scrollbar,
  *::-webkit-scrollbar {
    display: none;
  }
```
* 如果想一次性跳出多个页面，并且传递数据，详见支付部分代码。
* 除了google浏览器，其他浏览器不支持pipe，所以如果要做网页，不可以使用pipe
* 如果想从某一子页面跳转到tab的根页面，使用
```
this.navCtrl['rootNav'].push(TabsPage, {tabIndex: 1});
```
   然后在tabs动态改变index:
```
this.mySelectedIndex = navParams.data.tabIndex || 0;
   <ion-tabs  [selectedIndex]="mySelectedIndex"></ion-tabs>
```
* 一页一页往回跳，pop()没有参数,dismiss()可以传参。一次跳转多页popTo(),remove()都不可传参。
* window要用(<any>window)
* 如果进入APP之前需要调用相关配置参数，请先调用接口再指定根页面，否则会遇到数据还未请求来，就进入页面了。可能导致数据获取不到的问题。

###参考资料：<br>
* 官网：http://ionicframework.com/
* github:https://github.com/driftyco/ionic
* Icons:http://ionicons.com
* ngCordova:http://ngcordova.com
* 社区:https://forum.ionicframework.com/<br>
       https://github.com/driftyco/ionic
* typescript官网：https://zhongsp.gitbooks.io/typescript-handbook/content/
* cordova官网：http://cordova.apache.org/
* chrome调试跨域:http://www.cnblogs.com/laden666666/p/5544572.html
* 引入js:http://x-team.com/2016/06/include-javascript-libraries-in-an-ionic-2-typescript-project/
* 常用语句备忘<br>
指定版本安装：npm install ionic@2.0.0-beta32<br>
新建一个页面：ionic g page newpage <br>
新建一个组件：ionic g component newcomp<br>
新建一个过滤器：ionic g pipe newpipe<br>
新建一个数据源：ionic g provider newpro<br>
新建一个平台：ionic platform add android<br>
自动生成icon：ionic resources --icon<br>
自动生成启动页：ionic resources --splash<br>
* 常用插件地址：(都没测试过，出问题请询问原作者)<br>
  支付宝：https://github.com/charleyw/cordova-plugin-alipay<br>
  (<any>window).alipay.pay({})<br>

  银联：https://github.com/Santino-Wu/cordova-plugin-unionpay<br>
  (<any>window).unionpay.pay()<br>

  微信：https://github.com/xu-li/cordova-plugin-wechat<br>
  (<any>window).Wechat.sendPaymentRequest()<br>

  qq:https://github.com/iVanPan/Cordova_QQ<br>

  微博：https://github.com/iVanPan/cordova_weibo<br>
