import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from '../../services/estoque-cabo.service';


@Component({
  selector: 'app-estoque-cabo-cadastro',
  templateUrl: './estoque-cabo-cadastro.component.html',
  styleUrls: ['./estoque-cabo-cadastro.component.css']
})
export class EstoqueCaboCadastroComponent implements OnInit {

  selectedValues: string[] = [];
  estoqueCaboCadastro: FormGroup;
  dialogVisible: boolean = false;
  produtosPorFilial : any;

  constructor(private route: ActivatedRoute,
    private estoqueCaboService: EstoqueCaboService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
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
          dataexclusao : new Date(estoqueCaboCadastro.dataexclusao),  
        }
        //this.estoqueCaboCadastro.setValue ( { datainclusao: new Date(estoqueCaboCadastro.datainclusao) })      
        console.log({
          estoqueCaboCadastro, 
          estoqueCaboTemp
        });               
        this.estoqueCaboCadastro.patchValue(estoqueCaboTemp);        
        })
      }
  }
  salvar() {
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
        console.log(this.selectedValues)
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
      const notaRetorno = {...notaPesquisada}
    console.log()
    return notaRetorno;
  })}

}
