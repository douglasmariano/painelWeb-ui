import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  exibindoMenu = false;
  loginUrl = '/login?nextUrl=%2F'
  loginUrl2 = '/login'

  visibleSidebar1;
  gfg: MenuItem[];
  constructor(
    private router: Router) {
  }
  ngInit() {
  }
  get isVisibleRoute() {
    return true
  }

  get isLoginPage() {
    return this.router.url === this.loginUrl
  }

  fazerLogout() {
    localStorage.removeItem('token')
    this.router.navigate([this.loginUrl2])
  }

}
