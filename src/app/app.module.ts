import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { UppercaseDirective } from './uppercase.directive';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeES from '@angular/common/locales/es';
import localeFR from '@angular/common/locales/fr';
import localePT from '@angular/common/locales/pt';
import { AjelEntregaAlteraTransporteComponent } from './ajel-entrega-altera-transporte/ajel-entrega-altera-transporte.component';
import { AjelEntregaCadastroComponent } from './ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './ajel-entrega/ajel-entrega.component';
import { AjelEntregaService } from './ajel-entrega/ajel-entrega.service';
import { BuscaBonusEntradaComponent } from './busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaBonusEntradaService } from './busca-bonus-entrada/busca-bonus-entrada.service';
import { BuscaItemBonusComponent } from './busca-item-bonus/busca-item-bonus.component';
import { BuscaItemBonusService } from './busca-item-bonus/busca-item-bonus.service';
import { CadastroCodigoDeBarrasComponent } from './cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './canhoto/canhoto.component';
import { CanhotoService } from './canhoto/canhoto.service';
import { ConferenteSelectorComponent } from './conferente-selector/conferente-selector.component';
import { EstoqueCaboCadastroComponent } from './estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './estoque-cabo/estoque-cabo.component';
import { EstoqueCaboService } from './estoque-cabo/estoquecabo.service';
import { EstoqueDetalheComponent } from './estoque-detalhe/estoque-detalhe.component';
import { EstoqueDetalheService } from './estoque-detalhe/estoque-detalhe.service';
import { EstoqueExtratoComponent } from './estoque-extrato/estoque-extrato.component';
import { EstoqueExtratoService } from './estoque-extrato/estoque-extrato.service';
import { MarcaSelectorComponent } from './marca-selector/marca-selector.component';
import { MarcaService } from './marca.service';
import { MotoristaSelectorComponent } from './motorista-selector/motorista-selector.component';
import { PainelAcompamentoPedidosComponent } from './painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelAcompamentoPedidosService } from './painel-acompamento-pedidos/painel-acompamento-pedidos.service';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { PainelPedidosService } from './painel-pedidos/painel-pedidos.service';
import { PedidoService } from './pedido.service';
import { PedidoPesquisaService } from './pedidos-pesquisa/pedidos-pesquisa.service';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoService } from './produto/produto.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { TransportadoraSelectorComponent } from './transportadora-selector/transportadora-selector.component';
registerLocaleData(localePT);
registerLocaleData(localeES);
registerLocaleData(localeDE);
registerLocaleData(localeFR);

const routes: Routes=[
  {path: 'login', component: LoginComponent},
  {path: '', component: PedidosPesquisaComponent, canActivate : [LoginGuard],
    data: {
      title: 'Consulta Pedido'
    }
  },
  {path: 'pedidos', component: PedidosPesquisaComponent, canActivate : [LoginGuard], 
    data: {
      title: 'Consulta Pedido'
    }
  },
  {path: 'pedidos/novo', component: PedidosCadastroComponent, canActivate : [LoginGuard], 
    data: {
      title: 'Incluindo Pedidos'
    }
  },
  {path: 'pedidos/:numped', component: PedidosCadastroComponent, canActivate : [LoginGuard] }, 
  {path: 'painel', component: PainelPedidosComponent, canActivate : [LoginGuard] }, 
  {path: 'estoquecabo', component: EstoqueCaboComponent, canActivate : [LoginGuard],
    data: {
      title: 'Estoque Cabos'
    }
  },
  {path: 'estoquecabo/novo', component: EstoqueCaboCadastroComponent, canActivate : [LoginGuard],
    data: {
      title: 'Cadastro de Estoque Cabos'
    }
  },
  {path: 'estoquecabo/:codcabo', component: EstoqueCaboCadastroComponent, canActivate : [LoginGuard],
    data: {
      title: 'Alteração de Estoque Cabos'
    }
  },
  {path: 'produto', component: ProdutoComponent, canActivate : [LoginGuard],
    data: {
      title: 'Produtos'
    }
  },
  {path: 'ajelentrega', component: AjelEntregaComponent, canActivate : [LoginGuard],
    data: {
      title: 'Lista de Pedido Entregues'
    }
  },
  {path: 'ajelentrega/:numnota', component: AjelEntregaCadastroComponent, canActivate : [LoginGuard],
    data: {
      title: 'Adicionar nova Entrega'
    }
  },
  {path: 'ajelentrega/alteraSeparacao/:codentrega', component: AjelEntregaCadastroComponent, canActivate : [LoginGuard],
    data: {
      title: 'Alterar Entrega'
    }
  },
  {path: 'painelacompanhaPedidos', component: PainelAcompamentoPedidosComponent, canActivate : [LoginGuard],
    data: {
      title: 'Painel Acompanha Pedidos'
    }
  },
  {path: 'canhoto', component: CanhotoComponent, canActivate : [LoginGuard],
    data: {
      title: 'Controle de Canhotos'
    }
  }, 
  {path: 'codigodebarras', component: CadastroCodigoDeBarrasComponent, canActivate : [LoginGuard],
    data: {
      title: 'Cadastro de Codigo de Barras'
    }
  },
  {path: 'buscar-item-entrada/:numbonus', component: BuscaItemBonusComponent, canActivate : [LoginGuard],
  data: {
    title: 'Busca itens Bônus'
  }
},
  {path: 'buscar-bonus-entrada', component: BuscaBonusEntradaComponent, canActivate : [LoginGuard],
  data: {
    title: 'Busca Bônus'
  }
},  
];

@NgModule({
  declarations: [
    AppComponent,
    PedidosPesquisaComponent,
    NavbarComponent,
    PainelPedidosComponent,
    PedidosCadastroComponent,
    UppercaseDirective,
    HomeComponent,
    LoginComponent,
    EstoqueCaboComponent,
    ProdutoComponent,
    EstoqueDetalheComponent,
    EstoqueExtratoComponent,
    MarcaSelectorComponent,
    EstoqueCaboCadastroComponent,
    AjelEntregaComponent,
    AjelEntregaCadastroComponent,
    TransportadoraSelectorComponent,
    MotoristaSelectorComponent,
    ConferenteSelectorComponent,
    AjelEntregaAlteraTransporteComponent,
    PainelAcompamentoPedidosComponent,
    CanhotoComponent,
    CadastroCodigoDeBarrasComponent,    
    BuscaBonusEntradaComponent,
    BuscaItemBonusComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    AutoCompleteModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    DynamicDialogModule,
    PanelModule,
    DialogModule,   
    SelectButtonModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    CalendarModule,    
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    ReactiveFormsModule, 
    InputSwitchModule,
    TriStateCheckboxModule,
    ToastModule,
    SidebarModule,
    MegaMenuModule,
    PanelMenuModule,
    SlideMenuModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    PedidoService,
    PainelPedidosService,
    PedidoPesquisaService,
    ConfirmationService, 
    EstoqueCaboService,
    ProdutoService, 
    EstoqueDetalheService, 
    EstoqueExtratoService, 
    MarcaService,
    AjelEntregaService,
    PainelAcompamentoPedidosService,
    CanhotoService,
    BuscaBonusEntradaService,
    BuscaItemBonusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
