import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from '@/interfaces/weather.interface';
import type { ForecastData } from '@/interfaces/forecast.interface';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  loading: boolean
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
  loading: true
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload;
      state.loading = false
    },
    setForecastData: (state, action: PayloadAction<ForecastData>) => {
      state.forecast = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setWeatherData, setForecastData, setLoading} =
  weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
