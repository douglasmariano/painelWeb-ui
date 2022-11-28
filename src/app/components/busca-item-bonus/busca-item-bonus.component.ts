import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { BuscaItemBonusService } from '../../services/busca-item-bonus.service';
import { BonusItem } from '../../models/busca-item-bonus.model'

@Component({
  selector: 'app-busca-item-bonus',
  templateUrl: './busca-item-bonus.component.html',
  styleUrls: ['./busca-item-bonus.component.css']
})
export class BuscaItemBonusComponent implements OnInit {


  numbonus: number;
  modeloBonusItem : BonusItem[];
  buscaitembonus : FormGroup;  
  produtosPorCodigo: any[];
  codigoSelecionado;

  dialogVisible: boolean = false;
  constructor(private buscaItemEntradaService: BuscaItemBonusService, private buscaProdutoService: ProdutoService, private route: ActivatedRoute,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.numbonus = this.route.snapshot.params['numbonus'];
    this.carregarBonus(this.numbonus);
    this.preencherFormGroup();
    console.log(this.numbonus)
    
  }
  clonedBonus: { [s: string]: BonusItem; } = {};
  preencherFormGroup() {
    this.buscaitembonus = this.fb.group({      
        id:'',
        codprod: '',  
        numbonus: '',         
        qtnf: '',
        codfab: '',
        qtentrada: '',
        qtavaria: '',
        qtavariaun: '',
        qtentun: '',
        tipoembalagempedido: '',
      });
  }
  get f() { return this.buscaitembonus.controls; }

  
  async carregarBonus(numbonus: number) {
    this.produtosPorCodigo = [];
    const listaItensBonusPesquisado = await this.buscaItemEntradaService.pesquisar({
      numbonus: numbonus,
       })
       for (const bonusPesquisado of listaItensBonusPesquisado) {
        const dadosProduto: any = await this.buscaProdutoService.pesquisar({
          codprod: bonusPesquisado.id.codprod,
        })
        this.produtosPorCodigo.push({...bonusPesquisado, ...dadosProduto})
       }
    console.log(this.produtosPorCodigo) 
    this.modeloBonusItem = listaItensBonusPesquisado;
  }
  
  onRowEditInit(bonusitem: BonusItem) {
    this.clonedBonus[bonusitem.id.codprod] = { ...bonusitem };
  }

  onRowEditSave(bonusitem: BonusItem) {
    this.buscaItemEntradaService.salvaralteracoes(bonusitem)
  }

  onRowEditCancel(bonusitem: BonusItem, index: number) {
    this.modeloBonusItem[index] = this.clonedBonus[bonusitem.id.codprod];
    delete this.clonedBonus[bonusitem.id.codprod];
  }

  limparEstoqueSelecionado(){
    this.codigoSelecionado = null;
  }

  showDialog(codigoProduto) {
    this.codigoSelecionado = codigoProduto.id.codprod
    console.log(codigoProduto.id.codprod)
    this.dialogVisible = true;
    
  }


}
