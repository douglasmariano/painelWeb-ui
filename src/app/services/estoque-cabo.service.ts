import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { EstoqueCabo } from '../models/estoque-cabo.model';


@Injectable({
  providedIn: 'root'
})
export class EstoqueCaboService {

  estoqueCaboUrl = `${environment.apiAddress}/estoquecabo`;
  estoqueProdutoUrl = `${environment.apiAddress}/produtoestoque`;
  buscaAnterior;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {    
    if (filtro?.codcabo) {
     // return this.http.get(this.estoqueCaboUrl+'?codcabo='+filtro.codcabo)  
     return this.http.get(this.estoqueCaboUrl+'/'+filtro.codcabo) 
     .toPromise();
    }
    else if(filtro?.codprod_pcprodut){ 
      this.buscaAnterior = { ...filtro};     
      return this.http.post(this.estoqueCaboUrl+'/codprod',filtro) 
     .toPromise();
      } else{
        return this.http.get(this.estoqueCaboUrl)
        .toPromise();
      }
  }

  pesquisaPorCodcabo(){
    
  }

  pesquisarProduto(filtro: any): Promise<any> { 
    //console.log(filtro)   
  if(filtro){ 
      return this.http.post(this.estoqueProdutoUrl,{ codprod: filtro}) 
     .toPromise();
      } else{
        return this.http.get(this.estoqueProdutoUrl)
        .toPromise();
      }
  }
  

  
   excluir(estoqueCabo: EstoqueCabo): Promise<void> {
    //return this.http.put(`${this.estoqueCaboUrl}/estoquecabo/dataExclusao/${estoqueCabo.codcabo}`, estoqueCabo)
    console.log(`${estoqueCabo}`)
    return this.http.put(`${this.estoqueCaboUrl}/dataExclusao/${estoqueCabo}`, estoqueCabo).toPromise()    
    .then(() => { this.pesquisar(estoqueCabo.codcabo);});
    
  }

  atualizar(estoqueCabo: EstoqueCabo): Promise<void> {
    //console.log(estoqueCabo.codcabo)
    return this.http.put(`${this.estoqueCaboUrl}/${estoqueCabo.codcabo}`, estoqueCabo)
      .toPromise()
      .then(() => { this.pesquisar(estoqueCabo.codcabo);});// return this.http.put(this.pedidosUrlAll/numped).toPromise();
      
  }

  baixarQuantidade(estoqueCabo: EstoqueCabo): Promise<void> {
    //console.log(estoqueCabo.codcabo)
    return this.http.put(`${this.estoqueCaboUrl}/baixaQuantidade/${estoqueCabo.codcabo}`, estoqueCabo)
      .toPromise()
      .then(() => { this.pesquisar(estoqueCabo.codcabo);});// return this.http.put(this.pedidosUrlAll/numped).toPromise();
      
  }

  adicionar(estoqueCabo: EstoqueCabo): Promise<EstoqueCabo> {
    return this.http.post<EstoqueCabo>(this.estoqueCaboUrl, estoqueCabo, {  })
    .toPromise();    
  }

}
