
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PainelPedidosService {

  pedidosUrl = null;

  constructor( private http:HttpClient) { 
    this.pedidosUrl = `${environment.apiAddress}/tabpedidosPainel`
  }
  
  // constructor( private http:HttpClient) { }

  pesquisar(): Promise<any>{
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   return this.http.get(`${environment.apiAddress}/tabpedidosPainel`)
    .toPromise()
  }
}
