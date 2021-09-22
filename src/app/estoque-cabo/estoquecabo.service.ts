import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { EstoqueCabo } from './model';


@Injectable({
  providedIn: 'root'
})
export class EstoqueCaboService {
 

  baseUrl = GlobalConstants.apiURL;
  estoqueCaboUrl = `${this.baseUrl}/api/v1/estoquecabo`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
   
    if (filtro?.codendcabo) {
     // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)  
     return this.http.get(this.estoqueCaboUrl+'/'+filtro.codendcabo) 
     .toPromise();
    }
    else if(filtro?.codprod){      
      return this.http.get(this.estoqueCaboUrl+'?codprod='+filtro.codprod) 
     .toPromise();
      } else{
        return this.http.get(this.estoqueCaboUrl)
        .toPromise();
      }
  }
  
   excluir(codendcabo: number): Promise<any> {
    return  this.http.delete(`${this.estoqueCaboUrl}/${codendcabo}`)
    .toPromise(); 
  }

  atualizar(estoqueCabo: EstoqueCabo): Promise<void> {
    console.log(estoqueCabo.codendcabo)
    return this.http.put(`${this.estoqueCaboUrl}/${estoqueCabo.codendcabo}`, estoqueCabo)
      .toPromise()
      .then(() => { this.pesquisar(estoqueCabo.codendcabo);});// return this.http.put(this.pedidosUrlAll/numped).toPromise();
      
  }

  adicionar(estoqueCabo: EstoqueCabo): Promise<EstoqueCabo> {
    return this.http.post<EstoqueCabo>(this.estoqueCaboUrl, estoqueCabo, {  })
    .toPromise();    
  }

}
