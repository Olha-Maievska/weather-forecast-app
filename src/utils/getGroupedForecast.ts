import type { ForecastData } from '@/interfaces/forecast.interface';

export const getGroupedForecast = (
  forecastData: ForecastData,
  locale: string
) => {
  type DayTemps = { morning?: number; evening?: number };
  const grouped: Record<string, DayTemps> = {};

  forecastData.list.forEach((item) => {
    const [dateStr, timeStr] = item.dt_txt.split(" ");
    const hour = parseInt(timeStr.split(":")[0]);

    if (!grouped[dateStr]) grouped[dateStr] = {};
    if (hour === 6 || hour === 9) grouped[dateStr].morning = item.main.temp;
    if (hour === 18 || hour === 21) grouped[dateStr].evening = item.main.temp;
  });

  return Object.entries(grouped)
    .map(([date, temps]) => {
      const formattedDate = new Date(date).toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
      });
      return {
        time: formattedDate,
        morning: temps.morning ?? null,
        evening: temps.evening ?? null,
      };
    })
    .filter((d) => d.morning !== null || d.evening !== null);
};
