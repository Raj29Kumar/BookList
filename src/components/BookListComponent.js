import React, { useState } from 'react';
import EditBook from './EditBook';

const BookListComponent = ({ currentBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const openEditModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div>
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
              <div className="book-actions">
                <button onClick={() => openEditModal(book)} className="edit-btn">
                  Edit
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>

      {isModalOpen && (
        <EditBook book={selectedBook} closeModal={closeEditModal} />
      )}
    </div>
  );
};

export default BookListComponent;
