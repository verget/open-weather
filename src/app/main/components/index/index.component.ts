import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { environment } from 'src/environments/environment';
import { Position } from '../../models/Position';
import * as moment from 'moment';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public selectedUnits  = 'metric';
  public startTime = moment().startOf('day').unix();
  public config = {
    firstDayOfWeek: 'mo',
    min: moment().format('DD-MM-YY'),
    max: moment().add(5, 'day').endOf('day').format('DD-MM-YY')
  };

  constructor(
    private state: StateService
  ) { }

  ngOnInit() {
    const defaultPosition: Position = environment.defaultPosition;
    if ("geolocation" in navigator) {
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

  public dateChanged(selectedDateObject) {
    this.startTime = selectedDateObject.date.unix();
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
