import { HomePage } from './../home/home';
import { UserdataProvider } from './../../providers/userdata/userdata';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {



  welcome: string;
  profile: any = { age: '', phone: '', password: '', name: ''};
  emailId;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserdataProvider, public db: AngularFireDatabase, private imagePicker: ImagePicker) {
    
    this.welcome = "Search";
    var email = this.userData.getEmail();
    email.then((value) => {
      //console.log(value," is value.");
      
      this.db.list('/userDetails/' + value).subscribe((data => {
        this.profile=data;
        this.emailId = value;
        console.log("Get the value", this.profile);

      }));
      
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  logOut(){
    this.navCtrl.setRoot(HomePage);
  }

  pickImage(){
    this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }
  
}
