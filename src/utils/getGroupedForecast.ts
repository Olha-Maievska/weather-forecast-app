import type { ForecastData } from "@/interfaces/forecast.interface";

export const getGroupedForecast = (
  forecastData: ForecastData,
  locale: string
) => {
  const grouped: Record<string, { minTemps: number[]; maxTemps: number[] }> =
    {};

  forecastData.list.forEach((item) => {
    const [dateStr] = item.dt_txt.split(" ");
    if (!grouped[dateStr]) {
      grouped[dateStr] = { minTemps: [], maxTemps: [] };
    }
    grouped[dateStr].minTemps.push(item.main.temp_min);
    grouped[dateStr].maxTemps.push(item.main.temp_max);
  });

  return Object.entries(grouped).map(([date, temps]) => {
    const formattedDate = new Date(date).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
    });
    return {
      time: formattedDate,
      min: Math.round(Math.min(...temps.minTemps)),
      max: Math.round(Math.max(...temps.maxTemps)),
    };
  });
};
