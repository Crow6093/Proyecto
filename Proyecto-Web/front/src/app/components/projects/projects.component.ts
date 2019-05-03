import { Component, OnInit, ɵConsole } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService}  from '../../services/project.service';
import { Global } from '../../services/global';
import { CookieService } from 'ngx-cookie-service';
import { UserMail} from '../../services/usermail';
import {LoginStatus} from '../../services/loginstatus';
import { PageEvent } from '@angular/material/paginator';
import { Search } from 'src/app/models/Search';
import {Router} from "@angular/router";
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService,CookieService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project;
  public url: string;
  public Search: Search;
  public projectsarray;
  
  constructor(
    private _projectService : ProjectService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.url = Global.url;
    this.projectsarray=[];
    this.Search = new Search('');
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';
    }
   }

  ngOnInit() {
     this.getSearch();
    this.getProjects();
  }
  
  getSearch(){
    var Busqueda = this.Search;
    this._projectService.getPublicProjects().subscribe(
      response=>{
          if(response.projects){
            this.projectsarray=[];
            for (let index = 0; index < response.projects.length; index++) {
                 if((response.projects[index].name).includes(Busqueda.search)){
                   this.projectsarray.push(response.projects[index]);
                  }
            }
            this.projects = this.projectsarray;
          }
      },
      error =>{
        console.log(<any>error);
      }

    );
  }


  getProjects(){
    this._projectService.getPublicProjects().subscribe(
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
  
  handlePage(e: PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex + 1
  }
  page_size: number = 3;
  page_number: number = 1;
  pageSizeOptions = [3,6,12];

}
