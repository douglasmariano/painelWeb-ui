import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { AjelEntregaService } from '../ajel-entrega/ajel-entrega.service';

@Component({
  selector: 'app-ajel-entrega-cadastro',
  templateUrl: './ajel-entrega-cadastro.component.html',
  styleUrls: ['./ajel-entrega-cadastro.component.css']
})
export class AjelEntregaCadastroComponent implements OnInit {
  ajelEntregaCadastro: FormGroup;

  constructor(private route: ActivatedRoute,
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,   
    private router: Router) { }
    childEnabled : boolean ;
    childEnabled2 :boolean;
  ngOnInit(): void {

    const numnota = this.route.snapshot.params['numnota'];
    const codfilial = this.route.snapshot.params['codfilial'];
     console.log(codfilial + "Filial") 
    this.carregarAjelEntrega(numnota, codfilial);
    this.preencherFormGroup(); 
    this.childEnabled =false;
    this.childEnabled2 =false;    
    
  }
  

  preencherFormGroup() {
    this.ajelEntregaCadastro = this.fb.group({
      codentrega:         '',
      numnota:            '',
      codfilial:            '',
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

  mostrarErro(campo) {
    if (this.ajelEntregaCadastro && this.ajelEntregaCadastro.get) {
      return this.ajelEntregaCadastro.get(campo).invalid && (this.ajelEntregaCadastro.get(campo).dirty || this.ajelEntregaCadastro.get(campo).touched)
        && this.ajelEntregaCadastro.get(campo).errors?.required
    }
  }

  carregarAjelEntrega(numnota: number, codfilial: String ) {
    if(numnota){
      console.log(numnota,codfilial)
    this.ajelEntregaService.pesquisarNotaWinthor({ numnota, codfilial })
      .then(ajelEntregaCadastro => {
        const ajelEntregaTemp = {
          ...ajelEntregaCadastro[0],
         // dtentrega : new Date(ajelEntregaCadastro[0].dtentrega),
          dtentrega : new Date(),
          dtinclusao : new Date(ajelEntregaCadastro[0].dtinclusao),         
          dtfat : new Date(ajelEntregaCadastro[0].dtfat),
          //dataexclusao : new Date(estoqueCaboCadastro.dataexclusao),  
        }
        //this.estoqueCaboCadastro.setValue ( { datainclusao: new Date(estoqueCaboCadastro.datainclusao) })      
        console.log({
          ajelEntregaCadastro: ajelEntregaCadastro, 
          ajelEntregaTemp: ajelEntregaTemp
        });               
        this.ajelEntregaCadastro.patchValue(ajelEntregaTemp); 
        console.log(ajelEntregaTemp)       
        })        
      }
  }
 

  onConferenteSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({    nomeconf:               event.nome,
                                          codfuncconf:               event.matricula})
                                          console.log("Evento COnferente")
  }

  onTransportadoraSelecionada(event) {
    this.ajelEntregaCadastro.patchValue({ fornecedor:              event.fornecedor,
                                          codfornecfrete:          event.codfornec})
    this.ajelEntregaCadastro.get('codmotorista').reset();
    this.ajelEntregaCadastro.get('codmotorista').disable();     
    this.childEnabled = true;
    
    
    this.childEnabled2 = false;
    this.ajelEntregaCadastro.get('codfornecfrete').enable(); 
    console.log("Evento trasnportadora")
  }
  
  onMotoristaSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({nomemotorista:             event.nome,
                                          codmotorista:             event.matricula})
    this.ajelEntregaCadastro.get('codfornecfrete').reset();
    this.ajelEntregaCadastro.get('codfornecfrete').disable();    
    this.childEnabled2 = true;

    this.childEnabled = false;
    this.ajelEntregaCadastro.get('codmotorista').enable(); 
    console.log("Evento motorista")
  }

  salvar() {
    if (this.route.snapshot.params['codentrega'] == null) {
      this.ajelEntregaService.adicionar(this.ajelEntregaCadastro.value).then(() => {
        this.toasty.success('Cadastrado com sucesso');
        this.preencherFormGroup()
        this.router.navigateByUrl('/ajelentrega');
        console.log(this.ajelEntregaCadastro.value)
      })
    } else {
      this.ajelEntregaService.atualizar(this.ajelEntregaCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.preencherFormGroup()
        this.carregarAjelEntrega(this.route.snapshot.params['codentrega'],this.route.snapshot.params['codfilial']);
      })
    }

  }

  voltar() {
    this.router.navigateByUrl('/ajelentrega');
  }

}
