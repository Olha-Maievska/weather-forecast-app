import { useEffect, useMemo, useState } from "react";
import { allowedCountries } from "@/const/countries";
import { debounce } from "@/utils/debounce";
import type { SearchData } from '@/interfaces/search.interface';

export const useCitySearch = (query: string, allCities: SearchData[]) => {
  const [filteredCities, setFilteredCities] = useState<SearchData[]>([]);

  const debouncedFilter = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) {
          setFilteredCities([]);
          return;
        }

        const filtered = allCities
          .filter((city) => allowedCountries.includes(city.country))
          .filter((city) =>
            city.name.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 5);

        setFilteredCities(filtered);
      }, 300),
    [allCities]
  );

  useEffect(() => {
    debouncedFilter(query);
    return () => {
      if (typeof debouncedFilter.cancel === "function") {
        debouncedFilter.cancel();
      }
    };
  }, [query, debouncedFilter]);

  return filteredCities;
};
