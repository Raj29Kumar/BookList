import React from 'react';
import '../App.css';

const Controller = ({
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    openModal, // Function to open modal
    isModalOpen, // Modal state
    AddBookComponent, // AddBook component
}) => {
    return (
        <div className="controls">
            {/* Sorting Controls */}
            <div className="sort-controls">
                <label htmlFor="sortField">Sort by: </label>
                <select
                    id="sortField"
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
            </div>

            {/* Sort Order Toggle Button */}
            <div className="sort-button">
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="toggle-sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Click To Descending' : 'Click To Ascending'}
                </button>
            </div>

            {/* Add Book Button */}
            <div className="add-book">
                <button onClick={openModal} className="add-book-btn">
                    Add New Book
                </button>
            </div>

            {/* AddBook Modal Component */}
            {isModalOpen && AddBookComponent}
        </div>
    );
};

export default Controller;
