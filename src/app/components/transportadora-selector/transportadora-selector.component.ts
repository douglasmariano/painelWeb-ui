import { Component, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { TransportadoraService } from '../../services/transportadora.service';

@Component({
  selector: 'app-transportadora-selector',
  templateUrl: './transportadora-selector.component.html',
  styleUrls: ['./transportadora-selector.component.css']
})
export class TransportadoraSelectorComponent implements OnInit {

  transportadoraSelecionadas;
  transportadora;
  allTransportadoras: [];
  
  @Output() 
  transportadoraSelecionada = new EventEmitter();

  constructor(private trasnportadoraService: TransportadoraService) { }

  emitirTransportadoraSelecionadas() {
    console.log("testeemitir")
    if (this.transportadoraSelecionadas) {      
      this.transportadoraSelecionada.emit(this.transportadoraSelecionadas)    
    }
  }

  ngOnInit(): void {
    this.trasnportadoraService.listarTodos().subscribe((resultado: any) => {
      this.allTransportadoras = resultado;
      
    })
  }

  search(event) {
    if (this.allTransportadoras && event?.query) { 
      this.transportadora = this.allTransportadoras.filter((fornecedor: any) => fornecedor?.fornecedor?.toLowerCase().includes(event.query.toLowerCase()))
    }
}}
