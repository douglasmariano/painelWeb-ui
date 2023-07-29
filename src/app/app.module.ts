import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeDE from '@angular/common/locales/de';
import localeES from '@angular/common/locales/es';
import localeFR from '@angular/common/locales/fr';
import localePT from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { ToastrModule } from 'ngx-toastr';

import { UppercaseDirective } from './uppercase.directive';

import { ConfirmationService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AppComponent } from './app.component';
import { BuscaBonusEntradaComponent } from './components/bonus/busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaItemBonusComponent } from './components/bonus/busca-item-bonus/busca-item-bonus.component';
import { IncluirItemBonusComponent } from './components/bonus/incluir-item-bonus/incluir-item-bonus.component';
import { CadastroCodigoDeBarrasComponent } from './components/cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './components/canhoto/canhoto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { AjelEntregaAlteraTransporteComponent } from './components/entrega/ajel-entrega-altera-transporte/ajel-entrega-altera-transporte.component';
import { AjelEntregaCadastroComponent } from './components/entrega/ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './components/entrega/ajel-entrega/ajel-entrega.component';
import { ConferenteSelectorComponent } from './components/entrega/conferente-selector/conferente-selector.component';
import { MarcaSelectorComponent } from './components/entrega/marca-selector/marca-selector.component';
import { MotoristaSelectorComponent } from './components/entrega/motorista-selector/motorista-selector.component';
import { TransportadoraSelectorComponent } from './components/entrega/transportadora-selector/transportadora-selector.component';
import { EstoqueCaboCadastroComponent } from './components/estoque/estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './components/estoque/estoque-cabo/estoque-cabo.component';
import { EstoqueDetalheComponent } from './components/estoque/estoque-detalhe/estoque-detalhe.component';
import { EstoqueExpedicaoComponent } from './components/estoque/estoque-expedicao/estoque-expedicao.component';
import { EstoqueExtratoComponent } from './components/estoque/estoque-extrato/estoque-extrato.component';
import { LoginComponent } from './components/login/login.component';
import { PainelAcompamentoPedidosComponent } from './components/pedido/painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelPedidosComponent } from './components/pedido/painel-pedidos/painel-pedidos.component';
import { PedidosCadastroComponent } from './components/pedido/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './components/pedido/pedidos-pesquisa/pedidos-pesquisa.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AjelEntregaService } from './services/ajel-entrega.service';
import { BuscaBonusEntradaService } from './services/busca-bonus-entrada.service';
import { BuscaItemBonusService } from './services/busca-item-bonus.service';
import { CanhotoService } from './services/canhoto.service';
import { EstoqueCaboService } from './services/estoque-cabo.service';
import { EstoqueDetalheService } from './services/estoque-detalhe.service';
import { EstoqueExtratoService } from './services/estoque-extrato.service';
import { MarcaService } from './services/marca.service';
import { PainelAcompamentoPedidosService } from './services/painel-acompamento-pedidos.service';
import { PainelPedidosService } from './services/painel-pedidos.service';
import { PedidoService } from './services/pedido.service';
import { PedidoPesquisaService } from './services/pedidos-pesquisa.service';
import { ProdutoService } from './services/produto.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TransportadoraService } from './services/transportadora.service';
import {WebSocketService } from './services/web-socket.service';

import { routes } from '@/routes';

import { RolesDirective } from './navbar/roles.directive';



registerLocaleData(localePT);
registerLocaleData(localeES);
registerLocaleData(localeDE);
registerLocaleData(localeFR);

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
    RolesDirective,
    IncluirItemBonusComponent,
    EstoqueExpedicaoComponent    
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
    ToolbarModule,
    ChartModule,
    ScrollPanelModule,
    StepsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
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
    BuscaItemBonusService,
    WebSocketService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
