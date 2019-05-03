import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { UserMail  } from '../../services/usermail';
import { LoginStatus  } from '../../services/loginstatus';
import { NgLocalization } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Project } from 'src/app/models/project';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [CookieService]
})
export class MenuComponent implements OnInit {
    public status:string;
    public cookieValue;
    
    

  constructor(
    private cookieService: CookieService,
    
  ) {
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';
    }else{
      LoginStatus.status ='faild';
    }
    this.status = LoginStatus.status;


  }
  ngOnInit() {

 }


}
