import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import AutocompleteResults from "./AutocompleteResults";
import ModeDropdown from "./ModeDropdown";
import OutputTable from "./OutputTable";
import { AutocompleteItem, MovieProvider } from "./types";
import { API_KEY, MY_PROVIDERS } from "./constants";

const MovieSearchGUI = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState<
    AutocompleteItem[]
  >([]);
  const [outputTableData, setOutputTableData] = useState<MovieProvider[]>([]);
  const [mode, setMode] = useState<string>("writer");

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
        `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${API_KEY}&language=en-US`
      );
      const movies = extractMoviesByDepartment(response.data, mode);
      const movieProviders = await Promise.all(
        movies.map(async (movie) => {
          const movieId = await getMovieId(movie, API_KEY);
          if (movieId) {
            const providers = await getFilmProviders(movieId);
            const commonProviders = providers.filter((provider: string) =>
              MY_PROVIDERS.includes(provider)
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

  const getMovieId = async (movieTitle: string, apiKey: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieTitle}&page=1&include_adult=false`
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
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
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
    <div className="bg-offWhite500 text-blue600 min-h-screen p-8">
      <div className="grid grid-cols-2 gap-8 h-full">
        <div className="col-span-1 flex flex-col">
          <div className="flex items-center">
            <div className="flex-grow">
              <SearchInput value={searchInput} onChange={setSearchInput} />
            </div>
            <div>
              <ModeDropdown value={mode} onChange={handleModeChange} />
            </div>
          </div>
          <div className="h-full">
            <AutocompleteResults
              results={autocompleteResults}
              onItemClick={handleAutocompleteClick}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white rounded-md shadow-md ">
            <OutputTable data={outputTableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearchGUI;
