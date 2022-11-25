import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioServiceService } from '../../../service/usuario-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios !: Array<Usuario>;

  // variavel para buscar nome
  nome = '';

  // variavel total para paginação
  total!: number;

// pagina atual, sempre iniciada na primeria
  p: number = 0;
  constructor(private usuarioService : UsuarioServiceService) { }

  ngOnInit(): void {

    // Método que chama o serviço de lista usuários
    this.usuarioService.getListUsuarios().subscribe(data => {
      // usuarios recebem a lista que esta vindo atráves da data
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }

  // Método responsável por excluir o usuário
  excluirUsuario(id:any, index:any){
    if(confirm('Deseja remover ?')){

      // chama o serviço de excluir o usuário -> pasta service/usuarioservice.servics.ts
      this.usuarioService.deleteUsuario(id).subscribe(data=>{
        this.usuarios.splice(index,1);
        alert("Usuário excluído com Sucesso!")
      });
    }
  }

consultaUsuario(){
  // verifica se o nome está vindo vazio
  if(this.nome === ''){
    // se entrar nessa condinção, o nome está vazio, portanto pesquisa todos os usuarios
    this.usuarioService.getListUsuarios().subscribe(data =>{
      console.info('Estoua qui');
      this.usuarios = data.content;
      this.carregarPagina(1);

    });
  }else{
      // tem nome, portanto faz a pesquisa por nome do usuário, chamando o servico -> pasta service/usuarioservice.service.ts
      this.usuarioService.consultarUsuarioPorNome(this.nome).subscribe(data=>{
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    }
}

// metodo para paginação de usuarios
carregarPagina(pagina:any){

  // verifica se tem nome para ser filtrado
  if(this.nome ===''){
    this.usuarioService.getlistUsuarioPagination(pagina - 1).subscribe(data=>{

      this.usuarios = data.content;
      this.total = data.totalElements;

    });

  }else{
    this.usuarioService.getUsuarioPorNomePaginado(this.nome, pagina -1).subscribe(data=>{
      console.info("nome  = " + this.nome +" pagina =" + pagina) ;

      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }
}

imprimirRelatorio(){
  return this.usuarioService.downloadPdfRelatorio();
}


}
