import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.imdbID}`} className="block group">
    <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center transform transition duration-200 group-hover:scale-105 group-hover:shadow-lg relative">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : '/assets/no-poster.png'}
        alt={movie.Title}
        className="h-64 w-44 object-cover rounded"
        loading="lazy"
      />
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-500">{movie.Year}</p>
      </div>
      {/* Hover overlay: release date, type, etc. (add more fields as needed) */}
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition duration-200 rounded-lg">
        <div>
          <div>Year: <span className="font-bold">{movie.Year}</span></div>
          <div>Type: <span className="capitalize">{movie.Type}</span></div>
          {/* Add more movie info here if available */}
        </div>
      </div>
    </div>
  </Link>
);

export default MovieCard;
