// src/context/MovieContext.jsx
import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Add any global handlers, e.g.:
  const addFavorite = (movie) => setFavorites((prev) => [...prev, movie]);
  const removeFavorite = (imdbID) => setFavorites((prev) => prev.filter(m => m.imdbID !== imdbID));

  return (
    <MovieContext.Provider value={{
      search, setSearch,
      type, setType,
      year, setYear,
      favorites, addFavorite, removeFavorite
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
