import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { BonusItem } from './model'

@Injectable({
  providedIn: 'root'
})
export class BuscaItemBonusService {

  
  baseUrl = GlobalConstants.apiURL;
  buscaItemUrl = `${this.baseUrl}/api/v1/bonusitens`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.buscaItemUrl+"/filtro", filtro)
        .toPromise();
    }
    console.log(this.buscaItemUrl,filtro)
  }

  salvaralteracoes(bonusitem :BonusItem ) {
    console.log(bonusitem)    
      return this.http.put(`${this.buscaItemUrl}/${bonusitem.id.numbonus}/${bonusitem.id.codprod}/0`, bonusitem).toPromise()

  
  }
}
