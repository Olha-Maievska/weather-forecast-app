import { useAppSelector } from "@/hooks";
import { getVideoBgByHour } from "@/utils";
import styles from "@/styles/Forecast.module.scss";
import { DropletIcon, Wind } from "lucide-react";
import { useDailyForecast } from "@/hooks/useDailyForecast";

const Forecast = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);
  const forecastList = forecastData?.list ?? [];
  const timeOfDay = getVideoBgByHour();
  const dailyForecast = useDailyForecast(forecastList);

  if (!forecastList.length || !dailyForecast.length) return null;

  return (
    <table
      className={`${styles.forecast} ${
        timeOfDay ? styles.forecast__night : ""
      }`}
    >
      <tbody>
        {dailyForecast.map((item) => (
          <tr key={item.dt} className={styles.forecast__row}>
            <td className={styles.forecast__day}>
              {item.dayName} <span>{item.dateLabel}</span>
            </td>
            <td className={styles.forecast__weather}>
              <img
                className={styles.forecast__icon}
                src={`images/icons/${item.icon}.png`}
                alt={item.description}
              />
            </td>
            <td className={styles.forecast__min}>{item.tempMin}°C</td>
            <td className={styles.forecast__max}>{item.tempMax}°C</td>
            <td className={styles.forecast__detais}>
              <DropletIcon className={styles.forecast__detais__icon} />
              {item.humidity} %
            </td>
            <td className={styles.forecast__detais}>
              <Wind className={styles.forecast__detais__icon} />
              {item.windSpeed.toFixed(1)} m/s
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Forecast;
