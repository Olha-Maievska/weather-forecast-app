import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import type { SingleValue, StylesConfig } from "react-select";
import { GEO_API_URL, geoApiOptions } from "../../services/api";
import type {
  OptionType,
  SearchResponse,
} from "../../interfaces/search.interface";
import styles from "./Search.module.scss";

interface Props {
  onSearchChange: (value: SingleValue<OptionType>) => void;
}

const Search = ({ onSearchChange }: Props) => {
  const [searchValue, setSearchValue] = useState<SingleValue<OptionType>>(null);

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f6efef",
      borderColor: state.isFocused ? "#227df4" : "transparent",
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      paddingLeft: 5,
      "&:hover": {
        borderColor: "#2684FF",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#d4e1ee" : "#f6efef",
      color: "#333",
      padding: "8px 15px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#8b8a8a",
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
    }),
  };

  const handleOnChange = (searchData: SingleValue<OptionType>) => {
    setSearchValue(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (
    inputValue: string
  ): Promise<{
    options: { value: string; label: string }[];
  }> => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const data: SearchResponse = await response.json();
      if (!data.data || data.data.length === 0) {
        return { options: [] };
      }

      return {
        options: data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error loading options:", error);
      return { options: [] };
    }
  };

  return (
    <div className={styles.search}>
      <AsyncPaginate
        styles={customStyles}
        value={searchValue}
        onChange={handleOnChange}
        placeholder="Hledejte počasí pro vaše místo..."
        debounceTimeout={500}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
