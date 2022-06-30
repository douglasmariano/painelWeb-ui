import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { NotaFiscal } from './model';
@Injectable({
  providedIn: 'root'
})
export class CanhotoService {

  baseUrl = GlobalConstants.apiURL;
  notafiscalSaidaUrl = `${this.baseUrl}/api/v1/notafiscalsaida`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
   
    if (filtro?.codfilial) {
     // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)      
     return this.http.post(this.notafiscalSaidaUrl+'/numnota/', filtro) 
     .toPromise();
    }    
     else{
        return this.http.get(this.notafiscalSaidaUrl)
        .toPromise();
      }
  }
  canhotoEncontrado(notafiscal :NotaFiscal ) {
    console.log(notafiscal.numtransvenda)
    if(notafiscal.obsnfcarreg === ""){
      return this.http.put(`${this.notafiscalSaidaUrl}/dataCanhoto/${notafiscal.numtransvenda}/"null"`, notafiscal).toPromise()

    }else{
      return this.http.put(`${this.notafiscalSaidaUrl}/dataCanhoto/${notafiscal.numtransvenda}/${notafiscal.obsnfcarreg}`, notafiscal).toPromise()

      }    
  }
  
}
