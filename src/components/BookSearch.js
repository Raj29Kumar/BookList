import React, { useState } from 'react';
import '../App.css';

const BookSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search by book title"
            />
        </div>
    );
};

export default BookSearch;

