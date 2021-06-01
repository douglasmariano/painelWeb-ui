import { Component, Input, OnInit } from '@angular/core';
import { EstoqueDetalheService } from './estoque-detalhe.service';

@Component({
  selector: 'app-estoque-detalhe',
  templateUrl: './estoque-detalhe.component.html',
  styleUrls: ['./estoque-detalhe.component.css']
})
export class EstoqueDetalheComponent implements OnInit {

  @Input()
  codprod: string;

  produtoEstoqueSelecionado;
  produtoEstoque: any;
  dialogVisible: boolean = false;
  constructor(private estoqueDetalheService: EstoqueDetalheService,) { }

  ngOnInit(): void {
    this.pesquisar();    
  }

  pesquisar() {
    this.estoqueDetalheService.pesquisar({ codprod: this.codprod })
      .then(produtoEstoque => this.produtoEstoque = produtoEstoque);
  }

  limparEstoqueSelecionado(){
    this.produtoEstoqueSelecionado = null;
  }

  showDialog(produtoEstoque) {
    this.produtoEstoqueSelecionado = produtoEstoque
    this.dialogVisible = true;
  }
}
