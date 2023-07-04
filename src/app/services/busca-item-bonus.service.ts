import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BonusItem } from '../models/busca-item-bonus.model'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscaItemBonusService {

  buscaItemUrl = `${environment.apiAddress}/bonusitens`;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {   
    if (filtro) {      
      return this.http.post(this.buscaItemUrl + "/filtro", filtro)
        .toPromise();
    }    
  }

  salvaralteracoes(bonusitem: BonusItem) {
    return this.http.put(`${this.buscaItemUrl}/${bonusitem.id.numbonus}/${bonusitem.id.codprod}/0`, bonusitem).toPromise()
  }
}
