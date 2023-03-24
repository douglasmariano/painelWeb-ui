import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BonusItem } from '../../models/busca-item-bonus.model';
import { BuscaItemBonusService } from '../../services/busca-item-bonus.service';
import { ProdutoService } from '../../services/produto.service';
import { CadastroCodigoDeBarrasComponent } from './../cadastro-codigo-de-barras/cadastro-codigo-de-barras.component';

@Component({
  selector: 'app-busca-item-bonus',
  templateUrl: './busca-item-bonus.component.html',
  styleUrls: ['./busca-item-bonus.component.css']
})
export class BuscaItemBonusComponent implements OnInit {

  numbonus: number;
  modeloBonusItem: BonusItem[];
  buscaitembonus: UntypedFormGroup;
  produtosPorCodigo: any[];
  codigoSelecionado;
  barrasUnitario;

  dialogVisible: boolean = false;
  constructor(private buscaItemEntradaService: BuscaItemBonusService,
    private buscaProdutoService: ProdutoService,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private confirmation:ConfirmationService,
    private router: Router ) { }

  ngOnInit(): void {
    this.numbonus = this.route.snapshot.params['numbonus'];
    this.carregarBonus(this.numbonus);
    this.preencherFormGroup();
    //console.log(this.numbonus)
  }

  clonedBonus: { [s: string]: BonusItem; } = {};

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

  async carregarBonus(numbonus: number) {
    this.produtosPorCodigo = [];
    const listaItensBonusPesquisado = await this.buscaItemEntradaService.pesquisar({
      numbonus: numbonus,
    })
    for (const bonusPesquisado of listaItensBonusPesquisado) {
      const dadosProduto: any = await this.buscaProdutoService.pesquisar({
        codprod: bonusPesquisado.id.codprod,
      })
      this.produtosPorCodigo.push({ ...bonusPesquisado, ...dadosProduto })
    }
    //console.log(this.produtosPorCodigo) 
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
    this.confirmation.confirm(
      {
        message: 'Deseja zerar as quantidades?',
        defaultFocus: "Sim" ,   
        header: "COnfirmação",         
        accept: () => {                      
          bonusitem.qtentun = 0;
          bonusitem.qtentrada = 0;
          bonusitem.qtavariaun = 0;
          this.buscaItemEntradaService.salvaralteracoes(bonusitem)           
        }
      }
    );
    this.buscaItemEntradaService.salvaralteracoes(bonusitem)      
    delete this.clonedBonus[bonusitem.id.codprod];
  }

  limparEstoqueSelecionado() {
    this.codigoSelecionado = null;
  }

  showDialog(codigoProduto, valor: boolean) {
    this.codigoSelecionado = codigoProduto.id.codprod
    this.dialogVisible = true; 
    this.barrasUnitario = valor;    
  }

  voltar() {
    this.router.navigateByUrl('/buscar-bonus-entrada');
  }
}
