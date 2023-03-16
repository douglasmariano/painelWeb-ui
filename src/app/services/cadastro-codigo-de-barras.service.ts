import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CodigoDeBarras } from '../models/cadastro-codigo.model'
import { CodigoDeBarrasPk } from '../models/cadastro-codigo.model'
import { Produto } from '@/models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroCodigoDeBarrasService {

  cadastroCodigoDeBarrasUrl = `${environment.apiAddress}/codigodebarras`;
  cadastroCodigoDeBarrasnoProdutoUrl = `${environment.apiAddress}/produtocodigodebarras`;
  codigoDeBarras: CodigoDeBarras = new CodigoDeBarras();  
  valorDoFiltro;
  constructor( private http:HttpClient) { }

  pesquisar(filtro): Promise<any>{
    this.valorDoFiltro = filtro;
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
    return this.http.put<CodigoDeBarras>(this.cadastroCodigoDeBarrasnoProdutoUrl + '/codigodebarra/', this.codigoDeBarras.id.codprod, {})
      .toPromise().then(res => {
        console.log(res);
        return res
      });
  }

  atualizar(codigoSelecionado, CodigoAuxiliar: Produto): Promise<void> {    
    console.log(codigoSelecionado)
    const produto = {
      codprod : codigoSelecionado,
      codauxiliar: CodigoAuxiliar
    }
    return this.http.put(`${this.cadastroCodigoDeBarrasnoProdutoUrl}/${codigoSelecionado}`, produto)
      .toPromise()
      .then(() => { });
      
  }
}
