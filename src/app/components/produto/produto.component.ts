
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import {DropdownModule} from 'primeng/dropdown';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  
  produtos = [];

  buscaProduto = new FormGroup({
    codprod: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    descricao: new FormControl('', []),
    marcas: new FormControl([]),
    codfab: new FormControl('', []),
  });

  constructor(private produtoService: ProdutoService, ) {  }

  ngOnInit(): void {
    //this.pesquisar();    
  }
  limparBusca() : void {
    window.location.reload();   
  }

  onMarcaSelecionada(event) {
    this.buscaProduto.patchValue({marcas: event})
    console.log(this.buscaProduto.value)
  }

  get f() { return this.buscaProduto.controls; }

  pesquisar() {
    if (this.buscaProduto.value.codprod === ""){
      this.produtoService.pesquisar({ ...this.buscaProduto.value })
      .then(produtos => this.produtos = produtos);
    }else{
      this.produtoService.pesquisar({ ...this.buscaProduto.value })
      .then(produtos => this.produtos = [produtos]);
      }
    }
}
