import { PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EstoqueExpedicaoService } from '@services/estoque-expedicao.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';

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
      numped:                 '',
      codfuncsep:             '',
      datainiciosep:          '',
      datafimsep:             '',      
      
      //dtultmovent:[{value: '', }],      
    });
  }
  constructor(private estoqueExpedicaoService: EstoqueExpedicaoService,
              private fb : UntypedFormBuilder,
              private confirmationService: ConfirmationService,   
              private toasty:ToastrService,            
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

  async salvar(event) {
    if (event.submitter.name == "separar") {
      console.log('separar');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formSeparacao.value.numped = this.pedidos[i].numped;
        this.formSeparacao.value.datainiciosep = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].codfuncsep == null) {
        
          this.estoqueExpedicaoService.separacao(this.formSeparacao.value);
          if (index !== -1) {
            this.pedidos.splice(index, 1);
          }
          this.toasty.success( 'Pedido '+ this.formSeparacao.value.numped + ' iniciou a separação.');
          console.log(this.formSeparacao.value)
        }
        
      }
    }
    else if (event.submitter.name == "finalizar") {
      console.log('finalizar');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formSeparacao.value.numped = this.pedidos[i].numped;
        this.formSeparacao.value.datainiciosep = null;
        this.formSeparacao.value.datafimsep = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].codfuncsep != null) {
          if(this.pedidos[i].codfuncsep != this.formSeparacao.value.codfuncsep){
            const confirmacao = await this.confirmarItem(this.pedidos[i].codfuncsep);
            if (confirmacao) {
              this.estoqueExpedicaoService.separacao(this.formSeparacao.value);
              this.toasty.warning(this.formSeparacao.value.numped + ' - Separador alterado.');
              this.toasty.success( 'Pedido '+ this.formSeparacao.value.numped + ' finalizou a separação.');    
              if (index !== -1) {
                this.pedidos.splice(index, 1);
              } 
            } else {
              this.toasty.info(this.formSeparacao.value.numped + ' - Não alterado.');
            }
          } else{
            this.estoqueExpedicaoService.separacao(this.formSeparacao.value);
            this.toasty.success( 'Pedido '+ this.formSeparacao.value.numped + ' finalizou a separação.');
              if (index !== -1) {
                this.pedidos.splice(index, 1);
              } 
            console.log(this.formSeparacao.value)
          }        
          this.salvar("finalizar");
        }
      }
    }
  }

  async confirmarItem(item): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm(
        {message: 'Pedido '+this.formSeparacao.value.numped+' foi iniciado por outro separador - '+ item + '. Deseja alterar o separador?',
          accept:  () => {
            resolve(true);              
          },
          reject:  () =>{
            resolve(false);
          }                
          }                
      );
    });
  }

}
