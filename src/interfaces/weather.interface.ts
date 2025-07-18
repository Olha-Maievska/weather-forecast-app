export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherData {
  city: string;
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  wind: Wind;
  dt: number;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
