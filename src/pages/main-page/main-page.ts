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
  basicitems = [
    '버전',
    '도움말'
    ];
    securityitems=[
      '비밀번호 변경',
      '닉네임 변경'
    ];
  id_check;
   multi_img=[];
  multi_emo=[];
  fileTransfer: TransferObject;
  fileTransfer2: TransferObject;
  time:number;
  photo: string = "Make";
  fname=[];
  femotion=[];
  albuminfo=[{type:"makealbum"},{}];
  constructor(private toastCtrl: ToastController,private transfer: Transfer,public modalCtrl: ModalController,public navCtrl: NavController,public http: Http, public navParams: NavParams,private imagePicker: ImagePicker) {
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
    const options = {
      maximumImagesCount: 5,
      quality: 100
    }
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.multi_img[i]=results[i];
        let result_img_list = {
          success: "이미지 선택 완료",
          result_list: i+"번째"+'Image URI: ' +results[i],
          id:this.id_check
        }
        this.http.post("http://117.17.158.192:8100", result_img_list)
        .map(data => data.json())
        .subscribe(res => {
        });
    }
  }, (err) => { });
}
frameselect(){
    let modal=this.modalCtrl.create(Frameselect,{id:this.id_check});
    modal.onDidDismiss((data)=>{
      this.sendfile(data);
    });
    modal.present();
  }

  sendfile(frame_num:number){
    for (var i = 0; i < this.multi_img.length; i++) {
    this.fileTransfer = this.transfer.create();
    console.log("테스트");
    this.time=Date.now();
      let options : FileUploadOptions = {
      fileKey: 'file',
      fileName: "together"+i+this.time+".jpg",
      headers: {
        id:this.id_check
    // "Access-Control-Allow-Origin" : "*",
    // "Access-Control-Allow-Methods" : "POST, GET, OPTIONS, PUT",
    // "Content-Type": "application/json",
    // "Accept": "application/json",
    //   "Content-Type": "application/octet-stream"
    // , "Ocp-Apim-Subscription-Key": "7095c739d4f94934861dad9cbd44e01a"
    }
    }
    
    this.albuminfo.push({
      filename:"together"+i+this.time+".jpg",
      id:this.id_check,
      frame:frame_num
    });
    this.fileTransfer.upload(this.multi_img[i], encodeURI("http://117.17.158.192:8100/test"), options)
      .then((data) => {



      }, (err) => {

      });
      this.multiemotion(i,this.time);
  }
  setTimeout(()=> {
     let toast = this.toastCtrl.create({
                      message: '성공',
                      duration: 3000,
                      position: 'middle'
                    });
                    toast.present();
  this.lastsend();  
  }, 5000);
  

} 
lastsend(){
        this.http.post("http://117.17.158.192:8200/MainServer/servers", this.albuminfo)
          .map(data => data.json())
          .subscribe(res => {
            this.albuminfo=[{}];
        });

}
multiemotion(i:number,time:number){

    this.fileTransfer2 = this.transfer.create();
    console.log("테스트");
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName:  "together"+ i+time+ ".jpg",
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
          filename: "together"+i+time+ ".jpg",
          emotion:this.multi_emo[i],
          test:i
        }
        this.fname[i]="together"+i+time+".jpg";
        this.femotion[i]=this.multi_emo[i];
        this.http.post("http://117.17.158.192:8200/MainServer/servers", test)
          .map(data => data.json())
          .subscribe(res => {
          });
      }, (err) => {

      });
    }
basicitemSelected(basicitem: string) {
    console.log("Selected basicItem", basicitem);
  }
  securityitemSelected(securityitem: string) {
    console.log("Selected securityItem", securityitem);
  }
  logout(){
    this.navCtrl.push(LoginPage);
  }
}
