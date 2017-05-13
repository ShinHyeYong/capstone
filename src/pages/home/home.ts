import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  inputID: string;
  inputPW: string;

  constructor(public navCtrl: NavController, public http: Http) {

  }

  login(inputID, inputPW){
    let loginData={
      type: 'login',
      id: inputID,
      pw: inputPW,
    };

    if (inputID.trim() != '' || inputPW.trim() != '') {
      this.http.post("http://117.17.158.192:8200/MainServer/servers", loginData)
                //.map(data => data.json())
                .subscribe(res => {
                  // 서버로부터 결과값을 받는 부분
                  console.log(res['_body']);
        });
    }
    this.inputID = '';
    this.inputPW = '';
  }



  RegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
}
