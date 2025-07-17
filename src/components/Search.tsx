import { useMemo, useState } from "react";
import type { SearchData } from "@/interfaces/search.interface";
import { SearchIcon } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { setForecastData, setWeatherData } from "../store/weatherSlice";
import { allowedCountries, debounce } from "../utils";
import styles from "@/styles/Search.module.scss";
import { useCityList } from "@/hooks/useCityList";
import { fetchWeatherData } from "@/api/weatherApi";

const Search = () => {
  const [query, setQuery] = useState("");

  const [filteredCities, setFilteredCities] = useState<SearchData[]>([]);
  const dispatch = useAppDispatch();
  const allCities = useCityList();

  const handleSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) {
          setFilteredCities([]);
          return;
        }

        const filtered = allCities
          .filter((city) => allowedCountries.includes(city.country))
          .filter((city) =>
            city.name.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);

        setFilteredCities(filtered);
      }, 300),
    [allCities]
  );
  const fetchWeather = async (cityName: string) => {
    try {
      const { weather, forecast } = await fetchWeatherData(cityName);
      dispatch(setWeatherData(weather));
      dispatch(setForecastData(forecast));
      setQuery("");
      setFilteredCities([]);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(query);
    console.log(import.meta.env.VITE_API_URL);
    console.log(import.meta.env.VITE_API_KEY);
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__wrapper} onSubmit={handleSubmit}>
        <input
          className={styles.search__input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearchChange(e.target.value);
          }}
          placeholder="Enter city..."
        />
        <button className={styles.search__button} type='submit'>
          <SearchIcon className={styles.search__icon} />
        </button>
      </form>

      {filteredCities.length > 0 && (
        <ul className={styles.search__list}>
          {filteredCities.map((city) => (
            <li
              key={city.id}
              className={styles.search__item}
              onClick={() => fetchWeather(city.name)}
              onMouseDown={() => fetchWeather(city.name)}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}

      {query && filteredCities.length === 0 && (
        <ul className={styles.search__list}>
          <li className={styles.search__item}>No cities found</li>
        </ul>
      )}
    </div>
  );
};

export default Search;
