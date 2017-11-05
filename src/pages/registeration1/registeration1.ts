import { AngularFireDatabase } from 'angularfire2/database';
import { UserdataProvider } from './../../providers/userdata/userdata';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the Registeration1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registeration1',
  templateUrl: 'registeration1.html',
})




export class Registeration1Page {

  //profile: any = { age: '', phone: '', password: '', name: '', email: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: AngularFireAuth, public alertCtrl: AlertController, public userData: UserdataProvider, public db: AngularFireDatabase) {

  }
  @ViewChild('name') name;
  @ViewChild('email') email;
  @ViewChild('password') password;
  @ViewChild('phone') phone;
  @ViewChild('age') age;

  ionViewDidLoad() {
    console.log('ionViewDidLoad Registeration1Page');
  }
  signup() {
    this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value).then(data => {



      let email = this.email.value;
      email = email.replace('.', '_');

      this.db.list('/userDetails/' + email).push({
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        phone: this.phone.value,
        age: this.age.value
      })
      
      let alert = this.alertCtrl.create({
        title: 'User Registered!',
        subTitle: 'Log in to your Account!',
        buttons: ['OK']
      });
      alert.present();
    }).catch(error => {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: error.message,
        buttons: ['OK']
      });
      alert.present();
    });


  }
}
