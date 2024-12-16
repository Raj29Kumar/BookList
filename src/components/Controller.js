import React from 'react';
import '../App.css';

const Controller = ({
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    openModal,
    isModalOpen,
    AddBookComponent,
}) => {
    return (
        <div className="controls">
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
            <div className="sort-button">
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="toggle-sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Click To Descending' : 'Click To Ascending'}
                </button>
            </div>
            <div className="add-book">
                <button onClick={openModal} className="add-book-btn">
                    Add New Book
                </button>
            </div>
            {isModalOpen && AddBookComponent}
        </div>
    );
};

export default Controller;
