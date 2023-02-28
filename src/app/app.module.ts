import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import localeES from '@angular/common/locales/es';
import localeFR from '@angular/common/locales/fr';
import localePT from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { UppercaseDirective } from './uppercase.directive';

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
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidosCadastroComponent } from './components/pedidos-cadastro/pedidos-cadastro.component';
import { PedidosPesquisaComponent } from './components/pedidos-pesquisa/pedidos-pesquisa.component';
import { AjelEntregaAlteraTransporteComponent } from './components/ajel-entrega-altera-transporte/ajel-entrega-altera-transporte.component';
import { AjelEntregaCadastroComponent } from './components/ajel-entrega-cadastro/ajel-entrega-cadastro.component';
import { AjelEntregaComponent } from './components/ajel-entrega/ajel-entrega.component';
import { BuscaBonusEntradaComponent } from './components/busca-bonus-entrada/busca-bonus-entrada.component';
import { BuscaItemBonusComponent } from './components/busca-item-bonus/busca-item-bonus.component';
import { CadastroCodigoDeBarrasComponent } from './components/cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';
import { CanhotoComponent } from './components/canhoto/canhoto.component';
import { ConferenteSelectorComponent } from './components/conferente-selector/conferente-selector.component';
import { EstoqueCaboCadastroComponent } from './components/estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { EstoqueCaboComponent } from './components/estoque-cabo/estoque-cabo.component';
import { EstoqueDetalheComponent } from './components/estoque-detalhe/estoque-detalhe.component';
import { EstoqueExtratoComponent } from './components/estoque-extrato/estoque-extrato.component';
import { MarcaSelectorComponent } from './components/marca-selector/marca-selector.component';
import { MotoristaSelectorComponent } from './components/motorista-selector/motorista-selector.component';
import { PainelAcompamentoPedidosComponent } from './components/painel-acompamento-pedidos/painel-acompamento-pedidos.component';
import { PainelPedidosComponent } from './components/painel-pedidos/painel-pedidos.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { TransportadoraSelectorComponent } from './components/transportadora-selector/transportadora-selector.component';

import { AjelEntregaService } from './services/ajel-entrega.service';
import { BuscaBonusEntradaService } from './services/busca-bonus-entrada.service';
import { BuscaItemBonusService } from './services/busca-item-bonus.service';
import { CanhotoService } from './services/canhoto.service';
import { EstoqueDetalheService } from './services/estoque-detalhe.service';
import { PedidoService } from './services/pedido.service';
import { EstoqueCaboService } from './services/estoque-cabo.service';
import { EstoqueExtratoService } from './services/estoque-extrato.service';
import { MarcaService } from './services/marca.service';
import { PainelAcompamentoPedidosService } from './services/painel-acompamento-pedidos.service';
import { PainelPedidosService } from './services/painel-pedidos.service';
import { PedidoPesquisaService } from './services/pedidos-pesquisa.service';
import { ProdutoService } from './services/produto.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TransportadoraService } from './services/transportadora.service';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
