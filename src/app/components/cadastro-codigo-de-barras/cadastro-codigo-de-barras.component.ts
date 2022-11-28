import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { BuscaItemBonusComponent } from '../busca-item-bonus/busca-item-bonus.component';


import { CadastroCodigoDeBarrasService } from '../../services/cadastro-codigo-de-barras.service';


@Component({
  selector: 'app-cadastro-codigo-de-barras',
  templateUrl: './cadastro-codigo-de-barras.component.html',
  styleUrls: ['./cadastro-codigo-de-barras.component.css']
})



export class CadastroCodigoDeBarrasComponent implements OnInit {
 
  @Input()
  codprod:number;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private cadastroCodigoDeBarrasService: CadastroCodigoDeBarrasService, 
    private buscaItemComponente: BuscaItemBonusComponent,   
    private toasty: ToastyService,
    private route: ActivatedRoute    ) {

      this.formDeCodigo();
      
  }
    
  @ViewChild('codprod')  elementRef: ElementRef;
 

  AfterViewInit() {
    
  }
  ngOnInit(): void {
    this.form.patchValue({
      codprod: this.codprod,      
    }); 
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
      codprod: [{value: this.codprod},[Validators.required, Validators.pattern('^[0-9]*$')]],
      codbarra: [null,[Validators.required]]
    });
   } 
 
}
