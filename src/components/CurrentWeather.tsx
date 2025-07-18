import { useAppSelector } from "@/hooks";
import { MapPin } from "lucide-react";
import styles from "@/styles/CurrentWeather.module.scss";
import { IS_NIGHT } from "@/const";

const CurrentWeather = () => {
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );

  const cityName = currentWeather?.name;
  const icon = currentWeather?.weather[0].icon;
  const temp = Math.round(currentWeather?.main.temp || 0);
  const desc = currentWeather?.weather[0].description;

  return (
    <div
      className={`${styles.weather} ${
        IS_NIGHT ? styles.weather__night : styles.weather__day
      }`}
    >
      <div className={styles.weather__top}>
        <p className={styles.weather__city}>
          <span>
            <MapPin className={styles.weather__location} />
          </span>
          {cityName}
        </p>
        <p className={styles.weather__temperature}>
          <span>{temp}°C</span>
          <img
            className={styles.weather__icon}
            src={`icons/${icon}.png`}
            alt={desc}
          />
        </p>
        <p className={styles.weather__description}>{desc}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
