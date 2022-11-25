import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse, HttpHandler, } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor {
  //toda requisição http automaticamente o intercpeto vai ser chamado para colocar o token junto

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem("token") != null) {

      // montando o token para validar as requisições, que estão sendo passadas
      const token = 'Bearer ' + localStorage.getItem("token");

      // autorizando as requisições http , sendo passadas (GET, PUT, POST, DELETE ..)
      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token)
      });

      // Retorna a requisição já autorizada.
      return next.handle(tokenRequest).pipe(

        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info("Sucesso na operação");
          }
        })
        , catchError(this.processaError));
    } else {

      // Não tem token, por tanto não tem autorização de manipular a requisição
      return next.handle(req);
    }
  }


  constructor() { }

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    } else {

      if (error.status === 403) {
        errorMessage = 'Acesso negado:Faça o login novamento!';
      } else {
        errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;

      }
    }

    window.alert(errorMessage);
    return throwError(errorMessage);

  }


}



//Transformando o service em um Modulo
@NgModule({

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,
  },],

})
export class HttpInterceptorModule { }
