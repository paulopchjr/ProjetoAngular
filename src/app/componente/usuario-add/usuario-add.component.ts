import { Component, Injectable, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router'
import { Usuario } from 'src/app/model/usuario';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { Telefone } from '../../model/telefone';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from '../../model/profissao';



@Injectable()
export class FormateDateApater extends NgbDateAdapter<string>{

readonly DELIMITER ='/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER); // quebra a / para pegar a data por array
      return {day:parseInt(date[0],10), month: parseInt(date[1],10), year:parseInt(date[2],10)};
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}

@Injectable()
export class FormataData extends NgbDateParserFormatter{

  readonly DELIMITER = '/'; /* separa a data /02/06/1990 */

  parse(value: string): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER); // quebra a / para pegar a data por array
      return {day:parseInt(date[0],10), month: parseInt(date[1],10), year:parseInt(date[2],10)};
    }
    return null;
  }

  format(date: NgbDateStruct | null): string   {
    return date ? validarData( date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + validarData(date.year) : ''; // retorna a data na tela: ex 02/06/1990
  }

  toModel(date: NgbDateStruct | null): string | null {
    console.info(date);
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function validarData(valor: any) {
  if(valor.tostring !== null && parseInt(valor) <= 9){
    return '0' + valor;
  }else{
    return valor;
  }

}




@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers:[
      {provide: NgbDateParserFormatter, useClass: FormataData},
      {provide: NgbDateAdapter, useClass:  FormateDateApater}
  ]

})
export class UsuarioAddComponent implements OnInit {

  user  = new Usuario();
  telefone  = new Telefone();
  profissoes !: Array<Profissao>

  constructor(private routerActive : ActivatedRoute, private usuarioService : UsuarioServiceService) { }

  ngOnInit(): void {

    // carrega as profissoes quando carrega a tela
   this.usuarioService.getProfissaoList().subscribe(data=> {
  this.profissoes = data;

   });


    let id = this.routerActive.snapshot.paramMap.get('id'); // mapeando o id do usuário na tela
    if(id !== null){

      this.usuarioService.getUsuarioId(id).subscribe(data=>{
        console.info( "usuarios"+ data);
        this.user.id = data.userId;
        this.user.nome = data.userNome;
        this.user.login = data.userLogin
        this.user.senha = data.userSenhaDto;
        this.user.telefones = data.userListTelefonesDTO;
        this.user.dataNascimento = data.dataNascimentoDto;

        if(data.userProfissao !== null){
          this.user.profissao = data.userProfissao;
        }
        
        

      });
    }
  }

  novo(){
    this.user = new Usuario();
    this.telefone = new Telefone();

  }

  salvarUsuario(){
    // verifica se já tem usuário, atraves do id
    if(this.user.id !=null && this.user.id.toString().trim() !=null && this.user.id > 0){ // Tem o id

      //Atualiza o Usuario
      this.usuarioService.updateUsuario(this.user).subscribe(data=>{
        this.novo();
        alert('Usuário Atualizado com Sucesso!');
      });
    }else{
      this.usuarioService.cadastrarUsuario(this.user).subscribe(data=>{
        console.info(data)
        this.novo();
        alert('Usuário Gravado com Sucesso !');
      });
    }
  }



  // metodo que chama o serviceo para deletar o telefone
  deletarTelefone(id:any, i:any){

    // remove só o telefone que está tela e não foi gravado no banco
    if (id === null){
      this.user.telefones.splice(i,1);
      return;
    }

    // remove telefone da tela e do banco de dados
    if(id!== null && confirm("Deseja remover?")){
      this.usuarioService.removerTelefone(id).subscribe(data =>{

        this.user.telefones.splice(i, 1);
        console.info("Telefone Removido = " + data);
      });
    }
  }

  AddFone(){
    // lista nao tiver instanciada
    if(this.user.telefones === undefined){
       //Instancia a Lista
      this.user.telefones = new Array<Telefone>
    }

    this.user.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

}
