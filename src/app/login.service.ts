import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  isUserLogado() {
    const token = localStorage.getItem('token')
    return token
  }

  efetuarLogin(form) {
    if (!form.usuario || !form.senha) {
      return
    }

    return this.http.post(`${environment.apiAddress}/api/v1/login`, form).subscribe((result: any)=> {
      if (result.token) {
        localStorage.setItem('token', result.token)
        this.router.navigate(['/'])
      }
    })
  }
}
