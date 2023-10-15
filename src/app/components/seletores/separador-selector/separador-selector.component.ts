import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FuncionarioService } from '@services/funcionario.service';


@Component({
  selector: 'app-separador-selector',
  templateUrl: './separador-selector.component.html',
  styleUrls: ['./separador-selector.component.css']
})
export class SeparadorSelectorComponent implements OnInit{
 
  
  separadorSelecionadas ;
  separador ;
  allSeparador: [];
 
  @Output()
  separadorSelecionado = new EventEmitter();

  constructor(private funcionarioService: FuncionarioService,
              ) { }

  emitirSeparadorSelecionadas() {
    //console.log(this.separadorSelecionadas)
    if (this.separadorSelecionadas) {
      this.separadorSelecionado.emit(this.separadorSelecionadas)
    }
  }

  ngOnInit(): void {  
    this.funcionarioService.listarTodosSeparadores().subscribe((resultado: any) => {
      this.allSeparador = resultado;     

    })   
  }

 
  
  
  search(event) {
    if (this.allSeparador && event?.query ) {
      //this.separador = this.allSeparador.filter((nome: any) => nome?.nome?.toLowerCase().includes(event.query.toLowerCase()));   
      const query = event.query.toLowerCase();  
      this.separador = this.allSeparador.filter((obj:any) => {
                                  const matriculaStr = obj.matricula.toString(); 
                                  return obj?.nome?.toLowerCase().startsWith(query) || (matriculaStr.startsWith(query))});
      this.separador.sort((a, b) => a.matricula - b.matricula);
    }
  }

  
  
}
