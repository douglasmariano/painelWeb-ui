import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-motorista-selector',
  templateUrl: './motorista-selector.component.html',
  styleUrls: ['./motorista-selector.component.css']
})
export class MotoristaSelectorComponent implements OnInit {
  
  @Input() 
  motoristaSelecionadas;
  
  motorista;
  allMotoristas: [];

  @Output() 
  eventoCampoMotorista = new EventEmitter<void>();

  @Output()
  motoristaSelecionado = new EventEmitter();

  constructor(private funcionarioService: FuncionarioService) { }

  emitirMotoristaSelecionadas() {
    //console.log(this.motoristaSelecionadas)
    if (this.motoristaSelecionadas) {
      this.motoristaSelecionado.emit(this.motoristaSelecionadas)
    }
  }

  ngOnInit(): void {
    this.funcionarioService.listarTodosMotorista().subscribe((resultado: any) => {
      this.allMotoristas = resultado;

    })
  }

  onClear(event){
    this.eventoCampoMotorista.emit(event.isTrusted)    
  }
  limparSelecao(){
    this.motoristaSelecionadas = null
  }

  search(event) {
    if (this.allMotoristas && event?.query ) {
      //this.separador = this.allSeparador.filter((nome: any) => nome?.nome?.toLowerCase().includes(event.query.toLowerCase()));   
      const query = event.query.toLowerCase();  
      this.motorista = this.allMotoristas.filter((obj:any) => {
                                  const matriculaStr = obj.matricula.toString(); 
                                  return obj?.nome?.toLowerCase().startsWith(query) || (matriculaStr.startsWith(query))});
      this.motorista.sort((a, b) => a.matricula - b.matricula);
    }
  }
}



