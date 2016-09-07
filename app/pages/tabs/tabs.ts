import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {CatePage} from '../cate/cate';
import {BlogPage} from '../blog/blog';
import {MyPage} from '../my/my';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  public mySelectedIndex: number;

  constructor(navParams: NavParams,private navCtrl:NavController) {
    this.tab1Root = HomePage;
    this.tab2Root = CatePage;
    this.tab3Root = BlogPage;
    this.tab4Root = MyPage;
    this.mySelectedIndex = navParams.data.tabIndex || 0;
}
}
