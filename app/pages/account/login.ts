import { Component } from '@angular/core';
import { NavController,Storage, LocalStorage,ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/account/login.html',
})
export class LoginPage {

	private username:any;
	private password:any;
	private local:any;
  constructor(private navCtrl: NavController,private view:ViewController) {
		this.local = new Storage(LocalStorage);
  }

  login(){
		this.local.set('logined',true).then(()=>{
			this.view.dismiss({'logined':true});
		})
  }
}
