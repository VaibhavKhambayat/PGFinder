import { HomePage } from './../home/home';
import { UserdataProvider } from './../../providers/userdata/userdata';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';

import { Camera } from '@ionic-native/camera';

import * as firebase from 'firebase';

// import { ImagePicker } from '@ionic-native/image-picker';

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
  emailId = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserdataProvider, public db: AngularFireDatabase, public cameraPlugin: Camera) {
    
    this.welcome = "Search";
    var email = this.userData.getEmail();
    email.then((value) => {
      //console.log(value," is value.");
      
      // this.db.list('/userDetails/' + value)
      // .subscribe((data => {
      //   this.profile=data;
      //   this.emailId = value;
      //   console.log("Get the value", this.profile);

      // }));
      
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  logOut(){
    this.navCtrl.setRoot(HomePage);
  }

  pickImage(){
    // this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }

  takeSelfie(): void {
    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
      selfieRef
        .putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`users/user1/profilePicture`)
            .set(savedProfilePicture.downloadURL);
        });

    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  
}
