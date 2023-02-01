import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AjelEntregaService } from '../../services/ajel-entrega.service';


@Component({
  selector: 'app-ajel-entrega',
  templateUrl: './ajel-entrega.component.html',
  styleUrls: ['./ajel-entrega.component.css']
})
export class AjelEntregaComponent implements OnInit {


  display: boolean = false;

  showDialog() {
    this.display = true;
  }


  @Input()
  ajelEntrega = [];

  buscaAjelEntrega = new UntypedFormGroup({

    novonumnota: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),
    numnota: new UntypedFormControl('', [Validators.pattern("^[0-9]*$")]),
    dtentrega: new UntypedFormControl(''),

  });
  displayAlteraTransporte: boolean = false;
  codigoEntregaAlteracao;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastrService,
    private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.pesquisar()

  }

  get f() { return this.buscaAjelEntrega.controls; }


  async pesquisar() {
    const ajelEntrega = await this.ajelEntregaService.pesquisarAjelEntrega({ numnota: this.buscaAjelEntrega.value.numnota, dtentrega: this.buscaAjelEntrega.value.dtentrega })
    this.ajelEntrega = ajelEntrega

    const notaPesquisada = this.buscaAjelEntrega.value.numnota
    if (!notaPesquisada) {
      return
    }

    if (this.ajelEntrega.find(x => x.numnota == notaPesquisada)) {
      this.toasty.success('Nota fiscal encontrada.')
    } else {
      const notasWinthor = await this.ajelEntregaService.pesquisarNotaWinthor({numnota: notaPesquisada})
      if (!notasWinthor?.length) {
        this.toasty.error('O número da nota fiscal não foi encontrado.')
      } else  {
        this.confirmation.confirm(
          {
            message: 'Entrega não registrada. Deseja registrar?',
            defaultFocus: "Sim" ,   
            header: "Adiciona Entrega",         
            accept: () => {                      
              this.router.navigateByUrl(`/ajelentrega/` + notaPesquisada)         
            }
          }
        );
      }
    }
  }

 

  showDialogAlteraTransporte(codentrega) {
      this.displayAlteraTransporte = true;
      this.codigoEntregaAlteracao = codentrega;
    }
  

  excluir(codentrega) {
    this.confirmation.confirm(
      {
        message: 'Tem certeza que deseja excluir',
        accept: () => {
          this.ajelEntregaService.excluir(codentrega).then(() => {
            this.toasty.error('Excluido com sucesso!')
            this.pesquisar();
          });
        }
      }
    );
  }

  alterarValorDisplayAlteraTransporte(evento){
    this.displayAlteraTransporte = evento.visible;

    if (this.ajelEntrega) {
      const found = this.ajelEntrega.find(item => item.codentrega === evento.ajelEntregaCadastro.codentrega)

      if (found) {
        Object.assign(found, evento.ajelEntregaCadastro)
      }
    }

  }

}
