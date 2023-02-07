import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoPesquisaService } from '../../services/pedidos-pesquisa.service';



@Component({
  selector: 'app-pedidos-pesquisa',
  templateUrl: './pedidos-pesquisa.component.html',
  styleUrls: ['./pedidos-pesquisa.component.css',]
})
export class PedidosPesquisaComponent implements OnInit {
  pedidos=[]; 
  buttonDisabled: boolean;

  cobranca = [
          { label: 'BANCO DO BRADESCO', value: '237' },
          { label: 'BANCO DO BRASIL - COB.BANCARIA', value: '001' },
          { label: 'CHEQUE EM TRANSITO', value: 'CH' },
          { label: 'BONIFICACAO', value: 'BNF' },
          { label: 'CARTAO CREDITO/DEBITO', value: 'CAR' },
          { label: 'CHEQUE PRE DATADO', value: 'CHP' },
          { label: 'CHEQUES A VISTA', value: 'CHV' },
          { label: 'DINHEIRO', value: 'D' },
          { label: 'DEPOSITO EM CONTA CORRENTE', value: 'DEP' },
          { label: 'DESCONTO CONCEDIDO', value: 'DESC' },
          { label: 'DINHEIRO/CHEQUE EM TRANSITO', value: 'DH' },
          { label: 'CREDITO DE CLIENTE', value: 'CRED' },
          { label: 'CARTAO MASTER CREDITO', value: 'MCRE' },
          { label: 'CARTAO MASTER DEBITO', value: 'MDEB' },
          { label: 'CARTAO VISA CREDITO', value: 'VCRE' },
          { label: 'CARTAO VISA DEBITO', value: 'VDEB' },
          { label: 'MASTER A RECEBER', value: 'MREC' },
          { label: 'VISA A RECEBER', value: 'VREC' },
          { label: 'CARTAO DE CREDITO ILUMINACAO', value: 'ILU' },
          { label: 'BNDES A RECEBER', value: 'BREC' },
          { label: 'ORCAMENTO', value: 'ORC' },
          { label: 'DUPLICATA INTERNA', value: 'DI' },
          { label: 'BOLETO BANCARIO', value: 'BK' },
          { label: 'CARTAO HIPERCARD CREDITO', value: 'HIPC' },
          { label: 'CARTAO HIPERCARD DEBITO', value: 'HIPD' },
          { label: 'CARTAO AMERICAN EXPRESS CREDIT', value: 'AMEC' },
          { label: 'BANCO SANTANDER', value: '033' },
          { label: 'CARTAO BNDES VISA', value: 'BDSV' },
          { label: 'CARTAO BNDES MASTERCARD', value: 'BDSM' },
          { label: 'CARTAO BNDES ELO', value: 'BDSE' },
          { label: 'SENT', value: 'SENT' },
          { label: 'CARTAO DINNERS CREDIT', value: 'DINN' },
          { label: 'COBRANÇA JURIDICA', value: 'JURI' },
          { label: 'CARTAO DEBITO A RECEBER', value: 'CARD' },
          { label: 'CARTAO DE CREDITO A RECEBER', value: 'CARC' },
          { label: 'CARTAO ELO CREDITO', value: 'ELOC' },
          { label: 'CARTAO ELO DEBITO', value: 'ELOD' }
  ];
 
 
  buscaPedido = new FormGroup({
   
    nomeCliente: new FormControl(''),
    nomeVendedor: new FormControl(''),
    numped: new FormControl('',[Validators.pattern("^[0-9]*$")]),
  });


  constructor(private pedidoPesquisaService: PedidoPesquisaService,
              private  toasty:ToastyService,
              private  confirmation:ConfirmationService,
              ){  }

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
    //console.log(numped)
    this.confirmation.confirm(
      {message: 'Deseja informar que o cliente chegou?',
        rejectButtonStyleClass:'p-button-danger',
        accept: () => {
          this.pedidoPesquisaService.marcarChegada(numped).then(()=> {
            this.toasty.success('Dirija o cliente ao Balcão!')
            this.pesquisar();
          });
        }}
    );
    
  }
}


