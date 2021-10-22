import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  
  baseUrl = GlobalConstants.apiURL;
  
  constructor(private http:HttpClient) { }

  listarTodosMotorista() {
    return this.http.get(this.baseUrl+'/api/v1/funcionario/'+9)
  }
}
