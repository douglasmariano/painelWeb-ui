import { MotoristaSelectorComponent } from '@/components/seletores/motorista-selector/motorista-selector.component';
import { VeiculoSelectorComponent } from '@/components/seletores/veiculo-selector/veiculo-selector.component';
import { AjelEntrega } from '@/models/ajel-entrega.model';
import { EntregaTransporte, Transporte } from '@/models/pedido-expedicao.model';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AjelEntregaService } from '@services/ajel-entrega.service';
import { EstoqueExpedicaoService } from '@services/estoque-expedicao.service';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TransportadoraSelectorComponent } from './../../../seletores/transportadora-selector/transportadora-selector.component';
import * as printJS from 'print-js';


@Component({
  selector: 'app-estoque-transporte',
  templateUrl: './estoque-transporte.component.html',
  styleUrls: ['./estoque-transporte.component.css'],
})


export class EstoqueTransporteComponent implements OnChanges {
  
  @Output() callModalTransporte: EventEmitter<void> = new EventEmitter();
  
  flipSeparacao: boolean = false;
  visualizaTranportadora : boolean = false ;
  visualizaMotorista :boolean = false;
  items: MenuItem[];
  subscription: Subscription;

  @ViewChild(TransportadoraSelectorComponent) transportadoraSelectorComponent: TransportadoraSelectorComponent;
  @ViewChild(MotoristaSelectorComponent) motoristaSelectorComponent: MotoristaSelectorComponent;
  @ViewChild(VeiculoSelectorComponent) veiculoSelectorComponent: VeiculoSelectorComponent;
  @ViewChild('buscaNotaFiscal') buscaNotaFiscal: ElementRef;
  
  @Input()
  notaOuPedido: boolean;


  visible: boolean = false;
  entregas : AjelEntrega[] = [];
  entregaTransporte : EntregaTransporte[] = [];
  transporte : Transporte ;
  ajelEntrega : AjelEntrega[] = [];
  checked: boolean ;
  checkedDisable: boolean ;
  formTransporte: UntypedFormGroup;
  formEntrega: UntypedFormGroup;
  formEntregaTransporte: UntypedFormGroup;
  zeraCampoAoSubmeter;  
  isPaginaSubmissao = true;
  isPaginaResumo = false;

  

