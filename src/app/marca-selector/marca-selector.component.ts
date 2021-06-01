import { Component, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { MarcaService } from '../marca.service';

@Component({
  selector: 'app-marca-selector',
  templateUrl: './marca-selector.component.html',
  styleUrls: ['./marca-selector.component.css']
})
export class MarcaSelectorComponent implements OnInit {

  marcasSelecionadas;
  marcas;
  allMarcas: [];
  
  @Output() 
  marcaSelecionada = new EventEmitter();

  constructor(private marcaService: MarcaService) { }

  emitirMarcasSelecionadas() {
    if (this.marcasSelecionadas) {
      const codmarcas = this.marcasSelecionadas.map(marca => marca.codmarca)
      this.marcaSelecionada.emit(codmarcas)
    }
  }

  ngOnInit(): void {
    this.marcaService.listarTodos().subscribe((resultado: any) => {
      this.allMarcas = resultado;
    })
  }

  search(event) {
    if (this.allMarcas && event?.query) { 
      this.marcas = this.allMarcas.filter((marca: any) => marca?.marca?.toLowerCase().includes(event.query.toLowerCase()))
    }
  }

}
