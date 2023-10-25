const Search = ({ text, search, handleChange }) => (
  <div>
    {text}
    <input value={search} onChange={handleChange} />
  </div>
);

export default Search;
