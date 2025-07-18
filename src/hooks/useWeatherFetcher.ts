import { useAppDispatch } from "@/hooks";
import { fetchWeatherRequest } from "@/features/weather";

export const useWeatherFetcher = () => {
  const dispatch = useAppDispatch();

  const fetchWeather = (cityName: string): string => {
    dispatch(fetchWeatherRequest(cityName));
    return cityName;
  };

  return fetchWeather;
};
