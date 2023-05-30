import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PainelAcompamentoPedidosService {

  painelPedidosUrl = null;
  painelPedidosProdutosUrl = null;
 
  constructor( private http:HttpClient) { 
    this.painelPedidosUrl = `${environment.apiAddress}/painelAcompanhaPedido`
    this.painelPedidosProdutosUrl = `${environment.apiAddress}/painelAcompanhaPedido/produto`
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
  
}
