import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { PainelPedidosService } from '../../../services/painel-pedidos.service';
@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit, OnDestroy {

  pedidos=[];
  interval;

  constructor(
    private painelPedidosService: PainelPedidosService){
  }
  
  ngOnInit(){
    this.pesquisar();
    this.interval = setInterval(() => { 
        this.pesquisar(); 
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

  pesquisar(){
    this.painelPedidosService.pesquisar()
    .then(pedidos => this.pedidos = pedidos );
  }
  
}

