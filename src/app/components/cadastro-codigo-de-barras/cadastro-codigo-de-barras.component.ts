import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BuscaItemBonusComponent } from '../busca-item-bonus/busca-item-bonus.component';


import { CadastroCodigoDeBarrasService } from '../../services/cadastro-codigo-de-barras.service';


@Component({
  selector: 'app-cadastro-codigo-de-barras',
  templateUrl: './cadastro-codigo-de-barras.component.html',
  styleUrls: ['./cadastro-codigo-de-barras.component.css']
})



export class CadastroCodigoDeBarrasComponent implements OnInit {
 
  @Input()
  codigoSelecionado:number;
  form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
    private cadastroCodigoDeBarrasService: CadastroCodigoDeBarrasService, 
    private buscaItemComponente: BuscaItemBonusComponent,   
    private toasty: ToastrService,
    private route: ActivatedRoute    ) {

      this.formDeCodigo();
      
  }
    
  @ViewChild('codigoSelecionado')  elementRef: ElementRef;
 

  AfterViewInit() {
    
  }
  ngOnInit(): void {
    this.form.patchValue({
      codprod: this.codigoSelecionado,      
    }); 
    console.log(this.codigoSelecionado)
  }
 
   
  get f() {
    return this.form.controls;
  }

  salvar() {
    this.cadastroCodigoDeBarrasService.adicionar(this.form.value).then(() => {
      this.toasty.success('Cadastrado com sucesso');
    })
    this.formDeCodigo();
    this.elementRef.nativeElement.focus()
    this.buscaItemComponente.dialogVisible = false;
    
  }



  onKeydown(event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }
 
  formDeCodigo(){
    this.form = this.fb.group({
      codprod: [{value: this.codigoSelecionado},[Validators.required, Validators.pattern('^[0-9]*$')]],
      codbarra: [null,[Validators.required]]
    });
   } 
 
}
