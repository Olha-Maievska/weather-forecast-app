export interface OptionType {
  value: string;
  label: string;
}

export interface SearchCity {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  latitude: number;
  longitude: number;
}

export interface SearchResponse {
  data: SearchCity[];
}

export interface OpenCageResult {
  formatted: string;
  geometry: {
    lat: number;
    lng: number;
  };
  components: {
    city?: string;
    town?: string;
    village?: string;
    country: string;
  };
}

export interface OpenCageResponse {
  results: OpenCageResult[];
}
