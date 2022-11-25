import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UsuarioServiceService } from '../../service/usuario-service.service';
import { UsuarioChart } from '../../model/usuario-chart';
import { Usuario } from '../../model/usuario';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  usuarioChart = new UsuarioChart();


  constructor(private usuarioService: UsuarioServiceService) { }
  ngOnInit(): void {

    //chamando o servico para montar o grafico
    this.usuarioService.carregarGrafico().subscribe(data => {
      // atribui os dados para o usuario
      this.usuarioChart = data;

      // pegando os nomes dos usuarios e quebrando a string com a ,
      const labels = this.usuarioChart.nome.split(',');

      // teste = console.info("Salarios-" + this.usuarioChart.salario);
      // pegando os salarios do usuarios e quebrando a string com ,
      let dadosGrafico = this.usuarioChart.salario.split(',');

      // teste -> console.info("Dados do Salrios ="+ dadosGrafico);

      // função de montagem de gráfico na tela
      const myChart = new Chart("mychart", {
        type: 'bar',
        data: {
          labels: Array.from(labels), // convertendo string com array, aqui mostraram os usuarios que tem salarios
          datasets: [{
            label: 'Salários', // label quando for selecionado o salario na tela
            data: Array.from(dadosGrafico), // convertendo uma string com array, aqui mostram os dados dos salarios de cada usuario e montam na tela

            backgroundColor: [

              'rgba(54, 162, 235, 1)', // cor do retangulo do grafico na tela

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // cor da borda do grafico

            ],
            borderWidth: 1 // espessura  da borda do grafico
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true // grafico horinzontal
            }
          }
        }
      });




    });

  }

  RenderChart() {

    const myChart = new Chart("mychart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Salários',
          data: [],
          backgroundColor: [

            'rgba(54, 162, 235, 1)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',

          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}
