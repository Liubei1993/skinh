import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/pay/fail.html',
})
export class FailPage {

  constructor(private navCtrl: NavController,private params:NavParams,private viewCtrl: ViewController) {
  	  	 setTimeout(() =>{
  			// this.viewCtrl.dismiss();
  			this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  		},3000);
  }

}
