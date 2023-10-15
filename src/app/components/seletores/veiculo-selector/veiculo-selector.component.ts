import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VeiculoService } from '@services/veiculo.service';

@Component({
  selector: 'app-veiculo-selector',
  templateUrl: './veiculo-selector.component.html',
  styleUrls: ['./veiculo-selector.component.css']
})
export class VeiculoSelectorComponent implements OnInit {

  @Input()
  veiculoSelecionadas;
  veiculo;
  allVeiculos: [];
  
  @Output() 
  eventoCampoVeiculo = new EventEmitter<void>();

  @Output()
  veiculoSelecionado = new EventEmitter();

  constructor(private veiculoService: VeiculoService) { }

  emitirVeiculoSelecionadas() {
    if (this.veiculoSelecionadas) {
      this.veiculoSelecionado.emit(this.veiculoSelecionadas)
    }
  }

  ngOnInit(): void {
    this.veiculoService.listarTodos().subscribe((resultado: any) => {
      this.allVeiculos = resultado;

    })
  }
  onClear(event){
    this.eventoCampoVeiculo.emit(event.isTrusted)    
  }
  
  limparSelecao(){
    this.veiculoSelecionadas = null
  }

  search(event) {
    if (this.allVeiculos && event?.query ) {
      const query = event.query.toLowerCase();  
      this.veiculo = this.allVeiculos.filter((obj:any) => {
                                  const codveiculoStr = obj.codveiculo.toString(); 
                                  return obj?.placa?.toLowerCase().startsWith(query) || (codveiculoStr.startsWith(query))});
      this.veiculo.sort((a, b) => a.codveiculo - b.codveiculo);
    }
  }

}
