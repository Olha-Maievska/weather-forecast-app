import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import type { SingleValue, StylesConfig } from "react-select";
import type {
  OpenCageResponse,
  OpenCageResult,
  OptionType,
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
  ): Promise<{ options: OptionType[] }> => {
    const apiKey = "040052fc774643d1a8303af92ae5c97c";
    if (!apiKey || !inputValue) return { options: [] };

    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        inputValue
      )}&language=cs&limit=5&countrycode=cz&key=${apiKey}`;

      const response = await fetch(url);
      const data: OpenCageResponse = await response.json();

      if (!data.results || data.results.length === 0) {
        return { options: [] };
      }

      const cityResults = data.results.filter((result) => {
        const components = result.components;
        return components.city || components.town || components.village;
      });

      const unique = new Map<string, OpenCageResult>();
      cityResults.forEach((r) => {
        unique.set(r.formatted, r);
      });

      return {
        options: Array.from(unique.values()).map((city) => ({
          value: `${city.geometry.lat} ${city.geometry.lng}`,
          label: city.formatted,
        })),
      };
    } catch (error) {
      console.error("Error fetching search data:", error);
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
