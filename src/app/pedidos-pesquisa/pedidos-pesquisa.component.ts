import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {

  pedidos= [];

  ngOnInit(){
    this.pesquisar();
  }

  constructor(private pedidoService: PedidoService){ }
    pesquisar(){
      this.pedidoService.pesquisar()
      .then(pedidos => this.pedidos = pedidos );
    }
  }


