export class BonusItemPk{
    codprod:number;
    numbonus:number;
}

export class BonusItem{
    id:BonusItemPk;
    descricao:String;
    codauxiliar: String;
    codauxiliar2: String;  
    qtnf: number;
    codfab: String;
    qtentrada: number;
    qtavaria: number;
    qtavariaun: number;
    qtentun: number;
    qtavariacx: number;
    qtentcx: number;
  
}