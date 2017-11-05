import { HomePage } from './../home/home';
import { UserdataProvider } from './../../providers/userdata/userdata';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { Camera } from '@ionic-native/camera';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';

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
  profile: any = [];
  
  @ViewChild('address') address;
  @ViewChild('description') description;
  @ViewChild('amount') amount;
  


  newItems: Observable<any[]>;
  datas: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserdataProvider, public db: AngularFireDatabase, public cameraPlugin: Camera) {

    this.welcome = "Search";
    var email = this.userData.getEmail();
    email.then((value) => {
      this.newItems = this.db.list('userDetails/' + value).valueChanges();
      this.newItems.subscribe((data => {
        // console.log(data);
        this.profile = data;
      }));
    });
    email.then((value => {
      this.db.list('userPost').valueChanges().subscribe((val => {
        this.datas = val;
        console.log("Value ", this.datas);
        
      }))
    }));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  logOut() {
    this.navCtrl.setRoot(HomePage);
  }

  pickImage() {
    // this.imagePicker.getPictures({maximumImagesCount: 1}).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);
    //   }
    // }, (err) => { });
  }

  takeSelfie(): void {
    this.cameraPlugin.getPicture({
      quality: 95,
      destinationType: this.cameraPlugin.DestinationType.DATA_URL,
      sourceType: this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage

      var email = this.userData.getEmail();
      email.then((value) => {
        const selfieRef = firebase.storage().ref('profilePictures/'+value+'/post.png');
        selfieRef
          .putString(profilePicture, 'base64', { contentType: 'image/png' })
          .then(savedProfilePicture => {
            firebase
              .database()
              .ref('userPost/'+value+'/post')
              .set(savedProfilePicture.downloadURL);
          });

          

      }, error => {
        // Log an error to the console if something goes wrong.
        console.log("ERROR -> " + JSON.stringify(error));
      });
    });
  }
  onPost(){
    var email = this.userData.getEmail();
    email.then((value) => {
      this.db.object('/userPost/' + value).set({
        address: this.address.value,
        description: this.description.value,
        amount: this.amount.value,
        
      })
    });

    
  }

}
