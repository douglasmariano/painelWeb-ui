import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { PedidoPesquisaService } from './pedidos-pesquisa.service';

@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css',]
})
export class PedidosPesquisaComponent implements OnInit {
  numped: number;
  dataPedidoDe ;
  dataPedidoAte;
  nomeCliente;
  nomeVendedor;
  pedidos=[]; 



  constructor(private pedidoPesquisaService: PedidoPesquisaService,
              private  toasty:ToastyService,
              private  confirmation:ConfirmationService,
              private  route:ActivatedRoute){ }

  ngOnInit(){       
    console.log(this.route.snapshot.params['numped'])
    this.pesquisar();
  }

  pesquisar(){
    this.pedidoPesquisaService.pesquisar({numped :this.numped, dataPedidoDe: this.dataPedidoDe, dataPedidoAte : this.dataPedidoAte, nomeCliente: this.nomeCliente, nomeVendedor : this.nomeVendedor})
        .then(pedidos => this.pedidos = pedidos );
    console.log(this.dataPedidoDe+ '-' +this.dataPedidoAte);
  }

  excluir(pedido: any){
    this.confirmation.confirm(
      {message: 'Tem certeza que deseja excluir',
        accept: ()=>{
          this.pedidoPesquisaService.excluir(pedido.numped ).then(()=>
          this.toasty.success('Excluido com sucesso.'));
        }}
    );
    
  }

  marcarChegada(numped) {
    this.confirmation.confirm(
      {message: 'Deseja informar que o cliente chegou?',
        accept: ()=>{
          this.pedidoPesquisaService.marcarChegada(numped).then(()=>
          this.toasty.success('Dirija o cliente ao Balcão!'));
          location.reload();
        }}
    );
    
  }
}


