import React, { useState, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import useInput from "../hooks/useInput";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCard from "../components/movies/MovieCard";
import SkeletonMovieCard from "../components/movies/SkeletonMovieCard";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import Error from "../components/common/Error";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function Home() {
  const { search, setSearch, type, setType, year, setYear } = useMovieContext();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const debouncedSearch = useDebounce(search, 600);
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${debouncedSearch || "batman"}${type ? `&type=${type}` : ""}${year ? `&y=${year}` : ""}&page=${page}`;

  const { data, loading, error } = useFetch(url, [debouncedSearch, type, year, page]);

  useEffect(() => {
    if (!loading && data?.Search) {
      setMovies((prev) => page === 1 ? data.Search : [...prev, ...data.Search]);
      setHasMore(data.Search.length > 0 && movies.length + data.Search.length < Number(data.totalResults));
    } else if (!loading && page === 1) {
      setMovies([]);
      setHasMore(false);
    }
  }, [data, loading, page]);

  useInfiniteScroll(() => {
    if (!loading && hasMore) setPage(p => p + 1);
  }, hasMore);

  // Reset on new search
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [debouncedSearch, type, year]);

  return (
    <div className="p-6">
      <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
      <FilterBar year={year} setYear={setYear} type={type} setType={setType} />
      {error && <Error message={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading && page === 1
          ? Array(9).fill(0).map((_, i) => <SkeletonMovieCard key={i} />)
          : movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
        }
      </div>
      {loading && page > 1 && (
        <div className="mt-6 flex justify-center"><SkeletonMovieCard /></div>
      )}
    </div>
  );
}

export default Home;
