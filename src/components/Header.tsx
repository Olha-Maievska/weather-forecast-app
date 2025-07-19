import Search from "./ui/Search";
import {
  setForecastData,
  setWeatherData,
} from "@/features/weather/weatherSlice";
import { useAppDispatch } from "@/hooks";
import { DEFAULT_CITY, IS_NIGHT } from "@/const";
import { useEffect } from "react";
import { fetchWeatherData } from "@/api/weatherApi";
import styles from "@/styles/Header.module.scss";

const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const { weather, forecast } = await fetchWeatherData({
              lat: latitude,
              lon: longitude,
            });
            dispatch(setWeatherData(weather));
            dispatch(setForecastData(forecast));
          },
          async () => {
            const { weather, forecast } = await fetchWeatherData(DEFAULT_CITY);
            dispatch(setWeatherData(weather));
            dispatch(setForecastData(forecast));
          }
        );
      } catch (err) {
        console.error("Failed to load initial weather data", err);
      }
    };

    loadWeather();
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__content}`}>
        <h2
          className={`${styles.logo} ${IS_NIGHT ? styles.logo__night : ""}`}
          aria-label="Weather Forecast Application"
          tabIndex={0}
        >
          Weather Forecast
        </h2>
        <Search />
      </div>
    </header>
  );
};

export default Header;
