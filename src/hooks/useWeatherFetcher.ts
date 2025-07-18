import { useAppDispatch } from "@/hooks";
import { setForecastData, setWeatherData } from "@/store/weatherSlice";
import { fetchWeatherData } from "@/api/weatherApi";

export const useWeatherFetcher = () => {
  const dispatch = useAppDispatch();

  const fetchWeather = async (cityName: string) => {
    const { weather, forecast } = await fetchWeatherData(cityName);
    dispatch(setWeatherData(weather));
    dispatch(setForecastData(forecast));
    return weather.name;
  };

  return fetchWeather;
};
