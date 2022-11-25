import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioServiceService } from './usuario-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaoGuard implements CanActivate {


  constructor(private usuarioService : UsuarioServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   //   console.info("gaurdiao sendo chamado");
    return this.usuarioService.usuarioAutenticado();
  }

}
