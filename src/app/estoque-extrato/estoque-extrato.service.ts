import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstoqueExtratoService {

  baseUrl = 'http://192.168.200.55:9000'

  produtoExtratoUrl = `${this.baseUrl}/api/v1/extratoproduto`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.produtoExtratoUrl, filtro)
        .toPromise();
    }
    console.log(this.produtoExtratoUrl,filtro)
  }
}
