import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Position } from '../../models/Position';
import * as moment from 'moment';
import { StateService } from '../../services/state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public selectedUnits = 'metric';
  public selectedMoment = moment();
  public startTime = moment().startOf('day').unix();
  public minDate = moment().startOf('day');
  public maxDate = moment().add(5, 'day').endOf('day');

  constructor(
    private state: StateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const defaultPosition: Position = environment.defaultPosition;
    this.route.paramMap.subscribe(data => {
      if (data.keys && data.keys.length) {
        this.useRouteParams(data);
      }
    })

    console.log(this.state.cityName);
    if (this.state.cityName) {
      this.state.loadWeatherByCityName(this.state.cityName, this.selectedUnits);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.state.loadWeatherByPosition(
          { 
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude 
          },
          this.selectedUnits
        );
      }, () => {
        this.state.loadWeatherByPosition(defaultPosition, this.selectedUnits);
      });
    } else {
      this.state.loadWeatherByPosition(defaultPosition, this.selectedUnits);
    }
  }

  public useRouteParams(data) {
    if (data.get('units') && (data.get('units') === 'imperial' || data.get('units') === 'metric')) {
      this.selectedUnits = data.get('units');
    }
    if (data.get('date')) {
      const momentDate = moment(data.get('date'), 'DD-MM-YY');
      const inRange = momentDate.isBetween(moment(), moment().add(5, 'day').endOf('day'));
      if (inRange) {
        this.startTime = momentDate.unix();
        this.selectedMoment = momentDate;
      }
    }
    if (data.get('city')) {
      this.state.cityName = data.get('city');
    }
  }

  public dateChanged(momentObject) {
    this.startTime = momentObject.unix();
  }

  public onEnter(value) {
    if (value) {
      this.state.loadWeatherByCityName(value, this.selectedUnits);
    }
  }

  public chageUnits(units: string) {
    if (this.selectedUnits !== units) {
      this.selectedUnits = units;
      this.state.reloadWeatherByUnit(units);
    }
  }
}
