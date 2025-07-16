import Search from "../search";
import type { OptionType } from "../../interfaces/search.interface";
import type { SingleValue } from "react-select";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { setForecastData, setWeatherData } from "../../store/weatherSlice";
import type { WeatherData } from "../../interfaces/weather.interface";
import type { ForecastData } from '../../interfaces/forecast.interface';

const apiKey = "04fcb1736a175c9c97a82b69d129d9c1";
const apiUrl = "https://api.openweathermap.org/data/2.5";

const Header = () => {
  const dispatch = useDispatch();
  const handleOnSearchChange = (searchData: SingleValue<OptionType>) => {
    if (!searchData) return;
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${apiUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=cz`
    );
    const forecastFetch = fetch(
      `${apiUrl}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=cz`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse: WeatherData = await response[0].json();
        const forecastResponse: ForecastData = await response[1].json();

        dispatch(
          setWeatherData({ ...weatherResponse, city: searchData.label })
        );
        dispatch(
          setForecastData({ ...forecastResponse })
        );

        console.log("Weather data:", weatherResponse);
        console.log("Forecast data:", forecastResponse);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__content}`}>
        <a className={styles.logo} href="/">
          Předpověď počasí
        </a>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
    </header>
  );
};

export default Header;
