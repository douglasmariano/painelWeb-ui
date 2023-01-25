import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  
  constructor(private http:HttpClient) { }

  listarTodos() {
    return this.http.get(environment.apiAddress+'/marca')
  }
}
