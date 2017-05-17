import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Component({
  selector: 'page-photoselect',
  templateUrl: 'photoselect.html'
})
export class PhotoselectPage {

  constructor(public navCtrl: NavController, public http: Http, private toastCtrl: ToastController) {
  }

}
