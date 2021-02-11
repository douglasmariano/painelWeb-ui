
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PainelPedidosService {

  pedidosUrl= 'http://192.168.200.17:9000/api/v1/tabpedidosPainel';

  constructor( private http:HttpClient) { }

  pesquisar(): Promise<any>{
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   return this.http.get(`${this.pedidosUrl}`)
    .toPromise()
  }
}
