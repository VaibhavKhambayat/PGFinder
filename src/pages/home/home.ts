import { UserdataProvider } from './../../providers/userdata/userdata';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Registeration1Page } from '../registeration1/registeration1';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private fire: AngularFireAuth, public userData: UserdataProvider) {

  }
  @ViewChild('email') email;
  @ViewChild('password') password;
  openreg() {

    this.navCtrl.push(Registeration1Page);

  }
  openwelcome() {
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      this.navCtrl.push(WelcomePage);
      this.userData.setemail(this.email.value);
    })
    .catch(error => {
      let alert = this.alertCtrl.create({
        title: 'Wrong credentials!',
        subTitle: 'Incorrect Email or Password!',
        buttons: ['OK']
      });
      alert.present();
    });
  }
}



