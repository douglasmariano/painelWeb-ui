import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import {  DialogModule  } from 'primeng/dialog';
import { AjelEntregaService } from './ajel-entrega.service';

@Component({
  selector: 'app-ajel-entrega',
  templateUrl: './ajel-entrega.component.html',
  styleUrls: ['./ajel-entrega.component.css']
})
export class AjelEntregaComponent implements OnInit {

  
  display: boolean = false;

  showDialog() {
      this.display = true;
  }

  @Input() 
  ajelEntrega = [];

  buscaAjelEntrega = new FormGroup({

    numnota: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    
  });
  
  constructor(
    private route: ActivatedRoute,
    private ajelEntregaService: AjelEntregaService,
    private  toasty:ToastyService,
    private  confirmation:ConfirmationService) { }

  ngOnInit(): void {
    
    
   this.pesquisar()
  }

  get f() { return this.buscaAjelEntrega.controls; }

  pesquisar() {
    this.ajelEntregaService.pesquisarAjelEntrega({ numnota: this.buscaAjelEntrega.value.numnota })
    .then(ajelEntrega => this.ajelEntrega = ajelEntrega);
    if(this.buscaAjelEntrega.value.numnota){
    if(this.ajelEntrega.values() == this.buscaAjelEntrega.value.numnota ){
          this.toasty.success('Pedido encontrado.')  
        } else{
          this.toasty.error('Pedido não encontrado.')       
        }
      }
        console.log(this.ajelEntrega.values())
      }
      
      get proximaRota() {
        return `/ajelentrega/`+this.buscaAjelEntrega.value.numnota;
      }

  excluir(codentrega) {
    this.confirmation.confirm(
      {message: 'Tem certeza que deseja excluir',
        accept: () => {
          this.ajelEntregaService.excluir(codentrega).then(()=> {
            this.toasty.error('Excluido com sucesso!')
            this.pesquisar();                   
          });
        }
      }
    );
  }

}
