import React, { useState } from 'react';
import '../App.css';

const BookSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value); // Pass the query back to parent
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch} // Trigger search on input change
                placeholder="Search by book title"
            />
        </div>
    );
};

export default BookSearch;

