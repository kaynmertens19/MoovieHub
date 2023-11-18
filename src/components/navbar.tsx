
import React, { useState } from 'react';
import '../css/navBar.css';
import MovieModal from './movieModal';
import { useAuth0 } from "@auth0/auth0-react"

interface MovieData {
    title: string;
    director: string;
    poster_img: string;
    name: string;
    score: number;
    genreName: string; // Include 'genres' property here
    description: string;
  }
  




const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


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
      const response = await fetch('YOUR_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        const newMovie = await response.json();
        console.log('Movie created:', newMovie);
      
      } else {
        console.error('Error creating movie:', response.statusText);
       
      }
    } catch (error) {
      console.error('Error creating movie:', error);

    }
  };
  const {logout, user, isAuthenticated} = useAuth0();

  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div className="navbar">
       <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>
      <div className="title">
        <h1>Your Title</h1>
      </div>
      <div className="logout"><button onClick={():Promise<void> => logout()}>Logout</button></div>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="modal-button">
        <button onClick={toggleModal}>Create Movie</button>
      </div>
      <MovieModal isOpen={isModalOpen} onClose={toggleModal} onCreateMovie={createMovie} />
    </div>
  );
};

export default NavBar;