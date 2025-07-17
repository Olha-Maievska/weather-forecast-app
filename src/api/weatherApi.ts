import type { WeatherData } from "@/interfaces/weather.interface";
import type { ForecastData } from "@/interfaces/forecast.interface";
import { getSafeLangCode, browserLang } from "@/utils";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY!;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL!;
const langCode = getSafeLangCode(browserLang);

export const fetchWeatherData = async (
  cityOrCoords: string | { lat: number; lon: number }
) => {
  const isCoords = typeof cityOrCoords !== "string";

  const queryParams = isCoords
    ? `lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}`
    : `q=${encodeURIComponent(cityOrCoords)}`;

  const currentWeatherFetch = fetch(
    `${apiUrl}/weather?${queryParams}&units=metric&appid=${apiKey}&lang=${langCode}`
  );

  const forecastFetch = fetch(
    `${apiUrl}/forecast?${queryParams}&units=metric&appid=${apiKey}&lang=${langCode}`
  );

  const [weatherResponse, forecastResponse] = await Promise.all([
    currentWeatherFetch,
    forecastFetch,
  ]);

  const weather: WeatherData = await weatherResponse.json();
  const forecast: ForecastData = await forecastResponse.json();

  return { weather, forecast };
};
