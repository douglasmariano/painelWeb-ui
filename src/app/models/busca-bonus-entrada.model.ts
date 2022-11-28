export class BonusEntradaPk{
    codprod:number;
    numbonus:number;
    numlote:String;
}
export class BonusEntrada{
    id:BonusEntradaPk;
    codfilial:number;
    codfornec:number;
    codfuncrm:number;
    datarm : Date;    
    databonus: Date;
    dtfechamento: Date;    
}