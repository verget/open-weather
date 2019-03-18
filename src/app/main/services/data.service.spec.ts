import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Position } from '../models/Position';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

describe('DataService', () => {
  let http: HttpTestingController;
  let service: DataService;
  const fakePosition: Position = environment.defaultPosition;
  const baseUrl: string = environment.apiUrl;
  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: []
    });
    service = TestBed.get(DataService);
    http = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('getWeatherDataByPosition should call fetchWeatherData method with specific params', () => {
    const waitingParams = new HttpParams()
      .set('lat', fakePosition.latitude.toString())
      .set('lon', fakePosition.longitude.toString())
      .set('units', 'metric');
    spyOn<any>(service, 'fetchWeatherData').and.returnValue(of());
    service.getWeatherDataByPosition(fakePosition, 'metric').subscribe();
    expect(service['fetchWeatherData']).toHaveBeenCalledWith(waitingParams);
  });

  it('fetchWeatherData should make request to expected url', () => {

    const apiKey = environment.apiKey;
    service.getWeatherDataByPosition(fakePosition, 'metric').subscribe();
    const url = `${baseUrl}?lat=${fakePosition.latitude.toString()}&lon=${fakePosition.longitude.toString()}&units=metric&APPID=${apiKey}&type=hour`;
    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush({city: {name: 'Krasnodar'}, list: []});
  });
});
