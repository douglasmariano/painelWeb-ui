import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from '../../services/estoque-cabo.service';

@Component({
  selector: 'app-estoque-cabo',
  templateUrl: './estoque-cabo.component.html',
  styleUrls: ['./estoque-cabo.component.css']
})
export class EstoqueCaboComponent implements OnInit {

  @Input()
  extratoCodprod: string;
  estoqueCabo = [];
  estoqueProduto = [];

  buscaCabo = new FormGroup({

    codprod_pcprodut: new FormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  buscaProduto = new FormGroup({

    codprod: new FormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  constructor(private estoqueCaboService: EstoqueCaboService,
    private  toasty:ToastyService,
    private  confirmation:ConfirmationService) { }

  ngOnInit(): void {
   this.pesquisar()
  }

  get f() { return this.buscaCabo.controls; }

  pesquisar() {
    this.estoqueCaboService.pesquisar({ codprod_pcprodut: this.buscaCabo.value.codprod_pcprodut }).then(estoqueCabo => this.estoqueCabo = estoqueCabo);    
    //console.log(this.buscaCabo)
  }
  pesquisarProduto() {
    this.estoqueCaboService.pesquisarProduto({ codprod_pcprodut: this.buscaProduto.value.codprod_pcprodut }).then(estoqueProduto => this.estoqueProduto = estoqueProduto);    
    //console.log(this.estoqueProduto)
  }

  excluir(estoqueCabo: any){
    this.confirmation.confirm(
      {message: 'Tem certeza que deseja excluir',
        accept: async () => {
          await this.estoqueCaboService.excluir(estoqueCabo.codcabo )
          this.toasty.warning('Excluido com sucesso.');
          this.pesquisar()
        }}
        
    );
  }
}
