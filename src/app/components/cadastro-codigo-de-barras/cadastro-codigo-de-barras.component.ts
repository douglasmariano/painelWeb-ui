import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastroCodigoDeBarrasService } from '../../services/cadastro-codigo-de-barras.service';
import { BuscaItemBonusComponent } from '../bonus/busca-item-bonus/busca-item-bonus.component';


@Component({
  selector: 'app-cadastro-codigo-de-barras',
  templateUrl: './cadastro-codigo-de-barras.component.html',
  styleUrls: ['./cadastro-codigo-de-barras.component.css']
})

export class CadastroCodigoDeBarrasComponent implements OnInit {
 
  @Input()
  barrasUnitario: boolean;
  @Input()
  codigoSelecionado;
  @Input()
  numbonus;
  
  form: UntypedFormGroup;

  constructor(private fb: FormBuilder,
    private cadastroCodigoDeBarrasService: CadastroCodigoDeBarrasService,
    private buscaItemComponente: BuscaItemBonusComponent,
    private toasty: ToastrService,) {
    this.formDeCodigo();
  }

  
  ngOnInit(): void {
    if(this.barrasUnitario == false){
      this.form.patchValue({
        codprod: this.codigoSelecionado.id.codprod,
        codauxiliar: this.codigoSelecionado.codauxiliar,
      }); 
    } else{
      this.form.patchValue({
        codprod: this.codigoSelecionado.id.codprod,
        codauxiliar2: this.codigoSelecionado.codauxiliar2,
      }); 
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.codigoSelecionado) {
      if(this.barrasUnitario == false){
        this.form.patchValue({
          codprod: this.codigoSelecionado.id.codprod,
          codauxiliar: this.codigoSelecionado.codauxiliar,
        }); 
      } else{
        this.form.patchValue({
          codprod: this.codigoSelecionado.id.codprod,
          codauxiliar2: this.codigoSelecionado.codauxiliar2,
        }); 
      }
    }    
  }

  get f() {return this.form.controls;}

  salvar() {
    this.cadastroCodigoDeBarrasService.atualizar(this.form.controls.codprod.value, this.form.controls.codauxiliar.value, this.form.controls.codauxiliar2.value ).then(() => {
      this.toasty.success('Cadastrado com sucesso');
    })
    this.formDeCodigo();
    //this.elementRef.nativeElement.focus()
    this.buscaItemComponente.dialogVisible = false;  
    this.buscaItemComponente.carregarBonus(this.numbonus);
  }
  

  onKeydown(event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  formDeCodigo() {
    this.form = this.fb.group({
      codprod: [{ value: this.codigoSelecionado, disabled: true }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      codauxiliar: [null, [Validators.required]],
      codauxiliar2: [null, [Validators.required]]
    });
  }
}
