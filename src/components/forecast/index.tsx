import { useAppSelector } from "../../hooks/hooks";
import type { ForecastItem } from "../../interfaces/forecast.interface";
import { formatDateOnly } from "../../utils";
import styles from "./Forecast.module.scss";

const weekdays = [
  "Neděle",
  "Pondelí",
  "Uterý",
  "Středa",
  "Śtvrtek",
  "Pátek",
  "Sobota",
];

const Forecast = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayStr = formatDateOnly(today);
  const tomorrowStr = formatDateOnly(tomorrow);

  const dailyMap = new Map<string, ForecastItem[]>();

  forecastData.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = formatDateOnly(date);

    if (!dailyMap.has(day)) {
      dailyMap.set(day, []);
    }
    dailyMap.get(day)!.push(item);
  });

  const dailyForecast = Array.from(dailyMap.entries())
    .slice(0, 5)
    .map(([dateStr, items]) => {
      const maxItem = items.reduce((prev, curr) =>
        curr.main.temp > prev.main.temp ? curr : prev
      );

      const temps = items.map((i) => i.main.temp);
      const tempMax = Math.round(Math.max(...temps));
      const tempMin = Math.round(Math.min(...temps));

      const date = new Date(maxItem.dt * 1000);
      let dayLabel = weekdays[date.getDay()];
      if (dateStr === todayStr) dayLabel = "Dnes";
      else if (dateStr === tomorrowStr) dayLabel = "Zítra";

      return {
        dt: maxItem.dt,
        dayLabel,
        tempMax,
        tempMin,
        icon: maxItem.weather[0].icon,
        description: maxItem.weather[0].description,
        windSpeed: maxItem.wind.speed,
      };
    });

  return (
    <table className={styles.forecast}>
      <thead>
        <tr className={styles.forecast__header}>
          <th>Den</th>
          <th>Popis</th>
          <th>Máx</th>
          <th>Mín</th>
          <th>Vítr</th>
        </tr>
      </thead>
      <tbody>
        {dailyForecast.map((item) => (
          <tr key={item.dt} className={styles.forecast__row}>
            <td className={styles.forecast__day}>{item.dayLabel}</td>
            <td className={styles.forecast__weather}>
              <img
                className={styles.forecast__icon}
                src={`images/icons/${item.icon}.png`}
                alt={item.description}
              />
              <span className={styles.forecast__description}>
                {item.description}
              </span>
            </td>
            <td className={styles.forecast__temp}>{item.tempMin}°C</td>
            <td className={styles.forecast__temp}>{item.tempMax}°C</td>
            <td>{item.windSpeed.toFixed(1)} m/s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Forecast;
