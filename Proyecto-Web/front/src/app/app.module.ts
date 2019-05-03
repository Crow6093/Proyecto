import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { NgxQRCodeModule } from 'ngx-qrcode2';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserprojectsComponent } from './components/userprojects/userprojects.component';
import { PersonaldetailComponent } from './components/personaldetail/personaldetail.component';
import { EditComponent } from './components/edit/edit.component';
import { MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';

// cookies
import { CookieService } from 'ngx-cookie-service';
// paginator
import { PaginatePipe } from './pipes/paginate.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustonMatPaginatorIntl } from './services/paginator.es';

// switches
import { UiSwitchModule } from 'ngx-toggle-switch';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ErrorComponent,
    DetailComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    UserprojectsComponent,
    PersonaldetailComponent,
    EditComponent,
    PaginatePipe,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    NgxQRCodeModule
    
  ],
  providers: [appRoutingProviders,CookieService, {provide: MatPaginatorIntl, useClass: CustonMatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
