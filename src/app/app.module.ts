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

import { AppComponent } from './app.component';
import { PedidosPesquisaComponent } from './pedidos-pesquisa/pedidos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidoService } from './pedido.service';
import { PainelPedidosService } from './painel-pedidos/painel-pedidos.service';
import { PedidoPesquisaService } from './pedidos-pesquisa/pedidos-pesquisa.service';
import { PainelPedidosComponent } from './painel-pedidos/painel-pedidos.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';



import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';

const routes: Routes=[
  {path: '', component: PedidosPesquisaComponent},
  {path: 'pedidos', component: PedidosPesquisaComponent},
  {path: 'pedidos/novo', component: PedidosCadastroComponent},
  {path: 'pedidos/:numped', component: PedidosCadastroComponent},
  {path: 'painel', component: PainelPedidosComponent}  
];

@NgModule({
  declarations: [
    AppComponent,
    PedidosPesquisaComponent,
    NavbarComponent,
    PainelPedidosComponent,
    PedidosCadastroComponent,
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
  providers: [PedidoService, PainelPedidosService, PedidoPesquisaService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
