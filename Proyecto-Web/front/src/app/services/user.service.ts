import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Login } from '../models/login';
import {Global } from '../services/global'
import { Observable} from 'rxjs/Observable';
import { UserMail  } from '../services/usermail';

@Injectable()
export class UserService {
   public url: string;

  constructor(
    private _http:HttpClient
    ) {
      this.url = Global.url;
     }
     testService(){
      return 'Probado El servicio de angular';
    }
     saveUser(user: User): Observable<any>{
      let params = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'user/saveUser', params, {headers:headers});
  }
  editUser(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'user/userEdit/'+user._id, params, {headers:headers});
  }
  getUser(email): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'user/user/'+email,{headers: headers});
}
  getLogin(login: Login ): Observable<any>{
     let params = JSON.stringify(login);

     let Email = login.email;
     let password = login.password;
     UserMail.email=login.email;

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'user/login/?email='+Email+'&password='+password,{headers: headers});
  }

}
