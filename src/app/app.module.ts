import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {FormsModule} from '@angular/forms' // componente resposável para trabalhar com formularios
import  {HttpClientModule} from '@angular/common/http'; // Ativando as requisições ajax
import { Routes, RouterModule } from '@angular/router';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { NgChartsModule } from 'ng2-charts';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { UsuarioReportComponent } from './componente/usuario-report/usuario-report.component';
import { BarChartComponent } from './componente/bar-chart/bar-chart.component';











export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};



export const appRouters : Routes =[
  { path : 'login'          , component : LoginComponent,      },
  { path : ''               , component : LoginComponent,      },
  { path : 'home'           , component : HomeComponent, canActivate: [GuardiaoGuard]      },
  { path  : 'listausuarios' , component : UsuarioComponent, canActivate: [GuardiaoGuard]   },
  { path  : 'usuarioAdd'    , component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path  : 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path  : 'usuariosrelatorios', component: UsuarioReportComponent, canActivate: [GuardiaoGuard] },
  { path  : 'graficousuarios', component: BarChartComponent, canActivate: [GuardiaoGuard] },
];


export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) ={}



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent,
    BarChartComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRouters),
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule,
    NgChartsModule

  ],
  providers: [ NgxCurrencyModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
