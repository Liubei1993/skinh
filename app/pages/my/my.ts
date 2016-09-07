import { Component } from '@angular/core';
import { NavController,Storage, LocalStorage,ModalController } from 'ionic-angular';
import {AccountPage} from '../account/account';
import {LoginPage} from '../account/login';
import {MyblogPage} from '../myblog/myblog';
import {MybuyPage} from '../mybuy/mybuy';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/my/my.html',
})
export class MyPage {

	private logined:any;
	private local:any;
	constructor(private navCtrl: NavController,private modalController : ModalController) {
		this.local = new Storage(LocalStorage);
		this.local.get('logined')
			.then((data)=>{
				this.logined = data;
  			});
	}

  	//我的账户页面
	myAccount(){
		this.navCtrl.push(AccountPage);
	}

	//登录页面
	login(){
      let modal = this.modalController.create(LoginPage);
      modal.onDidDismiss(data => {
        if(data.logined){
          this.logined = data.logined;
        }
      });
      modal.present();
	}

	//我的发帖页面
	myBlog(){

	}

	//我的购买页面
	myBuy(){

	}
}
