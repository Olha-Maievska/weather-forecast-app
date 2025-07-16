import { useAppSelector } from "../../hooks/hooks";
import styles from "./CurrentWeather.module.scss";

const CurrentWeather = () => {
  const { currentWeather } = useAppSelector((state) => state.weather);

  if (!currentWeather) {
    return null;
  }

  const cityName = currentWeather.city.split(",")[0] || "Neznámé město";
  const areaName = currentWeather.city.split(",")[1] || "Neznámá oblast";
  const icon = currentWeather.weather[0].icon || "unknown";
  const temp = Math.round(currentWeather.main.temp || 0) || "N/A";
  const desc = currentWeather.weather[0].description || "Žádný popis";

  return (
    <div className={styles.weather}>
      <div className={styles.weather__top}>
        <p className={styles.weather__city}>{cityName}</p>
        <p className={styles.weather__area}>{areaName}</p>
        <p className={styles.weather__temperature}>
          <span>{temp}°C</span>
          <img
            className={styles.weather__icon}
            src={`images/icons/${icon}.png`}
            alt={desc}
          />
        </p>
        <p className={styles.weather__description}>{desc}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
