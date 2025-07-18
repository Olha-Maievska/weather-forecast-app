import { createAction } from "@reduxjs/toolkit";

export const fetchWeatherRequest = createAction<string>(
  "weather/fetchWeatherRequest"
);
