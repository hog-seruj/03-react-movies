import { useState } from 'react';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import './App.css';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleRequest = async (movie: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(movie);
      if (data.length < 1) {
        toast.error('No movies found for your request.');
      }
      setMovies(data);
    } catch (error) {
      setIsError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectHandler = (id: number) => {
    const currentMovie = movies.find((item) => item.id === id) as Movie;
    setSelectedMovie(currentMovie);
    openModal();
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleRequest} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movies.length > 0 && (
        <MovieGrid onSelect={onSelectHandler} movies={movies} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
