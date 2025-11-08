// import { Toaster } from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const value = formData.get('query') as string;
    const valueTrimmed = value.toLocaleLowerCase().trim();
    if (valueTrimmed.length < 1) {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(valueTrimmed);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <Toaster />
    </header>
  );
}

export default SearchBar;
