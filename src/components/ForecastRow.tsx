import styles from "@/styles/Forecast.module.scss";
import { DropletIcon, Wind } from "lucide-react";

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
      <td className={styles.forecast__day}>
        {dayName} <span>{dateLabel}</span>
      </td>
      <td className={styles.forecast__weather}>
        <img
          className={styles.forecast__icon}
          src={`images/icons/${icon}.png`}
          alt={description}
        />
      </td>
      <td className={styles.forecast__min}>{tempMin}°C</td>
      <td className={styles.forecast__max}>{tempMax}°C</td>
      <td className={styles.forecast__detais}>
        <DropletIcon className={styles.forecast__detais__icon} />
        {humidity} %
      </td>
      <td className={styles.forecast__detais}>
        <Wind className={styles.forecast__detais__icon} />
        {windSpeed.toFixed(1)} m/s
      </td>
    </tr>
  );
};

export default ForecastRow;
