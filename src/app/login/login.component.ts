import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {





  constructor(private loginService: LoginServiceService, private router : Router){}


  ngOnInit(): void {
    // valida se o usuário está logado pelo token
    if (localStorage.getItem("token") !=null && localStorage.getItem("token")?.toString().trim() !=null){
      this.router.navigate(['home']);
    }
  }

  usuario = {login:'', senha:''}

  public acessar(){

    console.log(this.usuario);  // verificando se esta vindo os dados do usuario

    this.loginService.logar(this.usuario); // chamando o método de logar do servicodeLogin e passando o usuario
  }


    public recuperar(){
      this.loginService.recuperar(this.usuario.login);
    }


}
