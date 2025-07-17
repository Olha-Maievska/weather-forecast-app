import { useMemo, useRef, useState } from "react";
import type { SearchData } from "@/interfaces/search.interface";
import { SearchIcon } from "lucide-react";
import { useAppDispatch } from "@/hooks";
import { setForecastData, setWeatherData } from "../store/weatherSlice";
import { debounce } from "../utils";
import styles from "@/styles/Search.module.scss";
import { useCityList } from "@/hooks/useCityList";
import { fetchWeatherData } from "@/api/weatherApi";
import { allowedCountries } from "@/const/countries";

const Search = () => {
  const [query, setQuery] = useState("");

  const [filteredCities, setFilteredCities] = useState<SearchData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState("Search for a city...");
  const dispatch = useAppDispatch();
  const allCities = useCityList();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) {
          setFilteredCities([]);
          return;
        }

        const filtered = allCities
          .filter((city) => {
            allowedCountries.includes(city.country);
          })
          .filter((city) =>
            city.name.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 5);

        setFilteredCities(filtered);
        console.log(filtered);

        setSelectedIndex(0);
      }, 300),
    [allCities]
  );

  const fetchWeather = async (cityName: string) => {
    try {
      const { weather, forecast } = await fetchWeatherData(cityName);
      dispatch(setWeatherData(weather));
      dispatch(setForecastData(forecast));
      setQuery("");
      setPlaceholder(weather.name);
      setFilteredCities([]);
      setSelectedIndex(0);

      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredCities.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCities.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCities.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      fetchWeather(filteredCities[selectedIndex].name);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(query);
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__wrapper} onSubmit={handleSubmit}>
        <input
          className={styles.search__input}
          value={query}
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearchChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <button className={styles.search__button} type="submit">
          <SearchIcon className={styles.search__icon} />
        </button>
      </form>

      {filteredCities.length > 0 && (
        <ul className={styles.search__list}>
          {filteredCities.map((city, index) => (
            <li
              key={city.id}
              className={`${styles.search__item} ${
                index === selectedIndex ? styles.search__item__active : ""
              }`}
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
