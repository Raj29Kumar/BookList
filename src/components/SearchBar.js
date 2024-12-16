import React from 'react';
import '../App.css';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter Title to Search books..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
