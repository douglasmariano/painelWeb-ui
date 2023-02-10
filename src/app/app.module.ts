import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

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
import { DividerModule} from 'primeng/divider'
import { CardModule } from 'primeng/card';
import { SplitterModule } from "primeng/splitter";
import {CheckboxModule} from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';
import {ProgressSpinnerModule} from 'primeng/progressspinner';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidosCadastroComponent } from './components/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './components/pedidos-pesquisa/pedidos-pesquisa.component';
import { UppercaseDirective } from './uppercase.directive';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeES from '@angular/common/locales/es';
import localeFR from '@angular/common/locales/fr';
import localePT from '@angular/common/locales/pt';
import { AjelEntregaAlteraTransporteComponent } from './components/ajel-entrega-altera-transporte/ajel-entrega-altera-transporte.component';
import { AjelEntregaCadastroComponent } from './components/ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './components/ajel-entrega/ajel-entrega.component';
import { AjelEntregaService } from './services/ajel-entrega.service';
import { BuscaBonusEntradaComponent } from './components/busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaBonusEntradaService } from './services/busca-bonus-entrada.service';
import { BuscaItemBonusComponent } from './components/busca-item-bonus/busca-item-bonus.component';
import { BuscaItemBonusService } from './services/busca-item-bonus.service';
import { CadastroCodigoDeBarrasComponent } from './components/cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './components/canhoto/canhoto.component';
import { CanhotoService } from './services/canhoto.service';
import { ConferenteSelectorComponent } from './components/conferente-selector/conferente-selector.component';
import { EstoqueCaboCadastroComponent } from './components/estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './components/estoque-cabo/estoque-cabo.component';
import { EstoqueCaboService } from './services/estoque-cabo.service';
import { EstoqueDetalheComponent } from './components/estoque-detalhe/estoque-detalhe.component';
import { EstoqueDetalheService } from './services/estoque-detalhe.service';
import { EstoqueExtratoComponent } from './components/estoque-extrato/estoque-extrato.component';
import { EstoqueExtratoService } from './services/estoque-extrato.service';
import { MarcaSelectorComponent } from './components/marca-selector/marca-selector.component';
import { MarcaService } from './services/marca.service';
import { MotoristaSelectorComponent } from './components/motorista-selector/motorista-selector.component';
import { PainelAcompamentoPedidosComponent } from './components/painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelAcompamentoPedidosService } from './services/painel-acompamento-pedidos.service';
import { PainelPedidosComponent } from './components/painel-pedidos/painel-pedidos.component';
import { PainelPedidosService } from './services/painel-pedidos.service';
import { PedidoService } from './services/pedido.service';
import { PedidoPesquisaService } from './services/pedidos-pesquisa.service';
import { ProdutoComponent } from './components/produto/produto.component';
import { ProdutoService } from './services/produto.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TransportadoraSelectorComponent } from './components/transportadora-selector/transportadora-selector.component';
import { TransportadoraService } from './services/transportadora.service';
import { ClienteComponent } from './components/cliente/cliente.component';
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
  {path: 'produto', component: ProdutoComponent,
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
{path: 'cliente/telefone', component: ClienteComponent, canActivate : [LoginGuard],
  data: {
    title: 'Informações do Cliente'
  }
}  
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
    ClienteComponent,
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    AutoCompleteModule,
    ToastrModule.forRoot(),
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
    RouterModule.forRoot(routes, {}),
    ReactiveFormsModule,
    ReactiveFormsModule, 
    InputSwitchModule,
    TriStateCheckboxModule,
    ToastModule,
    SidebarModule,
    MegaMenuModule,
    PanelMenuModule,
    SlideMenuModule,
    DividerModule,
    CardModule,
    SplitterModule,
    CheckboxModule,
    DataViewModule,
    ProgressSpinnerModule,
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
    EstoqueCaboService,
    MarcaService,
    TransportadoraService,
    AjelEntregaService,
    PainelAcompamentoPedidosService,
    CanhotoService,
    BuscaBonusEntradaService,
    BuscaItemBonusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
