export class AjelEntrega {
  codentrega:number;
  codfilial:String;
  numnota:number;
  posicao:String;
  codusur:number;
  nomevendedor:String;
  dtfat:Date;
  dtentrega:Date;
  codfornecfrete:number;
  fornecedor:String;
  codmotorista:number;
  codcli:number;
  obs:String;
  obs1:String;  
  obsentrega1:String;
  obsentrega2:String;
  obsentrega3:String;
  codfuncconf:number;
  nomeconf:String;
  vlatend:number;
  numvolume:number;
  dtexclusao:Date;
  dtinclusao:Date;
  obsdoentregador:String;
  nomemotorista:String;
  nomecliente:String;
  local:String;
  estcob:String;
  codcidade:number;
  endercob:String;
  nomecidade:String;
  }

export class AjelEntregaReducao {
  id: {
    codentrega: number,
    numnota: number,
    codfilial: String
  };
  codentrega: number;
  codfilial: String;
  numnota: number;
  dtinclusao: Date;
  dtexclusao: Date;
  codusur: number;
  numvolume: number;
}