import { SunIcon } from "lucide-react";
import styles from "./CurrentWeather.module.scss";

const CurrentWeather = () => {
  return (
    <div className={styles.weather}>
      <div className={styles.weather__top}>
        <p className={styles.weather__city}>Brno</p>
        <p className={styles.weather__area}>jihocesky kraj</p>
        <p className={styles.weather__temperature}>
          <span>25°C</span>
          <SunIcon className={styles.weather__icon} />
        </p>
        <p className={styles.weather__description}>sunny</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
