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
  onSearchChange: (value: string) => void;
}

const Search = ({ onSearchChange }: Props) => {
  const [searchValue, setSearchValue] = useState<SingleValue<OptionType>>(null);

  const customStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderColor: state.isFocused ? "#2684FF" : "transparent",
      boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      paddingLeft: 5,
      "&:hover": {
        borderColor: "#2684FF",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#f0f8ff" : "#fff",
      color: "#333",
      padding: "10px 15px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#999",
      fontFamily: "Roboto, sans-serif",
    }),
  };

  const handleOnChange = (searchData: SingleValue<OptionType>) => {
    setSearchValue(searchData);
    onSearchChange(searchData?.value ?? "");
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
        placeholder="Search for a city..."
        debounceTimeout={500}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default Search;
