export class AppConstants {
  // classe para definição de base urls do projeto
  public static get baseServidor(): string{return "http://localhost:8080/"}

  public static get baseLogin(): string{return  this.baseServidor  + "cursorestfull/login"}

  public static get baseUrl(): string {return this.baseServidor + "cursorestfull/usuario/"}

  public static get BaseUrlPath() : String {return this.baseServidor + "cursorestfull/"}
}



