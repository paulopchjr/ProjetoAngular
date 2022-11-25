import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }


  recuperar(login:any){
    let user = new Usuario();
    user.login = login
    return this.http.post(AppConstants.BaseUrlPath + 'recuperar/', user).subscribe(data=>{

      alert(JSON.parse(JSON.stringify(data)).error);
    },
    Error=>{
      console.error("Erros ao recuperar o login");
      alert("Erro ao recuperar Login");
    }

    )

  }




  logar(usuario:any){ // usuario está vindo lá do appcomponents do método acessar()
    // Json.stringify(usuario) = retorna o usuario em json {'login':'aaasasa', 'senha':'54512112'}
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data=>{


      // corpo do retorno http
      var tokenLimpo = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      // token sem o Bearer
      localStorage.setItem("token", tokenLimpo);

      this.router.navigate(['home']);



    },
    Error=>{
      console.error("Erros ao fazer o login");
      alert("Erro de Login");
    }

    )

  }
}
