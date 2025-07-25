import { supportedLangs } from "../const/countries";

export const formatDateOnly = (date: Date) => date.toISOString().split("T")[0];
export const browserLang = navigator.language.slice(0, 2).toLowerCase();

export function getSafeLangCode(lang: string): string {
  if (lang === "cs") lang = "cz";
  if (lang === "uk") lang = "ua";

  return supportedLangs.has(lang) ? lang : "en";
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getTimeOfDay = (): string => {
  const hour = new Date().getHours();

  if (hour >= 18 && hour < 22) return "evening";
  if (hour >= 22 || hour < 6) return "night";
  return "day";
};
