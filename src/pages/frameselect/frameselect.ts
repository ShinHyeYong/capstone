import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { MainPage } from '../main-page/main-page';
import { LoginPage} from '../login/login'
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
id_check;
  constructor(public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
        this.id_check=navParams.get("id");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Frameselect');
  }
  select2(n:number){
    this.view.dismiss(n);
  }
  select3(n:number){
    this.view.dismiss(n);
  }
  select4(n:number){
    this.view.dismiss(n);
  }
  select5(){
    this.view.dismiss();
  }

  
  dismiss(){
    this.navCtrl.setRoot(MainPage,{id:this.id_check})
  }

}
