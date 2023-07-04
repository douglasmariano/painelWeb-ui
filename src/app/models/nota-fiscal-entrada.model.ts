export class NotaFiscalEntradaPk{
    numtransent:number;
    codcont:String;
}

export class NotaFiscalEntrada{
    id:NotaFiscalEntradaPk;
    dtultalt: Date;
    coddevol: number;
    codfilial:String;
    codfornec:String;	
	codfunclanc: number;
	dtcancel: Date;
	dtent: Date;
	especie:number;
	numbonus:number;
	numnota :number;
	obs:String;
	serie :number;
	vltotal:number;
}