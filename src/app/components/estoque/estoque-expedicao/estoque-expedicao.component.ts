import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PedidoPesquisaService } from '../../../services/pedidos-pesquisa.service';


import { Pedido } from '@/models/pedido-pesquisa.model';

@Component({
  selector: 'app-estoque-expedicao',
  templateUrl: './estoque-expedicao.component.html',
  styleUrls: ['./estoque-expedicao.component.css']
})

export class EstoqueExpedicaoComponent implements OnInit {

  @Input()
  notaOuPedido: boolean;
  visible: boolean = false;
  messages: any[] = [];
  subscription: Subscription;
  valorBotao;
  hoje;
  pedidos ;

  form = new UntypedFormGroup({

    numped: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),

  });
  constructor(private pedidoPesquisaService: PedidoPesquisaService) {}

  ngOnInit(): void {

  }

  pesquisar() {
    this.pedidoPesquisaService.pesquisarPedido({ numped: this.form.value.numped})
      .then(pedidos => this.pedidos = pedidos);
  }
  get f() { return this.form.controls; }


  onKeydown(event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  showDialog() {
    this.visible = true;
  }
}