import { useAppSelector } from "@/hooks";
import { MapPin } from "lucide-react";
import { IS_NIGHT } from "@/const";
import styles from "@/styles/CurrentWeather.module.scss";
import { useEffect, useState } from "react";

const CurrentWeather = () => {
  const currentWeather = useAppSelector(
    (state) => state.weather.currentWeather
  );
  const [liveText, setLiveText] = useState("");
  const [visible, setVisible] = useState(false);

  const cityName = currentWeather?.name;
  const icon = currentWeather?.weather[0].icon;
  const temp = Math.round(currentWeather?.main.temp || 0);
  const desc = currentWeather?.weather[0].description;

  useEffect(() => {
    if (cityName && temp && desc) {
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
        setLiveText(
          `Weather in ${cityName}. Temperature: ${temp} degrees Celsius. ${desc}.`
        );
      }, 100);
    }
  }, [cityName, temp, desc]);

  return (
    <div
      className={`${styles.weather} ${
        IS_NIGHT ? styles.weather__night : styles.weather__day
      } ${visible ? styles.weather__show : ""}`}
      tabIndex={0}
      aria-label={`Weather in ${cityName}. ${temp} degrees Celsius. ${desc}`}
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
            aria-hidden="true"
          />
        </p>
        <p className={styles.weather__description}>{desc}</p>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        role="status"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          padding: "0",
          border: "0",
          clip: "rect(0 0 0 0)",
          overflow: "hidden",
        }}
      >
        {liveText}
      </div>
    </div>
  );
};

export default CurrentWeather;
