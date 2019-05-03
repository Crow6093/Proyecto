import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';

import { LoginStatus  } from '../../services/loginstatus';
import { UserMail  } from '../../services/usermail';
import { Login } from '../../models/login';

import {Router} from "@angular/router";
// cookies
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService,CookieService]
})
export class LoginComponent implements OnInit {

  public title: string;
  public login: Login;
  public status: string;
  public LoginStatus: string;
  public email:string;
  public password:string;
  public EmailStatus: string;
  public cookieValue;
  public edit :string;
  public nameUser:string;

  constructor(  
    private _userService: UserService,
    private router: Router,
    private cookieService: CookieService)
    
    {
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';
    }
    this.edit ='False';
    this.title = "Login";
    this.login= new Login('','','No');
    this.LoginStatus = LoginStatus.status;
    
  }

  ngOnInit() {
  
  }
 
  getLogin(form){
    this._userService.getLogin(this.login).subscribe(
      response => {
        this.status = 'success';
        LoginStatus.status = 'success';
        this.EmailStatus = 'success';
        if(this.login.remeber!='No'){
            this.cookieService.set( 'Login', UserMail.email);
            this.cookieValue = this.cookieService.get('Login');
            form.reset();
            location.reload(); 
          }else{
            this.cookieService.set( 'Login', UserMail.email,200);
            this.cookieValue = this.cookieService.get('Login');
            form.reset();
            location.reload();
          }

      },
      error => {
        this.status = 'filed';
        console.log(<any>error);
      }
    );
    }

    LogOut(){
        this.cookieService.delete('Login');
        this.router.navigate(['/about']);
      }

    Edit(){
      if(this.edit == 'True'){
        this.edit='False';
      }else if(this.edit == 'False'){
        this.edit='True';    
      }
      if(this.edit == 'True'){
        var _Edit = document.getElementsByClassName('Edit')[0].setAttribute("class","EditV");
      }
      if(this.edit =="False"){
        var _Edit = document.getElementsByClassName('EditV')[0].setAttribute("class","Edit");
      }
    }

}
