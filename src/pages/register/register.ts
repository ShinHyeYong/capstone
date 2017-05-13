import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  inputID: string;
  inputPW: string;
  nickname: string;

  constructor(public navCtrl: NavController, public http: Http) {

  }

  Submit(inputID, inputPW, nickname) {
    let submitData={
      type: 'register',
      id: inputID,
      pw: inputPW,
      nickname: nickname
    };

    if (inputID.trim() != '' || inputPW.trim() != '' || nickname.trim() != '') {
      this.http.post("http://117.17.158.192:8200/MainServer/servers", submitData)
                //.map(data => data.json())
                .subscribe(res => {
                  console.log();
        });
    }
    this.inputID = '';
    this.inputPW = '';
    this.nickname = '';
  }

  Cancel() {

  }
}
