import { supportedLangs } from "../const/countries";

export const formatDateOnly = (date: Date) => date.toISOString().split("T")[0];
export const browserLang = navigator.language.slice(0, 2).toLowerCase();

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export function getSafeLangCode(lang: string): string {
  if (lang === "cs") lang = "cz";
  if (lang === "uk") lang = "ua";

  return supportedLangs.has(lang) ? lang : "en";
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
