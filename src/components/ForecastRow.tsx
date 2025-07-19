import { DropletIcon, Wind } from "lucide-react";
import styles from "@/styles/Forecast.module.scss";

interface ForecastRowProps {
  dt: number;
  dayName: string;
  dateLabel: string;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
}

const ForecastRow = ({
  dt,
  dayName,
  dateLabel,
  icon,
  description,
  tempMin,
  tempMax,
  humidity,
  windSpeed,
}: ForecastRowProps) => {
  return (
    <tr key={dt} className={styles.forecast__row}>
      <td className={styles.forecast__day} tabIndex={0}>
        {dayName} <span>{dateLabel}</span>
      </td>
      <td className={styles.forecast__weather} tabIndex={0}>
        <img
          className={styles.forecast__icon}
          src={`/images/icons/${icon}.png`}
          loading="lazy"
          alt={description}
        />
      </td>
      <td
        className={styles.forecast__min}
        tabIndex={0}
        aria-label="Minimum temperature"
      >
        {tempMin}°C
      </td>
      <td
        className={styles.forecast__max}
        tabIndex={0}
        aria-label="Maximum temperature"
      >
        {tempMax}°C
      </td>
      <td
        className={styles.forecast__detais}
        tabIndex={0}
        aria-label="Humidity"
      >
        <DropletIcon
          className={styles.forecast__detais__icon}
          aria-hidden="true"
        />
        {humidity} %
      </td>
      <td className={styles.forecast__detais} tabIndex={0} aria-label="Wind">
        <Wind className={styles.forecast__detais__icon} aria-hidden="true" />
        {windSpeed.toFixed(1)} m/s
      </td>
    </tr>
  );
};

export default ForecastRow;
