import { AjelEntrega } from '@/models/ajel-entrega.model';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { AjelEntregaService } from '../../../services/ajel-entrega.service';

@Component({
  selector: 'app-ajel-entrega-cadastro',
  templateUrl: './ajel-entrega-cadastro.component.html',
  styleUrls: ['./ajel-entrega-cadastro.component.css']
})
export class AjelEntregaCadastroComponent implements OnInit {
  
  ajelEntregaCadastro: UntypedFormGroup;
  formEntregaReducao: UntypedFormGroup;
  entregas : AjelEntrega[] = [];

  constructor(private route: ActivatedRoute,
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastrService,
    private fb: UntypedFormBuilder,   
    private router: Router) { }
    visualizaMotorista : boolean ;
    visualizaTranportadora :boolean;
    checkedDisable: boolean ;

    form = new UntypedFormGroup({

      numnota: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),
  
    });
  ngOnInit(): void {

    const numnota = this.route.snapshot.params['numnota'];

      
    this.carregarAjelEntrega(numnota);
    this.preencherFormGroupEntrega();
    this.preencherFormGroup(); 
    this.visualizaMotorista =false;
    this.visualizaTranportadora =false;    
    
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

  preencherFormGroup() {
    this.ajelEntregaCadastro = this.fb.group({
      codentrega:         '',
      codfilial:          '',
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
      
    });
  }

  mostrarErro(campo) {
    if (this.ajelEntregaCadastro && this.ajelEntregaCadastro.get) {
      return this.ajelEntregaCadastro.get(campo).invalid && (this.ajelEntregaCadastro.get(campo).dirty || this.ajelEntregaCadastro.get(campo).touched)
        && this.ajelEntregaCadastro.get(campo).errors?.required
    }
  }
  get f() { return this.form.controls; }
  
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
                                                  codentrega: entrega[0].codentrega}
                                                });
        }
      } );    
    }
    
  } 

  removerItem(numnota){
    let index = this.entregas.findIndex(item => item.numnota === numnota);

    if (index !== -1) {
      this.entregas.splice(index, 1);
    }
    
  }

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
        this.ajelEntregaCadastro.patchValue(ajelEntregaTemp); 
        })
      }
  }
 

  onConferenteSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({    nomeconf:               event.nome,
                                          codfuncconf:               event.matricula})
                                          console.log("Evento Conferente")
  }

  onTransportadoraSelecionada(event) {
    this.ajelEntregaCadastro.patchValue({ fornecedor:              event.fornecedor,
                                          codfornecfrete:          event.codfornec})
    this.ajelEntregaCadastro.get('codmotorista').reset();
    this.ajelEntregaCadastro.get('codmotorista').disable();
    this.ajelEntregaCadastro.get('nomemotorista').reset(); 
    this.ajelEntregaCadastro.get('nomemotorista').disable();       
    this.visualizaMotorista = true;    
    this.checkedDisable = true;
             
    this.visualizaTranportadora = ! this.visualizaTranportadora;
    this.ajelEntregaCadastro.get('codfornecfrete').enable(); 
  }
  
  onMotoristaSelecionado(event) {
    this.ajelEntregaCadastro.patchValue({nomemotorista:             event.nome,
                                          codmotorista:             event.matricula})
    this.ajelEntregaCadastro.get('codfornecfrete').reset();
    this.ajelEntregaCadastro.get('codfornecfrete').disable();
    this.ajelEntregaCadastro.get('fornecedor').reset(); 
    this.ajelEntregaCadastro.get('fornecedor').disable();   
    this.visualizaTranportadora = true;
    this.checkedDisable = true;
    this.visualizaMotorista = ! this.visualizaMotorista;
    this.ajelEntregaCadastro.get('codmotorista').enable(); 
    console.log("Evento motorista")
  }

  async salvar() {
    if (this.route.snapshot.params['codentrega'] == null) {
      const codentrega = await this.ajelEntregaService.adicionar(this.ajelEntregaCadastro.value)
        this.toasty.success('Cadastrado com sucesso');
        this.preencherFormGroup()
        this.router.navigateByUrl('/ajelentrega');
        console.log(this.formEntregaReducao.value)
     
      for (let i = 0; i < this.entregas.length; i++) {        
        
        this.formEntregaReducao.patchValue({
          id: {
            codentrega: codentrega,
            codfilial: this.entregas[i].codfilial,
            numnota: this.entregas[i].numnota  
          },
          numvolume: this.entregas[i].numvolume         
        })    
      await this.salvarReducao()    
      }

    } else {
      this.ajelEntregaService.atualizar(this.ajelEntregaCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.preencherFormGroup()
        this.carregarAjelEntrega(this.route.snapshot.params['codentrega']);
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

  salvarReducao(){
    this.ajelEntregaService.adicionarReducao(this.formEntregaReducao.value).then(() => {
      this.toasty.success('Notas Reduzidas adicionadas.');
      this.preencherFormGroupEntrega()
      console.log(this.formEntregaReducao.value)
    })
  }

  voltar() {
    this.router.navigateByUrl('/ajelentrega');
  }

}
