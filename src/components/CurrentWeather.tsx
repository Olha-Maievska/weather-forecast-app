import { useAppSelector } from "@/hooks";
import styles from "@/styles/CurrentWeather.module.scss";
import { getVideoBgByHour } from '@/utils';
import { MapPin } from "lucide-react";

const CurrentWeather = () => {
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );
  const timeOfDay = getVideoBgByHour();

  if (!currentWeather) {
    return null;
  }

  const cityName = currentWeather.name || "No name";
  const icon = currentWeather.weather[0].icon || "unknown";
  const temp = Math.round(currentWeather.main.temp || 0) || "N/A";
  const desc = currentWeather.weather[0].description || "No description";

  return (
    <div
      className={`${styles.weather} ${
        timeOfDay ? styles.weather__night : ""
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
