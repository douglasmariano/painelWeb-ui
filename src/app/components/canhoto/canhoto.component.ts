import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { WebSocketService } from '@services/web-socket.service';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { Filial, NotaFiscal } from '../../models/canhoto.model';
import { CanhotoService } from '../../services/canhoto.service';



import Validation from './Validation';


@Component({
  selector: 'app-canhoto',
  templateUrl: './canhoto.component.html',
  providers: [MessageService],
  styleUrls: ['./canhoto.component.css']
})

export class CanhotoComponent implements OnInit, OnDestroy {

  socket;
  downloadUrl = `${environment.apiAddress}/download`;
  // = '\\\\ajel-dc01\\winthor\\ETC\\ANEXOS\\AJEL\\CLIENTES';
  isConnected: boolean = true;

  @Input()
  notaFiscalSaida = [];
  notaFiscal01: NotaFiscal[];
  valorDaSegundaBusca;
  filiais: Filial[];
  stompClient;
  selectedFilial: Filial;
  buscaNotaFiscalSaida: UntypedFormGroup;
  clonedNotaFiscal: { [s: string]: NotaFiscal; } = {};
  notaComUrlNaObs : NotaFiscal;
  nomeDoArquivo;
  retornosDoServidor: string[] = [];
  showConversation: boolean = false;
  carregandoSincronizacao: boolean = false;
  name: string;



  constructor(private formBuilder: UntypedFormBuilder, 
              private canhotoService: CanhotoService, 
              private messageService: MessageService, 
              private toasty: ToastrService,
              private webSocketService: WebSocketService,
              private http: HttpClient) {
  }

  ngOnInit(): void {  
    this.webSocketService.conectar();
    this.webSocketService.retornoMetodo$.subscribe((retorno: string) => {
      this.retornoWebsocket(retorno);      
    }); 
    this.webSocketService.statusConnection$.subscribe((status) => {
      this.isConnected = status;
      if (this.isConnected != true){
        this.toasty.error("Sincronizador de canhotos esta fechado. Abra e atualize a pagina novamente.");
      } else{
        this.toasty.success("Sincronizador conectado!");
      }
    });
    this.carregandoSincronizacao = true;
    

    this.filiais = [
      { nome: '01 - Ajel Materiais', codigo: 1 },
      { nome: '02 - Ajel Montagem', codigo: 2 },
      { nome: '03 - Ajel Construtora', codigo: 3 },
      { nome: '04 - Comercial Ajel', codigo: 4 },
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
      const notaRetorno = { ...notaPesquisada }
      const token = localStorage.getItem('token');
      notaRetorno.linkDownload = this.downloadUrl + '?filePath=' +  encodeURIComponent(notaPesquisada.obsnfcarreg) + '&token=' + token;   
      return notaRetorno;
    })
    this.retornosDoServidor = [];
    this.showConversation = false;
  }

  sendName() {    
    this.webSocketService.executarMetodo();
    this.carregandoSincronizacao = false;
  }

  async retornoWebsocket(message) {
    this.showConversation = true; 
    this.carregandoSincronizacao = true;  
     try {
      const objetoRetorno = JSON.parse(message);
      if (!objetoRetorno.length) {
        this.toasty.warning("Nenhum canhoto a sincronizar");
      } else {
        for (let i = 0; i < objetoRetorno.length; i++) {
          this.toasty.success(objetoRetorno[i].pasta);
          this.retornosDoServidor.push(objetoRetorno[i]);
          const listaNotaPesquisada = await this.canhotoService.pesquisar({
            codcli: objetoRetorno[i].codigoCliente,
            numnotaInicial: objetoRetorno[i].numNota,
            numnotaFinal: objetoRetorno[i].numNota,
          })
          const token = localStorage.getItem('token');
          this.notaComUrlNaObs = listaNotaPesquisada.map(notaPesquisada => {
            const notaRetorno = { ...notaPesquisada } 
              notaRetorno.dtcanhoto = new Date();
              notaRetorno.obsnfcarreg = objetoRetorno[i].pasta;              
              notaRetorno.linkDownload = this.downloadUrl + '?filePath=' +  encodeURIComponent(objetoRetorno[i].pasta) + '&token=' + token;          
            return notaRetorno;
          })
          this.canhotoService.canhotoEncontrado(this.notaComUrlNaObs[0]);
          const indiceDoObjeto = this.notaFiscalSaida.findIndex(item => item.numnota === this.notaComUrlNaObs[0].numnota);
          if (indiceDoObjeto !== -1) {
            const novoObjeto = { ...this.notaFiscalSaida[indiceDoObjeto] };
            novoObjeto.dtcanhoto = this.notaComUrlNaObs[0].dtcanhoto;
            novoObjeto.obsnfcarreg = this.notaComUrlNaObs[0].obsnfcarreg;
            novoObjeto.linkDownload = this.notaComUrlNaObs[0].linkDownload;
            this.notaFiscalSaida[indiceDoObjeto] = novoObjeto;
          }     
         // console.log('Nota alterada: '+this.notaComUrlNaObs[0].numtransvenda);        
        }       
                 //console.log(objetoRetorno);
      }
     
    } catch (error) {
      this.toasty.warning("A mensagem recebida não é um JSON válido.");
    }
  }

  setConnected(connected) {    
    this.showConversation = connected;
    this.retornosDoServidor = [];
  }
 
  criaNomeDoArquivo(codigoDoCliente, numNota, serie){   
    this.nomeDoArquivo = 'NF'+numNota+'S'+serie+'C'+codigoDoCliente+'.jpg';
    //console.log(this.nomeDoArquivo)
  }

  onFileSelected(event: any) {
    const file: File = event.files[0];
    if (file) {
      let data = JSON.stringify({
        'name' : file.name,
        'newName' : this.nomeDoArquivo
       })      
      this.webSocketService.selecionaCanhotoManual(data);
      //console.log('Nome do arquivo selecionado:', file.name);
    }
  }
}
