import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { User } from '../../models/user';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { UserMail  } from '../../services/usermail';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public user: User;
  public url: string;
  public email: string;
  public user_Save;

  constructor( 
   private _userService: UserService,
  private router: Router,
  private _route:ActivatedRoute) 
  { 
  this.email = UserMail.email;
  this.url = Global.url;
  this.user = new User('','','',''); }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      this.getUser(this.email);
    });
  }

  getUser(email){
      this._userService.getUser(email).subscribe(
        response =>{
          this.user = response.user[0];
          this.user_Save = this.user;
        },
        error=>{
          console.log(<any>error);
        }
      )
  }
  onSubmit(form){
    // // Actualizar datos de usuario
      this._userService.editUser(this.user).subscribe(
        response => {
              form.reset();
              location.reload();
        },
        error => {
          console.log(<any>error);
        }
      );
  }
}
