import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { Pedido } from '../pedidos-pesquisa/model';
import { PedidoPesquisaService } from '../pedidos-pesquisa/pedidos-pesquisa.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {  

  status = [
    { label: 'Digitado', value: 'N' },
    { label: 'Aguardando Cliente', value: 'A' },
    { label: 'Balcão', value: 'B' },
    { label: 'Em Separação', value: 'E' },
    { label: 'Finalizar', value: 'L' },
    { label: 'Conferência', value: 'F' },
    { label: 'Caixa', value: 'X' },
    { label: 'Pacote', value: 'P' },
    { label: 'Cancelado', value: 'C' },
    { label: 'Retira', value: 'R' },
    { label: 'Corte', value: 'T' },
    { label: 'Chamar Cliente', value: 'H' },
    { label: 'Finalizado', value: 'Z' },
    { label: 'Envio Balcão Vendedor', value: 'V' }
  ];

  simOuNao = [
    { label: 'Sim', value: 'S' },
    { label: 'Não', value: 'N' },
  ];

  pedido: FormGroup;

  constructor(private route: ActivatedRoute,
    private pedidoService: PedidoPesquisaService,
    private toasty: ToastyService,
    private  confirmation:ConfirmationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    const numPedido = this.route.snapshot.params['numped'];
   
    this.preencherFormGroup();
    if (numPedido) {
      this.carregarPedido(numPedido);
    }
  }

  preencherFormGroup() {
    this.pedido = this.fb.group({
      numped: [{value: '', disabled: true}, Validators.required ],
      nome: [{value: '', disabled: true}],
      cliente: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
      vltotal: [{value: '', disabled: true}],
      posicao: [{value: '', disabled: true}],
      datapedido: [{value: '', disabled: true}],
      datadigitacao: [{value: '', disabled: true}],
      datachegadacli: [{value: '', disabled: true}],
      codfuncsep: [{value: '', disabled: true}],
      datainiciosep: [{value: '', disabled: true}],
      datafimsep: [{value: '', disabled: true}],
      codfilial: [{value: '', disabled: true}],
      codfuncbalcao: [{value: '', disabled: true}],
      datainiciobalcao: [{value: '', disabled: true}],
      datafimbalcao: [{value: '', disabled: true}],
      painel: [{value: '', disabled: true}],
      datapacote: [{value: '', disabled: true}],
      finalizado: [{value: '', disabled: true}],
      qtitem: [{value: '', disabled: true}],
      estoque: [{value: '', disabled: true}],
      retira: [{value: '', disabled: true}],
      origial: [{value: '', disabled: true}],
      codfuncpacote: [{value: '', disabled: true}],
      retirante: [{value: '', disabled: true}],
      dataemissaomapa:[{value: '', disabled: true}],
      aguardsep:[{value: '', disabled: true}],
      emseparacao:[{value: '', disabled: true}],
      dataatual:[{value: '', disabled: true}],
      emconferencia:[{value: '', disabled: true}],
      tempodecor:[{value: '', disabled: true}],
      ordem:[{value: '', disabled: true}],

    });
  }

  mostrarErro(campo) {
    if (this.pedido && this.pedido.get) {
      return this.pedido.get(campo).invalid && (this.pedido.get(campo).dirty || this.pedido.get(campo).touched)
        && this.pedido.get(campo).errors?.required
    }
  }

  carregarPedido(numped: number) {
    this.pedidoService.pesquisar({numped})
      .then(pedido => {
        if (pedido && pedido.length) {
          const temp = {
            ...pedido[0],
            datapedido: new Date(pedido[0].datapedido),
            datachegadacli: null,
            dataemissaomapa: new Date(pedido[0].dataemissaomapa),
            datainiciosep: new Date(pedido[0].datainiciosep),
            datafimsep: new Date(pedido[0].datafimsep),
            dataatual: new Date(pedido[0].dataatual), 
            datadigitacao: new Date(pedido[0].dataatual),           
          }
          this.pedido.patchValue(temp);
          
        }
      })     
  }
  salvar() {
    this.pedidoService.adicionar(this.pedido.value).then(() => {
      this.toasty.success('Cadastrado com sucesso');
      this.preencherFormGroup()
    })
  }

  marcarChegada(numped) {
    this.confirmation.confirm(
      {message: 'Deseja informar que o cliente chegou?',
        accept: ()=>{
          this.pedidoService.marcarChegada(numped).then(()=>
          this.toasty.success('Dirija o cliente ao Balcão!'));
          setTimeout(() => {
            setTimeout(() => {
              this.router.navigateByUrl('/pedidos');
            });
          }, 3400);
        }
        }
    );   
  }

  voltar(){
    this.router.navigateByUrl('/pedidos');
  }

}
