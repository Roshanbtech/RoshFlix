const SearchBar = ({ value, onChange, onSubmit, placeholder = "Search movies..." }) => (
  <>
    <form
      onSubmit={e => { e.preventDefault(); onSubmit && onSubmit(); }}
      className="w-full max-w-md flex mb-6 mx-auto"
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
        placeholder={placeholder}
        autoFocus
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  </>
);

export default SearchBar;
