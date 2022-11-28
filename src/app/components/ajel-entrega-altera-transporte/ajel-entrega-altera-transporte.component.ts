import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { AjelEntregaService } from '../../services/ajel-entrega.service';

@Component({
  selector: 'app-ajel-entrega-altera-transporte',
  templateUrl: './ajel-entrega-altera-transporte.component.html',
  styleUrls: ['./ajel-entrega-altera-transporte.component.css']
})
export class AjelEntregaAlteraTransporteComponent implements OnInit {
  ajelEntregaCadastro: FormGroup;

  buscaAjelEntrega = new FormGroup({

    codentrega: new FormControl('', [Validators.pattern("^[0-9]*$")])


  });

  @Input() codentrega;

  @Output() onVisible = new EventEmitter<any>();
  
  constructor(private route: ActivatedRoute,
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private router: Router) { }
  childEnabled: boolean;
  childEnabled2: boolean;


  ngOnInit(): void {

    this.preencherFormGroup();
    this.carregarAjelEntrega(this.codentrega)
    console.log(this.codentrega)
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

  onConferenteSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({
      nomeconf: event.nome,
      codfuncconf: event.matricula
    })
    console.log("Evento COnferente")
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
    console.log("Evento trasnportadora")
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
    console.log("Evento motorista")
  }

  carregarAjelEntrega(codentrega: number) {
    if (codentrega) {
      this.ajelEntregaService.pesquisarAjelEntrega({ codentrega })
        .then(ajelEntregaCadastro => {
          if (ajelEntregaCadastro) {
            const ajelEntregaTemp = {
              ...ajelEntregaCadastro,
              // dtentrega : new Date(ajelEntregaCadastro[0].dtentrega),
              dtentrega: new Date(),
              dtinclusao: new Date(ajelEntregaCadastro.dtinclusao),
              dtfat: new Date(ajelEntregaCadastro.dtfat),
              //dataexclusao : new Date(estoqueCaboCadastro.dataexclusao),  
            }

            //this.estoqueCaboCadastro.setValue ( { datainclusao: new Date(estoqueCaboCadastro.datainclusao) })      
            console.log({
              ajelEntregaCadastro: ajelEntregaCadastro,
              ajelEntregaTemp: ajelEntregaTemp
            });
            this.ajelEntregaCadastro.patchValue(ajelEntregaTemp);
            console.log(ajelEntregaTemp)
          }

        })

    }
  }

  salvar() {
   if(this.codentrega){
      this.ajelEntregaService.atualizar(this.ajelEntregaCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.onVisible.emit({ visible: false, ajelEntregaCadastro :this.ajelEntregaCadastro.value});
        this.preencherFormGroup()
      })
    }

  }

}
