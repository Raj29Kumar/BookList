import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import BookSearch from './BookSearch';
import BookListComponent from './BookListComponent';
import Pagination from './Pagination';
import Controller from './Controller'; // Import Controller
import AddBook from './AddBook'; // Import AddBook
import '../App.css';

const BookList = () => {
  const [query, setQuery] = useState(''); // Search query
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order
  const [sortField, setSortField] = useState('title'); // Sort field
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Updated to handle cases where book.title might be null or undefined
  const filteredBooks = query
    ? books.filter((book) => book.title && book.title.toLowerCase().includes(query.toLowerCase()))
    : books;

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="book-list-container">
      <BookSearch onSearch={setQuery} />
      {filteredBooks.length === 0 && !loading && <p>No books found.</p>}

      <Controller
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        openModal={openModal}
        isModalOpen={isModalOpen}
        AddBookComponent={<AddBook closeModal={closeModal} />}
      />

      <BookListComponent currentBooks={currentBooks} />

      {filteredBooks.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}

      {isModalOpen && <AddBook closeModal={closeModal} />}
    </div>
  );
};

export default BookList;
