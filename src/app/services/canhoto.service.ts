import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { NotaFiscal } from '../models/canhoto.model';
@Injectable({
  providedIn: 'root'
})
export class CanhotoService {

  notafiscalSaidaUrl = `${environment.apiAddress}/notafiscalsaida`;
  downloadUrl = `${environment.apiAddress}/download`;
  
  
  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    if (filtro?.codfilial) {
     // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)      
     return this.http.post(this.notafiscalSaidaUrl+'/numnota/', filtro) 
     .toPromise();
    }    
     else if(filtro?.codcli){
      return this.http.post(this.notafiscalSaidaUrl+'/numnota/', filtro) 
      .toPromise();
     }{
        return this.http.get(this.notafiscalSaidaUrl)
        .toPromise();
      }
  }
  
  canhotoEncontrado(notafiscal :NotaFiscal ) {
    return this.http.put(`${this.notafiscalSaidaUrl}/dataCanhoto/${notafiscal.numtransvenda}`, notafiscal).toPromise()        
  }
  
}
