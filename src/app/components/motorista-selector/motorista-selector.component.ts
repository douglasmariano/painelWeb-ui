import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-motorista-selector',
  templateUrl: './motorista-selector.component.html',
  styleUrls: ['./motorista-selector.component.css']
})
export class MotoristaSelectorComponent implements OnInit {

  motoristaSelecionadas;
  motorista;
  allMotoristas: [];

  @Output()
  motoristaSelecionado = new EventEmitter();

  constructor(private funcionarioService: FuncionarioService) { }

  emitirMotoristaSelecionadas() {
    console.log(this.motoristaSelecionadas)
    if (this.motoristaSelecionadas) {
      this.motoristaSelecionado.emit(this.motoristaSelecionadas)
    }
  }

  ngOnInit(): void {
    this.funcionarioService.listarTodosMotorista().subscribe((resultado: any) => {
      this.allMotoristas = resultado;

    })
  }

  search(event) {
    if (this.allMotoristas && event?.query) {
      this.motorista = this.allMotoristas.filter((nome: any) => nome?.nome?.toLowerCase().includes(event.query.toLowerCase()))
    }
  }
}



