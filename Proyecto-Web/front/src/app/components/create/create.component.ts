import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { UserMail} from '../../services/usermail';
import { User } from 'src/app/models/user';
import {LoginStatus} from '../../services/loginstatus';
// cookies
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-create', 
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService,UploadService,CookieService]
})
export class CreateComponent implements OnInit {
      public title: string;
      public project: Project;
      public save_project;
      public status: string;
      public Loginstatus: string;
      public UserEmail: string;
      public filesToUpload: Array<File>;
      public filesToUploadFile: Array<File>;
      public cookieValue;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private cookieService: CookieService
  ) {
      this.Loginstatus = LoginStatus.status;
      this.title = "Crear Proyecto";
      this.project = new Project('','','','',2019,'','DefaultPhotos/default.png','','Privado','',0,0,0,[]);
      this.project['email']=UserMail.email;
      this.project.email=UserMail.email;

      const cookieExists: boolean = this.cookieService.check('Login'); 
      if(cookieExists){
        UserMail.email = this.cookieService.get('Login');
        LoginStatus.status = 'success';
      }
      }

  ngOnInit() {
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';

    }
 
  }

  onSubmit(form){
    // guardar datos
      this._projectService.saveProject(this.project).subscribe(
        response => {
          if(response.project){

            if(this.filesToUpload){
              this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload,'image').then((result:any)=>{
                this.save_project = result.project;
                this.status = 'success';
                form.reset();
                stop; 
                });
              }
          if(this.filesToUploadFile){
            this._uploadService.makeFileRequest(Global.url+"upload-file/"+response.project._id,[], this.filesToUploadFile,'file').then((result:any)=>{
              this.save_project = result.project;
              this.status = 'success'; 
              form.reset();
              stop;       
            });}
           
      else{
        this.save_project = response.project;
        form.reset();
        this.status = 'success';
      }
}else{
  this.status = 'filed';
}
      },
      error => {
        console.log(<any>error);
      }
    );

  }
    fileChangeEvent(fileInput: any){
      console.log(fileInput);
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    fileChangeEventFile(fileInput: any){
      console.log(fileInput);
      this.filesToUploadFile = <Array<File>>fileInput.target.files;
    }
}
