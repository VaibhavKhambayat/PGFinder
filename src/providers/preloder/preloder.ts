import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the PreloderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PreloderProvider {

  private loading : any;

  constructor(public http: Http, public loadingCtrl : LoadingController) {
    console.log('Hello PreloderProvider Provider');
  }

  displayPreloader() : void
  {
     this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
     });

     this.loading.present();
  }



  hidePreloader() : void
  {
     this.loading.dismiss();
  }

}
