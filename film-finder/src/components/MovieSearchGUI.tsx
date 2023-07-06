import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import AutocompleteResults from "./AutocompleteResults";
import ModeDropdown from "./ModeDropdown";
import OutputTable from "./OutputTable";

interface AutocompleteItem {
  name: string;
  person_id: number;
}

interface MovieProvider {
  movie: string;
  providers: string[];
}

const MovieSearchGUI = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<
    AutocompleteItem[]
  >([]);
  const [outputTableData, setOutputTableData] = useState<MovieProvider[]>([]);
  const [mode, setMode] = useState<string>("writer");

  const api_key = "6b17a09aed846d2e8d5f46e555aabb7a"; // Replace with your TMDB API key
  const myProviders: string[] = [
    "HBO Max",
    "Max",
    "Criterion Channel",
    "Hulu",
    "Amazon Prime Video",
    "Netflix",
    "Apple TV Plus",
    "Tubi",
  ]; // Replace with your available film providers

  useEffect(() => {
    if (searchInput !== "") {
      searchPeople(searchInput);
    } else {
      clearAutocompleteResults();
    }
  }, [searchInput]);

  const searchPeople = useCallback(
    async (query: string) => {
      try {
        const url = `https://api.themoviedb.org/3/search/person?api_key=${api_key}&query=${query}`;
        const response = await axios.get(url);
        const data = response.data;
        displayAutocompleteResults(data.results);
      } catch (error) {
        console.error("Error searching people:", error);
      }
    },
    [api_key]
  );

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
    const person_id = item.person_id;
    if (person_id) {
      const chosenName = item.name;
      setOutputTableData([]);
      getMoviesAndProviders(person_id);
    }
  };

  const handleModeChange = (value: string) => {
    setMode(value);
  };

  const getMoviesAndProviders = async (person_id: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${api_key}&language=en-US`
      );
      const movies = extractMoviesByDepartment(response.data, mode);
      const movieProviders = await Promise.all(
        movies.map(async (movie) => {
          const movieId = await getMovieId(movie, api_key);
          if (movieId) {
            const providers = await getFilmProviders(movieId);
            const commonProviders = providers.filter((provider: string) =>
              myProviders.includes(provider)
            );
            return {
              movie,
              providers: commonProviders,
            };
          } else {
            return {
              movie,
              providers: [],
            };
          }
        })
      );
      const filteredMovieProviders = movieProviders.filter(
        (item) => item.providers.length > 0
      ); // Filter out movies without any common providers
      setOutputTableData(filteredMovieProviders);
    } catch (error) {
      console.error("Error getting movies and providers:", error);
    }
  };

  const extractMoviesByDepartment = (data: any, department: string) => {
    let movies: string[] = [];
    if (department === "director") {
      movies = data.crew
        .filter((movie: any) => movie.department === "Directing")
        .map((movie: any) => movie.title);
    } else if (department === "writer") {
      movies = data.crew
        .filter((movie: any) => movie.department === "Writing")
        .map((movie: any) => movie.title);
    } else if (department === "actor") {
      movies = data.cast.map((movie: any) => movie.title);
    }
    return movies;
  };

  const getMovieId = async (movieTitle: string, api_key: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
      );
      const movieResults = response.data.results;
      if (movieResults.length > 0) {
        const movieId = movieResults[0].id;
        return movieId;
      }
    } catch (error) {
      console.error("Error getting movie ID:", error);
    }
    return null;
  };

  const getFilmProviders = async (movieId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${api_key}`
      );
      const results = response.data.results;
      const providers = results.US?.flatrate || [];
      const providerNames = providers.map(
        (provider: any) => provider.provider_name
      );
      return providerNames;
    } catch (error) {
      console.error("Error getting film providers:", error);
    }
    return [];
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1">
        <div className="flex items-center mb-4">
          <div className="mr-4 flex-grow">
            <SearchInput value={searchInput} onChange={setSearchInput} />
          </div>
          <div>
            <ModeDropdown value={mode} onChange={handleModeChange} />
          </div>
        </div>
        <div>
          <AutocompleteResults
            results={autocompleteResults}
            onItemClick={handleAutocompleteClick}
          />
        </div>
      </div>
      <div className="col-span-1">
        <OutputTable data={outputTableData} />
      </div>
    </div>
  );
};

export default MovieSearchGUI;
