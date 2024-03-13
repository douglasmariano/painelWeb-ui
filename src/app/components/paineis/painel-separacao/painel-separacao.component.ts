import { Component, OnDestroy, OnInit } from '@angular/core';
import { PainelAcompamentoPedidosService } from '../../../services/painel-acompamento-pedidos.service';
@Component({
  selector: 'app-painel-separacao',
  templateUrl: './painel-separacao.component.html',
  styleUrls: ['./painel-separacao.component.css']
})

export class PainelSeparacaoComponent implements OnInit, OnDestroy {  
  
  ngOnInit(): void {
    
    this.pesquisarPainelSeparacao();
    this.intervalId = setInterval(() => {
      this.pesquisarPainelSeparacao();
    }, 60000); 
  }
  painelAcompanhaSeparacao = [];

  intervalId: any;
 
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  constructor(private painelAcompanhaPedidoService: PainelAcompamentoPedidosService){

  }


  async pesquisarPainelSeparacao() {
    await this.painelAcompanhaPedidoService.pesquisarPainelSeparacao()
      .then(painelAcompanhaSeparacao => this.painelAcompanhaSeparacao = painelAcompanhaSeparacao)
  }
}
