import { useAppSelector } from "@/hooks";
import { useDailyForecast } from "@/hooks/useDailyForecast";
import ForecastRow from "./ForecastRow";
import { IS_NIGHT } from "@/const";
import styles from "@/styles/Forecast.module.scss";
import { useEffect, useState } from "react";

const Forecast = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);
  const forecastList = forecastData?.list ?? [];
  const dailyForecast = useDailyForecast(forecastList);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (forecastList.length && dailyForecast.length) {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [forecastList.length, dailyForecast.length]);

  if (!forecastList.length || !dailyForecast.length) return null;

  return (
    <table
      className={`${styles.forecast} ${
        IS_NIGHT ? styles.forecast__night : ""
      } ${isVisible ? styles.forecast__show : ""}`}
      role="table"
      aria-label="5-day weather forecast"
      tabIndex={0}
    >
      <tbody>
        {dailyForecast.map((item) => (
          <ForecastRow
            key={item.dt}
            dt={item.dt}
            dayName={item.dayName}
            dateLabel={item.dateLabel}
            icon={item.icon}
            description={item.description}
            tempMin={item.tempMin}
            tempMax={item.tempMax}
            humidity={item.humidity}
            windSpeed={item.windSpeed}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Forecast;
