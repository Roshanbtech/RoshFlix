import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "../components/common/Loader";
import Error from "../components/common/Error";
import { FaArrowLeft, FaImdb, FaStar, FaYoutube } from "react-icons/fa";
import TiltedCard from "../components/common/TitledCard";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const getRating = (ratings, source) =>
  (ratings || []).find((rt) => rt.Source === source)?.Value || null;

const StarRating = ({ value }) => {
  const num = Number(value) || 0;
  const stars = Math.round(num / 2);
  return (
    <span className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < stars ? "text-yellow-400" : "text-gray-700"}
        />
      ))}
      <span className="ml-2 text-yellow-300">{num ? num : "N/A"}</span>
    </span>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
  const { data: movie, loading, error } = useFetch(url, [id]);
  const imdbRating =
    getRating(movie?.Ratings, "Internet Movie Database")?.split("/")[0] ||
    movie?.imdbRating;
  const rotten = getRating(movie?.Ratings, "Rotten Tomatoes");
  const meta = getRating(movie?.Ratings, "Metacritic");

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );
  if (error || !movie) return <Error message={error || "No movie found"} />;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-black/70 border-2 border-[#00fff7] text-[#00fff7] hover:bg-[#00fff7] hover:text-black transition-all shadow-neon"
      >
        <FaArrowLeft className="text-lg" />
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-cyberbg/80 rounded-xl p-6 shadow-2xl backdrop-blur-lg">
        <div className="flex-shrink-0 w-72">
          <TiltedCard
            imageSrc={
              movie.Poster !== "N/A" ? movie.Poster : "/assets/no-poster.png"
            }
            altText={movie.Title}
            containerHeight="400px"
            containerWidth="288px"
            imageHeight="400px"
            imageWidth="288px"
            scaleOnHover={1.12}
            rotateAmplitude={14}
            showMobileWarning={false}
            showTooltip={false}
            displayOverlayContent={false}
          />
        </div>
        <div className="flex-1 text-white">
          <h2 className="text-4xl font-[Orbitron] text-neon mb-2">
            {movie.Title}{" "}
            <span className="text-base text-cyan-400">({movie.Year})</span>
          </h2>
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <span className="bg-neon px-3 py-1 rounded-lg font-bold text-black">
              {movie.Genre}
            </span>
            <span className="bg-pink px-3 py-1 rounded-lg font-bold">
              {movie.Runtime}
            </span>
            <span className="bg-cyan-400 px-3 py-1 rounded-lg text-black font-bold">
              {movie.Rated}
            </span>
          </div>
          <p className="mb-3 text-cyan-200">{movie.Plot}</p>
          <div className="mb-2">
            <b>Director:</b> {movie.Director}
          </div>
          <div className="mb-4">
            <b>Actors:</b> {movie.Actors}
          </div>
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg">
              <FaImdb className="text-yellow-400 text-xl" />
              <StarRating value={imdbRating} />
              <span className="text-xs ml-2">IMDb</span>
            </div>
            {rotten && (
              <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg">
                <span className="font-bold text-green-400">🍅</span>
                <span className="font-bold">{rotten}</span>
                <span className="text-xs ml-2">Rotten Tomatoes</span>
              </div>
            )}
            {meta && (
              <div className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg">
                <span className="font-bold text-cyan-400">M</span>
                <span className="font-bold">{meta}</span>
                <span className="text-xs ml-2">Metacritic</span>
              </div>
            )}
          </div>
          <div className="mb-3">
            <b className="text-pink">Awards:</b> {movie.Awards}
          </div>
          {movie.BoxOffice && (
            <div className="mb-3">
              <b className="text-neon">Box Office:</b> {movie.BoxOffice}
            </div>
          )}
          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full bg-pink text-white shadow-pink hover:bg-neon transition-all font-bold tracking-widest"
            >
              View on IMDb
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.Title + " trailer"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center px-6 py-2 rounded-full bg-neon text-black shadow-neon hover:bg-pink hover:text-white transition-all font-bold tracking-widest"
            >
              <FaYoutube className="text-2xl" />
              Watch Trailer on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
