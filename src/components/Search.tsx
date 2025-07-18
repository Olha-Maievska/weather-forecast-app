import { useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useCityList } from "@/hooks/useCityList";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useWeatherFetcher } from "@/hooks/useWeatherFetcher";
import styles from "@/styles/Search.module.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState<string>(
    "Search for a city..."
  );

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
    const match = filteredCities.find(
      (city) => city.name.toLowerCase() === query.toLowerCase()
    );

    if (match) {
      handleCitySelect(match.name);
    } else return;
  };

  return (
    <div className={styles.search}>
      <form className={styles.search__wrapper} onSubmit={handleSubmit}>
        <input
          className={styles.search__input}
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Search for a city"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={filteredCities.length > 0}
          aria-activedescendant={
            filteredCities[selectedIndex]
              ? `city-${filteredCities[selectedIndex].id}`
              : undefined
          }
        />
        <button
          className={styles.search__button}
          type="submit"
          aria-hidden="true"
          tabIndex={-1}
        >
          <SearchIcon className={styles.search__icon} />
        </button>
      </form>

      {filteredCities.length > 0 && (
        <ul className={styles.search__list} id="search-results" role="listbox">
          {filteredCities.map((city, index) => (
            <li
              key={city.id}
              role="option"
              aria-selected={index === selectedIndex}
              id={`city-${city.id}`}
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
