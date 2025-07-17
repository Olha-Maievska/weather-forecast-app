import type { WeatherData } from "../interfaces/weather.interface";
import type { ForecastData } from "../interfaces/forecast.interface";

export const apiKey = import.meta.env.VITE_WEATHER_API_KEY!;
export const apiUrl = import.meta.env.VITE_WEATHER_API_URL!;

export const fetchWeatherData = async (cityName: string) => {
  const currentWeatherFetch = fetch(
    `${apiUrl}/weather?q=${encodeURIComponent(
      cityName
    )}&units=metric&appid=${apiKey}&lang=en`
  );

  const forecastFetch = fetch(
    `${apiUrl}/forecast?q=${encodeURIComponent(
      cityName
    )}&units=metric&appid=${apiKey}&lang=en`
  );

  const [weatherResponse, forecastResponse] = await Promise.all([
    currentWeatherFetch,
    forecastFetch,
  ]);

  const weather: WeatherData = await weatherResponse.json();
  const forecast: ForecastData = await forecastResponse.json();

  console.log(apiUrl);
  console.log(apiKey);
  

  return { weather, forecast };
};
