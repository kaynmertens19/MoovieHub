import React, { useState } from 'react';
import '../css/navBar.css';
import { useAuth0 } from "@auth0/auth0-react";
import MovieModal from './movieModal';
import MovieList from './moviesSection';

interface MovieData {
  title: string;
  director: string;
  poster_img: string;
  name: string;
  score: number;
  genreName: string;
  description: string;
}



const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<MovieData[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for: ${searchQuery}`);
  };

  const createMovie = async (movieData: MovieData) => {
    try {
      const user_id = localStorage.getItem('user_id');
      const response = await fetch(`http://localhost:3004/movie/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const newMovie = await response.json();
       
        setMovies([...movies, newMovie]);
        toggleModal(); 
      } else {
        console.log('Error creating movie:', response.statusText);
      }
    } catch (error) {
      console.log('Error creating movie:', error);
    }
  };

  const { logout } = useAuth0();

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>
      <div className="title">
        <h1>Your Title</h1>
      </div>
      <div className="button-group-left">
        <button onClick={(): Promise<void> => logout()} className="neon-button">Logout</button>
      </div>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="neon-button">Search</button>
          </div>
        </form>
      </div>
      <div className="modal-button">
        <button onClick={toggleModal} className="modal-button">Create Movie</button>
      </div>

      <MovieModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onCreateMovie={createMovie} 
      />

  
      <MovieList movies={movies} />
    </div>
  );
};

export default NavBar;