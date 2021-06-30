import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  
  baseUrl = GlobalConstants.apiURL;
  
  constructor(private http:HttpClient) { }

  listarTodos() {
    return this.http.get(this.baseUrl+'/api/v1/marca')
  }
}
