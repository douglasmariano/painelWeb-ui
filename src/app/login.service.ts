import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { GlobalConstants } from './common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = GlobalConstants.apiURL;
  constructor(
    private http: HttpClient, 
    private router: Router) { 

  }

  isUserLogado() {
    const token = localStorage.getItem('token')
    return token
  }

  async efetuarLogin(form) {
    if (!form.usuario || !form.senha) {
      return 'Por favor, informe usuário e senha'
    }
    
    try {
      const response: any = await this.http.post(this.baseUrl +'/api/v1/auth/login', form).toPromise()

      if (response.token) {
        localStorage.setItem('token', response.token)
        this.router.navigate(['/'])
      }
    } catch (error) {
      return error?.error?.message
    }
  }
}
