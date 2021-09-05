import { Injectable } from '@angular/core';
import { Coviddata } from '../models/coviddata.model';
import * as data from "../datastore/coviddata.json";
import * as citydata from  "../datastore/citydata.json"
import {orderBy} from 'lodash-es'
import { CityData } from '../models/city-data.model';


@Injectable({
  providedIn: 'root'
})
export class CoviddataService {

  covidData : Coviddata[];
  cityData: CityData[];


  constructor() { 
    console.log(data.default);
    this.covidData = orderBy(data.default, ['creationdate'], ['desc']);
    this.cityData = orderBy(citydata.default, ['creationdate'], ['desc']);
  }

}
