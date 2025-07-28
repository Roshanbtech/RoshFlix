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

const OMDB_API_KEYS = [
  import.meta.env.VITE_OMDB_API_KEY,
  import.meta.env.VITE_OMDB_API_KEY_2,
];

const Home = () => {
  const { search, setSearch, type, setType, year, setYear } = useMovieContext();
  const searchInput = useInput(search);
  const debouncedSearch = useDebounce(searchInput.value, 600);

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [apiKeyIdx, setApiKeyIdx] = useState(0);
  const apiKey = OMDB_API_KEYS[apiKeyIdx];

  useEffect(() => {
    setSearch(searchInput.value);
  }, [searchInput.value, setSearch]);

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${
    debouncedSearch || "harry potter"
  }${type ? `&type=${type}` : ""}${year ? `&y=${year}` : ""}&page=${page}`;

  const { data, loading, error } = useFetch(url, [
    debouncedSearch,
    type,
    year,
    page,
    apiKeyIdx, 
  ]);

  useEffect(() => {
    if (
      error &&
      error.toLowerCase().includes("limit") &&
      apiKeyIdx < OMDB_API_KEYS.length - 1
    ) {
      setApiKeyIdx((idx) => idx + 1);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && data?.Search) {
      setMovies((prev) =>
        page === 1 ? data.Search : [...prev, ...data.Search]
      );
      setHasMore(
        data.Search.length > 0 &&
          movies.length + data.Search.length < Number(data.totalResults)
      );
    } else if (!loading && page === 1) {
      setMovies([]);
      setHasMore(false);
    }
  }, [data, loading, page]);

  useInfiniteScroll(() => {
    if (!loading && hasMore) setPage((p) => p + 1);
  }, hasMore);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  }, [debouncedSearch, type, year]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#3f0fff] via-70% to-[#00fff7] scrollbar py-10">
      <h1 className="font-[Orbitron] text-5xl md:text-6xl font-extrabold text-center text-neon drop-shadow-glow tracking-widest mb-10">
        <span>Rosh</span>
        <span className="text-pink">Flix</span>
      </h1>
      <SearchBar
        value={searchInput.value}
        onChange={searchInput.onChange}
        placeholder="Search for movies..."
      />
      <FilterBar year={year} setYear={setYear} type={type} setType={setType} />
      {error && <Error message={error} />}
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          {loading && page === 1 ? (
            Array(9)
              .fill(0)
              .map((_, i) => <SkeletonMovieCard key={i} />)
          ) : movies.length === 0 && !loading ? (
            <div className="col-span-full text-center py-12 text-2xl text-neon">
              <span role="img" aria-label="sad face">
                😕
              </span>
              <div>No data found!...</div>
            </div>
          ) : (
            movies.map((movie, idx) => (
              <MovieCard key={movie.imdbID + "-" + idx} movie={movie} />
            ))
          )}
        </div>
      </div>
      {loading && page > 1 && (
        <div className="mt-6 flex justify-center">
          <SkeletonMovieCard />
        </div>
      )}
    </div>
  );
};

export default Home;
