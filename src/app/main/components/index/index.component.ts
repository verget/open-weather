import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { Position } from '../../models/Position';
import { Forecast } from '../../models/Forecast';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public forecastList: Forecast[];
  public filteredtList: Forecast[];
  public forecastList$ = new Subject();
  public cityName = '';
  public startTime = moment().startOf('day').unix();
  public config = {
    firstDayOfWeek: 'mo',
    min: moment().format('DD-MM-YY'),
    max: moment().add(5, 'day').endOf('day').format('DD-MM-YY')
  };

  constructor(
    private dataService: DataService,
    private state: StateService
  ) { }

  ngOnInit() {
    const defaultPosition: Position = environment.defaultPosition;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.fetchWeather({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, () => {
        this.fetchWeather(defaultPosition);
      });
    } else {
      this.fetchWeather(defaultPosition);
    }
  }

  private fetchWeather(position: Position) {
    this.dataService.getWeatherDataByPosition(position).subscribe(({ city, list }) => {
      this.cityName = city;
      if (list.length) {
        this.state.forecastList = list;
      }
    }, error => console.error(error))
  }

  public dateChanged(selectedDateObject) {
    this.startTime = selectedDateObject.date.unix();
  }

  public onEnter(value) {
    if (value) {
      this.dataService.getWeatherDataByCityName(value).subscribe(({ city, list }) => {
        this.cityName = city;
        if (list.length) {
          this.state.forecastList = list;
        }
      })
    }
  }
}
