import { environment } from './../../../../environments/environment';
import { Component, OnChanges, OnInit, Output, SimpleChanges, EventEmitter, Input } from '@angular/core';
import { TransportadoraService } from '../../../services/transportadora.service';

@Component({
  selector: 'app-transportadora-selector',
  templateUrl: './transportadora-selector.component.html',
  styleUrls: ['./transportadora-selector.component.css']
})
export class TransportadoraSelectorComponent implements OnInit {
  
  @Input() 
  transportadoraSelecionadas;

  transportadora;
  allTransportadoras: [];
  
  @Output() 
  eventoCampoTranportadora = new EventEmitter<void>();

  @Output()
  transportadoraSelecionada = new EventEmitter();
  

  constructor(private trasnportadoraService: TransportadoraService) { }

  emitirTransportadoraSelecionadas() {
    //console.log("testeemitir")
    if (this.transportadoraSelecionadas) {
      this.transportadoraSelecionada.emit(this.transportadoraSelecionadas)
    }
  }

  ngOnInit(): void {
    this.trasnportadoraService.listarTodos().subscribe((resultado: any) => {
      this.allTransportadoras = resultado;

    })
  }
  onClear(event){
    this.eventoCampoTranportadora.emit(event.isTrusted)    
  }
  limparSelecao(){
    this.transportadoraSelecionadas = null
  }

  search(event) {
    if (this.allTransportadoras && event?.query ) {
      //this.separador = this.allSeparador.filter((nome: any) => nome?.nome?.toLowerCase().includes(event.query.toLowerCase()));   
      const query = event.query.toLowerCase();  
      this.transportadora = this.allTransportadoras.filter((obj:any) => {
                                  const condfornecStr = obj.codfornec.toString(); 
                                  return obj?.fornecedor?.toLowerCase().startsWith(query) || (condfornecStr.startsWith(query))});
      this.transportadora.sort((a, b) => a.codfornec - b.codfornec);
    }
  }
}
