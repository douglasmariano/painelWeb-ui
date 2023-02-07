import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CodigoDeBarras } from '../models/cadastro-codigo.model'
import { CodigoDeBarrasPk } from '../models/cadastro-codigo.model'

@Injectable({
  providedIn: 'root'
})
export class CadastroCodigoDeBarrasService {

  cadastroCodigoDeBarrasUrl = `${environment.apiAddress}/codigodebarras`;
  codigoDeBarras: CodigoDeBarras = new CodigoDeBarras();  

  constructor( private http:HttpClient) { 
    
  }

  pesquisar(filtro): Promise<any>{
    if (!filtro) {
      // return this.http.get(this.estoqueCaboUrl+'?codendcabo='+filtro.codendcabo)      
      return this.http.post(this.cadastroCodigoDeBarrasUrl+'/filtro/', filtro) 
      .toPromise();
     }    
      else{
         return this.http.get(this.cadastroCodigoDeBarrasUrl)
         .toPromise();
       }  
  }

  adicionar(codigoDeBarrasPk: CodigoDeBarrasPk): Promise<CodigoDeBarras> {  
    this.codigoDeBarras.id = codigoDeBarrasPk;    
    //console.log(codigoDeBarrasPk)
    return this.http.post<CodigoDeBarras>(this.cadastroCodigoDeBarrasUrl+'/novo/', this.codigoDeBarras, {  })
    .toPromise();
  }
}
