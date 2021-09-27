import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  exibindoMenu = false;
  loginUrl = '/login'

  constructor(
    private router: Router) { 
  }

  get isLoginPage() {
    return this.router.url === this.loginUrl
  }

  fazerLogout() {
    localStorage.removeItem('token')
    this.router.navigate([this.loginUrl])
  }

}
