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
import styles from "@/styles/ForecastChart.module.scss";
import { IS_NIGHT } from "@/const";

const ForecastChart = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
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
    )
  );
};

export default ForecastChart;
