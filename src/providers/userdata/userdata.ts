import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserdataProvider {

  constructor(public storage: Storage) {
    console.log('Hello UserdataProvider Provider');
  }
  

    setemail(email: string): void {
      email = email.replace('.', '_');
      this.storage.set('email', email);
  };

    getEmail(){
      return this.storage.get('email').then((data=>{
        return data;
      })).catch((error=>{
        console.log("error in Get Email",error);
        
      }));
    }
    
    


}
