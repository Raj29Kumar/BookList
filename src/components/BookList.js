import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';
import BookSearch from './BookSearch';
import BookListComponent from './BookListComponent';
import Pagination from './Pagination';
import Controller from './Controller';
import AddBook from './AddBook';
import '../App.css';

const BookList = () => {
  const [query, setQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [sortField, setSortField] = useState('title');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 4;
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({ sortField, sortOrder }));
  }, [dispatch, sortField, sortOrder]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredBooks = query
    ? books.filter((book) => book.title && book.title.toLowerCase().includes(query.toLowerCase()))
    : books;

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <BookListComponent currentBooks={currentBooks} />
      )}

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
