import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { EstoqueCaboService } from '../estoque-cabo/estoquecabo.service';

@Component({
  selector: 'app-estoque-cabo-cadastro',
  templateUrl: './estoque-cabo-cadastro.component.html',
  styleUrls: ['./estoque-cabo-cadastro.component.css']
})
export class EstoqueCaboCadastroComponent implements OnInit {

  estoqueCaboCadastro: FormGroup;

  constructor(private route: ActivatedRoute,
    private estoqueCaboService: EstoqueCaboService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    const codendcabo = this.route.snapshot.params['codendcabo'];

    this.preencherFormGroup();    
    this.carregarPedido(codendcabo);
    
  }

  preencherFormGroup() {
    this.estoqueCaboCadastro = this.fb.group({
      codendcabo: '',
      codprod: '',
      rua: '',
      modulo: '',
      apto: '',
      numero: '',
      qt: '',
      //dtultmovent:[{value: '', }],      
    });
  }

  mostrarErro(campo) {
    if (this.estoqueCaboCadastro && this.estoqueCaboCadastro.get) {
      return this.estoqueCaboCadastro.get(campo).invalid && (this.estoqueCaboCadastro.get(campo).dirty || this.estoqueCaboCadastro.get(campo).touched)
        && this.estoqueCaboCadastro.get(campo).errors?.required
    }
  }

  carregarPedido(codendcabo: number) {
    if(codendcabo){
    this.estoqueCaboService.pesquisar({ codendcabo })
      .then(estoqueCaboCadastro => {
        console.log("teste")
        console.log(estoqueCaboCadastro)
        this.estoqueCaboCadastro.patchValue(estoqueCaboCadastro);
      })}
  }
  salvar() {
    if (this.route.snapshot.params['codendcabo'] == null) {
      this.estoqueCaboService.adicionar(this.estoqueCaboCadastro.value).then(() => {
        this.toasty.success('Cadastrado com sucesso');
        this.preencherFormGroup()
      })
    } else {
      this.estoqueCaboService.atualizar(this.estoqueCaboCadastro.value).then(() => {
        this.toasty.success('Atualizado');
        this.preencherFormGroup()
        this.carregarPedido(this.route.snapshot.params['codendcabo']);
      })
    }

  }

  voltar() {
    this.router.navigateByUrl('/estoquecabo');
  }

}
