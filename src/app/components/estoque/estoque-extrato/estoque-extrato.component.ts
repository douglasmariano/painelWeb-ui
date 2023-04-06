import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {  EstoqueExtratoService } from '../../../services/estoque-extrato.service';


@Component({
  selector: 'app-estoque-extrato',
  templateUrl: './estoque-extrato.component.html',
  styleUrls: ['./estoque-extrato.component.css']
})
export class EstoqueExtratoComponent implements OnInit {  

  @Input()
  codprod: string;
  @Input()
  codfilial: string;

  extratoProduto: any;
  constructor(private estoqueExtratoService: EstoqueExtratoService,) { }

  
  ngOnChanges(changes: SimpleChanges) {
    
  }

  ngOnInit(): void {
    this.pesquisar();    
  }

  pesquisar() {
    this.estoqueExtratoService.pesquisar({ codprod: this.codprod , codfilial: this.codfilial})
      .then(extratoProduto => this.extratoProduto = extratoProduto);
  }
}
