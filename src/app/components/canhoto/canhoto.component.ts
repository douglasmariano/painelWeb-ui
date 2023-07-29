import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WebSocketService } from '@services/web-socket.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Filial, NotaFiscal } from '../../models/canhoto.model';
import { CanhotoService } from '../../services/canhoto.service';
//import * as SockJS from 'sockjs-client';


import Validation from './Validation';
@Component({
  selector: 'app-canhoto',
  templateUrl: './canhoto.component.html',
  providers: [MessageService],
  styleUrls: ['./canhoto.component.css']
})
export class CanhotoComponent implements OnInit, OnDestroy {

  socket;

  @Input()
  notaFiscalSaida = [];
  notaFiscal01: NotaFiscal[];
  valorDaSegundaBusca;
  filiais: Filial[];
  stompClient;
  selectedFilial: Filial;
  buscaNotaFiscalSaida: UntypedFormGroup;
  clonedNotaFiscal: { [s: string]: NotaFiscal; } = {};

  retornosDoServidor: string[] = [];
  showConversation: boolean = false;
  name: string;
  disabled: boolean;
  

  constructor(private formBuilder: UntypedFormBuilder, private canhotoService: CanhotoService, private messageService: MessageService, private  toasty:ToastrService,
    private webSocketService: WebSocketService) {
     
  }

  ngOnInit(): void {      
    this.webSocketService.conectar();
    this.webSocketService.retornoMetodo$.subscribe((retorno: string) => {
      this.showGreeting(retorno);
    });

    this.filiais = [
      {nome: '01 - Ajel Materiais',   codigo: 1},
      {nome: '02 - Ajel Montagem',    codigo: 2},
      {nome: '03 - Ajel Construtora', codigo: 3},
      {nome: '04 - Comercial Ajel',   codigo: 4},    
  ];
    this.buscaNotaFiscalSaida = this.formBuilder.group({
      codfilial: [''],
      numnotaInicial: ['', [Validators.pattern("^[0-9]*$"), Validators.required]],
      numnotaFinal: ['', [Validators.pattern("^[0-9]*$")]]
    },
      {
        validators: [Validation.match('numnotaInicial', 'numnotaFinal')]
      }
    )


  }
  ngOnDestroy(): void {
    this.webSocketService.desconectar();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.buscaNotaFiscalSaida.controls;
  }

  async pesquisar() {
    if (this.buscaNotaFiscalSaida.value.numnotaFinal === '') {
      this.valorDaSegundaBusca = Number(this.buscaNotaFiscalSaida.value.numnotaInicial) + 100
    } else {
      this.valorDaSegundaBusca = this.buscaNotaFiscalSaida.value.numnotaFinal;
    }
    const listaNotaPesquisada = await this.canhotoService.pesquisar({
      codfilial: this.selectedFilial.codigo,
      numnotaInicial: this.buscaNotaFiscalSaida.value.numnotaInicial,
      numnotaFinal: this.valorDaSegundaBusca,      
    })    

    this.notaFiscalSaida = listaNotaPesquisada.map(notaPesquisada => {
      const notaRetorno = {...notaPesquisada}
      if(notaPesquisada.obsnfcarreg == "OK"){
         notaRetorno.botao = true;
      }else if(notaPesquisada.obsnfcarreg == "FALTOU"){
        notaRetorno.botao = false;
      }else{
        notaRetorno.botao = null;    
      }
      return notaRetorno;
    } )    
  }

  onRowEditSave(notafiscal: NotaFiscal) {
    if (notafiscal.botao === true) {
      //console.log(notafiscal.botao)
      notafiscal.dtcanhoto = new Date();
      notafiscal.obsnfcarreg = "OK"
      this.messageService.add({ severity: 'success', summary: 'Encontrado', detail: 'Canhoto encontrado.' });
      this.canhotoService.canhotoEncontrado(notafiscal)
    }
    else if (notafiscal.botao === false) {
      //console.log(notafiscal.botao)
      notafiscal.dtcanhoto = new Date();
      notafiscal.obsnfcarreg = "FALTOU"
      this.messageService.add({ severity: 'error', summary: 'Faltou', detail: 'Canhoto não encontrado.' });
      this.canhotoService.canhotoEncontrado(notafiscal)
    } else if (notafiscal.botao === null) {
      notafiscal.dtcanhoto = null;
      notafiscal.obsnfcarreg = ""
      this.messageService.add({ severity: 'warning', summary: 'Buscando', detail: 'Buscando o canhoto.' });
      this.canhotoService.canhotoEncontrado(notafiscal)
    } else {
      //console.log("erro")
    }
  }

  onRowEditCancel(notafiscal: NotaFiscal, index: number) {
    this.notaFiscalSaida[index] = this.clonedNotaFiscal[notafiscal.numtransvenda];
    delete this.clonedNotaFiscal[notafiscal.numtransvenda];
  } 

  sendName() {
    //let data = JSON.stringify({
    //  'name' : this.name
   // })
   // this.webSocketService.executarMetodo(data);
    this.webSocketService.executarMetodo();
  }

  showGreeting(message) {
    this.showConversation = true;
   
    try {
      const objetoRetorno = JSON.parse(message);
      if(!objetoRetorno.length){
        this.toasty.warning("Nenhum canhoto a sincronizar");
      }else{
        for (let i = 0; i < objetoRetorno.length; i++) {    
          this.toasty.success(objetoRetorno[i].pasta);
          this.retornosDoServidor.push(objetoRetorno[i].pasta);
        }
        console.log(objetoRetorno); 
      }
      
    } catch (error) {
      
      this.toasty.warning("A mensagem recebida não é um JSON válido.");
    }  
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.retornosDoServidor = [];
  }

}
