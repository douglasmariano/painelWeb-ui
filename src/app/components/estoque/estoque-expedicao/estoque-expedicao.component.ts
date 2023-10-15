import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-estoque-expedicao',
  templateUrl: './estoque-expedicao.component.html',
  styleUrls: ['./estoque-expedicao.component.css']
})

export class EstoqueExpedicaoComponent implements OnInit {


  
  @Input()
  notaOuPedido: boolean;
  visibleSeparacao: boolean = false;
  visibleConferencia: boolean = false;
  visibleTransporte: boolean = false;
  checked: boolean ;
  constructor() {}  
  


  ngOnInit(): void {
    
  }  

  showDialogSeparacao() {
    this.visibleSeparacao = ! this.visibleSeparacao;
  } 
  showDialogConferencia() {
    this.visibleConferencia = ! this.visibleConferencia;
  } 
  showDialogTransporte() {
    this.visibleTransporte = ! this.visibleTransporte;
  } 


  onCallParent(){    
    this.showDialogTransporte();
  }
  

}