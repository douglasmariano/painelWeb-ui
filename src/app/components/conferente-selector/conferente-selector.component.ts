import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';
import { AjelEntregaCadastroComponent } from '../ajel-entrega-cadastro/ajel-entrega-cadastro.component';
@Component({
  selector: 'app-conferente-selector',
  templateUrl: './conferente-selector.component.html',
  styleUrls: ['./conferente-selector.component.css']
})
export class ConferenteSelectorComponent implements OnInit {

  conferenteSelecionadas ;
  conferente ;
  allConferente: [];


  @Output()
  conferenteSelecionado = new EventEmitter();

  constructor(private funcionarioService: FuncionarioService) { }

  emitirConferenteSelecionadas() {
    console.log(this.conferenteSelecionadas)
    if (this.conferenteSelecionadas) {
      this.conferenteSelecionado.emit(this.conferenteSelecionadas)
    }
  }

  ngOnInit(): void {    
    
    this.funcionarioService.listarTodosConferentes().subscribe((resultado: any) => {
      this.allConferente = resultado;     

    })   
  }
  
  search(event) {
    if (this.allConferente && event?.query ) {
      this.conferente = this.allConferente.filter((nome: any) => nome?.nome?.toLowerCase().includes(event.query.toLowerCase()))
    }
  }

  
}
