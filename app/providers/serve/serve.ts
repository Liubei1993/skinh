import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import {ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {Config} from '../../config';
import * as fn from '../../functions';

@Injectable()
export class Serve {
  	constructor(private http: Http,public toastCtrl: ToastController,private config:Config) {}

	load(url,params) {
	    return new Promise(resolve => {
	  	    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
	   		let options = new RequestOptions({ headers: headers });
	  		this.http.post(
	  			this.config.sys_web_service+url,
	  			fn.json_to_string(params),
	  			options
	  		)
	  		.map(res=>res.json())
	  		.subscribe(
	  			data => {
	  				if(data.success){
	          			resolve(data.infor);
	  				}else{
					    let toast = this.toastCtrl.create({
					      message: data.msg,
					      duration: 3000,
					      dismissOnPageChange:true
					    });
					    toast.present();
	  				}
	      		},
	      		error =>{
	      			alert("对不起，您的网络不通，请重试！");
	      		}
	      	);
	    });
	}

}
