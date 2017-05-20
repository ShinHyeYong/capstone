import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoselectPage } from '../photoselect/photoselect';
import { ImagePicker } from '@ionic-native/image-picker';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
import { ToastController,ModalController } from 'ionic-angular';
import { Frameselect} from '../frameselect/frameselect'

import { LoginPage} from '../login/login'

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
})
export class MainPage {
  id_check;
   multi_img=[];
  multi_emo=[];
  fileTransfer: TransferObject;
  fileTransfer2: TransferObject;
  constructor(private transfer: Transfer,public modalCtrl: ModalController,public navCtrl: NavController,public http: Http, public navParams: NavParams,private imagePicker: ImagePicker) {
    this.id_check=navParams.get("id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');

 
  }
   PhotoselectPage(){
     console.log("test");
    this.navCtrl.push(PhotoselectPage);
  }
Photoselect(){
    let options = {
    quality: 100
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.multi_img[i]=results[i];
       let result_img_list = {
          success: "이미지 선택 완료",
          result_list: i+"번째"+'Image URI: ' +results[i]
        }
        this.http.post("http://117.17.158.192:8100", result_img_list)
        .map(data => data.json())
        .subscribe(res => {
        });
    }
  }, (err) => { });
}
frameselect(){
    let modal=this.modalCtrl.create(Frameselect);
    modal.onDidDismiss(()=>{
      this.sendfile();
    });
    modal.present();
  }
  sendfile(){
    for (var i = 0; i < this.multi_img.length; i++) {
    this.fileTransfer = this.transfer.create();
    console.log("테스트");
      let options : FileUploadOptions = {
      fileKey: 'file',
      fileName: "test"+i+".jpg",
      headers: {
    // "Access-Control-Allow-Origin" : "*",
    // "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
    // "Content-Type": "application/json",
    // "Accept": "application/json",
    //   "Content-Type": "application/octet-stream"
    // , "Ocp-Apim-Subscription-Key": "7095c739d4f94934861dad9cbd44e01a"
    }
    }
    

    this.fileTransfer.upload(this.multi_img[i], encodeURI("http://117.17.158.192:8100/test"), options)
      .then((data) => {



      }, (err) => {

      });
      this.multiemotion(i);

  }
} 
multiemotion(i:number){

    this.fileTransfer2 = this.transfer.create();
    console.log("테스트");
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName:  "test"+ i+ ".jpg",
      headers: {
      "Content-Type": "application/octet-stream"
    , "Ocp-Apim-Subscription-Key": "7095c739d4f94934861dad9cbd44e01a" }
    }
    this.fileTransfer2.upload(this.multi_img[i], encodeURI("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize"), options)
      .then((data) => {
        this.multi_emo[i]=data;
        let test = {
          type:"imgSave",
          id:this.id_check,
          filename: "test"+i+ ".jpg",
          emotion:this.multi_emo[i],
          test:i
        }
        this.http.post("http://117.17.158.192:8200/MainServer/servers", test)
          .map(data => data.json())
          .subscribe(res => {
          });
      }, (err) => {

      });

}
}
