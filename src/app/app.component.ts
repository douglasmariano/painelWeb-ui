import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import{ GlobalConstants } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  constructor(private toastConfig: ToastyConfig){
    this.toastConfig.theme = 'bootstrap';    
  }
  
  baseUrl = GlobalConstants.apiURL;

}
