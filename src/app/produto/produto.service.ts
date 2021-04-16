import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './model';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = 'http://192.168.200.55:9000'

  produtoUrl = `${this.baseUrl}/api/v1/produtos`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.get(this.produtoUrl, filtro)
        .toPromise();
    }
    console.log(this.produtoUrl,filtro)
  }

  excluir(codendcabo: number): Promise<void> {
    return this.http.delete(`${this.produtoUrl}/${codendcabo}`)
      .toPromise()
      .then(() => { this.pesquisar(null); });// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.produtoUrl, produto, {  })
    .toPromise();
    console.log(produto);
  }


 
}
