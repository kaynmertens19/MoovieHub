
import React, { useEffect, useState } from 'react';

interface MovieListProps {
    movies: MovieData[];
  }
  interface MovieData {
    title: string;
    director: string;
    poster_img: string;
    name: string;
    score: number;
    genreName: string;
    description: string;
  }
  
const MovieList: React.FC<MovieListProps> = () => {
  const [movies, setMovies] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await fetch('http://localhost:3004/movie/getall');
          const data = await response.json();
          const filteredMovies = data.filter((movie: any) => movie.user_id === userId);
          setMovies(filteredMovies);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>My Movies</h1>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;