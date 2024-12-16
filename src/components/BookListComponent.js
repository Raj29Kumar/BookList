import React from 'react';

const BookListComponent = ({ currentBooks }) => {
  return (
    <ul className="book-list">
      {currentBooks.length > 0 ? (
        currentBooks.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              <strong>Title:</strong> {book.title || 'N/A'}
              <br />
              <strong>Author:</strong> {book.author || 'N/A'}
              <br />
              <strong>Year:</strong> {book.year || 'N/A'}
            </div>
          </li>
        ))
      ) : (
        <p className="no-books">No books found.</p>
      )}
    </ul>
  );
};

export default BookListComponent;
