import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/content/content.html',
})
export class ContentPage {

	private title = '';
	constructor(private navCtrl: NavController,private navParams:NavParams) {
			this.title = this.navParams.data.title;
	}
}
