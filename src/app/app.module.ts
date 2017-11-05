import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Registeration1Page } from '../pages/registeration1/registeration1';
import { WelcomePage } from '../pages/welcome/welcome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserdataProvider } from '../providers/userdata/userdata';

import { IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageProvider } from '../providers/image/image';
import { PreloderProvider } from '../providers/preloder/preloder';
import { DatabaseProvider } from '../providers/database/database';

import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';



const config = {
  apiKey: "AIzaSyDmuQD-jfdBOBF4TsPwFdLvaOyqqzW1BKU",
  authDomain: "pgfinder-3c6d4.firebaseapp.com",
  databaseURL: "https://pgfinder-3c6d4.firebaseio.com",
  projectId: "pgfinder-3c6d4",
  storageBucket: "pgfinder-3c6d4.appspot.com",
  messagingSenderId: "735890658127"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Registeration1Page,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    HttpModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Registeration1Page,
    WelcomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserdataProvider,
    ImageProvider,
    PreloderProvider,
    DatabaseProvider,
    Camera,

  ]
})
export class AppModule { }
