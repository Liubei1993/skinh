import { Component } from '@angular/core';
import { NavController,NavParams,ViewController,ModalController } from 'ionic-angular';
import {SuccessPage} from './success';
import {FailPage} from './fail';

@Component({
  templateUrl: 'build/pages/pay/pay.html',
})
export class PayPage {

	 name="";
   private callback:any;//支付回调函数
  constructor(private navCtrl: NavController,private params:NavParams,private viewCtrl: ViewController,private modalController:ModalController) {
  		this.name = this.params.data.title;
      this.callback = this.params.get("callback");
  }
  //支付成功
  paySuccess(){
  	//模拟支付成功，先跳转到支付成功页面，再跳回页面并传递支付成功的值
    this.navCtrl.push(SuccessPage, {
      callback: this.callback
    });
  }

  //支付失败
  payFail(){
  	//模拟支付失败，先跳转到支付是啊比页面，再跳回页面并传递支付失败的值
  	  let modal = this.modalController.create(FailPage);
      modal.onDidDismiss(data => {
			  this.viewCtrl.dismiss({"flag":false});
      });
      modal.present();
  }
}
