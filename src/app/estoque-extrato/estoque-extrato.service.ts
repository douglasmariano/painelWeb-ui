import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class EstoqueExtratoService {

  baseUrl = GlobalConstants.apiURL;
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
