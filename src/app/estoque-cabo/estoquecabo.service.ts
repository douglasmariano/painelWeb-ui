import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { EstoqueCabo } from './model';


@Injectable({
  providedIn: 'root'
})
export class EstoqueCaboService {
 

  baseUrl = GlobalConstants.apiURL;
  estoqueCaboUrl = `${this.baseUrl}/api/v1/estoquecabos`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.get(this.estoqueCaboUrl, filtro)
        .toPromise();
    }
    console.log(this.estoqueCaboUrl,filtro)
  }

  excluir(codendcabo: number): Promise<void> {
    return this.http.delete(`${this.estoqueCaboUrl}/${codendcabo}`)
      .toPromise()
      .then(() => { this.pesquisar(null); });// return this.http.put(this.pedidosUrlAll/numped).toPromise();
  }

  adicionar(estoqueCabo: EstoqueCabo): Promise<EstoqueCabo> {
    return this.http.post<EstoqueCabo>(this.estoqueCaboUrl, estoqueCabo, {  })
    .toPromise();
    console.log(estoqueCabo);
  }


 
}
