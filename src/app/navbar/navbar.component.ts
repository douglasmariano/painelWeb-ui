import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  exibindoMenu = false;
  loginUrl = '/login'

  visibleSidebar1;
  gfg: MenuItem[];
  constructor(
    private router: Router) { 
  }
ngInit(){
  this.gfg = [
    {
      label: 'HTML',
      items: [
        {
          label: 'HTML 1'
        },
        {
          label: 'HTML 2'
        }
      ]
    },
    {
      label: 'Angular',

      items: [
        {
          label: 'Angular 1'
        },
        {
          label: 'Angular 2'
        }
      ]
    }
  ];
} 


  get isLoginPage() {
    return this.router.url === this.loginUrl
  }

  fazerLogout() {
    localStorage.removeItem('token')
    this.router.navigate([this.loginUrl])
  }

}
