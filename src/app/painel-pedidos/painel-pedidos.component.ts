import { Component, OnInit } from '@angular/core';
import { PainelPedidosService } from  './painel-pedidos.service';
@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit {

  pedidos=[];
  interval;

  ngOnInit(){
    
    this.pesquisar();
    this.interval = setInterval(() => { 
        this.pesquisar(); 
    }, 3000);
  }

  constructor(private painelPedidosService: PainelPedidosService){ }
    pesquisar(){
      this.painelPedidosService.pesquisar()
      .then(pedidos => this.pedidos = pedidos );
    }
  }

