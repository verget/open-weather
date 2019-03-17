import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Forecast } from '../../models/Forecast';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeSlotComponent implements OnInit {

  @Input() public item: Forecast;
  @Input() public units: 'metric' | 'imperial';

  public iconUrl: string;
  constructor() { }

  ngOnInit() {
    if (this.item && this.item.weather[0].icon) {
      this.iconUrl = `http://openweathermap.org/img/w/${this.item.weather[0].icon}.png`;
    }
  }
}
