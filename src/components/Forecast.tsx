import { useAppSelector } from "@/hooks";
import { useDailyForecast } from "@/hooks/useDailyForecast";
import ForecastRow from "./ForecastRow";
import styles from "@/styles/Forecast.module.scss";
import { IS_NIGHT } from "@/const";

const Forecast = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);
  const forecastList = forecastData?.list ?? [];
  const dailyForecast = useDailyForecast(forecastList);

  if (!forecastList.length || !dailyForecast.length) return null;

  return (
    <table
      className={`${styles.forecast} ${IS_NIGHT ? styles.forecast__night : ""}`}
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
