import { useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useCityList } from "@/hooks/useCityList";
import { useCitySearch } from '@/hooks/useCitySearch';
import { useWeatherFetcher } from '@/hooks/useWeatherFetcher';
import styles from "@/styles/Search.module.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState<string>("Search for a city...");

  const allCities = useCityList();
  const filteredCities = useCitySearch(query, allCities);
  const fetchWeather = useWeatherFetcher();

  const inputRef = useRef<HTMLInputElement>(null);

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
       handleCitySelect(filteredCities[selectedIndex].name);
     }
   };

   const handleCitySelect = async (name: string) => {
     try {
       const cityName = await fetchWeather(name);
       setQuery("");
       setPlaceholder(cityName);
       setSelectedIndex(0);
       if (inputRef.current) inputRef.current.blur();
     } catch (err) {
       console.error("Error:", err);
     }
   };

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     handleCitySelect(query);
   };


  return (
    <div className={styles.search}>
      <form className={styles.search__wrapper} onSubmit={handleSubmit}>
        <input
          className={styles.search__input}
          ref={inputRef}
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
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
              onMouseDown={() => handleCitySelect(city.name)}
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
