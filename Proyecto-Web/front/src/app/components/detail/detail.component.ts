import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService}  from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { projection } from '@angular/core/src/render3';
import { UserMail} from '../../services/usermail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
    public url: string;
    public project : Project;
    public PuntuacionMedia: number;
    public UserMail: string;
    public LoginStatus: string;
    public VotedUserLocal:boolean;

  constructor(
    private _projectService: ProjectService,
    private _router:Router,
    private _route:ActivatedRoute
  ) {
    this.url = Global.url;
    this.UserMail=UserMail.email;
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
          this.VotedUserLocal = this.project.VotedUser.includes(UserMail.email);
          console.log(this.project.VotedUser.includes(UserMail.email));
        },
        error=>{
          console.log(<any>error);
        }
      )
  }
  onClickMe(number){
     var valorTotal= this.project.assessment + number;
     var NumeroDePuntuaciones= this.project.NumberOfAssessments + 1;
     var NewProject = this.project;
     NewProject.assessment =valorTotal;
     NewProject.NumberOfAssessments = NumeroDePuntuaciones;
     NewProject.TotalAssessments =(valorTotal/NumeroDePuntuaciones);
     NewProject.VotedUser.push(this.UserMail);
     this._projectService.UpdateProject(NewProject).subscribe(
      response => {
        if(response.project){
                this.project = response.project;}
    },
    error => {
      console.log(<any>error);
    }
  );
    if(document.getElementById('row-center')){
    document.getElementById('row-center').setAttribute("id","row-center-block");}
  
  }

}
