import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule, Routes } from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip'
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {PanelModule} from 'primeng/panel';
import {DialogModule}from'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';

import { AppComponent } from './app.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { JwtModule } from '@auth0/angular-jwt';

import { PedidoService } from './pedido.service';
import { PainelPedidosService } from './painel-pedidos/painel-pedidos.service';
import { PedidoPesquisaService } from './pedidos-pesquisa/pedidos-pesquisa.service';
import { EstoqueCaboService } from './estoque-cabo/estoquecabo.service';
import { ProdutoService } from './produto/produto.service';
import { EstoqueDetalheService } from './estoque-detalhe/estoque-detalhe.service';
import { EstoqueExtratoService } from './estoque-extrato/estoque-extrato.service';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { EstoqueCaboComponent } from './estoque-cabo/estoque-cabo.component';
import { ProdutoComponent } from './produto/produto.component';
import { EstoqueDetalheComponent } from './estoque-detalhe/estoque-detalhe.component';
import { EstoqueExtratoComponent } from './estoque-extrato/estoque-extrato.component';
import { MarcaSelectorComponent } from './marca-selector/marca-selector.component';
import { MarcaService } from './marca.service';
import { EstoqueCaboCadastroComponent } from './estoque-cabo-cadastro/estoque-cabo-cadastro.component';
import { AjelEntregaComponent } from './ajel-entrega/ajel-entrega.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AjelEntregaService } from './ajel-entrega/ajel-entrega.service';
import { AjelEntregaCadastroComponent } from './ajel-entrega-cadastro/ajel-entrega-cadastro.component';

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
  {path: 'estoquecabo/:codendcabo', component: EstoqueCaboCadastroComponent, canActivate : [LoginGuard],
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
      title: 'Adicionar nova Entrega.'
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
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
