import { ToastyService } from 'ng2-toasty';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {

  cliente = [];
  numeroCliente: any;
  showLoader :boolean ;
  showNaoEncontrado:boolean = false;
  urlAtual = this.router.url;

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute, private toasty : ToastyService) { }
  
  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      this.numeroCliente = params['telefone'];
    })
    this.showLoader = true
    this.pesquisar();

  }

  async pesquisar() {
    
    const clienteParams = new HttpParams().set('telefone', this.numeroCliente);
    const clienteEncontrado = await this.clienteService.pesquisar(clienteParams).then(cliente => this.cliente = cliente);
    this.showLoader = false;
    if (!clienteEncontrado?.length){
      this.toasty.error('Cliente não encontrado.')
      this.showNaoEncontrado = true;
    }else{      
      this.toasty.success('Cliente encontrado.')
    }
  }
}
