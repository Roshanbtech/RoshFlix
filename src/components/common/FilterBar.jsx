const FilterBar = ({ year, setYear, type, setType }) => (
  <>
    <div className="flex flex-wrap gap-4 mb-6 justify-center">
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="px-3 py-2 rounded border border-gray-300 text-pink-400"
      >
        <option value="">All Types</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <input
        type="number"
        value={year}
        onChange={e => setYear(e.target.value)}
        className="px-3 py-2 rounded border border-gray-300"
        placeholder="Year"
        min="1900"
        max={new Date().getFullYear()}
      />
    </div>
  </>
);

export default FilterBar;
