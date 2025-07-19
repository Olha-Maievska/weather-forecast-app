import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WeatherData } from '@/interfaces/weather.interface';
import type { ForecastData } from '@/interfaces/forecast.interface';

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload;
    },
    setForecastData: (state, action: PayloadAction<ForecastData>) => {
      state.forecast = action.payload;
    }
  },
});

export const { setWeatherData, setForecastData} =
  weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
