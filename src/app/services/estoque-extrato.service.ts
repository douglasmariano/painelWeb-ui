import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueExtratoService {

  produtoExtratoUrl = `${environment.apiAddress}/extratoproduto`;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.produtoExtratoUrl, filtro)
        .toPromise();
    }
    //console.log(this.produtoExtratoUrl,filtro)
  }
}
