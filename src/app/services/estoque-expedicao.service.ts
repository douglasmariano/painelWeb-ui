import { PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstoqueExpedicaoService {
  pedidosUrl = null;

  constructor(private http: HttpClient) {
    this.pedidosUrl = `${environment.apiAddress}/tabpedidos`
  }



  pesquisar(filtro): Promise<any> {
    if (filtro) {
      console.log(filtro)
      return this.http.get(this.pedidosUrl+'/busca?numped='+filtro.numped)
      .toPromise()
    }
  }

  separacao(pedido :PedidoExpedicao ) {
    return this.http.put(`${this.pedidosUrl}/separacao/${pedido.numped}`, pedido).toPromise()        
  }

}
