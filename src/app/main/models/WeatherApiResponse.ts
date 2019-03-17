import { Forecast } from './Forecast';

export interface WeatherApiResponse {
  city: {
    id: number, 
    name: string, 
    coord: {
      lat: number, 
      lon: number
    }, 
    country: string
  }
  cnt: number,
  cod: string,
  list: Forecast[],
  message: number
}