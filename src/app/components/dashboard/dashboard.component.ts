import { Component, OnInit } from '@angular/core';
import { Dashoboard } from 'src/app/models/dashobard.model';
import { CoviddataService } from 'src/app/services/coviddata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashBoardData: Dashoboard;
  constructor(private covidDataService: CoviddataService) { }

  ngOnInit(): void {
    this.setDashBoardData();
  }

  setDashBoardData():void{
    this.dashBoardData = new Dashoboard();
    this.dashBoardData.active = this.getIncreaseInActiveCases();
    this.dashBoardData.creationdate = this.covidDataService.covidData[0].creationdate;
    this.dashBoardData.deceased = this.covidDataService.covidData[0].deceased;
    this.dashBoardData.positive = this.covidDataService.covidData[0].positive;
    this.dashBoardData.recovered = this.covidDataService.covidData[0].recovered;
    this.dashBoardData.totalactive = this.covidDataService.covidData[0].active;
    this.dashBoardData.totaldeceased = this.covidDataService.covidData[0].totaldeceased;
    this.dashBoardData.totalpositive = this.covidDataService.covidData[0].totalpositive;
    this.dashBoardData.totalrecovered = this.covidDataService.covidData[0].totalrecovered;
    this.dashBoardData.totaltested = this.covidDataService.covidData[0].totaltested;
    this.dashBoardData.tested = this.getIncreaseInTests();

  }

  getIncreaseInActiveCases() : number{
    let previousDayCovidData = this.covidDataService.covidData[1];
    let prevActiveCases = previousDayCovidData.active;
    let {active} = this.covidDataService.covidData[0];
    return active - prevActiveCases;
  }

  getIncreaseInTests() : number{
    let previousDayCovidData = this.covidDataService.covidData[1];
    let prevTests = previousDayCovidData.totaltested;
    let {totaltested} = this.covidDataService.covidData[0];
    return totaltested - prevTests;
  }

}
