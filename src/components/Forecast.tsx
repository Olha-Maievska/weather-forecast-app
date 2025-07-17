import { useAppSelector } from "@/hooks";
import type { ForecastItem } from "@/interfaces/forecast.interface";
import { browserLang, capitalizeFirstLetter, formatDateOnly } from "@/utils";
import styles from "@/styles/Forecast.module.scss";
import { dayTranslations } from "@/const/countries";
import { DropletIcon, Wind } from "lucide-react";

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
  const translation = dayTranslations[browserLang] || dayTranslations["en"];

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

      let dayName = "";
      if (dateStr === todayStr) {
        dayName = translation.today;
      } else if (dateStr === tomorrowStr) {
        dayName = translation.tomorrow;
      } else {
        dayName = capitalizeFirstLetter(
          new Intl.DateTimeFormat(browserLang, { weekday: "long" }).format(date)
        );
      }

      const dateLabel = new Intl.DateTimeFormat(browserLang, {
        day: "numeric",
        month: "long",
      }).format(date);

      return {
        dt: maxItem.dt,
        dayName,
        dateLabel,
        tempMax,
        tempMin,
        icon: maxItem.weather[0].icon,
        description: maxItem.weather[0].description,
        windSpeed: maxItem.wind.speed,
        humidity: maxItem.main.humidity,
      };
    });

  return (
    <table className={styles.forecast}>
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
