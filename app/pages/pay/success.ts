import { Component } from '@angular/core';
import { NavController,NavParams,ViewController } from 'ionic-angular';
import {DiseasePage} from '../disease/disease';
import {PayPage} from '../pay/pay';

@Component({
  templateUrl: 'build/pages/pay/success.html',
})
export class SuccessPage {

	private callback:any;//支付回调函数
  constructor(private navCtrl: NavController,private params:NavParams,private viewCtrl: ViewController) {
  	 this.callback = this.params.get("callback");
  	  	setTimeout(() =>{
    		this.callback({"flag":true}).then(()=>{
			    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
			});
  		},3000);
  }
}