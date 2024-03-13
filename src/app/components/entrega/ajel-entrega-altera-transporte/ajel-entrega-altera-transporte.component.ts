import { AjelEntrega } from '@/models/ajel-entrega.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AjelEntregaService } from '../../../services/ajel-entrega.service';

@Component({
  selector: 'app-ajel-entrega-altera-transporte',
  templateUrl: './ajel-entrega-altera-transporte.component.html',
  styleUrls: ['./ajel-entrega-altera-transporte.component.css']
})
export class AjelEntregaAlteraTransporteComponent implements OnInit {


  formEntregaReducao: UntypedFormGroup;
  ajelEntregaCadastro: UntypedFormGroup;
  entregas: AjelEntrega[] = [];
  arraysInternos = [];
  buscaAjelEntrega = new UntypedFormGroup({
    codentrega: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")])
  });

  @Input() codentrega;

  @Output() onVisible = new EventEmitter<any>();

  constructor(
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastrService,
    private fb: UntypedFormBuilder,
  ) {

  }

  childEnabled: boolean;
  childEnabled2: boolean;

  form = new UntypedFormGroup({

    numnota: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  ngOnInit(): void {

    this.preencherFormGroup();
    this.carregarAjelEntrega(this.codentrega);
    this.carregarAjelReducao(this.codentrega);
    this.preencherFormGroupEntrega();
  }

  preencherFormGroup() {
    this.ajelEntregaCadastro = this.fb.group({
      codentrega: '',
      dtentrega: '',
      codfornecfrete: '',
      fornecedor: '',
      codmotorista: '',
      codfuncconf: '',
      nomeconf: '',
      numvolume: '',
      obsdoentregador: '',
      nomemotorista: '',
      local: '',
    });
  }

  preencherFormGroupEntrega() {
    this.formEntregaReducao = this.fb.group({
      id:{codentrega:         '',
          numnota:            '',
          codfilial:          ''
        },     
      codusur:            '',
      dtexclusao:         '',
      dtinclusao:         '',
      numvolume:          '',    
        
    });
  }

  onConferenteSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({
      nomeconf: event.nome,
      codfuncconf: event.matricula
    })
  }

  onTransportadoraSelecionada(event) {
    this.ajelEntregaCadastro.patchValue({
      fornecedor: event.fornecedor,
      codfornecfrete: event.codfornec
    })
    this.ajelEntregaCadastro.get('codmotorista').reset();
    this.ajelEntregaCadastro.get('codmotorista').disable();
    this.childEnabled = true;
    this.childEnabled2 = false;
    this.ajelEntregaCadastro.get('codfornecfrete').enable();
  }

  onMotoristaSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({
      nomemotorista: event.nome,
      codmotorista: event.matricula
    })
    this.ajelEntregaCadastro.get('codfornecfrete').reset();
    this.ajelEntregaCadastro.get('codfornecfrete').disable();
    this.childEnabled2 = true;
    this.childEnabled = false;
    this.ajelEntregaCadastro.get('codmotorista').enable();
  }

  pesquisar() { 
    const novaEntrega = this.form.value.numnota;  
    if( novaEntrega ){
       this.ajelEntregaService.pesquisarNotaWinthor({numnota: novaEntrega})
      .then(entrega => {
        if (!this.entregas.some(p => p.numnota === entrega[0].numnota)) {          
          const ajelEntregaTemp = {
            ...entrega[0],          
            dtinclusao : new Date(),    
            numvolume : entrega[0].numvolume
          }
          this.entregas.push(ajelEntregaTemp);
          this.formEntregaReducao.patchValue({id: {
                                                  numnota: entrega[0].numnota,
                                                  codfilial: entrega[0].codfilial,
                                                  codentrega: this.ajelEntregaCadastro.value.codentrega}
                                                });
        }
      } );    
    }
    
  }

  carregarAjelEntrega(codentrega: number) {
    if (codentrega) {
      this.ajelEntregaService.pesquisarAjelEntrega({ codentrega })
        .then(ajelEntregaCadastro => {
          if (ajelEntregaCadastro) {
            const ajelEntregaTemp = {
              ...ajelEntregaCadastro,
              dtentrega: new Date(),
              dtinclusao: new Date(ajelEntregaCadastro.dtinclusao),
              dtfat: new Date(ajelEntregaCadastro.dtfat),
            }
            this.ajelEntregaCadastro.patchValue(ajelEntregaTemp);
          }
        })
    }
  }

  async carregarAjelReducao(codentrega: number) {
    if (codentrega) {
      const numNotasReduzidas = await this.ajelEntregaService.pesquisarReducao({ codentrega });
      console.log(numNotasReduzidas.length);
      for (let i = 0; i < numNotasReduzidas.length; i++) {
        this.entregas.push(...await this.ajelEntregaService.pesquisarNotaWinthor({ numnota: numNotasReduzidas[i].id.numnota }))
      }

      console.log(this.entregas)
    }
  }

  removerItem(numnota) {
    let index = this.entregas.findIndex(item => item.numnota === numnota);
    if (index !== -1) {
      this.entregas.splice(index, 1);
    }
    this.ajelEntregaService.excluirReducao(this.ajelEntregaCadastro.value.codentrega, numnota).then()
  }

  async salvar(){
    if (this.codentrega) {
      this.ajelEntregaService.atualizar(this.ajelEntregaCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.onVisible.emit({ visible: false, ajelEntregaCadastro: this.ajelEntregaCadastro.value });
        this.preencherFormGroup()
      })
    }
    await this.salvarReducao()  
  }

  salvarReducao(){
    this.ajelEntregaService.adicionarReducao(this.formEntregaReducao.value).then(() => {
      this.toasty.success('Notas Reduzidas adicionadas.');
      this.preencherFormGroupEntrega()
      console.log(this.formEntregaReducao.value)
    })
  }
}
