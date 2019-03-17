import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { DataService } from './services/data.service';
import { TimePanelComponent } from './components/time-panel/time-panel.component';
import { TimeSlotComponent } from './components/time-slot/time-slot.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { StateService } from './services/state.service';
@NgModule({
  declarations: [
    IndexComponent,
    MainComponent,
    TimePanelComponent,
    TimeSlotComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    DpDatePickerModule
  ],
  providers: [
    DataService,
    StateService
  ]
})
export class MainModule { }
