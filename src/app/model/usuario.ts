import { Telefone } from './telefone';
import { Profissao } from './profissao';
export class Usuario {


  id !: Number;
	login: String = "";
	senha: String = "";
	nome: String ="";
  dataNascimento : string="";
  salario!: DoubleRange;

  telefones !: Array<Telefone>;
  profissao = new Profissao();
}
