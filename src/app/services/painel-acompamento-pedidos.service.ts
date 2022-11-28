import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class PainelAcompamentoPedidosService {


  
 
  painelPedidosUrl = null;
 
  constructor( private http:HttpClient) { 
    this.painelPedidosUrl = `${environment.apiAddress}/api/v1/painelAcompanhaPedidoPainel`
  }
  
  baseUrl = GlobalConstants.apiURL;
  // constructor( private http:HttpClient) { }

  pesquisar(): Promise<any>{
   // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
   return this.http.get(`${this.baseUrl}/api/v1/painelAcompanhaPedidoPainel`)
    .toPromise()
  }
  
}
