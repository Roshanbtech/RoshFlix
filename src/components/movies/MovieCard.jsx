import { Link } from "react-router-dom";
import { useMovieContext } from "../../context/MovieContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useMovieContext();
  const isFav = favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-black/80 backdrop-blur border-2 border-transparent hover:border-[#00fff7] shadow-[0_0_16px_#00fff7bb] hover:shadow-[0_0_24px_#3f0fff70] transition-all duration-200">
      <button
        onClick={(e) => {
          e.preventDefault();
          isFav ? removeFavorite(movie.imdbID) : addFavorite(movie);
        }}
        className={`absolute top-3 right-3 z-10 text-2xl transition-all duration-150 ${
          isFav ? "text-red-500" : "text-cyan-300"
        } drop-shadow-glow hover:scale-125`}
        tabIndex={0}
      >
        {isFav ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className="aspect-[3/4] w-full bg-gradient-to-tr from-[#0a0118] via-[#3f0fff80] to-[#00fff7] rounded-2xl overflow-hidden">
          <img
            src={
              movie.Poster !== "N/A" ? movie.Poster : "/assets/no-poster.png"
            }
            alt={movie.Title}
            className="w-full h-full object-cover rounded-2xl transition-all duration-200 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/no-poster.png";
            }}
          />
        </div>
        <div className="px-2 py-3 bg-black/85">
          <h3 className="text-base font-bold font-[Orbitron] text-[#00fff7] truncate">
            {movie.Title}
          </h3>
          <p className="text-xs font-mono text-[#39ff14]">{movie.Year}</p>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/90 opacity-0 group-hover:opacity-100 transition duration-200 backdrop-blur-md">
          <div className="text-pink font-bold text-lg">{movie.Year}</div>
          <div className="text-cyan-400 text-md capitalize">{movie.Type}</div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
