import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { UserMail} from '../../services/usermail';
import { User } from 'src/app/models/user';
import {LoginStatus} from '../../services/loginstatus';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public url: string;
  public Loginstatus: string;
  public UserEmail: string;
  public filesToUpload: Array<File>;
  public filesToUploadFile: Array<File>;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route:ActivatedRoute
  ) { 
    this.Loginstatus = LoginStatus.status;
    this.url = Global.url;
    this.title = "Editar Proyecto";
  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getProject(id);
    });
  }

  getProject(id){
      this._projectService.getProject(id).subscribe(
        response =>{
          this.project = response.project;

        },
        error=>{
          console.log(<any>error);
        }
      )
  }

  onSubmit(){
    // Editar datos
      this._projectService.UpdateProject(this.project).subscribe(
        response => {
          if(response.project){
            //subir imagen o archivo
                    if(this.filesToUpload){
                        this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id,[], this.filesToUpload,'image').then((result:any)=>{
                          this.save_project = result.project;
                          this.status = 'success';
                          stop; });
                        }
                    if(this.filesToUploadFile){
                      this._uploadService.makeFileRequest(Global.url+"upload-file/"+response.project._id,[], this.filesToUploadFile,'file').then((result:any)=>{
                         this.save_project = result.project;
                        this.status = 'success'; 
                        stop;
                      });}
                else{
                  this.save_project = response.project;
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
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    fileChangeEventFile(fileInput: any){
      this.filesToUploadFile = <Array<File>>fileInput.target.files;
    }

}
