import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LoginComponent } from './components/login/login.component';
import { PedidosCadastroComponent } from './components/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './components/pedidos-pesquisa/pedidos-pesquisa.component';
import { AjelEntregaCadastroComponent } from './components/ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './components/ajel-entrega/ajel-entrega.component';
import { BuscaBonusEntradaComponent } from './components/busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaItemBonusComponent } from './components/busca-item-bonus/busca-item-bonus.component';
import { CadastroCodigoDeBarrasComponent } from './components/cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './components/canhoto/canhoto.component';
import { EstoqueCaboCadastroComponent } from './components/estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './components/estoque-cabo/estoque-cabo.component';
import { PainelAcompamentoPedidosComponent } from './components/painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelPedidosComponent } from './components/painel-pedidos/painel-pedidos.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { ClienteComponent } from './components/cliente/cliente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consulta Pedido',
      role: ['ROLE_ADMIN']
    },
  },
  {
    path: 'pedidos',
    component: PedidosPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Consulta Pedido',
      role: ['ROLE_FINANCEIRO']
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
  },
  {
    path: 'estoquecabo',
    component: EstoqueCaboComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Estoque Cabos',
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
    path: 'produto',
    component: ProdutoComponent,
    data: {
      title: 'Produtos',
    },
  },
  {
    path: 'ajelentrega',
    component: AjelEntregaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Lista de Pedido Entregues',
    },
  },
  {
    path: 'ajelentrega/:numnota',
    component: AjelEntregaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Adicionar nova Entrega',
    },
  },
  {
    path: 'ajelentrega/alteraSeparacao/:codentrega',
    component: AjelEntregaCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Alterar Entrega',
    },
  },
  {
    path: 'painelacompanhaPedidos',
    component: PainelAcompamentoPedidosComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Painel Acompanha Pedidos',
    },
  },
  {
    path: 'canhoto',
    component: CanhotoComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Controle de Canhotos',
    },
  },
  {
    path: 'codigodebarras',
    component: CadastroCodigoDeBarrasComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Cadastro de Codigo de Barras',
    },
  },
  {
    path: 'buscar-item-entrada/:numbonus',
    component: BuscaItemBonusComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Busca itens Bônus',
    },
  },
  {
    path: 'buscar-bonus-entrada',
    component: BuscaBonusEntradaComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Busca Bônus',
    },
  },
  {
    path: 'cliente/telefone',
    component: ClienteComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Informações do Cliente',
    },
  },
];

export {
  routes
}