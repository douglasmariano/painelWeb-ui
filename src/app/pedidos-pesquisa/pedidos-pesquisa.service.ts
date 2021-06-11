import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from './model';


@Injectable({
  providedIn: 'root'
})
export class PedidoPesquisaService {
  //baseUrl = 'http://192.168.200.55:9000'
  baseUrl = 'http://192.168.200.17:9000'

  pedidosUrl = `${this.baseUrl}/api/v1/tabpedido`;
  pedidosUrlAll = `${this.baseUrl}/api/v1/tabpedidos`;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.pedidosUrl, filtro)
        .toPromise();
    }
  }

  excluir(numped: number): Promise<void> {
    return this.http.delete(`${this.pedidosUrlAll}/${numped}`)
      .toPromise()
      .then(() => { this.pesquisar(null); });// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  }

  adicionar(pedido: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(this.pedidosUrlAll, pedido, {  })
    .toPromise();
    console.log(pedido);
  }

  marcarChegada(numped) {
    console.log(numped)
    return this.http.put(`${this.baseUrl}/api/v1/tabpedidos/marcar_chegada/${numped}`, {}).toPromise()
  }
}
