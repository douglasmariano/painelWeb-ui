import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  marcaUrl= 'http://192.168.200.55:9000/api/v1/marca';

  constructor(private http:HttpClient) { }

  listarTodos() {
    return this.http.get(this.marcaUrl)
  }
}
