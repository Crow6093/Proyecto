import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;

  constructor(  
    private _userService: UserService,
    private router: Router) 
    { 
    this.title = "Registro";
    this.user = new User('','','','');
  }

  ngOnInit() {
  }

  onSubmit(form){
    // guardar datos de usuario
      this._userService.saveUser(this.user).subscribe(
        response => {
          this.status = 'success';
              form.reset();
              this.router.navigate(['/login']) 
        },
        error => {
          this.status = 'filed';
          console.log(<any>error);
        }
      );

  }

}
