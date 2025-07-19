import { forwardRef } from "react";
import { SearchIcon } from "lucide-react";
import styles from "@/styles/Search.module.scss";

interface Props {
  query: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  hasResults: boolean;
  activeId?: number;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ query, onChange, onKeyDown, onSubmit, hasResults, activeId }, ref) => (
    <form className={styles.search__wrapper} onSubmit={onSubmit}>
      <input
        className={styles.search__input}
        ref={ref}
        value={query}
        name="search"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Search for a city"
        role="combobox"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={hasResults}
        aria-activedescendant={activeId ? `city-${activeId}` : undefined}
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
  )
);

export default SearchInput;
