import { Component } from '@angular/core';
import { LoginStatus  } from './services/loginstatus';
import {enableProdMode} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  status = LoginStatus.status;
}

// modo produccion
enableProdMode();