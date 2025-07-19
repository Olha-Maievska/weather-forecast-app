import { useRef, useState } from "react";
import { useCityList } from "@/hooks/useCityList";
import { useCitySearch } from "@/hooks/useCitySearch";
import { useWeatherFetcher } from "@/hooks/useWeatherFetcher";
import styles from "@/styles/Search.module.scss";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      await fetchWeather(name);
      setQuery("");
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
      <SearchInput
        ref={inputRef}
        query={query}
        onChange={setQuery}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        hasResults={filteredCities.length > 0}
        activeId={selectedIndex}
      />

      <SearchResults
        query={query}
        cities={filteredCities}
        selectedIndex={selectedIndex}
        onSelect={handleCitySelect}
      />
    </div>
  );
};

export default Search;
