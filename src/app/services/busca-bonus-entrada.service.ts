import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BonusEntrada } from '../models/busca-bonus-entrada.model'
import { NotaFiscalEntradaPk } from '@/models/nota-fiscal-entrada.model';
import { NotaFiscalEntrada } from '@/models/nota-fiscal-entrada.model';
import { BonusEntradaPk } from '../models/busca-bonus-entrada.model'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscaBonusEntradaService {

  bonusEntradaUrl = `${environment.apiAddress}/bonusentrada`;
  bonusNotaFiscalEntradaUrl = `${environment.apiAddress}/notafiscalentrada`;    

  bonusEntrada: BonusEntrada = new BonusEntrada();  

  constructor( private http:HttpClient) { 
    
  }

pesquisar(filtro): Promise<any>{
    if (filtro) {
      // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)       
      return this.http.post(this.bonusEntradaUrl+'/filtro/', filtro) 
      .toPromise(); 
     }    
      else{
        return this.http.get(this.bonusEntradaUrl)
        .toPromise();
       }  
  }

pesquisarNotasFiscaisBonus(filtro): Promise<any>{ 
      return this.http.get<NotaFiscalEntrada>(this.bonusNotaFiscalEntradaUrl+'?numbonus='+filtro.numbonus)
      .toPromise();     
  }

adicionar(bonusEntradaPk: BonusEntradaPk): Promise<BonusEntrada> {  
    this.bonusEntrada.id = bonusEntradaPk;    
    //console.log(bonusEntradaPk);
    return this.http.post<BonusEntrada>(this.bonusEntradaUrl+'/novo/', this.bonusEntrada, {  })
    .toPromise();
  }
}
