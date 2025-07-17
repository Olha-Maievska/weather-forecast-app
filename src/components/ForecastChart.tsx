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
import styles from "@/styles/ForecastChart.module.scss";

const ForecastChart = () => {
  const forecastData = useAppSelector((state) => state.weather.forecast);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return null;
  }

  const userLocale = navigator.language || "en-US";

  type DayTemps = {
    morning?: number;
    evening?: number;
  };

  const grouped: Record<string, DayTemps> = {};

  forecastData.list.forEach((item) => {
    const [dateStr, timeStr] = item.dt_txt.split(" "); 
    const hour = parseInt(timeStr.split(":")[0]);

    if (!grouped[dateStr]) {
      grouped[dateStr] = {};
    }
    if (hour === 6 || hour === 9) {
      grouped[dateStr].morning = item.main.temp;
    }
    if (hour === 18 || hour === 21) {
      grouped[dateStr].evening = item.main.temp;
    }
  });

  const data = Object.entries(grouped)
    .map(([date, temps]) => {
      const formattedDate = new Date(date).toLocaleDateString(userLocale, {
        day: "2-digit",
        month: "2-digit",
      });

      return {
        time: formattedDate,
        morning: temps.morning ?? null,
        evening: temps.evening ?? null,
      };
    })
    .filter((d) => d.morning !== null || d.evening !== null); //

  return (
    <div className={styles.chart}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line type="monotone" dataKey="morning" stroke="#ffa500" dot name="Morning" />
          <Line type="monotone" dataKey="evening" stroke="#1e90ff" dot name="Evening" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
