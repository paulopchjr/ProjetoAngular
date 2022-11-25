import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UsuarioReport } from '../model/usuario-report';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {


  constructor(private http: HttpClient) { }

  // Serviço que lista usuários através da api do back end.
  getListUsuarios(): Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl);
  }

  // Serviço que deleta o usuário da tabela no banco de dados através da api do back-end do Java
  deleteUsuario(id:number) : Observable<any>{
    return this.http.delete(AppConstants.baseUrl + id, {responseType : 'text'});

  }

  // Serviço que consulta o usuário da tabela no banco de dados filtrado pelo seu nome, através da api beck-end do Java
  consultarUsuarioPorNome(nome:string) : Observable<any>{
    return this.http.get(AppConstants.baseUrl + "usuariopornome/" + nome);
  }

  // serviço que consulta o usuário da tabela no banco de dados por ID, atráves da api beck-end do Java
  getUsuarioId(id:any) : Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  // serviço responsável para cadastrar usuario através da api beck-end Java.
  cadastrarUsuario(usuario:any): Observable<any>{

    return this.http.post(AppConstants.baseUrl, usuario);
  }
// serviço responsavel por atualizar o usuario através da api beck-end Java
 updateUsuario(usuario:any) :Observable<any>{
  return this.http.put(AppConstants.baseUrl, usuario)
 }


 // serviço responsável por remover o telefone através da api beck-end Java
 removerTelefone(id: any) : Observable <any>{
  return this.http.delete(AppConstants.baseUrl+ "removertelefone/" + id, {responseType:'text'});
 }

// método que verifica se o usuário está autenticado pelo token
 usuarioAutenticado(){
  if (localStorage.getItem("token") !=null && localStorage.getItem("token")?.toString().trim() !=null){
   return true
  }else{
    return false;
  }
}


// Método para paginação de usuarios, através do end point do serviço do back end
getlistUsuarioPagination( pagina:any) : Observable <any>{
  return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
}


getUsuarioPorNomePaginado(nome:string, pagina:number):Observable<any>{
  return this.http.get(AppConstants.baseUrl + "usuariopornome/" + nome + "/page/" + pagina);
}


// método que busca todos os usuarios atraves do end point na ProfissaoController
getProfissaoList():Observable<any>{
  return this.http.get<any>(AppConstants.BaseUrlPath + 'profissao/')
}

downloadPdfRelatorio(){
  return this.http.get(AppConstants.baseUrl + 'relatorio', {responseType : 'text'}).subscribe(data => {
    const $pdf = document.querySelector('iframe');
   if ( $pdf === null){
    console.error("Data null");
   }else{
    //console.log($pdf);
    $pdf.src = data;
   }

  });
}

  downloadPdfRelatorioParam(usuarioReport : UsuarioReport){
    return this.http.post(AppConstants.baseUrl + 'relatorio/',usuarioReport,{responseType : 'text'}).subscribe(data => {
      const $pdfReport = document.querySelector('iframe');
      if($pdfReport !== null){
        $pdfReport.src = data;
      }else{
        alert("Operação Invalida");
      }
    });

  }


  // bate lá no endpoint de grafico no Java
  carregarGrafico(): Observable<any>{
    return this.http.get(AppConstants.baseUrl + 'grafico');
  }



}