  form = new UntypedFormGroup({

    numnota: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),

  });

  preencherFormGroupTransporte() {
    this.formTransporte = this.fb.group({
      codtransporte:       '',
      codmotorista:        '',
      codveiculo:          '',
      destino:             '',
      dtexclusao:          '', 
      tipocarga:           '',     
      codfuncajud:         '',
      dtinclusao:          '',
      obdestino:           '',
      numvolume:           '',
      dtultalter:          '',
      codfuncalter:        '',
      obsdoentregador:     '',
      qtvolumes:           '',

    });
  }

  
  preencherFormGroupEntrega() {
    this.formEntrega = this.fb.group({
      codentrega:         '',
      numnota:            '',
      posicao:            '',
      codusur:            '',
      nomevendedor:       '',
      dtfat:              '',
      dtentrega:          '',
      codfornecfrete:     '',
      fornecedor:         '',
      codmotorista:       '',
      codcli:             '',
      obs:                '',
      obs1:               '',
      obsentrega1:        '',
      obsentrega2:        '',
      obsentrega3:        '',
      codfuncconf:        '',
      nomeconf:           '',
      vlatend:            '',
      numvolume:          '',
      dtexclusao:         '',
      dtinclusao:         '',
      obsdoentregador:    '',
      nomemotorista:      '',
      nomecliente:        '',
      local:              '',
      estcob:             '',
      codcidade:          '',
      endercob:           '',
      nomecidade:         '',
      
      //dtultmovent:[{value: '', }],      
    });
  }

  preencherFormGroupEntregaTransporte() {
    this.formEntregaTransporte = this.fb.group({
      id:           {
        codentrega:          '',
        codtransporte:       ''
      },      
      coddevol:            '',
      dtsaida:             '',
      dtchegada:           '',      
      
    });
  }



  constructor(private estoqueExpedicaoService: EstoqueExpedicaoService,
              private fb : UntypedFormBuilder,
              private toasty:ToastrService, 
              private ajelEntregaService:AjelEntregaService,  
              ) {}

  ngOnInit(): void {
    this.preencherFormGroupEntrega(); 
    this.preencherFormGroupTransporte()
    this.preencherFormGroupEntregaTransporte()
    this.checked = true;
  }

  get f() { return this.form.controls; }
  get t() { return this.formTransporte.controls;}
    
  pesquisar() { 
    const novaEntrega = this.form.value.numnota;  
    if(this.checked != true) {
    this.entregas = []; 
    }    
    if( novaEntrega ){
       this.ajelEntregaService.pesquisarNotaWinthor({numnota: novaEntrega})
      .then(entrega => {
        // Verificar se o pedido já existe no array
        if (!this.entregas.some(p => p.numnota === entrega[0].numnota)) {          
          const ajelEntregaTemp = {
            ...entrega[0],
            dtentrega : new Date(),
            dtinclusao : new Date(),         
            dtfat : new Date(entrega[0]?.dtfat),
            numvolume : entrega[0].numvolume
          }
          this.entregas.push(ajelEntregaTemp);
          this.formEntrega.patchValue({ajelEntregaTemp});
        }
      } );    
      this.f.numnota.reset();
    }
    
  } 

  //Preencha com os dados na nota fiscal do sistema a entrega que vai para tabela AjelEntrega
  carregarAjelEntrega(numnota: number) {
    if(numnota){
    this.ajelEntregaService.pesquisarNotaWinthor({ numnota })
      .then(ajelEntregaCadastro => {
        const ajelEntregaTemp = {
          ...ajelEntregaCadastro[0],
          dtentrega : new Date(),
          dtinclusao : new Date(ajelEntregaCadastro[0].dtinclusao),         
          dtfat : new Date(ajelEntregaCadastro[0].dtfat),
        }
        this.formEntrega.patchValue(ajelEntregaTemp); 
        })
      }
  }

  // Faça um loop com as notas adicionadas na lista
  async pesquisarEntrega(numnota) {
    const ajelEntrega = await this.ajelEntregaService.pesquisarAjelEntrega({ numnota: numnota })
    this.ajelEntrega = ajelEntrega

    const notaPesquisada = numnota
    if (!notaPesquisada) {
      return 
    }

    if (this.ajelEntrega.find(x => x.numnota == notaPesquisada)) {
      //this.toasty.success('Nota fiscal encontrada.')
      this.formEntrega.patchValue(this.ajelEntrega[0])
    } else {
      const notasWinthor = await this.ajelEntregaService.pesquisarNotaWinthor({numnota: notaPesquisada})
      console.log(this.formEntrega)
      const ajelEntregaTemp = [{        
        ...notasWinthor[0],
        codmotorista : this.formEntrega.value.codmotorista,
        nomemotorista: this.formEntrega.value.nomemotorista,
        codfornecfrete : this.formEntrega.value.codfornecfrete,
        fornecedor: this.formEntrega.value.fornecedor,
      }]
      console.log(ajelEntregaTemp)
      this.formEntrega.patchValue(ajelEntregaTemp[0]);

      const codentregaCriado = await this.estoqueExpedicaoService.novaEntrega(this.formEntrega.value);
      
      this.formEntrega.patchValue( {codentrega : codentregaCriado})      
    }

  }

  ngOnChanges(changes: SimpleChanges) {
   console.log('ngOnChanges')
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
  
  showVisualizaTranportadora(){
    this.visualizaTranportadora = ! this.visualizaTranportadora; 
  }

  showVisualizaMotorista(){
    this.visualizaMotorista = ! this.visualizaMotorista; 
  }

 
  showFlipSeparacao(){    
      this.flipSeparacao = ! this.flipSeparacao; 
  }

  showIniciaEntrega(){
    this.showFlipSeparacao();
    this.alternarParaPaginaSubmissao()
  }
  showFinalizaEntrega(){
    this.showFlipSeparacao();
    this.alternarParaPaginaResumo()
  }
  

  checkValue(id,event: any){
    //here I want to recerive the checkbox ID;
    console.log(id+ " " + event);
  }
  limparListaPedidos(){
    this.entregas = []; 
  }

  removerItem(numnota){
    let index = this.entregas.findIndex(item => item.numnota === numnota);

    if (index !== -1) {
      this.entregas.splice(index, 1);
    }
    
  }

  onTransportadoraSelecionada(event) {
    this.formEntrega.patchValue({ fornecedor:              event.fornecedor,
                                          codfornecfrete:          event.codfornec})
    this.formEntrega.get('codmotorista').reset();
    this.formEntrega.get('codmotorista').disable();
    this.formEntrega.get('nomemotorista').reset();
    this.formEntrega.get('nomemotorista').disable();      
    this.visualizaTranportadora = true;
    this.buscaNotaFiscal.nativeElement.focus();
    this.checkedDisable = true;
    
    this.visualizaMotorista = false;    
    this.formEntrega.get('codfornecfrete').enable(); 
    //console.log("Evento trasnportadora")
  }
  
  onMotoristaSelecionado(event) {
    this.formEntrega.patchValue({nomemotorista:             event.nome,
                                  codmotorista:             event.matricula})
    this.formTransporte.patchValue({ codmotorista: event.matricula   })
    this.formTransporte.patchValue({ codfuncajud :event.matricula   })                                       
    this.formEntrega.get('codfornecfrete').reset();
    this.formEntrega.get('codfornecfrete').disable(); 
    this.formEntrega.get('fornecedor').reset();
    this.formEntrega.get('fornecedor').disable();    
    this.visualizaMotorista = true;
    this.buscaNotaFiscal.nativeElement.focus();
    this.checkedDisable = true;

    this.visualizaTranportadora = false;
    this.formEntrega.get('codmotorista').enable(); 
    console.log("Evento motorista")
  }

  onVeiculoSelecionado(event) {
    this.formTransporte.patchValue({codveiculo:             event.codveiculo })    
    this.visualizaMotorista = true;

    this.visualizaTranportadora = false;    
    console.log("Evento veiculo")
  }
  
  async salvarTransporte() {
    if (this.entregas.length) {
      const somaVolumes = this.arrayOfObjectsSum(this.entregas, "numvolume")
      this.formTransporte.patchValue({
        qtvolumes: somaVolumes,
        obdestino: this.formTransporte.value.obsdoentregador
      })
      const codtransporte = await this.estoqueExpedicaoService.novoTransporte(this.formTransporte.value)
      
      for (let i = 0; i < this.entregas.length; i++) {
        await this.pesquisarEntrega(this.entregas[i].numnota);
        this.formEntrega.patchValue({ numvolume: this.entregas[i].numvolume })
        this.formEntregaTransporte.patchValue({
          id: {
            codtransporte: codtransporte,
            codentrega: this.formEntrega.value.codentrega,
          },
          dtsaida: new Date()
        })

        await this.estoqueExpedicaoService.novoEntregaTransporte(this.formEntregaTransporte.value)
        this.estoqueExpedicaoService.qtVolumes(this.formEntrega.value);
        this.transporte = this.formTransporte.value;
        this.entregaTransporte = this.formEntregaTransporte.value;
      } 
      
      this.toasty.success('Romaneio gerado com sucesso.');
      this.formTransporte.reset();
      this.zerarDosSeletores();
      if(!this.transporte.codmotorista){
        this.callModalTransporte.emit();
        this.entregas = [];
        this.visualizaTranportadora = false;
      } else{
        this.visualizaMotorista = false;
        this.alternarParaPaginaResumo();
      }
    }else{
      this.toasty.warning('Nenhuma nota fiscal adicionada');
    }
    
   
    
  }
 
  arrayOfObjectsSum(arr, key) {
    return arr.reduce((a, b) => a + (b[key] || 0), 0);
  }

  zerarDosSeletores() {
    this.transportadoraSelectorComponent.limparSelecao();   
    this.motoristaSelectorComponent.limparSelecao(); 
    this.veiculoSelectorComponent.limparSelecao();
  }

  imprimirPagina() {
    window.print();
    this.callModalTransporte.emit();
  }

  alternarParaPaginaResumo() {
    this.isPaginaSubmissao = false;
    this.isPaginaResumo = true;
  }

  alternarParaPaginaSubmissao() {
    this.isPaginaSubmissao = true;
    this.isPaginaResumo = false;
  }
  
  printContent(): void {
    const divToPrint = document.getElementById('elemento-para-imprimir');
    printJS({
      printable: divToPrint,
      type: 'html',
      style: '@media print{.no-print{display:none;}}',
    });
    this.callModalTransporte.emit();
    this.alternarParaPaginaSubmissao();
    this.entregas = [];
  }
  
}
