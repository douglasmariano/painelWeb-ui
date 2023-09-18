import { PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EstoqueExpedicaoService } from '../../../services/estoque-expedicao.service';



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
    this.visibleSeparacao = true;
  } 
  showDialogConferencia() {
    this.visibleConferencia = true;
  } 
  showDialogTransporte() {
    this.visibleTransporte = true;
  } 

}