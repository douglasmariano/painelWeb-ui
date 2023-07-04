import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private aroute : ActivatedRoute
  ) { }
      
  isUserLogado() {
    const token = localStorage.getItem('token')
    return token
  }

  getRoles(): [] {
    const roles = JSON.parse(localStorage.getItem('roles'));
    return roles;
  }

  async efetuarLogin(form,nextUrl) {
    if (!form.usuario || !form.senha) {
      return 'Por favor, informe usuário e senha'
    }

    try {
      const response: any = await this.http.post(`${environment.apiAddress}/auth/login`, form).toPromise()    
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('roles', JSON.stringify(response.roles));
        this.router.navigateByUrl(nextUrl ? nextUrl : '/');
      }
    } catch (error) {
      return error?.error?.message
    }
  }
}
