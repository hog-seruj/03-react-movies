import axios from 'axios';
import type { Movie } from '../types/movie';
const TMDBToken = import.meta.env.VITE_TMDB_TOKEN;

export interface MovieHttpResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/search',
  headers: {
    Authorization: `Bearer ${TMDBToken}`,
  },
});

export const fetchMovies = async (movie: string): Promise<Movie[]> => {
  const response = await moviesInstance.get<MovieHttpResponse>('/movie', {
    params: { query: movie },
  });
  return response.data.results;
};
