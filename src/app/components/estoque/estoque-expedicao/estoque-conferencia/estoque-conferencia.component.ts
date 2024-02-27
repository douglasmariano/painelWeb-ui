import { ConferenteSelectorComponent } from '@/components/seletores/conferente-selector/conferente-selector.component';
import { PedidoExpedicao } from '@/models/pedido-expedicao.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EstoqueExpedicaoService } from '@services/estoque-expedicao.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-estoque-conferencia',
  templateUrl: './estoque-conferencia.component.html',
  styleUrls: ['./estoque-conferencia.component.css'],
})
export class EstoqueConferenciaComponent implements OnInit {

 @ViewChild(ConferenteSelectorComponent) conferenteSelectorComponent: ConferenteSelectorComponent;

  @Input()
  notaOuPedido: boolean;
  visible: boolean = false;
  pedidos: PedidoExpedicao[] = [];
  checked: boolean;
  checkedDisable: boolean;
  formConferencia: UntypedFormGroup;

  form = new UntypedFormGroup({

    numped: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  preencherFormGroup() {
    this.formConferencia = this.fb.group({
      numped: '',
      codfuncbalcao: '',
      datainiciobalcao: '',
      datafimbalcao: '',

      //dtultmovent:[{value: '', }],      
    });
  }
  constructor(private estoqueExpedicaoService: EstoqueExpedicaoService,
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private toasty: ToastrService,
  ) { }

  ngOnInit(): void {
    this.preencherFormGroup()
    this.checked = false;
  }

  get f() { return this.form.controls; }

  pesquisar() {
    const novoPedido = this.form.value.numped;
    if (this.checked != true) {
      this.pedidos = [];
    }
    if (novoPedido) {
      this.estoqueExpedicaoService.pesquisar({ numped: novoPedido })
        .then(pedido => {
          // Verificar se o pedido já existe no array
          if (!this.pedidos.some(p => p.numped === pedido.numped)) {
            this.pedidos.push(pedido);
          }
        });
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

  checkValue(id, event: any) {
    //here I want to recerive the checkbox ID;
    console.log(id + " " + event);
  }
  limparListaPedidos() {
    this.pedidos = [];
    this.conferenteSelectorComponent.limparSelecao();
  }

  removerItem(pedido) {
    let index = this.pedidos.findIndex(item => item.numped === pedido);

    if (index !== -1) {
      this.pedidos.splice(index, 1);
    }

  }
  onConferenteSelecionado(event) {
    this.checkedDisable = true;
    this.formConferencia.patchValue({ codfuncbalcao: event.matricula })
    console.log("Evento Conferência")
  }

  async salvar(event) {
    if (event.submitter.name == "conferir") {
      console.log('conferir');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formConferencia.value.numped = this.pedidos[i].numped;
        this.formConferencia.value.datainiciobalcao = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].codfuncbalcao == null) {

          this.estoqueExpedicaoService.conferencia(this.formConferencia.value);
          if (index !== -1) {
            this.pedidos.splice(index, 1);
          }
          this.toasty.success('Pedido ' + this.formConferencia.value.numped + ' iniciou a conferência.');
          console.log(this.formConferencia.value)
        }

      }
    }
    else if (event.submitter.name == "finalizar") {
      console.log('finalizar');
      for (let i = 0; i < this.pedidos.length; i++) {
        this.formConferencia.value.numped = this.pedidos[i].numped;
        this.formConferencia.value.datainiciobalcao = null;
        this.formConferencia.value.datafimbalcao = new Date;
        let index = this.pedidos.findIndex(item => item.numped === this.pedidos[i].numped);

        if (this.pedidos[i].datafimbalcao != null) {
          this.toasty.info(this.formConferencia.value.numped + ' - Já finalizado.');
        } else {
          if (this.pedidos[i].codfuncbalcao != null) {
            if (this.pedidos[i].codfuncbalcao != this.formConferencia.value.codfuncbalcao) {
              const confirmacao = await this.confirmarItem(this.pedidos[i].codfuncbalcao);
              if (confirmacao) {
                this.estoqueExpedicaoService.conferencia(this.formConferencia.value);
                this.toasty.warning(this.formConferencia.value.numped + ' - Conferentia alterado.');
                this.toasty.success('Pedido ' + this.formConferencia.value.numped + ' finalizou a conferência.');
                if (index !== -1) {
                  this.pedidos.splice(index, 1);
                }
              } else {
                this.toasty.info(this.formConferencia.value.numped + ' - Não alterado.');
              }
            } else {
              this.estoqueExpedicaoService.conferencia(this.formConferencia.value);
              this.toasty.success('Pedido ' + this.formConferencia.value.numped + ' finalizou a conferência.');
              if (index !== -1) {
                this.pedidos.splice(index, 1);
              }
              console.log(this.formConferencia.value)
            }
            this.salvar("finalizar");
          }
        }
      }
    }
    this.conferenteSelectorComponent.limparSelecao();
  }

  async confirmarItem(item): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.confirmationService.confirm(
        {
          message: 'Pedido ' + this.formConferencia.value.numped + ' foi iniciado por outro conferente - ' + item + '. Deseja alterar o conferente?',
          accept: () => {
            resolve(true);
          },
          reject: () => {
            resolve(false);
          }
        }
      );
    });
  }

}
