import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PainelAcompamentoPedidosService {

  painelPedidosUrl = null;
  painelPedidosProdutosUrl = null;
  painelSeparacaoUrl = null;
 
  constructor( private http:HttpClient) { 
    this.painelPedidosUrl = `${environment.apiAddress}/painelAcompanhaPedido`
    this.painelPedidosProdutosUrl = `${environment.apiAddress}/painelAcompanhaPedido/produto`
    this.painelSeparacaoUrl = `${environment.apiAddress}/painelacompanhaseparacao/todos`
  }

  pesquisar(filtro: any): Promise<any> {
    if (filtro) {
      return this.http.post( this.painelPedidosUrl, filtro)
        .toPromise();
    }
  } 

  pesquisarProduto(filtro: any): Promise<any>{
    if (filtro) {
      return this.http.post( this.painelPedidosProdutosUrl, filtro)
        .toPromise();
    }
   }

   pesquisarPainelSeparacao(): Promise<any>{
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    return this.http.get(this.painelSeparacaoUrl)
     .toPromise()
   }
  
}
