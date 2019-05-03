import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService}  from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute,Params } from '@angular/router';


@Component({
  selector: 'app-personaldetail',
  templateUrl: './personaldetail.component.html',
  styleUrls: ['./personaldetail.component.css'],
  providers: [ProjectService]
})
export class PersonaldetailComponent implements OnInit {
  public url: string;
  public project : Project;
  public confirm: boolean;
  public qrVisibility: string;

constructor(
  private _projectService: ProjectService,
  private _router:Router,
  private _route:ActivatedRoute
) {
  this.url = Global.url;
  this.confirm = false;
  this.qrVisibility ='False';
}
  
ngOnInit() {
  this._route.params.subscribe(params =>{
    let id = params.id;
    this.getProject(id);
  });
}

setConfirm(confirm){
  this.confirm = confirm;
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
deleteProject(id){
  this._projectService.deleteProject(id).subscribe(
    response =>{
      if(response.project){
          this._router.navigate(['/mis-proyectos']);
      }
    },
    error=>{
        console.log(<any>error);
    }
  );
}
qr(){
  if(this.qrVisibility == 'True'){
    this.qrVisibility='False';
  }else if(this.qrVisibility == 'False'){
    this.qrVisibility='True';    
  }
  if(this.qrVisibility == 'True'){
    document.getElementById('qr').setAttribute('id','qrV');
  }
  if(this.qrVisibility =="False"){
    document.getElementById('qrV').setAttribute('id','qr');
  }
}
}
