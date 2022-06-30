import { Component, OnInit } from '@angular/core';
import { PainelAcompamentoPedidosService } from './painel-acompamento-pedidos.service';


@Component({
  selector: 'app-painel-acompamento-pedidos',
  templateUrl: './painel-acompamento-pedidos.component.html',
  styleUrls: ['./painel-acompamento-pedidos.component.css']
})
export class PainelAcompamentoPedidosComponent implements OnInit {
 
  painelAcompanhaPedidos = [];

  onKeydown(event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
 
  ngOnInit() {
    this.pesquisar();
  }

  constructor(private painelAcompanhaPedidoService : PainelAcompamentoPedidosService) {
    
   }
    pesquisar(){
      this.painelAcompanhaPedidoService.pesquisar()
      .then(painelAcompanhaPedido => this.painelAcompanhaPedidos = painelAcompanhaPedido );
    }

    calculateCustomerTotal(numped) {
      let total = 0;

      if (this.painelAcompanhaPedidos) {
          for (let painelAcompanhaPedido of this.painelAcompanhaPedidos) {
              if (painelAcompanhaPedido.numped === numped) {
                  total++;
              }
          }
      }

      return total;
  }
}
