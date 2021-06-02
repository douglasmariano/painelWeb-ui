import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './model';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  baseUrl = 'http://192.168.200.55:9000'

  produtoUrl = `${this.baseUrl}/api/v1/produto`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    console.log(filtro)
    if (filtro.codprod) {
      // params.set('numped', filtro.numped);
      return this.http.get(this.produtoUrl+'/'+filtro.codprod)
        .toPromise();
    } else if(filtro.descricao || filtro.marcas) {
      const queryParams = Object.keys(filtro)
        .filter(key => filtro[key])
        .map(key => {
          if (Array.isArray(filtro[key])) {
            return `${key}=${filtro[key].join(',')}`
          } else {
            return `${key}=${filtro[key]}`
          }
        })
        .join('&')
      return this.http.get(this.produtoUrl+ '?' + queryParams)
      .toPromise();
    } else{
      return this.http.get(this.produtoUrl)
        .toPromise();
    }
  }

  excluir(codprod: number): Promise<void> {
    return this.http.delete(`${this.produtoUrl}/${codprod}`)
      .toPromise()
      .then(() => { this.pesquisar(null); });// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  }

  adicionar(produto: Produto): Promise<Produto> {
    return this.http.post<Produto>(this.produtoUrl, produto, {  })
    .toPromise();
    console.log(produto);
  }


 
}
