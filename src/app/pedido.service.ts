import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  baseUrl = 'http://localhost:9000'
  pedidosUrl= 'http://localhost:9000/api/v1/tabpedidos';

  constructor( private http:HttpClient) { }

  pesquisar(): Promise<any>{
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   return this.http.get(`${this.pedidosUrl}`)
    .toPromise()
  }

  marcarChegada(numped) {
    return this.http.put(`${this.baseUrl}/api/v1/tabpedidos/marcar_chegada/${numped}`, {}).toPromise()
  }
}
