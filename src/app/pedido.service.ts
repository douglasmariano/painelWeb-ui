import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseUrl = GlobalConstants.apiURL;

  constructor( private http:HttpClient) { }

  pesquisar(): Promise<any>{
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   return this.http.get(`${this.baseUrl}/api/v1/tabpedidos`)
    .toPromise()
  }

 
}
