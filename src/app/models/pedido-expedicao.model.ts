import { Cliente } from './cliente.model';
import { Usuario } from './usuario.model';

export class PedidoExpedicao {
  cliente : Cliente;
  codfilial : number;
  codfuncbalcao :number;
  codfuncpacote : number;
  codfuncsep : number;
  datachegadacli : string;
  datafimbalcao : Date;
  datafimsep : Date;
  datainiciobalcao : Date;
  datainiciosep : Date;
  datapacote : Date;
  datapedido : Date;
  estoque : string;
  finalizado : string;
  numped : number;
  original : string;
  painel : string;
  posicao : string;
  qtitem : number;
  retira : string;
  retirante : string;
  status : string;
  vendedor : Usuario;
  vltotal : number;
  }

export class EntregaTransporte{
  id            :        EntregaTransportePk;
  coddevol      :        number;
  dtsaida       :        Date;
  dtchegada     :        Date; 
}

export class EntregaTransportePk{
  codentrega    :        number;
  codtransporte :        number;    
}

export class Transporte{
      codmotorista:        number;
      codveiculo:          number;
      destino:             String;
      dtexclusao:          Date; 
      tipocarga:           String;   
      codfuncajud:         number;
      dtinclusao:          Date;
      obdestino:           String;
      qtvolumes:           number;
      dtultalter:          Date;
      codfuncalter:        number;
      obsdoentregador:     String;
}
