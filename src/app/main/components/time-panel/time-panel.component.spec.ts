import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePanelComponent } from './time-panel.component';
import { TimeSlotComponent } from '../time-slot/time-slot.component';

describe('TimePanelComponent', () => {
  let component: TimePanelComponent;
  let fixture: ComponentFixture<TimePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TimePanelComponent,
        TimeSlotComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
