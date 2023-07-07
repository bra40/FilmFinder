import React, { useEffect, useState } from "react";
import axios from "axios";
import OutputTable from "./OutputTable";
import { MovieProvider } from "./types";
import { API_KEY, MY_PROVIDERS } from "./constants";

interface MovieResultsProps {
  personId: number;
  mode: string;
}

const MovieResults: React.FC<MovieResultsProps> = ({ personId, mode }) => {
  const [outputTableData, setOutputTableData] = useState<MovieProvider[]>([]);

  useEffect(() => {
    getMoviesAndProviders(personId);
  }, [personId, mode]);

  const getMoviesAndProviders = async (personId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`
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
      );
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
    <div className="bg-white rounded-md shadow-md">
      <OutputTable data={outputTableData} />
    </div>
  );
};

export default MovieResults;