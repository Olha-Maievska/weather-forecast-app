import Search from "../search";
import type { OptionType } from "../../interfaces/search.interface";
import type { SingleValue } from "react-select";
import styles from "./Header.module.scss";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY!;
const apiUrl = import.meta.env.VITE_WEATHER_API_URL!;

const Header = () => {
  const handleOnSearchChange = (searchData: SingleValue<OptionType>) => {
    if (!searchData) return;
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${apiUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const forecastFetch = fetch(
      `${apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        console.log("Current Weather:", weatherResponse);
        console.log("Forecast:", forecastResponse);
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
