import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoPesquisaService } from './pedidos-pesquisa.service';



@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css',]
})
export class PedidosPesquisaComponent implements OnInit {
  pedidos=[]; 

  buscaPedido = new FormGroup({
   
    nomeCliente: new FormControl(''),
    nomeVendedor: new FormControl(''),
    numped: new FormControl('',[Validators.pattern("^[0-9]*$")]),
  });


  constructor(private pedidoPesquisaService: PedidoPesquisaService,
              private  toasty:ToastyService,
              private  confirmation:ConfirmationService,
              ){ }

  ngOnInit(){ 
    this.pesquisar();
  }

  get f() { return this.buscaPedido.controls; }

  pesquisar(){
    this.pedidoPesquisaService.pesquisar({numped :this.buscaPedido.value.numped,  nomeCliente: this.buscaPedido.value.nomeCliente ,
        nomeVendedor : this.buscaPedido.value.nomeVendedor})
        .then(pedidos => this.pedidos = pedidos );          
  }
  limparBusca(){
    this.buscaPedido.reset();
    this.pesquisar();
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
    console.log(numped)
    this.confirmation.confirm(
      {message: 'Deseja informar que o cliente chegou?',
        accept: () => {
          this.pedidoPesquisaService.marcarChegada(numped).then(()=> {
            this.toasty.success('Dirija o cliente ao Balcão!')
            this.pesquisar();
          });
        }}
    );
    
  }
}


