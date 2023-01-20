import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AjelEntrega } from '../models/ajel-entrega.model';


@Injectable({
  providedIn: 'root'
})
export class AjelEntregaService {
 
  ajelEntregaUrl = `${environment.apiAddress}/ajelentrega`;

  constructor(private http: HttpClient) { }

  pesquisarAjelEntrega(filtro: any): Promise<any> {
   
    if (filtro?.numnota) {
     // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)  
     console.log("filtro.codentrega")
     return this.http.post(this.ajelEntregaUrl+'/numnota/', filtro) 
     .toPromise();
    }
    else if(filtro?.dtentrega){      
      return this.http.post(this.ajelEntregaUrl+'/dtentrega/', filtro) 
     .toPromise();
    }  else if(filtro?.codentrega){      
      return this.http.get(this.ajelEntregaUrl+'/codentrega/'+filtro.codentrega) 
     .toPromise();
    }
     else{
        return this.http.get(this.ajelEntregaUrl)
        .toPromise();
      }
  }

 
  pesquisarNotaWinthor(filtro: any): Promise<any> {
    //const params = new URLSearchParams();
    // return this.http.get(`${this.pedidosUrl}?dataPedidoDe=2020-10-02&dataPedidoAte=2020-10-03`)
    if (filtro) {
      // params.set('numped', filtro.numped);
      return this.http.post(this.ajelEntregaUrl+'/pesquisarNotaWinthor/', filtro)
        .toPromise();
    }
  }
   
  excluir(codentrega) {    
    return this.http.put(`${this.ajelEntregaUrl}/dataExlusao/${codentrega}`, {}).toPromise()
  }

  atualizar(ajelEntrega: AjelEntrega): Promise<void> {
    
    return this.http.put(`${this.ajelEntregaUrl}/alterarSeparacao/${ajelEntrega.codentrega}`, ajelEntrega)
      .toPromise()
      .then(() => { this.pesquisarAjelEntrega(ajelEntrega.codentrega);});// return this.http.put(this.pedidosUrlAll/numped).toPromise();
      
  }

  adicionar(ajelEntrega: AjelEntrega): Promise<AjelEntrega> {
    return this.http.post<AjelEntrega>(this.ajelEntregaUrl, ajelEntrega, {  })
    .toPromise();    
  }

}
