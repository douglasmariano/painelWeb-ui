import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Pedido } from '../pedidos-pesquisa/model';
import { PedidoPesquisaService } from '../pedidos-pesquisa/pedidos-pesquisa.service';

@Component({
  selector: 'app-pedidos-cadastro',
  templateUrl: './pedidos-cadastro.component.html',
  styleUrls: ['./pedidos-cadastro.component.css']
})
export class PedidosCadastroComponent implements OnInit {
  [x: string]: any;

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
    private fb: FormBuilder) { }

  ngOnInit(): void {

    const numPedido = this.route.snapshot.params['numped'];

    this.preencherFormGroup();
    if (numPedido) {
      this.carregarPedido(numPedido);
    }
  }

  preencherFormGroup() {
    this.pedido = this.fb.group({
      numped: ['', Validators.required],
      nome: [''],
      cliente: [''],
      status: [''],
      vltotal: [''],
      posicao: [''],
      datapedido: [''],
      datachegadacli: [''],
      codfuncsep: [''],
      datainiciosep: [''],
      datafimsep: [''],
      codfilial: [''],
      codfuncbalcao: [''],
      datainiciobalcao: [''],
      datafimbalcao: [''],
      painel: [''],
      datapacote: [''],
      finalizado: [''],
      qtitem: [''],
      estoque: [''],
      retira: [''],
      origial: [''],
      codfuncpacote: [''],
      retirante: [''],
      dataemissaomapa:[''],
      aguardsep:[''],
      emseparacao:[''],
      dataatual:[''],
      emconferencia:[''],
      tempodecor:[''],
      ordem:[''],

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
            datachegadacli: new Date(pedido[0].datachegadacli),
            dataemissaomapa: new Date(pedido[0].dataemissaomapa),
            datainiciosep: new Date(pedido[0].datainiciosep),
            datafimsep: new Date(pedido[0].datafimsep),
            dataatual: new Date(pedido[0].dataatual),

          }
          this.pedido.patchValue(temp);
        }
      })
      console.log(numped);
  }
  salvar() {
    this.pedidoService.adicionar(this.pedido.value).then(() => {
      this.toasty.success('Cadastrado com sucesso');
      this.preencherFormGroup()
    })
  }

  marcarChegada(numped) {
    this.pedidoService.marcarChegada(numped)
  }

}
