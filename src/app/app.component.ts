import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'clinicaVetAngular';

  constructor(private router : Router){}

  ngOnInit(): void {

    // verifica se tem token
    if(localStorage.getItem("token") == null){
      this.router.navigate(['login']);
    }
  }


  public sair(){
    localStorage.clear(); // remove o token
    this.router.navigate(['login']);
  }

  public esconderbarra(){
    // se tiver token
    if (localStorage.getItem("token") !=null && localStorage.getItem("token")?.toString().trim() !=null){
      return false; // aparece a barra
    }else{
      return true; // esconde a barra

    }

  }


}
