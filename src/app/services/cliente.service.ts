import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  clienteUrl = `${environment.apiAddress}/clientes`;
  
  constructor(private http: HttpClient) { }

  pesquisar(params: HttpParams): Promise<any> {   
    
     // return this.http.get(this.estoqueCaboUrl+'?codcabo='+filtro.codcabo)  
     return this.http.get(this.clienteUrl+'/telefone',{params}) 
     .toPromise();
    
  }
}
