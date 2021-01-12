import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PedidoPesquisaService {

  pedidosUrl= 'http://localhost:9000/api/v1/tabpedido';
  pedidosUrlAll= 'http://localhost:9000/api/v1/tabpedidos';
  
  constructor( private http:HttpClient) { }

  pesquisar(filtro: any): Promise<any>{
    //const params = new URLSearchParams();
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   
    if (filtro){
      // params.set('numped', filtro.numped);   
      return this.http.post(this.pedidosUrl, filtro)
       .toPromise();
    }
  }

  alterarPosicao(numped:number): Promise<any>{    
   return null// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  } 
}
