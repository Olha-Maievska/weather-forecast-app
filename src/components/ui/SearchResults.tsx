import type { SearchData } from '@/interfaces/search.interface';
import styles from "@/styles/Search.module.scss";

interface Props {
  query: string;
  cities: SearchData[];
  selectedIndex: number;
  onSelect: (name: string) => void;
}

const SearchResults = ({ query, cities, selectedIndex, onSelect }: Props) => {
  if (!query && cities.length === 0) {
    return (
      <ul className={styles.search__list}>
        <li className={styles.search__item}>No cities found</li>
      </ul>
    );
  }

  if (cities.length === 0) return null;

  return (
    <ul className={styles.search__list} id="search-results" role="listbox">
      {cities.map((city, index) => (
        <li
          key={city.id}
          role="option"
          aria-selected={index === selectedIndex}
          id={`city-${city.id}`}
          className={`${styles.search__item} ${
            index === selectedIndex ? styles.search__item__active : ""
          }`}
          onMouseDown={() => onSelect(city.name)}
        >
          {city.name}, {city.country}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
