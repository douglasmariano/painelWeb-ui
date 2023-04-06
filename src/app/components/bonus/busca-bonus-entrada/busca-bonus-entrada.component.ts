import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BuscaBonusEntradaService } from '../../../services/busca-bonus-entrada.service';

@Component({
  selector: 'app-busca-bonus-entrada',
  templateUrl: './busca-bonus-entrada.component.html',
  styleUrls: ['./busca-bonus-entrada.component.css']
})
export class BuscaBonusEntradaComponent implements OnInit {
  
  @Input()
  bonus: string;
  bonusEntrada = [];

  bonusEntradaForm = new UntypedFormGroup({

    numbonus: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),
    databonus: new UntypedFormControl(''),
    dtfechamento: new UntypedFormControl(''),

  });

  constructor(private bonusEntradaMercadoria: BuscaBonusEntradaService,
    private  toasty:ToastrService,
    private  confirmation:ConfirmationService,
    private router: Router,) { }

  ngOnInit(): void {
   //this.pesquisar()
  }

  get f() { return this.bonusEntradaForm.controls; }

  pesquisar() {
    this.bonusEntradaMercadoria.pesquisar({ numbonus: this.bonusEntradaForm.value.numbonus, databonus : this.bonusEntradaForm.value.databonus, dtfechamento: this.bonusEntradaForm.value.dtfechamento }).then(bonusEntrada => this.bonusEntrada = bonusEntrada);    
    //console.log(this.bonusEntradaForm.value.numbonus)
  }
  
  buscarItensBonus(numbonus){
    this.router.navigateByUrl(`/buscar-item-entrada/` + numbonus)  
  }
  incluirItensBonus(){
    this.router.navigateByUrl(`/incluir-item-bonus`)  
  }

  excluir(bonusEntrada: any){
    this.confirmation.confirm(
      {message: 'Tem certeza que deseja excluir',
        accept: async () => {
          //await this.bonusEntradaMercadoria.excluir(bonusEntrada.numbonus )
          this.toasty.warning('Excluido com sucesso.');
          this.pesquisar()
        }}
        
    );
  }

}
