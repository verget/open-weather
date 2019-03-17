import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: []
  }));

  it('should be created', () => {
    const service: StateService = TestBed.get(StateService);
    expect(service).toBeTruthy();
  });
});
