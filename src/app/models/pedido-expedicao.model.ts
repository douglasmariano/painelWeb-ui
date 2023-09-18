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


