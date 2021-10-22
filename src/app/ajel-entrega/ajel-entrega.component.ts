import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { AjelEntregaService } from './ajel-entrega.service';

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

  buscaAjelEntrega = new FormGroup({

    novonumnota: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    numnota: new FormControl('', [Validators.pattern("^[0-9]*$")]),
    dtentrega: new FormControl(''),

  });

  constructor(
    private route: ActivatedRoute,
    private ajelEntregaService: AjelEntregaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService) { }

  ngOnInit(): void {
    this.pesquisar()

  }

  get f() { return this.buscaAjelEntrega.controls; }


  pesquisar() {
    this.ajelEntregaService.pesquisarAjelEntrega({ numnota: this.buscaAjelEntrega.value.numnota, dtentrega: this.buscaAjelEntrega.value.dtentrega })
      .then(ajelEntrega => this.ajelEntrega = ajelEntrega);

    if (this.buscaAjelEntrega.value.numnota) {
      if (this.ajelEntrega.find(x => x.numnota == this.buscaAjelEntrega.value.numnota)) {
        this.toasty.success('Nota fiscal encontrada.')
      } else {
        this.toasty.error('Nota fiscal não foi encontrada.')
        console.log(this.ajelEntrega)
      }
    }
    this.buscaAjelEntrega.reset();
  }

  get proximaRota() {
    if (this.buscaAjelEntrega.value.novonumnota) {
      if (this.ajelEntrega.find(x => x.numnota == this.buscaAjelEntrega.value.novonumnota)) {
        this.toasty.error('ja existe na lista')
        this.buscaAjelEntrega.reset();
      } else {
        return `/ajelentrega/` + this.buscaAjelEntrega.value.novonumnota;
      }

    }

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

}
