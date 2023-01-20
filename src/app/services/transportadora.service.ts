import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransportadoraService {
  
  constructor(private http:HttpClient) { }

  listarTodos() {
    return this.http.get(environment.apiAddress+'/transportadora/'+'T')
  }

}
