import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserMail} from '../../services/usermail';
import {LoginStatus} from '../../services/loginstatus';
import { Project } from '../../models/project';
import { ProjectService}  from '../../services/project.service';
import { Global } from '../../services/global';
import { RouterLink } from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [ProjectService,CookieService]
})
export class AboutComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public projects: Project[];
  public url: string;
  public Status: string;

  constructor(
    private _projectService : ProjectService,
    private cookieService: CookieService,
    private _router:Router,
    
  ) {
    this.url = Global.url;
    this.title = "Proyectos Activos";
    this.subtitle ="Proyectos más populares";
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';
      this.Status ='success';
    }
   }

  ngOnInit() {
    this.getPopularProjects();
  }
  
  getPopularProjects(){
    this._projectService.getPopularProjects().subscribe(
      response=>{
          if(response.projects){
            this.projects = response.projects;
          }
      },
      error =>{
        console.log(<any>error);
      }

    );
  }

}
