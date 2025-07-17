import type { ForecastItem } from "@/interfaces/forecast.interface";
import { browserLang, capitalizeFirstLetter } from "@/utils";
import { dayTranslations } from "@/const/countries";

export const useDailyForecast = (forecastList: ForecastItem[]) => {
  const userLocale = browserLang || "en-US";
  const translation = dayTranslations[userLocale] || dayTranslations["en"];

  const now = new Date();
  const todayStr = now.toLocaleDateString("sv-SE");
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString("sv-SE");

  const dailyMap = new Map<string, ForecastItem[]>();

  forecastList.forEach((item) => {
    const localDate = new Date(item.dt * 1000);
    const localDateStr = localDate.toLocaleDateString("sv-SE");

    if (!dailyMap.has(localDateStr)) {
      dailyMap.set(localDateStr, []);
    }
    dailyMap.get(localDateStr)!.push(item);
  });

  const dailyForecast = Array.from(dailyMap.entries())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
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
          new Intl.DateTimeFormat(userLocale, { weekday: "long" }).format(date)
        );
      }

      const dateLabel = new Intl.DateTimeFormat(userLocale, {
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

  return dailyForecast;
};
