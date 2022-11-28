import { Produto } from "./produto.model";

export class EstoqueCabo { 
    codcabo:number;
    produto:Produto;
    codprod_pcprodut: number;
    codprod_pcest: number;
    codfilial_pcest: String;
    codmarca: number;
    codfornec: number;
    matricula: number;
    tipoendereco: String;
    dtinclusao: Date;
    dtexclusao: Date;
    status: String;
    obs: String;
    qtgerencial: number;
    qt: number;
    numero: number;
    modulo: number;
    rua: number;
    apto: number;
  }