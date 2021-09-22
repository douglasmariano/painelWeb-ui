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
import { UppercaseDirective } from './uppercase.directive'
import { PedidosCadastroComponent } from './pedidos-cadastro/pedidos-cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const routes: Routes=[
  {path: 'login', component: LoginComponent},

  {path: '', component: HomeComponent, canActivate : [LoginGuard] },
  {path: 'pedidos', component: PedidosPesquisaComponent, canActivate : [LoginGuard]},
  {path: 'pedidos/novo', component: PedidosCadastroComponent, canActivate : [LoginGuard]},
  {path: 'pedidos/:numped', component: PedidosCadastroComponent, canActivate : [LoginGuard]},
  {path: 'painel', component: PainelPedidosComponent, canActivate : [LoginGuard]}  
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
    LoginComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [PedidoService, PainelPedidosService, PedidoPesquisaService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
