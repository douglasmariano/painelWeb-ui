import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

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
      const response: any = await this.http.post(`${environment.apiAddress}/auth/login`, form).toPromise()
      
      if (response.token) {
        localStorage.setItem('token', response.token)
       //console.log(this.urlAtual)
        //this.router.navigate([this.urlAtual])
        this.router.navigate(['/'])
      }
    } catch (error) {
      return error?.error?.message
    }
  }
}
