import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Position } from '../models/Position';
import { map } from 'rxjs/operators';
import { Forecast } from '../models/Forecast';
import { Observable } from 'rxjs';
import { WeatherApiResponse } from '../models/WeatherApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetch weather data from api
   * @param params: HttpParams 
   * @returns {Observable<{city: string, list: Forecast[]}>}
   */
  private fetchWeatherData(params: HttpParams): Observable<{city: string, list: Forecast[]}> {
    params = params.append('APPID', this.apiKey)
      .append('type', 'hour');
    return this.http.get(this.apiUrl, { params })
      .pipe(map((response: WeatherApiResponse) => {
        return { city: response.city.name, list: response.list }
      }));
  }

  /**
   * Get weather data by city cordinates
   * @param position: Position 
   * @returns {Observable<{city: string, list: Forecast[]}>
   */
  public getWeatherDataByPosition(position: Position, units: string): Observable<{city: string, list: Forecast[]}> {
    const params = new HttpParams()
      .set('lat', position.latitude.toString())
      .set('lon', position.longitude.toString())
      .set('units', units);
    return this.fetchWeatherData(params);
  }

  /**
   * Get weather data by city name
   * @param cityName: string 
   * @param unit: string 
   * @returns {Observable<{city: string, list: Forecast[]}>}
   */
  public getWeatherDataByCityName(cityName: string, units: string): Observable<{city: string, list: Forecast[]}> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('units', units);
    return this.fetchWeatherData(params);
  }
}
