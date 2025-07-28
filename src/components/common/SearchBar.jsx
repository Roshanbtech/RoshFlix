import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
  <form className="w-full max-w-md flex mb-6 mx-auto relative">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="flex-1 px-4 py-2 pr-10 rounded-xl border-2 border-neon bg-white/10 backdrop-blur-md text-white placeholder-cyan-400 focus:outline-neon"
      placeholder={placeholder}
      autoFocus
    />
    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neon text-lg pointer-events-none">
      <FaSearch />
    </span>
  </form>
);

export default SearchBar;
