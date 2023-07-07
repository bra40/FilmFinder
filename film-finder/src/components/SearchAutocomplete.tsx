import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import AutocompleteResults from "./AutocompleteResults";
import { AutocompleteItem } from "./types";
import { API_KEY } from "./constants";

interface SearchAutocompleteProps {
  onSelect: (person: AutocompleteItem) => void;
  selectedPersonName: string; // Add this line
}
const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  onSelect,
  selectedPersonName,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<
    AutocompleteItem[]
  >([]);

  useEffect(() => {
    if (searchInput !== "") {
      searchPeople(searchInput);
    } else {
      clearAutocompleteResults();
    }
  }, [searchInput]);

  const searchPeople = useCallback(async (query: string) => {
    try {
      const url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`;
      const response = await axios.get(url);
      const data = response.data;
      displayAutocompleteResults(data.results);
    } catch (error) {
      console.error("Error searching people:", error);
    }
  }, []);

  const displayAutocompleteResults = (results: any[]) => {
    const items: AutocompleteItem[] = results.slice(0, 10).map((result) => ({
      name: result.name,
      person_id: result.id,
    }));
    setAutocompleteResults(items);
  };

  const clearAutocompleteResults = () => {
    setAutocompleteResults([]);
  };

  const handleAutocompleteClick = (item: AutocompleteItem) => {
    onSelect(item);
  };

  return (
    <div>
      <SearchInput
        value={searchInput}
        onChange={setSearchInput}
        selectedName={selectedPersonName}
      />

      <AutocompleteResults
        results={autocompleteResults}
        onItemClick={handleAutocompleteClick}
      />
    </div>
  );
};

export default SearchAutocomplete;
