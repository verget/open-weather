import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Forecast } from '../models/Forecast';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

    // - We set the initial state in BehaviorSubject's constructor
  // - Nobody outside the Store should have access to the BehaviorSubject 
  //   because it has the write rights
  // - Writing to state should be handled by specialized Store methods (ex: addT, remove, etc)
  // - Create one BehaviorSubject per store entity, for example if you have TodoGroups
  //   create a new BehaviorSubject for it, as well as the observable$, and getters/setters
  private readonly _forecastList = new BehaviorSubject<any>([]); // @todo make a type

  // Expose the observable$ part of the _forecastList subject (read only stream)
  readonly forecastList$ = this._forecastList.asObservable();

  // the getter will return the last value emitted in _forecastList subject
  get forecastList(): Forecast[] { // @todo make a type
    return this._forecastList.getValue();
  }

  // // assigning a value to this.todos will push it onto the observable 
  // // and down to all of its subsribers
  set forecastList(val: Forecast[]) { // @todo make a type
    this._forecastList.next(val);
  }
}
