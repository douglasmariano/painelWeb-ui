import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
  constructor(private http:HttpClient) { }

  listarTodosMotorista() {
    return this.http.get(environment.apiAddress +'/funcionario/'+9)
  }

  listarTodosConferentes() {
    return this.http.get(environment.apiAddress+'/funcionario/'+15)
  }
}
