import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        style={{
          padding: '10px',
        //   width: '100%',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
    </div>
  );
};

export default SearchBar;
