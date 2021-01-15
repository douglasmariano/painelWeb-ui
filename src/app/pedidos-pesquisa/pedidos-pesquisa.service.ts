import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './model';


@Injectable({
  providedIn: 'root'
})
export class PedidoPesquisaService {

  pedidosUrl = 'http://localhost:9000/api/v1/tabpedido';
  pedidosUrlAll = 'http://localhost:9000/api/v1/tabpedidos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json');
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.pedidosUrl, headers,filtro)
        .toPromise();
    }
  }

  excluir(numped: number): Promise<void> {
    return this.http.delete(`${this.pedidosUrlAll}/${numped}`)
      .toPromise()
      .then(() => { this.pesquisar(null); });// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  }

  adicionar(pedido: Pedido): Promise<Pedido> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.post<Pedido>(this.pedidosUrlAll, pedido, {  })
    .toPromise();
  }
}
