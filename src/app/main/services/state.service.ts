import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from '../models/Forecast';
import { Position } from '../models/Position';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private data: DataService
  ) { }

    // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addT, remove, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _forecastList = new BehaviorSubject<Forecast[]>([]); 
  private readonly _cityName = new BehaviorSubject<string>(''); 
  // Expose the observable$ part of the _forecastList subject (read only stream)
  readonly forecastList$ = this._forecastList.asObservable();
  readonly cityName$ = this._cityName.asObservable();

  // the getter will return the last value emitted in subject
  get forecastList(): Forecast[] {
    return this._forecastList.getValue();
  }
  get cityName(): string {
    return this._cityName.getValue();
  }
  // // assigning a value to setter will push it onto the observable 
  // // and down to all of its subsribers
  set forecastList(val: Forecast[]) {
    this._forecastList.next(val);
  }
  set cityName(val: string) {
    this._cityName.next(val);
  }

  /**
   * loadWeatherByPosition will get data from data service and change state
   * @param position 
   * @param units 
   */
  public loadWeatherByPosition(position: Position, units: string): void {
    this.data.getWeatherDataByPosition(position, units).subscribe(({ city, list }) => {
      if (city) {
        this.cityName = city;
      }
      if (list.length) {
        this.forecastList = list;
      }
    }, error => console.error(error))
  }

  /**
   * loadWeatherByCityName will get data from data service and change state
   * @param name 
   * @param units 
   */
  public loadWeatherByCityName(name: string, units: string): void {
    this.data.getWeatherDataByCityName(name, units).subscribe(({ city, list }) => {
      if (city) {
        this.cityName = city;
      }
      if (list.length) {
        this.forecastList = list;
      }
    }, error => console.error(error))
  }

  /**
   * reloadWeatherByUnit will reset current forecastList, get data from data service and change state
   * @param units 
   */
  public reloadWeatherByUnit(units: string): void {
    this.forecastList = [];
    this.data.getWeatherDataByCityName(this.cityName, units).subscribe(({ city, list }) => {
      if (list.length) {
        this.forecastList = list;
      }
    }, error => console.error(error))
  }
}
