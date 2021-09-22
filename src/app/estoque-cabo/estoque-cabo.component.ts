import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from './estoquecabo.service';

@Component({
  selector: 'app-estoque-cabo',
  templateUrl: './estoque-cabo.component.html',
  styleUrls: ['./estoque-cabo.component.css']
})
export class EstoqueCaboComponent implements OnInit {

  @Input()
  extratoCodprod: string;
  estoqueCabo = [];

  buscaCabo = new FormGroup({

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
    this.estoqueCaboService.pesquisar({ codprod: this.buscaCabo.value.codprod }).then(estoqueCabo => this.estoqueCabo = estoqueCabo);    
    console.log(this.buscaCabo)
  }

  excluir(estoqueCabo: any){
    this.confirmation.confirm(
      {message: 'Tem certeza que deseja excluir',
        accept: async () => {
          await this.estoqueCaboService.excluir(estoqueCabo.codendcabo )
          this.toasty.warning('Excluido com sucesso.');
          this.pesquisar()
        }}
        
    );
  }
}
