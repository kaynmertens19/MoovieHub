import { useState } from 'react';
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
        score: 0, // Initialize as a number
        genreName: '',
        description: '',
      });
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
      
      const handleSubmitMovie = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const apiUrl = 'http://localhost:3004/movie/6554aa33b0d520590cab117a';
      
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...movieFormData, score: Number(movieFormData.score) }), // Convert score to a number
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
      
        onClose();
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
  />
</label>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={movieFormData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
  Score:
  <input
    type="number"
    name="score"
    value={movieFormData.score}
    onChange={handleInputChange}
    inputMode="numeric" // Add this line to enforce numeric input
  />
</label>
              <label>
  Genres:
  <input
    type="text"
    name="genreName" // Use "genreName" to match the property name
    value={movieFormData.genreName}
    onChange={handleInputChange}
  />
</label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={movieFormData.description}
                  onChange={handleTextareaChange} // Use handleTextareaChange for textarea
                />
              </label>
              <button type="submit">Create</button>
            </form>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      );
    };
    
    export default MovieModal;