import { useEffect, useState } from "react";
import type { SearchData } from "@/interfaces/search.interface";

export const useCityList = () => {
  const [cities, setCities] = useState<SearchData[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_CITIES_API!}`)
      .then((res) => res.json())
      .then((data: SearchData[]) => setCities(data))
      .catch((err) => console.error("Failed to load cities:", err));
  }, []);

  return cities;
};
