import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CadastroCodigoDeBarrasService } from '../../services/cadastro-codigo-de-barras.service';
import { BuscaItemBonusComponent } from '../busca-item-bonus/busca-item-bonus.component';


@Component({
  selector: 'app-cadastro-codigo-de-barras',
  templateUrl: './cadastro-codigo-de-barras.component.html',
  styleUrls: ['./cadastro-codigo-de-barras.component.css']
})

export class CadastroCodigoDeBarrasComponent implements OnInit {

  @Input()
  codigoSelecionado: number;
  form: UntypedFormGroup;

  constructor(private fb: FormBuilder,
    private cadastroCodigoDeBarrasService: CadastroCodigoDeBarrasService,
    private buscaItemComponente: BuscaItemBonusComponent,
    private toasty: ToastrService,) {
    this.formDeCodigo();
  }

  @ViewChild('codigoSelecionado') elementRef: ElementRef;

  AfterViewInit() {
    console.log("AfterViewInit")
  }

  ngOnInit(): void {
    this.form.patchValue({
      codprod: this.codigoSelecionado,
    });
    console.log("init" + this.codigoSelecionado)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.codigoSelecionado) {
      this.form.patchValue({
        codprod: this.codigoSelecionado     
      });
    }
  }

  get f() {return this.form.controls;}

  salvar() {
    this.cadastroCodigoDeBarrasService.atualizar(this.form.controls.codprod.value, this.form.controls.codauxiliar.value ).then(() => {
      this.toasty.success('Cadastrado com sucesso');
    })
    this.formDeCodigo();
    //this.elementRef.nativeElement.focus()
    this.buscaItemComponente.dialogVisible = false;
    this.buscaItemComponente.ngOnInit();

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
      codauxiliar: [null, [Validators.required]]
    });
  }
}
