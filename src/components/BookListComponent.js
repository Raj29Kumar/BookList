import React, { useState } from 'react';
import EditBook from './EditBook'; // Ensure this is the correct path to your EditBook component

const BookListComponent = ({ currentBooks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // Store the selected book for editing

  // Function to open the modal and set the selected book
  const openEditModal = (book) => {
    setSelectedBook(book); // Set the selected book to edit
    setIsModalOpen(true);  // Open the modal
  };

  // Function to close the modal
  const closeEditModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBook(null);  // Clear the selected book
  };

  const handleUpdateBook = (updatedBook) => {
    // Update the list of books with the updated book data
    const updatedBooks = currentBooks.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    // Assuming you want to pass the updated list to the parent or update local state
    // If you need to update the books in a parent component, you can call a callback here
    // Example: onBooksUpdated(updatedBooks);
    closeEditModal(); // Close modal after update
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
          <p className="no-books">No books found.</p>
        )}
      </ul>

      {/* Modal for editing the book */}
      {isModalOpen && (
        <EditBook
          book={selectedBook}
          closeModal={closeEditModal}
          onBookUpdated={handleUpdateBook}
        />
      )}
    </div>
  );
};

export default BookListComponent;
