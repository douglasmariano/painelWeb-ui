import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { BonusEntrada } from './model'
import { BonusEntradaPk } from './model'

@Injectable({
  providedIn: 'root'
})
export class BuscaBonusEntradaService {

  
  baseUrl = GlobalConstants.apiURL;
  bonusEntradaUrl = `${this.baseUrl}/api/v1/bonusentrada`;  

  bonusEntrada: BonusEntrada = new BonusEntrada();  

  constructor( private http:HttpClient) { 
    
  }

pesquisar(filtro): Promise<any>{
    if (filtro) {
      // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo) 
      //
      return this.http.post(this.bonusEntradaUrl+'/filtro/', filtro) 
      .toPromise(); 
     }    
      else{
        return this.http.get(this.bonusEntradaUrl)
        .toPromise();
       }  
  }

adicionar(bonusEntradaPk: BonusEntradaPk): Promise<BonusEntrada> {  
    this.bonusEntrada.id = bonusEntradaPk;    
    console.log(bonusEntradaPk);
    return this.http.post<BonusEntrada>(this.bonusEntradaUrl+'/novo/', this.bonusEntrada, {  })
    .toPromise();
  }
}
