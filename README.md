#README
#test project by ionic@beta 37
###说明：<br>
* 这个是公司内的原生开发项目，接口就不便开放了。<br>
* 页面内所有数据均为静态的，开发中遇到的各种坑请往下看。<br>
* 本项目还有各种不足，仅供参考，且不再维护。<br>

###项目：<br>
* 极光推送集成在app.ts且测试通过。插件地址：https://github.com/jpush/jpush-phonegap-plugin<br>
* 聊天功能仅实现了socket连接，接收数据，发送数据。具体的聊天页面没有做。插件地址:https://github.com/Tlantic/cdv-socket-plugin<br>
* 在个人中心页面，登录的账号密码随便填。<br>
* 登录状态下，点击“账户管理”，里面有很多native，都已经过测试。<br>
* 支付页面，前两个是支付成功状态，最后一个是支付失败状态。<br>

###启动：<br>
* 下载项目
* 在根目录下执行`npm install`
* 安装 ionic CLI `npm install -g ionic@beta`
* 根目录下执行`ionic serve`

