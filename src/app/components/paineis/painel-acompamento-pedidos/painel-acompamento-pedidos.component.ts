import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '@services/funcionario.service';
import { Table } from 'primeng/table';
import { PainelAcompamentoPedidosService } from '../../../services/painel-acompamento-pedidos.service';


@Component({
  selector: 'app-painel-acompamento-pedidos',
  templateUrl: './painel-acompamento-pedidos.component.html',
  styleUrls: ['./painel-acompamento-pedidos.component.css'],

})
export class PainelAcompamentoPedidosComponent implements OnInit {

  painelAcompanhaPedidos = [];
  painelAcompanhaPedidoporProdutos = [];
  
  totalizadores = [];
  allSeparadores = [];
  totaldepedidos;
  separadores;
  qtpedidosFaturados;
  qtpedidosEmseparacao;
  qtpedidosAguardandoseparacao;
  listandoNumped = [];
  defaultDateDe: Date;
  defaultDateAte: Date;
  statuses: any[];
  listaDeVendedor = [];
  visibleCharts: boolean;
  displaydografico = false;
  itensPrimeiraLista;
  itensSegundaLista;
  nomeDoSeparador;
  nomeDoSeparador2;

  basicData: any;
  basicOptions: any;
  
  dataStacked;
  optionsStacked;

  loading: boolean;

  ngOnInit() {
    this.displaydografico = true;
    this.statuses = [
      { label: 'Aguardando Cliente', value: 'A' },
      { label: 'Balcão', value: 'B' },
      { label: 'Em Separação', value: 'E' },
      { label: 'Entrega', value: 'G' },
      { label: 'Em Separação', value: 'L' },
      { label: 'Conferência', value: 'F' },
      { label: 'Digitado', value: 'N' },
      { label: 'Pacote', value: 'P' },
      { label: 'Retira', value: 'R' },
      { label: 'Vendedor chamou Cliente', value: 'H' },
      { label: 'Corte', value: 'T' },
      { label: 'Caixa', value: 'X' }
    ];

   
    this.defaultDateDe = new Date();
    this.defaultDateAte = new Date();
    let div = document.getElementById('charts');
    div.style.display = "none";

    this.funcionarioService.listarTodosSeparadores().subscribe((resultado: any) => {
      this.allSeparadores = resultado;
    });
  

  }


  get f() { return this.buscaPedido.controls; }


