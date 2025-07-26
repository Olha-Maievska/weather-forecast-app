import { useAppSelector } from "@/hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getGroupedForecast } from "@/utils/getGroupedForecast";
import { IS_NIGHT } from "@/const";
import styles from "@/styles/ForecastChart.module.scss";

const ForecastChart = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);

  if (!forecastData || !forecastData.list.length) {
    return null;
  }

  const locale = navigator.language || "en-US";
  const data = getGroupedForecast(forecastData, locale);

  return (
    forecastData && (
      <div className={`${styles.chart} ${IS_NIGHT ? styles.chart__night : ""}`}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tick={{ fill: IS_NIGHT ? "#e2d6d6" : "#333" }}
            />
            <YAxis unit="°C" tick={{ fill: IS_NIGHT ? "#e2d6d6" : "#333" }} />
            <Tooltip formatter={(value: number) => `${value}°C`} />
            <Line
              dataKey="min"
              stroke={IS_NIGHT ? "#7bb4ff" : "#3478d0"}
              name="Min temp"
            />
            <Line dataKey="max" stroke="#d03800" name="Max temp" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  );
};

export default ForecastChart;
