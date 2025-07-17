export interface SearchData {
  id: number;
  name: string;
  country: string;
  coord: Coord;
}

export interface Coord {
  lat: number;
  lon: number;
}
