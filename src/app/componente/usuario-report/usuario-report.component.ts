import { Component, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioReport } from '../../model/usuario-report';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';



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

  format(date: NgbDateStruct | null): string   {

    return date ? validarData( date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : ''; // retorna a data na tela: ex 02/06/1990
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarData(date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : null;
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
    return date ? validarData( date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : ''; // retorna a data na tela: ex 02/06/1990
  }

  toModel(date: NgbDateStruct | null): string | null {
    console.info(date);
    return date ? validarData(date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : null;
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
  selector: 'app-usuario-report',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: FormataData},
    {provide: NgbDateAdapter, useClass:  FormateDateApater}
]
})
export class UsuarioReportComponent  {


  userReport = new UsuarioReport();


  constructor(private routeActive: ActivatedRoute, private usuarioService : UsuarioServiceService) { }

   /// méotdo que imprimi o relatorio
   imprimeRelatorio(){
    //console.info(this.userReport);
    this.usuarioService.downloadPdfRelatorioParam(this.userReport);
   }

}
