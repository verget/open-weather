export interface Forecast {
  clouds: {
    all: number
  },
  dt: number,
  dt_txt: string,
  main: {
    grnd_level: number,
    humidity: number,
    pressure: number,
    sea_level: number,
    temp: number,
    temp_kf: number,
    temp_max: number,
    temp_min: number
  },
  rain?: {
    '1h'?: number,
    '3h'?: number
  },
  snow?: {
    '1h'?: number,
    '3h'?: number
  },
  sys: {
    pod: string
  },
  weather: [
    {
      id: number, 
      main: string, 
      description: string, 
      icon: string
    }
  ],
  wind: {
    speed: number, 
    deg: number
  }
}