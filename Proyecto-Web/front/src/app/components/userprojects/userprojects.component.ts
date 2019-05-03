import { Component, OnInit, ɵConsole } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService}  from '../../services/project.service';
import { Global } from '../../services/global';
import { UserMail} from '../../services/usermail';
import {LoginStatus} from '../../services/loginstatus';
// cookies
import { CookieService } from 'ngx-cookie-service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-userprojects',
  templateUrl: './userprojects.component.html',
  styleUrls: ['./userprojects.component.css'],
  providers: [ProjectService,CookieService]
})
export class UserprojectsComponent implements OnInit {
  public projects: Project[];
  public url: string;
  public status: string;

  constructor(
    private _projectService : ProjectService ,
    private cookieService: CookieService
  ) {
    this.url = Global.url;
    const cookieExists: boolean = this.cookieService.check('Login'); 
    if(cookieExists){
      UserMail.email = this.cookieService.get('Login');
      LoginStatus.status = 'success';
    }
    this.status = LoginStatus.status;
   }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(){
    this._projectService.getUserProjects(UserMail.email).subscribe(
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
  pageSizeOptions = [3,6,12]
}
