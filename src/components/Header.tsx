import Search from "./Search";
import { setForecastData, setWeatherData } from "@/store/weatherSlice";
import { useAppDispatch } from "@/hooks";
import { DEFAULT_CITY } from "@/const";
import { useEffect } from "react";
import { fetchWeatherData } from "@/api/weatherApi";
import styles from "@/styles/Header.module.scss";
import { getTimeOfDay } from "@/utils";

const Header = () => {
  const dispatch = useAppDispatch();
  const timeOfDay = getTimeOfDay();

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
          className={`${styles.logo} ${
            timeOfDay ? styles.logo__night : ""
          }`}
        >
          Weather App
        </h2>
        <Search />
      </div>
    </header>
  );
};

export default Header;
