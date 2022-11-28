import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from '../common/global-constants';
import { EstoqueCabo } from '../models/estoque-cabo.model';


@Injectable({
  providedIn: 'root'
})
export class EstoqueCaboService {
 

  baseUrl = GlobalConstants.apiURL;
  estoqueCaboUrl = `${this.baseUrl}/api/v1/estoquecabo`;
  estoqueProdutoUrl = `${this.baseUrl}/api/v1/produtoestoque`;
  

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {   
    if (filtro?.codcabo) {
     // return this.http.get(this.estoqueCaboUrl+'?codcabo='+filtro.codcabo)  
     return this.http.get(this.estoqueCaboUrl+'/'+filtro.codcabo) 
     .toPromise();
    }
    else if(filtro?.codprod_pcprodut){      
      return this.http.post(this.estoqueCaboUrl+'/codprod',filtro) 
     .toPromise();
      } else{
        return this.http.get(this.estoqueCaboUrl)
        .toPromise();
      }
  }
  pesquisarProduto(filtro: any): Promise<any> { 
    console.log(filtro)   
  if(filtro){ 
      return this.http.post(this.estoqueProdutoUrl,{ codprod: filtro}) 
     .toPromise();
      } else{
        return this.http.get(this.estoqueProdutoUrl)
        .toPromise();
      }
  }
  

  
   excluir(codcabo: number): Promise<any> {
    return  this.http.delete(`${this.estoqueCaboUrl}/${codcabo}`)
    .toPromise(); 
  }

  atualizar(estoqueCabo: EstoqueCabo): Promise<void> {
    console.log(estoqueCabo.codcabo)
    return this.http.put(`${this.estoqueCaboUrl}/${estoqueCabo.codcabo}`, estoqueCabo)
      .toPromise()
      .then(() => { this.pesquisar(estoqueCabo.codcabo);});// return this.http.put(this.pedidosUrlAll/numped).toPromise();
      
  }

  adicionar(estoqueCabo: EstoqueCabo): Promise<EstoqueCabo> {
    return this.http.post<EstoqueCabo>(this.estoqueCaboUrl, estoqueCabo, {  })
    .toPromise();    
  }

}
