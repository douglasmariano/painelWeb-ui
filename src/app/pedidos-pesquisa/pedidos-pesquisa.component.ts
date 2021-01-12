import { Component, OnInit } from '@angular/core';
import { PedidoPesquisaService } from './pedidos-pesquisa.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css']
})
export class PedidosPesquisaComponent implements OnInit {
  numped: number;
  dataPedidoDe ;
  dataPedidoAte;
  nomeCliente;
  nomeVendedor;
  pedidos=[]; 



  constructor(private pedidoPesquisaService: PedidoPesquisaService){ }

  ngOnInit(){       
    this.pesquisar();
  }

  pesquisar(){
    this.pedidoPesquisaService.pesquisar({numped :this.numped, dataPedidoDe: this.dataPedidoDe, dataPedidoAte : this.dataPedidoAte, nomeCliente: this.nomeCliente, nomeVendedor : this.nomeVendedor})
        .then(pedidos => this.pedidos = pedidos );
    console.log(this.dataPedidoDe+ '-' +this.dataPedidoAte);
  }
}


