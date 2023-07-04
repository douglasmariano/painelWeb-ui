import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from '../../../services/estoque-cabo.service';


@Component({
  selector: 'app-estoque-cabo-cadastro',
  templateUrl: './estoque-cabo-cadastro.component.html',
  styleUrls: ['./estoque-cabo-cadastro.component.css']
})
export class EstoqueCaboCadastroComponent implements OnInit {

  filialSelecionada = [];
  filialSelecionada2 = [];
  estoqueCaboCadastro: UntypedFormGroup;
  dialogVisible: boolean = false;
  produtosPorFilial : any;

  constructor(private route: ActivatedRoute,
    private estoqueCaboService: EstoqueCaboService,
    private toasty: ToastrService,
    private confirmation: ConfirmationService,
    private fb: UntypedFormBuilder,
    private router: Router) { }
    produtoEstoqueSelecionado;
  ngOnInit(): void {

    const codcabo = this.route.snapshot.params['codcabo'];

    this.preencherFormGroup();    
    this.carregarEstoqueCabo(codcabo);
    
    
  }
  estoqueCodprodCabo = [];
  preencherFormGroup() {
    this.estoqueCaboCadastro = this.fb.group({
      codcabo:'',
    codprod_pcprodut: '',
    codprod_pcest: '',
    codfilial_pcest: '',
    codmarca: '',
    codfornec: '',
    matricula: '',
    tipoendereco: '',
    dtinclusao: '',
    dtexclusao: '',
    status: '',
    obs: '',
    qtgerencial: '',
    qt: '',
    numero: '',
    modulo: '',
    rua: '',
    apto: '',       
    });
  }

  mostrarErro(campo) {
    if (this.estoqueCaboCadastro && this.estoqueCaboCadastro.get) {
      return this.estoqueCaboCadastro.get(campo).invalid && (this.estoqueCaboCadastro.get(campo).dirty || this.estoqueCaboCadastro.get(campo).touched)
        && this.estoqueCaboCadastro.get(campo).errors?.required
    }
  }

  carregarEstoqueCabo(codcabo: number) {
    if(codcabo){
    this.estoqueCaboService.pesquisar({ codcabo })
      .then(estoqueCaboCadastro => {
        const estoqueCaboTemp = {
          ...estoqueCaboCadastro,
          datainclusao : new Date(estoqueCaboCadastro.datainclusao),
          dataexclusao : new Date(estoqueCaboCadastro.dataexclusao)                  
        }
        //this.estoqueCaboCadastro.setValue ( { datainclusao: new Date(estoqueCaboCadastro.datainclusao) })      
        //console.log({
        //  estoqueCaboCadastro, 
        //  estoqueCaboTemp
        //});               
        
        //const classe = [ ...estoqueCaboTemp, ...this.selectedValues ];
           
        this.estoqueCaboCadastro.patchValue(estoqueCaboTemp);
        })
      }
  }
  salvar() {
    this.filialSelecionada2 = this.filialSelecionada[0] ?? 0;
    this.estoqueCaboCadastro.patchValue({codprod_pcest : this.filialSelecionada2[0]?.codprod,
      codfilial_pcest : this.filialSelecionada2[0]?.codfilial,
      codfornec : this.filialSelecionada2[0]?.codfornec,
      codmarca : this.filialSelecionada2[0]?.codmarca,
      qtgerencial : this.filialSelecionada2[0]?.qtestger})

    if (this.route.snapshot.params['codcabo'] == null) {
      this.estoqueCaboService.adicionar(this.estoqueCaboCadastro.value).then(() => {
        this.toasty.success('Cadastrado com sucesso');
        this.preencherFormGroup()
      })
    } else {      
      this.estoqueCaboService.atualizar(this.estoqueCaboCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.preencherFormGroup()
        this.carregarEstoqueCabo(this.route.snapshot.params['codcabo']);     
        
      })
    }

  }

  voltar() {
    this.router.navigateByUrl('/estoquecabo');
  }

  async showDialog(estoqueCaboCadastro) {
    this.produtoEstoqueSelecionado = estoqueCaboCadastro;
    this.dialogVisible = true;
    this.produtosPorFilial = await this.estoqueCaboService.pesquisarProduto(this.produtoEstoqueSelecionado.value.codprod_pcprodut)
    
    this.estoqueCodprodCabo = this.produtosPorFilial.map(notaPesquisada => {
      const notaRetorno = { ...notaPesquisada, }      
      return notaRetorno;
    })       
      
  }


}
