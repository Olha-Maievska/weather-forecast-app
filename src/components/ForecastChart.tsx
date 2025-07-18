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
import { getTimeOfDay } from "@/utils";
import { getGroupedForecast } from "@/utils/getGroupedForecast";
import styles from "@/styles/ForecastChart.module.scss";

const ForecastChart = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);
  const timeOfDay = getTimeOfDay();

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }

  const locale = navigator.language || "en-US";
  const data = getGroupedForecast(forecastData, locale);

  return (
    <div className={`${styles.chart} ${timeOfDay ? styles.chart__night : ""}`}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tick={{ fill: timeOfDay ? "#e2d6d6" : "#333" }}
          />
          <YAxis unit="°C" tick={{ fill: timeOfDay ? "#e2d6d6" : "#333" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="morning"
            stroke="#ffa500"
            dot
            name="Morning"
          />
          <Line
            type="monotone"
            dataKey="evening"
            stroke="#3478d0"
            dot
            name="Evening"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