  buscaPedido = new UntypedFormGroup({

    nomeCliente: new UntypedFormControl(''),
    nomeVendedor: new UntypedFormControl(''),
    dataPedidoDe: new UntypedFormControl(''),
    dataPedidoAte: new UntypedFormControl(''),
    numped: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),
  });

  constructor(private painelAcompanhaPedidoService: PainelAcompamentoPedidosService,
              private funcionarioService: FuncionarioService,) {

  }
  async pesquisar() {
    this.loading = true;
    const buscaPedidos = await this.painelAcompanhaPedidoService.pesquisar({
      numped: this.buscaPedido.value.numped, nomeCliente: this.buscaPedido.value.nomeCliente,
      nomeVendedor: this.buscaPedido.value.nomeVendedor,
      dataPedidoDe: this.buscaPedido.value.dataPedidoDe,
      dataPedidoAte: this.buscaPedido.value.dataPedidoAte
    })
      .then(painelAcompanhaPedido => this.painelAcompanhaPedidos = painelAcompanhaPedido);
    this.loading = false;
    this.listandoNumped = buscaPedidos.map(pedidosPesquisados => {
      const pedidosPesquisadosRetorno = { ...pedidosPesquisados }
      return pedidosPesquisadosRetorno;
    })
    this.totaldepedidos = 0;
    const contagem = {};
    for (const objeto of this.listandoNumped) {
      const { numped } = objeto;
      if (contagem[numped]) {
        contagem[numped]++;
      } else {
        contagem[numped] = 1;
      }
    }
    const itensNaoRepetidos = [];
    for (const numped in contagem) {
      itensNaoRepetidos.push(numped);
      this.totaldepedidos += 1;
    }
    if (this.totaldepedidos > 0) {
      this.togglediv('charts');
    } else if (this.totaldepedidos == 0) {
      let div = document.getElementById('charts');
      div.style.display = "none";
    }
    
    this.pesquisarProduto(itensNaoRepetidos);
    this.totalizadorDePedidos(this.listandoNumped);
    this.pedidosFaturados(this.listandoNumped);
    this.pedidosEmSeparacao(this.listandoNumped);
    this.vendedoresEncontrados(this.listandoNumped);
    this.pedidosAguardandoSeparacao(this.listandoNumped);
    this.separadoresOcupados(this.listandoNumped);
    this.totaldePedidosSeparados(this.listandoNumped);
    
  }


  async pesquisarProduto(listaDeNumpeds) {
    const pedidosPorProdutos = await this.painelAcompanhaPedidoService.pesquisarProduto(listaDeNumpeds)
      .then(painelAcompanhaPedidoporProduto => this.painelAcompanhaPedidoporProdutos = painelAcompanhaPedidoporProduto);
    this.loading = false;

    this.totalizadores = pedidosPorProdutos.map(pedidosPesquisados => {
      const pedidosPesquisadosRetorno = { ...pedidosPesquisados }
      return pedidosPesquisadosRetorno;
    })
    await this.graficoQtdeItens(this.totalizadores);
    this.graficoPedidosPorLocal(this.totalizadores);


  }

  

  totalizadorDePedidos(totalizadores) {
    this.totaldepedidos = 0;
    const contagem = {};

    for (const objeto of totalizadores) {
      const { numped } = objeto;
      if (contagem[numped]) {
        contagem[numped]++;
      } else {
        contagem[numped] = 1;
      }
    }
    const itensNaoRepetidos = [];
    for (const numped in contagem) {
      itensNaoRepetidos.push(numped);
      this.totaldepedidos += 1;
    }
  }
  pedidosFaturados(totalizadores) {
    this.qtpedidosFaturados = 0;
    const listaFiltrada = totalizadores.filter(item => item.posicao == 'F');
    const contagem = {};

    for (const objeto of listaFiltrada) {
      const { numped } = objeto;
      if (contagem[numped]) {
        contagem[numped]++;
      } else {
        contagem[numped] = 1;
      }
    }
    const itensNaoRepetidos = [];
    for (const numped in contagem) {
      itensNaoRepetidos.push(numped);
      this.qtpedidosFaturados += 1;
    }
  }
  pedidosEmSeparacao(totalizadores) {
    this.qtpedidosEmseparacao = 0;

    const listaFiltrada = totalizadores.filter(item => item.datainiciosep != null && item.datafimsep == null && item.posicao != 'F');
    const contagem = {};

    for (const objeto of listaFiltrada) {
      const { numped } = objeto;
      if (contagem[numped]) {
        contagem[numped]++;
      } else {
        contagem[numped] = 1;
      }
    }
    const itensNaoRepetidos = [];
    for (const numped in contagem) {
      itensNaoRepetidos.push(numped);
      this.qtpedidosEmseparacao += 1;
    }
  }

  vendedoresEncontrados(totalizadores) {
    this.listaDeVendedor = [];

   
    const contagem = {};

    for (const objeto of totalizadores) {
      const { vendedor } = objeto;
      if (contagem[vendedor]) {
        contagem[vendedor]++;
      } else {
        contagem[vendedor] = 1;
      }
    }
    for (const vendedor in contagem) {
      this.listaDeVendedor.push({'nome':vendedor, 'value':vendedor});
      this.qtpedidosEmseparacao += 1;
    }
    this.listaDeVendedor.sort();
    console.log(this.listaDeVendedor)
  }

  pedidosAguardandoSeparacao(totalizadores) {
    this.qtpedidosAguardandoseparacao = 0;

    const listaFiltrada = totalizadores.filter(item => item.datainiciosep == null && item.datafimsep == null && item.posicao != 'F');
    const contagem = {};

    for (const objeto of listaFiltrada) {
      const { numped } = objeto;
      if (contagem[numped]) {
        contagem[numped]++;
      } else {
        contagem[numped] = 1;
      }
    }
    const itensNaoRepetidos = [];
    for (const numped in contagem) {
      itensNaoRepetidos.push(numped);
      this.qtpedidosAguardandoseparacao += 1;
    }   
  }

  graficoPedidosPorLocal(totalizadores) {
    let galpao = 0;
    let geral = 0;
    let cabo = 0;

    const buscarValoresUnicos = (valor, indice, self) => {
      return (
        indice === self.findIndex((objeto) => objeto.numped === valor.numped)
      );
    };
 
    const valoresUnicos = totalizadores.filter(buscarValoresUnicos);
    const valoresUnicosFiltrador = totalizadores.filter(item => item.datainiciosep != null && item.datafimsep == null && item.posicao != 'F');
//console.log(valoresUnicosFiltrador)
    const count = valoresUnicosFiltrador.filter(function (item) {
      if (item.status === 'E') {
        if (item.tiposeparacao === 'GERAL') {
          geral += 1;
        } else if (item.tiposeparacao === 'CABO') {
          cabo += 1;
        } else if (item.tiposeparacao === 'GALPAO') {
          galpao += 1;
        }
        return true;
      } else {
        return false;
      }

    });
    console.log(count)
    this.displaydografico = false;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataStacked = {
      labels: ['Geral', 'Cabo', 'Galpão'],
      datasets: [
        {          
          data: [geral, cabo, galpao],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.optionsStacked = {
      cutout: '60%',
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  graficoQtdeItens(QtItensporTiposeparacao) {

    let balcao = 0;
    let retira = 0;
    let entrega = 0;
    let nada = 0;
    const buscarValoresUnicos = (valor, indice, self) => {
      return (
        indice === self.findIndex((objeto) => objeto.numped === valor.numped)
      );
    };

    const valoresUnicos = QtItensporTiposeparacao.filter(buscarValoresUnicos);
    const valoresUnicosFiltrador = valoresUnicos.filter(item => item.datainiciosep == null && item.datafimsep == null && item.posicao != 'F');
    //console.log(valoresUnicosFiltrador);

    const count = valoresUnicosFiltrador.filter(function (item) {
      if (item.posicaopedido === 'BALCAO') {
        balcao += 1;
      } else if (item.posicaopedido === 'RETIRA') {
        retira += 1;
      } else if (item.posicaopedido === 'ENTREGA') {
        entrega += 1;
      } else if (item.posicaopedido === 'NADA') {
        nada += 1;
      }
      return true;

    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Balcão', 'Retira', 'Entrega', 'Nada'],
      datasets: [
        {
          label: 'Tipo Serparação',
          data: [balcao, retira, entrega, nada],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
  
  separadoresOcupados(separadores) {
    
    this.itensPrimeiraLista = [];
    let ocorrencias;
    let resultado;
    
    const buscarValoresUnicos = (valor, indice, self) => {
      return (
        indice === self.findIndex((objeto) => objeto.numped === valor.numped)
      );
    };

    const valoresUnicos = separadores.filter(buscarValoresUnicos);
    const valoresUnicosFiltrador = valoresUnicos.filter(item => item.datainiciosep != null && item.datafimsep == null && item.posicao != 'F');
    const contador = {};
    const separadoresOcupados = valoresUnicosFiltrador.filter(separador => separador.codfuncsep);
    separadoresOcupados.forEach(separador => {
      const { codfuncsep } = separador;
      contador[codfuncsep] = (contador[codfuncsep] || 0) + 1;
    });    
    
    for (const separador in contador) {
      ocorrencias = contador[separador] ? contador[separador] : 0;
      resultado = valoresUnicosFiltrador.filter(obj => obj.codfuncsep == separador)
        .map(obj => ({
          ...obj,
          separador: this.allSeparadores.find(item => item.matricula == obj.codfuncsep) 
        }));
      let valorPadrao = "Valor não encontrado";
      let nomeDoSeparador = resultado ? resultado?.[0]?.separador?.nome : valorPadrao;
          
      this.itensPrimeiraLista.push( {"quantidade" : ocorrencias  ,"codigo" :separador,   "nome" :nomeDoSeparador?.split(" ")[0],"nomeCompleto" :nomeDoSeparador});
    } 
    this.itensPrimeiraLista.sort(((a,b)=>   b.quantidade - a.quantidade));
  }

  totaldePedidosSeparados(separadores) {    
    this.itensSegundaLista = [];
    let ocorrencias2;
    let resultado;
    const buscarValoresUnicos = (valor, indice, self) => {
      return (
        indice === self.findIndex((objeto) => objeto.numped === valor.numped)
      );
    };

    const valoresUnicos = separadores.filter(buscarValoresUnicos);
    const totalizandoSeparacoes = valoresUnicos.filter(item => item.datainiciosep != null && item.datafimsep != null && item.codfuncsep != null);
    const contador = {};  
    const separacoesFinalizadas = totalizandoSeparacoes.filter(separador => separador.codfuncsep);
    separacoesFinalizadas.forEach(separador => {
      const { codfuncsep } = separador;
      contador[codfuncsep] = (contador[codfuncsep] || 0) + 1;
    });       

    for (const separador in contador) {
      ocorrencias2 = contador[separador] ? contador[separador] : 0;
      resultado = totalizandoSeparacoes.filter(obj => obj.codfuncsep == separador)
        .map(obj => ({
          ...obj,
          separador: this.allSeparadores.find(item => item.matricula == obj.codfuncsep) 
        }));
      let valorPadrao = "Valor não encontrado";
      let nomeDoSeparador2  = resultado ? resultado?.[0]?.separador?.nome : valorPadrao; 
           
      this.itensSegundaLista.push({"quantidade" : ocorrencias2  ,"codigo" :separador,   "nome" :nomeDoSeparador2?.split(" ")[0],"nomeCompleto" :nomeDoSeparador2});
    }
    this.itensSegundaLista.sort(((a,b)=>  b.quantidade - a.quantidade));
  }

  printPage(){
    window.print();
  }


  calculateCustomerTotal(numped) {
    let total = 0;

    if (this.painelAcompanhaPedidos) {
      for (let painelAcompanhaPedido of this.painelAcompanhaPedidos) {
        if (painelAcompanhaPedido.numped === numped) {
          total++;
        }
      }
    }

    return total;
  }
  clear(table: Table) {
    table.clear();
  }

  togglediv(id) {
    let div = document.getElementById(id);
    div.style.display = "block";
  }

  contarObjetosUnicos(array) {
    let objetosUnicos = new Set();
    for (let i = 0; i < array.length; i++) {
      let objeto = array[i];
      objetosUnicos.add(JSON.stringify(objeto));
    }
    return objetosUnicos.size;
  }

  transform(minutes) {
    const hours = Math.floor(minutes / 60);
    const minutesLeft = minutes % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutesLeft < 10 ? '0' : ''}${minutesLeft}:00`
  }

}
