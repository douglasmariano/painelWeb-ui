import { PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EstoqueExpedicaoService } from '@services/estoque-expedicao.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService,ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-estoque-separacao',
  templateUrl: './estoque-separacao.component.html',
  styleUrls: ['./estoque-separacao.component.css'], 
  providers:[MessageService] 
})
export class EstoqueSeparacaoComponent implements OnInit{

  
  @Input()
  notaOuPedido: boolean;
  visible: boolean = false;
  pedidos : PedidoExpedicao[] = [];
  checked: boolean ;
  checkedDisable: boolean ;
  formSeparacao: UntypedFormGroup;

  form = new UntypedFormGroup({

    numped: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  preencherFormGroup() {
    this.formSeparacao = this.fb.group({
      numped:         '',
      codfuncsep:            '',
      datainiciosep:            '',
      datafimsep:            '',      
      
      //dtultmovent:[{value: '', }],      
    });
  }
  constructor(private estoqueExpedicaoService: EstoqueExpedicaoService,
              private fb : UntypedFormBuilder,
              private confirmationService: ConfirmationService,   
              private  toasty:ToastrService,            
              ) {}

  ngOnInit(): void {
    this.preencherFormGroup()
    this.checked = true;
  }

  get f() { return this.form.controls; }
  
  pesquisar() { 
    const novoPedido = this.form.value.numped;  
    if(this.checked != true) {
    this.pedidos = []; 
    }
    if( novoPedido ){
      this.estoqueExpedicaoService.pesquisar({ numped: novoPedido})
      .then(pedido => {
        // Verificar se o pedido já existe no array
        if (!this.pedidos.some(p => p.numped === pedido.numped)) {
          this.pedidos.push(pedido);
        }
      } );
      console.log(this.pedidos)
      this.f.numped.reset();
    }
    
  }

  onKeydown(event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();      
    }
  }

  showDialog() {
    this.visible = true;
  }

  checkValue(id,event: any){
    //here I want to recerive the checkbox ID;
    console.log(id+ " " + event);
  }
  limparListaPedidos(){
    this.pedidos = []; 
  }

  removerItem(pedido){
    let index = this.pedidos.findIndex(item => item.numped === pedido);

    if (index !== -1) {
      this.pedidos.splice(index, 1);
    }
    
  }
  onSeparadorSelecionado(event) {
    this.checkedDisable = true;
    this.formSeparacao.patchValue({      codfuncsep:               event.matricula})
                                          console.log("Evento Separador")
  }

  salvar(event) {
    if (event.submitter.name == "separar") {
      console.log('separar');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formSeparacao.value.numped = this.pedidos[i].numped;
        this.formSeparacao.value.datainiciosep = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].codfuncsep == null) {
        
          this.estoqueExpedicaoService.separacao(this.formSeparacao.value);
          console.log(this.formSeparacao.value)
        }
        if (index !== -1) {
          this.pedidos.splice(index, 1);
        }
        this.toasty.success( 'Pedido '+ this.formSeparacao.value.numped + ' iniciou a separação.');
      }
    }
    else if (event.submitter.name == "finalizar") {
      console.log('finalizar');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formSeparacao.value.numped = this.pedidos[i].numped;
        this.formSeparacao.value.datafimsep = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].codfuncsep != null) {
          if(this.pedidos[i].codfuncsep != this.formSeparacao.value.codfuncsep){
            this.confirmationService.confirm(
              {message: 'Pedido '+this.formSeparacao.value.numped+' foi iniciado por outro separador - '+ this.pedidos[i].codfuncsep + '. Deseja alterar o separador?',
                accept: async () => {
                  //await this.bonusEntradaMercadoria.excluir(bonusEntrada.numbonus )
                  this.toasty.warning(this.formSeparacao.value.numped + ' - Separador alterado.');
                  if (index !== -1) {
                    this.pedidos.splice(index, 1);
                  }                 
                },
                reject: async () =>{
                  this.toasty.info(this.formSeparacao.value.numped + ' - Não alterado alterado.');
                }                
                }                
            );
          } 
          this.estoqueExpedicaoService.separacao(this.formSeparacao.value);
          this.toasty.success( 'Pedido '+ this.formSeparacao.value.numped + ' finalizou a separação.');
          if (index !== -1) {
            this.pedidos.splice(index, 1);
          } 
          console.log(this.formSeparacao.value)
        }
      }
    }
  }

}
