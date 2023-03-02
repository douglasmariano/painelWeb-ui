import { NavbarComponent } from './navbar.component';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor( ) { }
  
  valorVerdadeiro(){
    console.log("ABRE PORRA DE MENU")    
  }
  
}
