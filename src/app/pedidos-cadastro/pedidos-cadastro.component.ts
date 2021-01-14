import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Pedido } from '../pedidos-pesquisa/model';
import { PedidoPesquisaService } from '../pedidos-pesquisa/pedidos-pesquisa.service';

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {

  status=[
    {label:'Digitado', value: 'N'},
    {label:'Aguardando Cliente', value: 'A'},
    {label:'Balcão', value: 'B'},
    {label:'Em Separação', value: 'E'},
    {label:'Finalizar', value: 'L'},
    {label:'Conferência', value: 'F'},
    {label:'Caixa', value: 'X'},
    {label:'Pacote', value: 'P'},
    {label:'Cancelado', value: 'C'},
    {label:'Retira', value: 'R'},
    {label:'Corte', value: 'T'},
    {label:'Chamar Cliente', value: 'H'},
    {label:'Finalizado', value: 'Z'},
    {label:'Envio Balcão Vendedor', value: 'V'}
     ];

     simOuNao=[
      {label:'Sim', value: 'S'},
      {label:'Não', value: 'N'},    
       ];

       pedido = new Pedido();

  constructor(private  route:ActivatedRoute,
              private pedidoService:PedidoPesquisaService,
              private toasty:ToastyService ) { }

  ngOnInit(): void {
   
    const numPedido = this.route.snapshot.params['numped'];

    if(numPedido){
      this.carregarPedido(numPedido);
    }

  }
  carregarPedido(numped:number){
    this.pedidoService.pesquisar(numped)
    .then(pedido => {this.pedido = pedido;
    })
  }
  salvar(form:FormControl){
    this.pedidoService.adicionar(this.pedido).then(() =>{
      this.toasty.success('Cadastrado com sucesso');
      form.reset();
      this.pedido = new Pedido();
    })
  }

}
