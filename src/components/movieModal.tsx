// src/components/MovieModal.tsx

import React, { useState } from 'react';
import "../css/modal.css"

interface MovieData {
  poster_img: string;
  name: string;
  score: number;
  genreName: string;
  description: string;
  title: string;
  director: string;
}

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMovie: (movieData: MovieData) => Promise<void>;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, onCreateMovie }) => {
  const [movieFormData, setMovieFormData] = useState<MovieData>({
    title: "",
    director: "",
    poster_img: '',
    name: '',
    score: 0,
    genreName: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMovieFormData({
      ...movieFormData,
      [name]: value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMovieFormData({
      ...movieFormData,
      [name]: value,
    });
  };

  const user_id = localStorage.getItem('user_id');

  const handleSubmitMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const apiUrl = `http://localhost:3004/movie/${user_id}`;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...movieFormData, score: Number(movieFormData.score) }),
      });

      if (response.ok) {
        const newMovie = await response.json();
        console.log('Movie created:', newMovie);
        
        // Call the onCreateMovie callback to update the parent component's movies state
        onCreateMovie(newMovie);
      } else {
        const errorMessage = await response.text();
        setError(`Error creating movie: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating movie:', error);
      setError('An error occurred while creating the movie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Create a Movie</h2>
        <form onSubmit={handleSubmitMovie}>
          <label>
            Image URL:
            <input
              type="text"
              name="poster_img"
              value={movieFormData.poster_img}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={movieFormData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Score:
            <input
              type="number"
              name="score"
              value={movieFormData.score}
              onChange={handleInputChange}
              inputMode="numeric"
              required
              min="0" // Minimum score value
              max="10" // Maximum score value
            />
          </label>
          <label>
            Genres:
            <input
              type="text"
              name="genreName"
              value={movieFormData.genreName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={movieFormData.description}
              onChange={handleTextareaChange}
              required
            />
          </label>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <button type="submit">Create</button>
              <button onClick={onClose}>Cancel</button>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default MovieModal;