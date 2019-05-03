import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserprojectsComponent } from './components/userprojects/userprojects.component';
import { PersonaldetailComponent } from './components/personaldetail/personaldetail.component';
import { EditComponent } from './components/edit/edit.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const appRoutes: Routes = [
  {path: '',component: AboutComponent},
  {path: 'about',component: AboutComponent},
  {path: 'proyectos',component: ProjectsComponent},
  {path: 'crear-proyecto',component: CreateComponent},
  {path: 'mis-proyectos',component: UserprojectsComponent},
  {path: 'proyecto/:id',component:DetailComponent},
  {path: 'editar-proyecto/:id',component:EditComponent},
  {path: 'mi-proyecto/:id',component:PersonaldetailComponent},
  {path: 'login',component:LoginComponent},
  // {path: 'user-edit',component:UserEditComponent},
  {path: '**',component: ErrorComponent} // el doble asterisco es para el caso error .
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
