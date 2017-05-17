import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MainPage } from './main-page';

@NgModule({
  declarations: [
    MainPage,
  ],

  //imports: [
//    IonicModule.forChild(MainPage),
 // ],
  exports: [
    MainPage
  ]
})
export class MainPageModule {}
