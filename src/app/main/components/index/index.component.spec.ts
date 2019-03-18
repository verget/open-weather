import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { TimePanelComponent } from '../time-panel/time-panel.component';
import { TimeSlotComponent } from '../time-slot/time-slot.component';
import { FormsModule } from '@angular/forms';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateService } from '../../services/state.service';
import { stateServiceMock } from '../../mocks/state.service.mock';
import * as moment from 'moment';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        OwlMomentDateTimeModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        IndexComponent,
        TimePanelComponent,
        TimeSlotComponent
      ],
      providers: [
        {
          provide: StateService,
          useValue: stateServiceMock
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call state service method for fetch data on init', () => {
    const state = TestBed.get(StateService);
    spyOn(state, 'loadWeatherByPosition');
    component.ngOnInit();
    expect(state.loadWeatherByPosition).toHaveBeenCalled();
  });

  it('dateChanged method should change component field startTime', () => {
    const momentObject = moment();
    component.dateChanged(momentObject);
    expect(component.startTime).toBe(momentObject.unix());
  });
});
