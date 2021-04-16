import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstoqueCaboService } from './estoquecabo.service';

@Component({
  selector: 'app-estoque-cabo',
  templateUrl: './estoque-cabo.component.html',
  styleUrls: ['./estoque-cabo.component.css']
})
export class EstoqueCaboComponent implements OnInit {

  estoqueCabo = [];

  buscaCabo = new FormGroup({

    codprod: new FormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  constructor(private estoqueCaboService: EstoqueCaboService,) { }

  ngOnInit(): void {
    this.pesquisar();
    console.log(this.estoqueCabo);
  }

  get f() { return this.buscaCabo.controls; }

  pesquisar() {
    this.estoqueCaboService.pesquisar({ codprod: this.buscaCabo.value.codprod })
      .then(estoqueCabo => this.estoqueCabo = estoqueCabo);
    console.log(this.buscaCabo.value.codprod)
  }

}
