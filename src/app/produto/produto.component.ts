
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {
  
  produtos = [];

  buscaProduto = new FormGroup({

    codprod: new FormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  constructor(private produtoService: ProdutoService,) { }

  ngOnInit(): void {
    //this.pesquisar();    
  }

  get f() { return this.buscaProduto.controls; }

  pesquisar() {
    this.produtoService.pesquisar({ codprod: this.buscaProduto.value.codprod })
      .then(produtos => this.produtos = produtos);
    console.log(this.buscaProduto.value.codprod)
  }
}
