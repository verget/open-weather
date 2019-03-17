import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Forecast } from '../../models/Forecast';

@Component({
  selector: 'app-time-panel',
  templateUrl: './time-panel.component.html',
  styleUrls: ['./time-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePanelComponent implements OnChanges {

  @Input() list: Forecast[];
  @Input() startTime: number;

  private dayLength = 24 * 60 * 60;
  public filteredList: Forecast[];
  constructor() { }

  ngOnChanges() {
    console.log(this.startTime, this.list);
    const endTime = this.startTime + this.dayLength;
    this.filteredList = this.list.filter(item => item.dt >= this.startTime && item.dt < endTime);
    console.log(this.filteredList);
  }
}
