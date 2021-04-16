import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { CalendarModule} from 'primeng/calendar';
import { } from '@angular/cdk/keycodes';

import { AppComponent } from './app.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive'


import { PedidoService } from './pedido.service';
import { PainelPedidosService } from './painel-pedidos/painel-pedidos.service';
import { PedidoPesquisaService } from './pedidos-pesquisa/pedidos-pesquisa.service';
import { EstoqueCaboService } from './estoque-cabo/estoquecabo.service';
import { ProdutoService } from './produto/produto.service';

import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { EstoqueCaboComponent } from './estoque-cabo/estoque-cabo.component';
import { ProdutoComponent } from './produto/produto.component';

const routes: Routes=[
  {path: '', component: PedidosPesquisaComponent},
  {path: 'pedidos', component: PedidosPesquisaComponent},
  {path: 'pedidos/novo', component: PedidosCadastroComponent},
  {path: 'pedidos/:numped', component: PedidosCadastroComponent},
  {path: 'painel', component: PainelPedidosComponent},
  {path: 'estoquecabo', component: EstoqueCaboComponent},
  {path: 'produto', component: ProdutoComponent}     
];

@NgModule({
  declarations: [
    AppComponent,
    PedidosPesquisaComponent,
    NavbarComponent,
    PainelPedidosComponent,
    PedidosCadastroComponent,
    UppercaseDirective,
    EstoqueCaboComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    SelectButtonModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
     
  ],
  providers: [PedidoService, PainelPedidosService, PedidoPesquisaService, ConfirmationService, EstoqueCaboService, ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
