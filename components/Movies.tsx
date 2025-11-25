import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, set, remove, update } from 'firebase/database';
import type { Movie } from '../types';

interface MoviesProps {
  setActivePage: (page: string) => void;
}

const Movies: React.FC<MoviesProps> = ({ setActivePage }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [movieUrl, setMovieUrl] = useState('');
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const moviesRef = ref(db, 'movies');
    onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMovies: Movie[] = [];
      for (const id in data) {
        loadedMovies.push({ id, ...data[id] });
      }
      setMovies(loadedMovies.reverse());
      setLoading(false);
    });
  }, []);

  const clearForm = () => {
    setTitle('');
    setThumbnailUrl('');
    setMovieUrl('');
    setEditingMovie(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !thumbnailUrl || !movieUrl) return;

    if (editingMovie) {
      // Update existing movie
      const movieRef = ref(db, `movies/${editingMovie.id}`);
      update(movieRef, { title, thumbnailUrl, movieUrl })
        .then(() => clearForm())
        .catch((error) => console.error("Error updating movie:", error));
    } else {
      // Add new movie
      const moviesRef = ref(db, 'movies');
      const newMovieRef = push(moviesRef);
      set(newMovieRef, { title, thumbnailUrl, movieUrl })
        .then(() => clearForm())
        .catch((error) => console.error("Error adding movie:", error));
    }
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setThumbnailUrl(movie.thumbnailUrl);
    setMovieUrl(movie.movieUrl);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      const movieRef = ref(db, `movies/${id}`);
      remove(movieRef);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Movies</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <input type="text" placeholder="Thumbnail Link" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <input type="text" placeholder="Movie Link" value={movieUrl} onChange={(e) => setMovieUrl(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <div className="flex space-x-4">
            <button type="submit" className="flex-grow bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition duration-300">{editingMovie ? 'Update Movie' : 'Add Movie'}</button>
            {editingMovie && <button type="button" onClick={clearForm} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Cancel Edit</button>}
          </div>
        </form>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Movie List</h2>
        {loading ? <p>Loading movies...</p> : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="border-b border-gray-600 text-sm text-gray-400">
                    <tr>
                        <th className="py-3 px-4 font-semibold">Thumbnail</th>
                        <th className="py-3 px-4 font-semibold">Title</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {movies.map((movie) => (
                    <tr key={movie.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4"><img src={movie.thumbnailUrl} alt={movie.title} className="w-24 h-14 object-cover rounded-md" /></td>
                        <td className="py-3 px-4">{movie.title}</td>
                        <td className="py-3 px-4">
                        <button onClick={() => handleEdit(movie)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg mr-2 text-sm">Edit</button>
                        <button onClick={() => handleDelete(movie.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
        { !loading && movies.length === 0 && <p className="text-gray-400">No movies found. Add one using the form above.</p>}
      </div>
      <div className="mt-8 text-center">
        <button 
          onClick={() => setActivePage('Dashboard')} 
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Movies;