import { Component, OnInit } from '@angular/core';
import { CityData } from 'src/app/models/city-data.model';
import { CoviddataService } from 'src/app/services/coviddata.service';
import { ChartType, ChartOptions, Chart } from 'chart.js';
import { Label } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-city-report',
  templateUrl: './city-report.component.html',
  styleUrls: ['./city-report.component.scss']
})
export class CityReportComponent implements OnInit {

  cityData: CityData[];
  totalRecovered:number = 0;
  totalConfirmed:number = 0;

  //chart props

  public pieChartOptions: ChartOptions;
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType;
  public pieChartLegend:boolean;
  public pieChartPlugins :any;
  public pieChartColors:any;

  constructor(private covidDataService : CoviddataService) {}

  ngOnInit(): void {
    this.cityData = this.covidDataService.cityData.slice(0,8);
    this.cityData.forEach(x => {
      this.totalRecovered += x.recovered;
      this.totalConfirmed += x.positive;
    });

    this.renderChart();
  }

  renderChart(){
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
  
      legend:{
        position:'top',
        display:false
      },
  
      plugins: {
        datalabels: {
          formatter: (value :any, ctx:any) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    
    };


  this.pieChartType = 'pie';

  this.pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','rgba(252, 186, 3, 0.3)', 'rgba(248, 3, 252, 0.3)',
                        'rgba(252, 119, 3,0.3)', 'rgba(157, 3, 252, .3)', 'rgba(3, 252, 244, 0.3)'],
    },
  ];

  this.pieChartPlugins = [ChartDataLabels];

  this.pieChartLegend = false;

  //show pie chart for positive cases on initial load
  this.pieChartLabels = this.cityData.map(x => x.name);
  this.pieChartData = this.cityData.map(x => x.positive);
  }

  changeChartData(e : any){
    let dataSet = e.target.value; 
    if(dataSet === "positive"){
      this.pieChartData = this.cityData.map(x => x.positive);
    }else if(dataSet === "recovered"){
      this.pieChartData = this.cityData.map(x => x.recovered);
    }

  }

}
