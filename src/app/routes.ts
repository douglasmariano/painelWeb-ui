import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IncluirItemBonusComponent } from './components/bonus/incluir-item-bonus/incluir-item-bonus.component';
import { HomeComponent } from './home/home.component';

import { BuscaBonusEntradaComponent } from './components/bonus/busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaItemBonusComponent } from './components/bonus/busca-item-bonus/busca-item-bonus.component';
import { CadastroCodigoDeBarrasComponent } from './components/cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './components/canhoto/canhoto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AjelEntregaCadastroComponent } from './components/entrega/ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './components/entrega/ajel-entrega/ajel-entrega.component';
import { EstoqueCaboCadastroComponent } from './components/estoque/estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './components/estoque/estoque-cabo/estoque-cabo.component';
import { EstoqueExpedicaoComponent } from './components/estoque/estoque-expedicao/estoque-expedicao.component';
import { LoginComponent } from './components/login/login.component';
import { PainelAcompamentoPedidosComponent } from './components/paineis/painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelPedidosComponent } from './components/paineis/painel-pedidos/painel-pedidos.component';
import { PedidosCadastroComponent } from './components/pedido/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './components/pedido/pedidos-pesquisa/pedidos-pesquisa.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { PainelSeparacaoComponent } from './components/paineis/painel-separacao/painel-separacao.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home',
      //role: ['ROLE_COMPRAS','ROLE_VENDAS','ROLE_FINANCEIRO','ROLE_LOGISTICA','ROLE_EXPEDICAO','ROLE_RH',
      //        'ROLE_FISCAL','ROLE_CONTABIL','ROLE_OUTROS','ROLE_DIRETOR','ROLE_GERENTE','ROLE_COORDENADOR','ROLE_OPERADOR','ROLE_TI', 'ROLE_OUTROTIPOCARGO', '']
    },
  },
  {
    path: 'pedidos',
    component: PedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consulta Pedido',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_VENDAS']
    },
  },
  {
    path: 'pedidos/novo',
    component: PedidosCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Incluindo Pedidos',
    },
  },
  {
    path: 'pedidos/:numped',
    component: PedidosCadastroComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'painel',
    component: PainelPedidosComponent,
    canActivate: [AuthGuard],
    data:{
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_VENDAS']
    }
  },
  {
    path: 'painelseparacao',
    component: PainelSeparacaoComponent,
    canActivate: [AuthGuard],
    data:{
      title: 'Painel Separação',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_VENDAS']
    }
  },
  {
    path: 'estoquecabo',
    component: EstoqueCaboComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Estoque Cabos',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_LOGISTICA']
    },
  },
  {
    path: 'estoquecabo/novo',
    component: EstoqueCaboCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastro de Estoque Cabos',
    },
  },
  {
    path: 'estoquecabo/:codcabo',
    component: EstoqueCaboCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Alteração de Estoque Cabos',
    },
  },
  {
    path: 'expedicao',
    component: EstoqueExpedicaoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Expedição de Mercadoria',
    },
  },
  {
    path: 'produto',
    component: ProdutoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Produtos',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_LOGISTICA']
    },
  },
  {
    path: 'ajelentrega',
    component: AjelEntregaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista de Pedido Entregues',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_EXPEDICAO']
    },
  },
  {
    path: 'ajelentrega/:numnota',
    component: AjelEntregaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Adicionar nova Entrega',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_EXPEDICAO']
    },
  },
  {
    path: 'ajelentrega/alteraSeparacao/:codentrega',
    component: AjelEntregaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Alterar Entrega',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_EXPEDICAO']
    },
  },
  {
    path: 'paineldePedidos',
    component: PainelAcompamentoPedidosComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Separação de Pedidos',
      role: ['ROLE_TI','ROLE_GERENTE', 'ROLE_EXPEDICAO']
    },
  },
  {
    path: 'canhoto',
    component: CanhotoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Controle de Canhotos',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_EXPEDICAO','ROLE_FISCAL','ROLE_VENDAS' ]
    },
  },
  {
    path: 'codigodebarras',
    component: CadastroCodigoDeBarrasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastro de Codigo de Barras',
      role: ['ROLE_TI','ROLE_GERENTE' ]
    },
  },
  {
    path: 'produto/codigodebarra/:codprod',
    component: CadastroCodigoDeBarrasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastro de Codigo de Barras',
      role: ['ROLE_TI','ROLE_GERENTE' ]
    },
  },
  {
    path: 'buscar-item-entrada/:numbonus',
    component: BuscaItemBonusComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Busca itens Bônus',
      role: ['ROLE_TI','ROLE_GERENTE' ]
    },
  },
  {
    path: 'buscar-bonus-entrada',
    component: BuscaBonusEntradaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Busca Bônus',
      role: ['ROLE_TI','ROLE_GERENTE' ]
    },
  },
  {
    path: 'incluir-item-bonus',
    component: IncluirItemBonusComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Incluindo Itens ao Bônus',
      role: ['ROLE_TI','ROLE_GERENTE' ]
    },
  },
  {
    path: 'cliente/telefone',
    component: ClienteComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Informações do Cliente',
      role: ['ROLE_TI','ROLE_GERENTE','ROLE_VENDAS']
    },
  },
];

export {
  routes
};

