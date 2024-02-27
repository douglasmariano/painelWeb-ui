import { AjelEntrega } from '@/models/ajel-entrega.model';
import { Transporte, EntregaTransporte, PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueExpedicaoService {
  pedidosUrl = null;
  transporteUrl = null;
  entregaTransporteUrl = null;
  ajelEntregaUrl = null;

  constructor(private http: HttpClient) {
    this.pedidosUrl = `${environment.apiAddress}/tabpedidos`;
    this.transporteUrl = `${environment.apiAddress}/ajeltransporte`;
    this.entregaTransporteUrl = `${environment.apiAddress}/ajelentregatransporte`;
    this.ajelEntregaUrl = `${environment.apiAddress}/ajelentrega`;
  }



  pesquisar(filtro): Promise<any> {
    if (filtro) {
      console.log(filtro)
      return this.http.get(this.pedidosUrl+'/busca?numped='+filtro.numped)
      .toPromise()
    }
  }

  pesquisarCodTransporte(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      console.log(filtro.codtransporte)
      return this.http.post(this.entregaTransporteUrl+'/filtro', filtro)
        .toPromise();
    }
  }

  separacao(pedido :PedidoExpedicao ) {
    return this.http.put(`${this.pedidosUrl}/separacao/${pedido.numped}`, pedido).toPromise()        
  }

  conferencia(pedido :PedidoExpedicao ) {
    return this.http.put(`${this.pedidosUrl}/conferencia/${pedido.numped}`, pedido).toPromise()        
  }

  qtVolumes(ajelEntrega: AjelEntrega) {    
    return this.http.put(`${this.ajelEntregaUrl}/alterarVolume/${ajelEntrega.codentrega}`, ajelEntrega).toPromise();
  }

  novoEntregaTransporte(ajelEntrega :EntregaTransporte ) {
    return this.http.post(`${this.entregaTransporteUrl}/novo`, ajelEntrega).toPromise()        
  } 

  async novoTransporte(transporte: Transporte): Promise<number> {
    try {
      const resposta = await this.http
        .post<any>(`${this.transporteUrl}/novo`, transporte)
        .toPromise();

      return resposta.codtransporte; 
    } catch (error) {
      throw error; 
    }
  }


  async  novaEntrega(ajelEntrega: AjelEntrega): Promise<number> {
    try{
      const resposta = await this.http
      .post<any>(this.ajelEntregaUrl, ajelEntrega)
      .toPromise(); 
      return resposta.codentrega;
    }catch (error) {
      throw error; 
    }
       
  }

}
