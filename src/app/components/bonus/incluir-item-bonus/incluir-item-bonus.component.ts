import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BuscaItemBonusService } from './../../../services/busca-item-bonus.service';
import { BonusItem, BonusItemPk } from './../../../models/busca-item-bonus.model';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '@services/produto.service';


@Component({
  selector: 'app-incluir-item-bonus',
  templateUrl: './incluir-item-bonus.component.html',
  styleUrls: ['./incluir-item-bonus.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class IncluirItemBonusComponent implements OnInit{
  numbonus: number;
  buscaitembonus: UntypedFormGroup;
  produtosPorCodigo: any[];
  itemBonusDialog: boolean;
  itensBonus : BonusItem[];
  modeloBonusItem: BonusItem[];
  itemBonus: BonusItem;
  selectedItemBonus: BonusItem[];
  submitted: boolean;
  
  constructor(private buscaItemEntradaService: BuscaItemBonusService, 
              private produtoService: ProdutoService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private route: ActivatedRoute, 
              private fb: UntypedFormBuilder,) {}

  ngOnInit() {
    this.numbonus = this.route.snapshot.params['numbonus'];
    this.itemBonusDialog = true;
    this.preencherFormGroup();  
  }
  

  preencherFormGroup() {
    this.buscaitembonus = this.fb.group({
      id: '',
      codprod: '',
      numbonus: '',
      qtnf: '',
      codfab: '',
      qtentrada: '',
      qtavaria: '',
      qtavariaun: '',
      qtentun: '',
      qtavariacx: '',
      qtentcx: '',
      tipoembalagempedido: '',
    });
  }

  get f() { return this.buscaitembonus.controls; }  
  
  async carregarBonus(codauxiliar : number) {
    this.produtosPorCodigo = [];
    const listaItensBonusPesquisado = await this.produtoService.pesquisar({
        codauxiliar: codauxiliar,
    })
    for (const bonusPesquisado of listaItensBonusPesquisado) {
      const dadosProduto: any = await this.produtoService.pesquisar({
        codprod: bonusPesquisado.id.codprod,
      })
      this.produtosPorCodigo.push({ ...bonusPesquisado, ...dadosProduto })
    }
    //console.log(this.produtosPorCodigo) 
    this.modeloBonusItem = listaItensBonusPesquisado;
  }

  openNew() {     
      this.submitted = false;
      this.itemBonusDialog = true;
  }

  deleteSelectedBonusItems() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected itensBonus?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.itensBonus = this.itensBonus.filter((val) => !this.selectedItemBonus.includes(val));
              this.selectedItemBonus = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'BonusItems Deleted', life: 3000 });
          }
      });
  }

  editBonusItem(itemBonus: BonusItem) {
      this.itemBonus = { ...itemBonus };
      this.itemBonusDialog = true;
  }

  deleteBonusItem(itemBonus: BonusItem) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + itemBonus.descricao + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.itensBonus = this.itensBonus.filter((val) => val.id !== itemBonus.id);              
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'BonusItem Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.itemBonusDialog = false;
      this.submitted = false;
  }

  saveBonusItem() {
      this.submitted = true;

    /*   if (this.itemBonus.name.trim()) {
          if (this.itemBonus.id) {
              this.itensBonus[this.findIndexById(this.itemBonus.id)] = this.itemBonus;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'BonusItem Updated', life: 3000 });
          } else {
              this.itemBonus.id = this.createId();
              this.itemBonus.image = 'itemBonus-placeholder.svg';
              this.itensBonus.push(this.itemBonus);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'BonusItem Created', life: 3000 });
          }

          this.itensBonus = [...this.itensBonus];
          this.itemBonusDialog = false;
          this.itemBonus = {};
      } */
  }

/*   findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.itensBonus.length; i++) {
          if (this.itensBonus[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  } */

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
  }
}
