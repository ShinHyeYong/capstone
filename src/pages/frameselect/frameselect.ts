import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';

/**
 * Generated class for the Frameselect page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-frameselect',
  templateUrl: 'frameselect.html',
})
export class Frameselect {

  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Frameselect');
  }
  select(){
    this.view.dismiss();
  }

}
